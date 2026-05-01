'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ConfirmPage() {
  const [orderNum, setOrderNum] = useState('');
  useEffect(() => { setOrderNum(sessionStorage.getItem('lastOrder') || '#IBNA-0000'); }, []);
  return (
    <div className="order-confirm">
      <div className="check">✅</div>
      <h2>Order Confirmed!</h2>
      <p>Thank you for shopping with IBNA Clothing.</p>
      <div className="order-num">Order Number: {orderNum}</div>
      <Link href="/" className="order-confirm-btn">Continue Shopping</Link>
    </div>
  );
}