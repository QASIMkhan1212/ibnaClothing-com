'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [slide, setSlide] = useState(0);
  const titles = ['Summer<br>Shirts Edit', 'New<br>Arrivals', 'Premium<br>Collection'];
  const slides = [
    'https://res.cloudinary.com/dy4yjeeib/image/upload/v1777308110/Gemini_Generated_Image_8e7da08e7da08e7d_tgbzu4.png',
    'https://res.cloudinary.com/dy4yjeeib/image/upload/v1777308112/Gemini_Generated_Image_l2yu43l2yu43l2yu_vvqd3u.png',
    'https://res.cloudinary.com/dy4yjeeib/image/upload/v1777308108/Gemini_Generated_Image_3dsq8l3dsq8l3dsq_de9n1k.png',
  ];

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s+1) % 3), 5000);
    return () => clearInterval(t);
  }, []);

  const newArrivals = PRODUCTS.filter(p => p.badge === 'New').slice(0, 4);
  const mustHaves = PRODUCTS.slice(0, 4);
  const trending = PRODUCTS.filter(p => p.badge === 'Trending' || p.badge === 'New').slice(0, 4);

  return (
    <div>
      <section className="hero">
        {slides.map((src, i) => (
          <div key={i} className={`hero-slide ${i===slide?'active':''}`}>
            <img className="hero-slide-img" src={src} alt="" />
          </div>
        ))}
        <div className="hero-content">
          <p className="hero-label">Summer 2026 Collection</p>
          <h1 className="hero-title" dangerouslySetInnerHTML={{__html: titles[slide]}} />
          <Link href="/shop?cat=All" className="hero-cta">Shop Now</Link>
        </div>
        <div className="hero-dots">
          {[0,1,2].map(i => (
            <button key={i} className={`hero-dot ${i===slide?'active':''}`} onClick={() => setSlide(i)}></button>
          ))}
        </div>
      </section>

      <div className="sec-hdr">
        <div className="sec-title">New Arrivals</div>
        <Link href="/shop?cat=New In" className="view-all">View All →</Link>
      </div>
      <div className="prod-grid">
        {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      <div className="must-sec">
        <div className="must-hdr">
          <div>
            <div className="must-title">Must-Haves</div>
            <div className="must-sub">Thoughtfully designed everyday styles.</div>
          </div>
          <Link href="/shop?cat=All" className="view-all">View All →</Link>
        </div>
        <div className="must-grid">
          {mustHaves.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>

      <div className="trending-sec">
        <div className="sec-hdr" style={{padding:'0 0 28px'}}>
          <div className="sec-title">New &amp; Trending</div>
          <Link href="/shop?cat=New In" className="view-all">View All →</Link>
        </div>
        <div className="prod-grid">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}