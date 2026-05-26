'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fname: '', lname: '', email: '', phone: '', address: '', city: '', payment: 'Cash on Delivery', paymentRef: ''
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

  const validatePayment = () => {
    const { payment, paymentRef } = formData;
    if (payment !== 'Cash on Delivery' && paymentRef.trim().length < 3) {
      alert('Please enter your transaction reference or payment proof for the selected payment method.');
      return false;
    }
    return true;
  };

  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (!validateShipping()) return setStep(1);
    if (!validatePayment()) return setStep(2);
    if (!cart.length) {
      alert('Your cart is empty. Please add items before placing an order.');
      router.push('/shop');
      return;
    }

    setLoading(true);
    try {
      const payload = { 
        user: {
          name: `${formData.fname} ${formData.lname}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city
        }, 
        cart, 
        total: total.toLocaleString(),
        paymentMethod: formData.payment === 'Cash on Delivery' ? 'COD' : `${formData.payment} (${formData.paymentRef})`
      };
      
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        throw new Error('Failed to save order to Google Sheets');
      }

      const orderNum = '#IBNA-' + (Math.floor(Math.random()*9000)+1000);
      const orderStatus = formData.payment === 'Cash on Delivery' ? 'COD order placed - Payment on delivery' : 'Payment proof received - Pending verification';
      sessionStorage.setItem('lastOrder', orderNum);
      sessionStorage.setItem('orderDetails', JSON.stringify({
        orderNum,
        payment: formData.payment,
        paymentRef: formData.paymentRef || '',
        orderStatus,
        email: formData.email,
      }));
      clearCart();
      router.push('/confirm');
    } catch (err) {
      console.error(err);
      alert('There was an issue placing your order. Please try again.');
    } finally {
      setLoading(false);
    }
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
              <p className="section-note">Select one payment option below and follow the instructions to complete the order.</p>
              <div className="payment-grid">
                {[
                  { key: 'Cash on Delivery', title: 'Cash on Delivery', tag: 'Pay when delivered', info: 'Fast and easy. Delivery in Islamabad only.' },
                  { key: 'JazzCash', title: 'JazzCash', tag: 'Local wallet', info: 'Send payment to 03406915833, Nabeel Ahmad.' },
                  { key: 'Easypaisa', title: 'EasyPaisa', tag: 'Local wallet', info: 'Send payment to 03406915833, Nabeel Ahmad.' },
                  { key: 'Bank Transfer', title: 'Bank Transfer', tag: 'Allied Bank', info: 'Use IBAN PK77ABPA0010077873920014, Nabeel Ahmad.' }
                ].map((option) => (
                  <button key={option.key} type="button" className={`payment-card ${formData.payment===option.key ? 'selected' : ''}`} onClick={() => setFormData(prev => ({ ...prev, payment: option.key }))}>
                    <div className="payment-card-header">
                      <span>{option.title}</span>
                      <small>{option.tag}</small>
                    </div>
                    <p>{option.info}</p>
                    {formData.payment===option.key && <div className="card-selected">Selected</div>}
                  </button>
                ))}
              </div>
              <div className="payment-details-box">
                {formData.payment === 'Cash on Delivery' && (
                  <>
                    <h4>Cash on Delivery</h4>
                    <p>Payment is collected when your order arrives. Please keep your phone available for delivery updates.</p>
                  </>
                )}
                {formData.payment === 'JazzCash' && (
                  <>
                    <h4>JazzCash / EasyPaisa Payment</h4>
                    <p>Please send your payment to 03406915833 (Nabeel Ahmad) and enter the transaction reference below.</p>
                  </>
                )}
                {formData.payment === 'Easypaisa' && (
                  <>
                    <h4>EasyPaisa / JazzCash Payment</h4>
                    <p>Please send your payment to 03406915833 (Nabeel Ahmad) and enter the transaction reference below.</p>
                  </>
                )}
                {formData.payment === 'Bank Transfer' && (
                  <>
                    <h4>Bank Transfer</h4>
                    <p>Transfer the amount to Allied Bank IBAN PK77ABPA0010077873920014 (Nabeel Ahmad). Enter the reference below.</p>
                  </>
                )}
              </div>
              {formData.payment !== 'Cash on Delivery' && (
                <div className="form-group">
                  <label>Transaction Reference / Payment Proof*</label>
                  <input type="text" name="paymentRef" value={formData.paymentRef} onChange={handleInput} placeholder="Enter payment transaction ID" required />
                </div>
              )}
              <div className="step-btns">
                <button className="back-link" onClick={() => setStep(1)}>← Back to Shipping</button>
                <button className="next-btn" onClick={() => validatePayment() && setStep(3)}>Continue to Review →</button>
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
                  <h4>Payment</h4>
                  <p>{formData.payment}</p>
                  {formData.paymentRef && <p className="payment-ref">Reference: {formData.paymentRef}</p>}
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
                <button className="place-order-btn" onClick={placeOrder} disabled={loading}>{loading ? 'Placing order...' : 'Confirm Order →'}</button>
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