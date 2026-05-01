import Link from 'next/link';

export const metadata = { title: 'Returns & Exchanges — IBNA Clothing' };

export default function ReturnsPage() {
  return (
    <div>
      <div className="page-hero"><h1>Returns &amp; Exchanges</h1><p>Hassle-free returns within 7 days</p></div>
      <div className="breadcrumb">
        <Link href="/"><span>Home</span></Link>
        <span className="sep">/</span><span>Returns</span>
      </div>
      <div className="returns-content">
        <h2>Our Return Policy</h2>
        <p>At IBNA Clothing, we want you to love everything you buy. If something isn't right, we're here to help. You can return most items within <strong>7 days</strong> of delivery for a full refund or exchange.</p>
        <div className="highlight">📦 Returns are accepted within 7 days of delivery. Items must be unworn, unwashed, and in original packaging with tags attached.</div>

        <h2>How to Return</h2>
        <ul>
          <li>Contact us via Instagram <strong>@ibnaclothing.12</strong> or WhatsApp with your order number.</li>
          <li>We'll arrange a pickup or provide return drop-off details.</li>
          <li>Once we receive and inspect the item, your refund or exchange will be processed within 3–5 business days.</li>
        </ul>

        <h2>Non-Returnable Items</h2>
        <ul>
          <li>Items marked as "Final Sale" or "Last Chance"</li>
          <li>Items that have been worn, washed, or damaged</li>
          <li>Items without original tags or packaging</li>
        </ul>

        <h2>Exchanges</h2>
        <p>Want a different size or colour? We're happy to exchange! Just follow the return process and mention the item you'd like instead.</p>

        <h2>Refund Timeline</h2>
        <p>Refunds are issued to your original payment method within 3–5 business days after we receive your return.</p>
        <p>For COD orders, refunds are issued via JazzCash or Easypaisa.</p>

        <h2>Contact Us</h2>
        <p>📱 WhatsApp: +92 300 0000000<br />📸 Instagram: <a href="https://www.instagram.com/ibnaclothing.12/" target="_blank" rel="noopener" style={{color:'var(--black)'}}>@ibnaclothing.12</a></p>
      </div>
    </div>
  );
}