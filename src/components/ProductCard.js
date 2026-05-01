'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import ProductModal from './ProductModal';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 'M');
  };

  return (
    <>
      <div className="prod-card" onClick={() => setOpen(true)}>
        <div className="prod-img">
          <img src={product.img} alt={product.name} loading="lazy" />
          {product.badge && <span className="prod-badge">{product.badge}</span>}
        </div>
        <div className="prod-info">
          <div className="prod-name">{product.name}</div>
          <div className="prod-price">PKR {product.price.toLocaleString()}</div>
        </div>
        <button className="add-btn" onClick={handleAdd}>Add to Cart</button>
      </div>
      {open && <ProductModal product={product} onClose={() => setOpen(false)} />}
    </>
  );
}