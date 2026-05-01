'use client';
import { useCart } from '@/context/CartContext';

export default function CartToast() {
  const { toast } = useCart();
  return <div className={`cart-toast ${toast ? 'show' : ''}`}>{toast && `✓  ${toast}`}</div>;
}