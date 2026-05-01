'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const c = localStorage.getItem('ibna_cart');
    const w = localStorage.getItem('ibna_wishlist');
    if (c) setCart(JSON.parse(c));
    if (w) setWishlist(JSON.parse(w));
  }, []);

  useEffect(() => { localStorage.setItem('ibna_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('ibna_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  };

  const addToCart = (product, size = 'M') => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i => i.id === product.id && i.size === size ? {...i, qty: i.qty + 1} : i);
      }
      return [...prev, {id: product.id, name: product.name, price: product.price, img: product.img, size, qty: 1, color: product.color}];
    });
    showToast(`${product.name} added to cart`);
  };

  const changeQty = (idx, delta) => {
    setCart(prev => {
      const next = [...prev];
      next[idx].qty += delta;
      if (next[idx].qty <= 0) next.splice(idx, 1);
      return next;
    });
  };

  const removeFromCart = (idx) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  };

  const clearCart = () => setCart([]);

  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.find(w => w.id === product.id)) {
        showToast('Already in wishlist');
        return prev;
      }
      showToast(`${product.name} added to wishlist`);
      return [...prev, product];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, wishlist, cartCount, addToCart, changeQty, removeFromCart, clearCart, addToWishlist, toast, showToast }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);