'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ConfirmPage() {
  const [orderNum, setOrderNum] = useState('');
  const [orderDetails, setOrderDetails] = useState({ payment: '', paymentRef: '', orderStatus: '' });

  useEffect(() => {
    const last = sessionStorage.getItem('lastOrder');
    const details = sessionStorage.getItem('orderDetails');
    setOrderNum(last || '#IBNA-' + (Math.floor(Math.random()*9000)+1000));
    if (details) {
      try {
        setOrderDetails(JSON.parse(details));
      } catch {
        setOrderDetails({ payment: '', paymentRef: '', orderStatus: '' });
      }
    }
  }, []);

  return (
    <div className="confirm-page">
      <div className="confirm-container">
        <div className="confirm-card">
          <div className="confirm-icon-wrap">
            <div className="confirm-check">✓</div>
          </div>
          <h1>Order Confirmed!</h1>
          <p className="confirm-msg">Thank you for your purchase. We&apos;ve received your order and are getting it ready for shipment.</p>
          
          <div className="confirm-details">
            <div className="conf-row">
              <span>Order Number:</span>
              <strong>{orderNum}</strong>
            </div>
            {orderDetails.payment && (
              <div className="conf-row">
                <span>Payment Method:</span>
                <strong>{orderDetails.payment}</strong>
              </div>
            )}
            {orderDetails.paymentRef && (
              <div className="conf-row">
                <span>Payment Reference:</span>
                <strong>{orderDetails.paymentRef}</strong>
              </div>
            )}
            <div className="conf-row">
              <span>Order Status:</span>
              <strong>{orderDetails.orderStatus || 'Order received and being processed.'}</strong>
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
            <p>A confirmation email has been sent to your inbox if you provided a valid email address.</p>
            <p>Shipping available in Islamabad only. Need help? <Link href="/contact">Contact Support</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}