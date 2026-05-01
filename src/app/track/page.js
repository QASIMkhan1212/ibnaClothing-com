'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function TrackPage() {
  const [orderNum, setOrderNum] = useState('');
  const [result, setResult] = useState(null);

  const trackOrder = () => {
    const q = orderNum.trim().toUpperCase();
    if (!q) {
      setResult({ error: 'Please enter an order number.' });
      return;
    }
    const known = {
      '#IBNA-2847': ['done','done','done','done'],
      '#IBNA-2651': ['done','done','done','done'],
    };
    const steps = [
      {label:'Order Placed', desc:'Order received and confirmed'},
      {label:'Processing', desc:'Your items are being packed'},
      {label:'Shipped', desc:'Order dispatched from warehouse'},
      {label:'Delivered', desc:'Package delivered to your address'},
    ];
    const k = known[q] || ['done','current','',''];
    setResult({ steps, statuses: k });
  };

  return (
    <div>
      <div className="page-hero"><h1>Track Your Order</h1><p>Real-time order status</p></div>
      <div className="breadcrumb">
        <Link href="/"><span>Home</span></Link>
        <span className="sep">/</span><span>Track Order</span>
      </div>
      <div className="track-wrap">
        <h2>Order Tracking</h2>
        <p>Enter your order number to check the status of your delivery.</p>
        <div className="search-box" style={{marginBottom:16}}>
          <input
            className="search-input"
            type="text"
            placeholder="e.g. #IBNA-2847"
            value={orderNum}
            onChange={(e) => setOrderNum(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && trackOrder()}
          />
          <button className="search-btn" onClick={trackOrder}>→</button>
        </div>
        {result && result.error && (
          <p style={{color:'var(--gray-mid)',fontSize:13}}>{result.error}</p>
        )}
        {result && result.steps && (
          <div className="track-timeline">
            {result.steps.map((s, i) => (
              <div key={i} className="track-step">
                <div className={`track-dot ${result.statuses[i] || ''}`}></div>
                <div className="track-info">
                  <strong>{s.label}</strong>
                  <span>{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}