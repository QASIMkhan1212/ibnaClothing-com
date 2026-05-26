import { google } from 'googleapis';

export async function POST(req) {
  try {
    const body = await req.json();
    const { user, cart, total, paymentMethod } = body;

    // 1. Prepare Authentication
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 2. Format Order Data for Sheet
    // Columns: Date, Name, Email, Phone, Address, Products, Total, Payment
    const date = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
    const productSummary = cart.map(item => `${item.name} (${item.qty}x ${item.size})`).join(', ');
    
    const row = [
      date,
      user.name,
      user.email,
      user.phone,
      `${user.address}, ${user.city}`,
      productSummary,
      `PKR ${total}`,
      paymentMethod
    ];

    // 3. Append to Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Checkout API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process order' }), { status: 500 });
  }
}
