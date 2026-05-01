'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { COLORS } from '@/data/products';

export default function ProductModal({ product, onClose }) {
  const [size, setSize] = useState('S');
  const [color, setColor] = useState(product.color);
  const { addToCart, addToWishlist } = useCart();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const esc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', esc);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-imgs">
          <button className="modal-close" onClick={onClose}>✕</button>
          <img className="modal-main-img" src={product.img} alt={product.name} />
        </div>
        <div className="modal-info">
          {product.badge && <span className="modal-badge">{product.badge}</span>}
          <div className="modal-name">{product.name}</div>
          <div className="modal-price">PKR {product.price.toLocaleString()}</div>
          <p className="modal-desc">{product.desc}</p>
          <div className="modal-lbl">Select Size</div>
          <div className="modal-sizes">
            {['XS','S','M','L','XL'].map(s => (
              <button key={s} className={`size-btn ${size===s?'active':''}`} onClick={() => setSize(s)}>{s}</button>
            ))}
          </div>
          <div className="modal-lbl">Colour</div>
          <div className="modal-colors">
            {Object.entries(COLORS).slice(0,5).map(([k,v]) => (
              <div key={k} className={`color-swatch ${color===k?'active':''}`} style={{background:v}} onClick={() => setColor(k)}></div>
            ))}
          </div>
          <button className="modal-add" onClick={() => { addToCart(product, size); onClose(); }}>Add to Cart</button>
          <button className="modal-wish" onClick={() => { addToWishlist(product); onClose(); }}>♡ &nbsp; Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
}