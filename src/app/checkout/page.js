'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fname: '', lname: '', email: '', phone: '', address: '', city: '', payment: 'Cash on Delivery'
  });
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateShipping = () => {
    const { fname, lname, email, phone, address, city } = formData;
    if (!fname || !lname || !email || !phone || !address || !city) {
      alert('Please fill in all shipping details.');
      return false;
    }
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const placeOrder = () => {
    const orderNum = '#IBNA-' + (Math.floor(Math.random()*9000)+1000);
    sessionStorage.setItem('lastOrder', orderNum);
    clearCart();
    router.push('/confirm');
  };

  return (
    <div>
      <div className="page-hero"><h1>Checkout</h1><p>Secure &amp; Fast</p></div>
      <div className="breadcrumb"><Link href="/"><span>Home</span></Link><span className="sep">/</span><Link href="/cart"><span>Cart</span></Link><span className="sep">/</span><span>Checkout</span></div>
      <div className="checkout-layout">
        <div className="checkout-main">
          <div className="checkout-steps">
            {['Shipping','Payment','Review'].map((s,i) => (
              <div key={i} className={`checkout-step ${step===i+1?'active':''} ${step>i+1?'done':''}`}>
                <span className="step-num">{i+1}</span>
                <span className="step-lbl">{s}</span>
              </div>
            ))}
          </div>

          {step===1 && (
            <div className="checkout-section active">
              <h3>Shipping Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name*</label>
                  <input type="text" name="fname" value={formData.fname} onChange={handleInput} placeholder="John" required />
                </div>
                <div className="form-group">
                  <label>Last Name*</label>
                  <input type="text" name="lname" value={formData.lname} onChange={handleInput} placeholder="Doe" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email*</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInput} placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label>Phone*</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInput} placeholder="03XXXXXXXXX" required />
                </div>
              </div>
              <div className="form-group">
                <label>Address*</label>
                <input type="text" name="address" value={formData.address} onChange={handleInput} placeholder="Street address, House No." required />
              </div>
              <div className="form-group">
                <label>City*</label>
                <input type="text" name="city" value={formData.city} onChange={handleInput} placeholder="Karachi" required />
              </div>
              <button className="next-btn" onClick={() => validateShipping() && setStep(2)}>Continue to Payment →</button>
            </div>
          )}

          {step===2 && (
            <div className="checkout-section active">
              <h3>Payment Method</h3>
              <div className="payment-opts">
                {['Cash on Delivery','JazzCash','Easypaisa','Bank Transfer'].map((p) => (
                  <label key={p} className={`payment-opt ${formData.payment===p?'selected':''}`}>
                    <input type="radio" name="payment" value={p} checked={formData.payment===p} onChange={handleInput} />
                    <span className="opt-name">{p}</span>
                  </label>
                ))}
              </div>
              <div className="step-btns">
                <button className="back-link" onClick={() => setStep(1)}>← Back to Shipping</button>
                <button className="next-btn" onClick={() => setStep(3)}>Continue to Review →</button>
              </div>
            </div>
          )}

          {step===3 && (
            <div className="checkout-section active">
              <h3>Order Review</h3>
              <div className="review-summary">
                <div className="review-box">
                  <h4>Shipping To:</h4>
                  <p>{formData.fname} {formData.lname}<br/>{formData.address}, {formData.city}<br/>{formData.phone}</p>
                </div>
                <div className="review-box">
                  <h4>Payment Method:</h4>
                  <p>{formData.payment}</p>
                </div>
              </div>
              <div className="review-items">
                {cart.map((item,i) => (
                  <div key={i} className="mini-item">
                    <img src={item.img} alt="" />
                    <div className="mini-item-info">
                      <div className="mini-item-name">{item.name}</div>
                      <div className="mini-item-meta">Size: {item.size} | Qty: {item.qty}</div>
                    </div>
                    <div className="mini-item-price">PKR {(item.price*item.qty).toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="step-btns">
                <button className="back-link" onClick={() => setStep(2)}>← Back to Payment</button>
                <button className="place-order-btn" onClick={placeOrder}>Confirm Order →</button>
              </div>
            </div>
          )}
        </div>
        <div className="checkout-mini">
          <h3>Order Summary</h3>
          {cart.map((item,i) => (
            <div key={i} className="mini-item">
              <img src={item.img} alt="" />
              <div className="mini-item-info">
                <div className="mini-item-name">{item.name}</div>
                <div className="mini-item-meta">Size: {item.size} × {item.qty}</div>
              </div>
              <div className="mini-item-price">PKR {(item.price*item.qty).toLocaleString()}</div>
            </div>
          ))}
          <div className="summary-row total" style={{marginTop:12}}><span>Total</span><span>PKR {total.toLocaleString()}</span></div>
        </div>
      </div>
    </div>
  );
}