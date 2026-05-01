'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FaqsPage() {
  const router = useRouter();
  return (
    <div>
      <div className="page-hero"><h1>FAQs</h1><p>Frequently Asked Questions</p></div>
      <div className="breadcrumb">
        <Link href="/"><span>Home</span></Link>
        <span className="sep">/</span><span>FAQs</span>
      </div>
      <div className="returns-content">
        <h2>Ordering</h2>
        <p><strong>How do I place an order?</strong><br />Browse our products, add items to your cart, and proceed to checkout. We accept Cash on Delivery (COD), JazzCash, and Easypaisa.</p>
        <p><strong>Can I change my order after placing it?</strong><br />Contact us within 2 hours of placing your order and we'll do our best to accommodate changes.</p>

        <h2>Shipping</h2>
        <p><strong>How long does delivery take?</strong><br />Orders are delivered within 3–5 business days across Pakistan. Karachi orders may arrive sooner.</p>
        <p><strong>Is shipping free?</strong><br />Yes! Free delivery on all orders above PKR 5,000. A flat PKR 200 charge applies for orders below that.</p>

        <h2>Returns</h2>
        <p>
          <strong>What is your return policy?</strong><br />
          We accept returns within 7 days of delivery. Items must be unworn and in original condition. See our{' '}
          <span style={{cursor:'pointer',textDecoration:'underline'}} onClick={() => router.push('/returns')}>Returns page</span> for details.
        </p>

        <h2>Sizing</h2>
        <p>
          <strong>How do I find my size?</strong><br />
          Check our{' '}
          <span style={{cursor:'pointer',textDecoration:'underline'}} onClick={() => router.push('/sizeguide')}>Size Guide</span> for detailed measurements. When in doubt, size up.
        </p>

        <h2>Products</h2>
        <p><strong>Are your products made in Pakistan?</strong><br />Yes! All IBNA products are proudly made in Pakistan using quality local and imported fabrics.</p>
        <p><strong>How do I care for my clothes?</strong><br />Machine wash cold, gentle cycle. Do not bleach. Tumble dry low. Iron on medium heat.</p>
      </div>
    </div>
  );
}