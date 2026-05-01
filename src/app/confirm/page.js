'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ConfirmPage() {
  const [orderNum, setOrderNum] = useState('');
  
  useEffect(() => {
    const last = sessionStorage.getItem('lastOrder');
    setOrderNum(last || '#IBNA-' + (Math.floor(Math.random()*9000)+1000));
  }, []);

  return (
    <div className="confirm-page">
      <div className="confirm-container">
        <div className="confirm-card">
          <div className="confirm-icon-wrap">
            <div className="confirm-check">✓</div>
          </div>
          <h1>Order Confirmed!</h1>
          <p className="confirm-msg">Thank you for your purchase. We've received your order and are getting it ready for shipment.</p>
          
          <div className="confirm-details">
            <div className="conf-row">
              <span>Order Number:</span>
              <strong>{orderNum}</strong>
            </div>
            <div className="conf-row">
              <span>Estimated Delivery:</span>
              <strong>3-5 Working Days</strong>
            </div>
          </div>

          <div className="confirm-actions">
            <Link href="/shop" className="btn-primary confirm-btn">Continue Shopping</Link>
            <Link href="/account" className="btn-outline confirm-btn">View Order History</Link>
          </div>
          
          <div className="confirm-footer">
            <p>A confirmation email has been sent to your inbox.</p>
            <p>Need help? <Link href="/contact">Contact Support</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}