'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);

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
        <div>
          <div className="checkout-steps">
            {['Shipping','Payment','Review'].map((s,i) => (
              <div key={i} className={`checkout-step ${step===i+1?'active':''} ${step>i+1?'done':''}`}>{i+1}. {s}</div>
            ))}
          </div>
          {step===1 && (
            <div className="checkout-section active">
              <h3>Shipping Details</h3>
              <div className="form-row">
                <div className="form-group"><label>First Name</label><input type="text" /></div>
                <div className="form-group"><label>Last Name</label><input type="text" /></div>
              </div>
              <div className="form-group"><label>Email</label><input type="email" /></div>
              <div className="form-group"><label>Phone</label><input type="tel" /></div>
              <div className="form-group"><label>Address</label><input type="text" /></div>
              <button className="next-btn" onClick={() => setStep(2)}>Continue to Payment →</button>
            </div>
          )}
          {step===2 && (
            <div className="checkout-section active">
              <h3>Payment Method</h3>
              <div className="payment-opts">
                {['Cash on Delivery','JazzCash','Easypaisa','Bank Transfer'].map((p,i) => (
                  <div key={i} className="payment-opt"><input type="radio" name="pay" defaultChecked={i===0} /><label>{p}</label></div>
                ))}
              </div>
              <button className="next-btn" onClick={() => setStep(3)}>Continue to Review →</button>
            </div>
          )}
          {step===3 && (
            <div className="checkout-section active">
              <h3>Order Review</h3>
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
              <button className="place-order-btn" onClick={placeOrder}>Place Order →</button>
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