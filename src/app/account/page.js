'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

function AccountContent() {
  const params = useSearchParams();
  const initialTab = params.get('tab') || 'orders';
  const [tab, setTab] = useState(initialTab);
  const { wishlist, showToast } = useCart();

  const tabs = [
    { id: 'orders', label: 'Orders' },
    { id: 'profile', label: 'Profile' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'wishlist2', label: 'Wishlist' },
  ];

  return (
    <div>
      <div className="page-hero"><h1>My Account</h1><p>Welcome back</p></div>
      <div className="breadcrumb">
        <Link href="/"><span>Home</span></Link>
        <span className="sep">/</span><span>Account</span>
      </div>
      <div className="account-layout">
        <div className="account-nav">
          {tabs.map(t => (
            <a key={t.id} className={`account-nav-item ${tab===t.id?'active':''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </a>
          ))}
        </div>
        <div className="account-content">
          {tab === 'orders' && (
            <div className="account-section active">
              <h2>My Orders</h2>
              <div className="order-row" style={{fontSize:10,letterSpacing:2,textTransform:'uppercase',fontWeight:700,color:'var(--gray-mid)',paddingBottom:8,borderBottom:'2px solid var(--black)'}}>
                <span>Order</span><span>Date</span><span>Amount</span><span>Status</span>
              </div>
              <div className="order-row">
                <span>#IBNA-2847</span><span>Apr 20, 2026</span><span>PKR 4,000</span>
                <span className="order-status status-delivered">Delivered</span>
              </div>
              <div className="order-row">
                <span>#IBNA-2651</span><span>Mar 15, 2026</span><span>PKR 6,500</span>
                <span className="order-status status-delivered">Delivered</span>
              </div>
              <p style={{fontSize:12,color:'var(--gray-mid)',marginTop:24}}>Orders are typically delivered within 3–5 business days.</p>
            </div>
          )}

          {tab === 'profile' && (
            <div className="account-section active">
              <h2>Profile</h2>
              <div className="form-row">
                <div className="form-group"><label>First Name</label><input type="text" defaultValue="Muhammad" /></div>
                <div className="form-group"><label>Last Name</label><input type="text" defaultValue="Ahmed" /></div>
              </div>
              <div className="form-group"><label>Email</label><input type="email" defaultValue="you@example.com" /></div>
              <div className="form-group"><label>Phone</label><input type="tel" defaultValue="+92 300 0000000" /></div>
              <div className="form-group"><label>Date of Birth</label><input type="date" /></div>
              <button className="form-submit" onClick={() => showToast('Profile updated!')}>Save Changes</button>
            </div>
          )}

          {tab === 'addresses' && (
            <div className="account-section active">
              <h2>My Addresses</h2>
              <div className="address-grid">
                <div className="account-card">
                  <h4>Default Address</h4>
                  <p>Muhammad Ahmed<br />House 42, Block 5<br />Gulshan-e-Iqbal, Karachi<br />Sindh 75300<br />+92 300 0000000</p>
                </div>
                <div
                  className="account-card"
                  style={{display:'flex',alignItems:'center',justifyContent:'center',border:'2px dashed var(--gray-light)',background:'none',cursor:'pointer'}}
                  onClick={() => showToast('Address form coming soon!')}
                >
                  <p style={{textAlign:'center',color:'var(--gray-mid)'}}>+ Add New Address</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'wishlist2' && (
            <div className="account-section active">
              <h2>Saved Items</h2>
              {wishlist.length === 0 ? (
                <p style={{color:'var(--gray-mid)',fontSize:13,padding:'20px 0'}}>
                  No saved items yet.{' '}
                  <Link href="/shop" style={{color:'var(--black)',textDecoration:'underline'}}>Shop now →</Link>
                </p>
              ) : (
                <div className="must-grid">
                  {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountContent />
    </Suspense>
  );
}