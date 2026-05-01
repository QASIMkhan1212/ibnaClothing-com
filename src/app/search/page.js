'use client';
import { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const results = q ? PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.cat.toLowerCase().includes(q.toLowerCase()) ||
    p.desc.toLowerCase().includes(q.toLowerCase())
  ) : [];

  return (
    <div>
      <div className="search-wrap">
        <h1 style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:32,fontWeight:700,letterSpacing:3,textTransform:'uppercase',marginBottom:20}}>Search</h1>
        <div className="search-box">
          <input className="search-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." autoFocus />
          <button className="search-btn">⌕</button>
        </div>
        <div className="search-tags">
          {['polo','shirt','tee','denim','navy'].map(t => (
            <span key={t} className="search-tag" onClick={() => setQ(t)}>{t}</span>
          ))}
        </div>
      </div>
      {q && (
        <div className="search-results-sec">
          {results.length === 0 ? (
            <div style={{textAlign:'center',padding:40,color:'var(--gray-mid)'}}>No products found for "{q}"</div>
          ) : (
            <div className="prod-grid" style={{padding:0}}>
              {results.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}