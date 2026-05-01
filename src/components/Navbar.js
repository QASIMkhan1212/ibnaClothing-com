'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist } = useCart();

  const toggle = () => setOpen(!open);

  return (
    <>
      <nav>
        <div className="nav-left">
          <Link href="/shop?cat=Men">Men</Link>
          <Link href="/shop?cat=Women">Women</Link>
          <Link href="/shop?cat=New In">New In</Link>
          <Link href="/shop?cat=Sale">Sale</Link>
        </div>
        <button className={`hamburger ${open ? 'open' : ''}`} onClick={toggle} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <Link href="/" className="logo">
          <img src="/logo.png" alt="IBNA Clothing" style={{height:70}} />
        </Link>
        <div className="nav-right">
          <Link href="/search" className="desktop-only">Search</Link>
          <Link href="/account" className="desktop-only">Account</Link>
          <Link href="/wishlist" className="desktop-only">Wishlist ({wishlist.length})</Link>
          <Link href="/cart" className="nav-cart-btn">
            Cart<span className="cart-badge">{cartCount}</span>
          </Link>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <Link href="/shop?cat=Men" onClick={toggle}>Men</Link>
        <Link href="/shop?cat=Women" onClick={toggle}>Women</Link>
        <Link href="/shop?cat=New In" onClick={toggle}>New In</Link>
        <Link href="/shop?cat=Sale" onClick={toggle}>Sale</Link>
        <Link href="/search" onClick={toggle}>Search</Link>
        <Link href="/account" onClick={toggle}>Account</Link>
        <Link href="/wishlist" onClick={toggle}>Wishlist</Link>
        <Link href="/cart" onClick={toggle}>Cart</Link>
        <div className="mobile-menu-bottom">
          <a href="https://www.instagram.com/ibnaclothing.12/" target="_blank">Instagram</a>
          <a href="https://www.facebook.com/IBNAclothing.12/" target="_blank">Facebook</a>
        </div>
      </div>
    </>
  );
}