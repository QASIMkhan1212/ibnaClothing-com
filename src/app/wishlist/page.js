'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useCart();
  return (
    <div>
      <div className="page-hero"><h1>Wishlist</h1><p>{wishlist.length} saved items</p></div>
      <div className="breadcrumb"><Link href="/"><span>Home</span></Link><span className="sep">/</span><span>Wishlist</span></div>
      <div style={{padding:'32px 40px 60px'}}>
        {wishlist.length === 0 ? (
          <div className="empty-cart">
            <h2>Your wishlist is empty</h2>
            <p>Save items you love for later.</p>
            <Link href="/shop" className="empty-cart-btn">Shop Now</Link>
          </div>
        ) : (
          <div className="prod-grid" style={{padding:0}}>
            {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}