import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const { formData, cart, total } = body;
    const orderNum = '#IBNA-' + (Math.floor(Math.random()*9000)+1000);

    if (!formData || !cart || !Array.isArray(cart) || cart.length === 0) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid cart details.' }), { status: 400 });
    }

    const requiredFields = ['fname', 'lname', 'email', 'phone', 'address', 'city', 'payment'];
    for (const field of requiredFields) {
      if (!formData[field] || String(formData[field]).trim().length === 0) {
        return new Response(JSON.stringify({ ok: false, error: `Missing required field: ${field}` }), { status: 400 });
      }
    }

    if (!String(formData.email).includes('@')) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid email address.' }), { status: 400 });
    }

    const serverTotal = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
    if (Number(total) !== serverTotal) {
      return new Response(JSON.stringify({ ok: false, error: 'Order total mismatch.' }), { status: 400 });
    }

    const offlineMethods = ['JazzCash', 'Easypaisa', 'Bank Transfer'];
    if (offlineMethods.includes(formData.payment) && (!formData.paymentRef || String(formData.paymentRef).trim().length < 3)) {
      return new Response(JSON.stringify({ ok: false, error: 'Transaction reference is required for the selected payment method.' }), { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'info@ibnaclothing.com';
    const orderHtml = `
      <h2>New Order: ${orderNum}</h2>
      <h3>Customer</h3>
      <p>${formData.fname} ${formData.lname}<br/>${formData.email}<br/>${formData.phone}<br/>${formData.address}, ${formData.city}</p>
      <h3>Payment</h3>
      <p>${formData.payment}</p>
      ${formData.paymentRef ? `<p><strong>Payment Reference:</strong> ${formData.paymentRef}</p>` : ''}
      <h3>Items</h3>
      <ul>
        ${cart.map(i => `<li>${i.name} — ${i.size || 'N/A'} × ${i.qty} — PKR ${i.price}</li>`).join('')}
      </ul>
      <p><strong>Total:</strong> PKR ${total}</p>
      <p><strong>Delivery:</strong> Delivery available in Islamabad only</p>
    `;

    // If SMTP is configured, send emails to admin and customer
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: adminEmail,
        subject: `New order ${orderNum}`,
        html: orderHtml,
      });

      if (formData.email) {
        const customerHtml = `
          <p>Hi ${formData.fname},</p>
          <p>Thank you for your order. Your order reference is <strong>${orderNum}</strong>.</p>
          <p>Payment method: ${formData.payment}</p>
          ${formData.paymentRef ? `<p>Payment reference: ${formData.paymentRef}</p>` : ''}
          <p>Delivery available in Islamabad only.</p>
          <p>One of our team members will confirm your order shortly.</p>
          <hr/>${orderHtml}
        `;

        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: formData.email,
          subject: `Order confirmation ${orderNum}`,
          html: customerHtml,
        });
      }

      return new Response(JSON.stringify({ ok: true, orderNum }), { status: 200 });
    }

    // Fallback: log to server console when SMTP not configured
    console.log('Order received (no SMTP):', { orderNum, formData, cart, total });
    return new Response(JSON.stringify({ ok: true, orderNum, warning: 'SMTP not configured, email not sent' }), { status: 200 });
  } catch (err) {
    console.error('submit-order error', err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500 });
  }
}
