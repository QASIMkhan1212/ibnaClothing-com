'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ShippingPage() {
  const router = useRouter();
  return (
    <div>
      <div className="page-hero"><h1>Shipping Info</h1><p>Fast delivery across Pakistan</p></div>
      <div className="breadcrumb">
        <Link href="/"><span>Home</span></Link>
        <span className="sep">/</span><span>Shipping</span>
      </div>
      <div className="returns-content">
        <h2>Delivery Times</h2>
        <div className="size-table-wrap">
          <table className="size-table">
            <thead>
              <tr><th>City</th><th>Estimated Time</th></tr>
            </thead>
            <tbody>
              <tr><td>Karachi</td><td>1–2 business days</td></tr>
              <tr><td>Lahore</td><td>2–3 business days</td></tr>
              <tr><td>Islamabad / Rawalpindi</td><td>2–3 business days</td></tr>
              <tr><td>Other cities</td><td>3–5 business days</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Shipping Charges</h2>
        <div className="highlight">🚚 Free delivery on all orders above PKR 5,000. Flat PKR 200 for orders below PKR 5,000.</div>

        <h2>Order Tracking</h2>
        <p>
          Once your order ships, you'll receive an SMS with your tracking details. You can also track your order using our{' '}
          <span style={{cursor:'pointer',textDecoration:'underline'}} onClick={() => router.push('/track')}>Track Order</span> page.
        </p>

        <h2>COD Orders</h2>
        <p>Cash on Delivery is available across Pakistan. Please have the exact amount ready at time of delivery.</p>
      </div>
    </div>
  );
}