'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ShippingPage() {
  const router = useRouter();
  return (
    <div>
      <div className="page-hero"><h1>Shipping Info</h1><p>Shipping available in Islamabad only</p></div>
      <div className="breadcrumb">
        <Link href="/"><span>Home</span></Link>
        <span className="sep">/</span><span>Shipping</span>
      </div>
      <div className="returns-content">
        <h2>Delivery Times</h2>
        <div className="size-table-wrap">
          <table className="size-table">
            <thead>
              <tr><th>Location</th><th>Estimated Time</th></tr>
            </thead>
            <tbody>
              <tr><td>Islamabad</td><td>2–3 business days</td></tr>
              <tr><td>Outside Islamabad</td><td>Shipping not available</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Shipping Charges</h2>
        <div className="highlight">🚚 Flat shipping charge of PKR 250 for all Islamabad orders.</div>

        <h2>Order Tracking</h2>
        <p>
          Once your order ships, you&apos;ll receive an SMS with your tracking details. You can also track your order using our{' '}
          <span style={{cursor:'pointer',textDecoration:'underline'}} onClick={() => router.push('/track')}>Track Order</span> page.
        </p>

        <h2>COD Orders</h2>
        <p>Cash on Delivery is available in Islamabad only. Please have the exact amount ready at time of delivery.</p>
      </div>
    </div>
  );
}