'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, changeQty, removeFromCart, cartCount } = useCart();
  const subtotal = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 5000 ? 0 : 200;

  return (
    <div>
      <div className="page-hero"><h1>Your Cart</h1><p>{cartCount} items</p></div>
      <div className="breadcrumb"><Link href="/"><span>Home</span></Link><span className="sep">/</span><span>Cart</span></div>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven&apos;t added anything yet.</p>
          <Link href="/shop" className="empty-cart-btn">Shop Now</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            <div className="cart-items-hdr"><span>Product</span><span>Price</span><span>Remove</span></div>
            {cart.map((item, idx) => (
              <div key={idx} className="cart-item">
                <img src={item.img} alt={item.name} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-meta">Size: {item.size} | Colour: {item.color}</div>
                  <div className="cart-item-price-mobile">PKR {(item.price*item.qty).toLocaleString()}</div>
                  <div className="cart-qty" style={{marginTop:10}}>
                    <button onClick={() => changeQty(idx,-1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(idx,1)}>+</button>
                  </div>
                </div>
                <div className="cart-item-price">PKR {(item.price*item.qty).toLocaleString()}</div>
                <button className="cart-remove" onClick={() => removeFromCart(idx)}>✕</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><span>PKR {subtotal.toLocaleString()}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{shipping===0?'Free 🎉':`PKR ${shipping}`}</span></div>
            <div className="summary-row total"><span>Total</span><span>PKR {(subtotal+shipping).toLocaleString()}</span></div>
            <Link href="/checkout" className="checkout-btn" style={{display:'block',textAlign:'center',textDecoration:'none'}}>Proceed to Checkout →</Link>
            <Link href="/shop" className="continue-btn" style={{display:'block',textAlign:'center',textDecoration:'none'}}>Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
}