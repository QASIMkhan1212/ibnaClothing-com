'use client';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

function ShopContent() {
  const params = useSearchParams();
  const initialCat = params.get('cat') || 'All';
  const [cat, setCat] = useState(['T-Shirts','Polo','Shirts','Denim'].includes(initialCat) ? initialCat : 'All');
  const [price, setPrice] = useState('all');
  const [sort, setSort] = useState('default');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let r = PRODUCTS.filter(p => {
      const catOk = cat === 'All' || p.cat === cat;
      let priceOk = true;
      if (price === 'under2500') priceOk = p.price < 2500;
      else if (price === '2500to3500') priceOk = p.price >= 2500 && p.price <= 3500;
      else if (price === 'above3500') priceOk = p.price > 3500;
      return catOk && priceOk;
    });
    if (sort === 'priceLow') r.sort((a,b) => a.price - b.price);
    else if (sort === 'priceHigh') r.sort((a,b) => b.price - a.price);
    else if (sort === 'newest') r.sort((a,b) => b.id - a.id);
    return r;
  }, [cat, price, sort]);

  return (
    <div>
      <div className="page-hero">
        <h1>{initialCat === 'All' ? 'All Products' : initialCat}</h1>
        <p>Premium quality menswear crafted in Pakistan</p>
      </div>
      <div className="breadcrumb">
        <Link href="/"><span>Home</span></Link>
        <span className="sep">/</span><span>{initialCat}</span>
      </div>
      <div className="shop-layout" style={{marginTop:24}}>
        <div className={`shop-filters ${filtersOpen?'open':''}`}>
          <div className="filter-title">Category</div>
          <div className="filter-opts">
            {['All','T-Shirts','Polo','Shirts','Denim'].map(c => (
              <label key={c} className="filter-opt">
                <input type="radio" name="cat" checked={cat===c} onChange={() => setCat(c)} /> {c}
              </label>
            ))}
          </div>
          <div className="filter-title">Price Range</div>
          <div className="filter-opts">
            {[['all','All Prices'],['under2500','Under PKR 2,500'],['2500to3500','PKR 2,500–3,500'],['above3500','Above PKR 3,500']].map(([v,l]) => (
              <label key={v} className="filter-opt">
                <input type="radio" name="price" checked={price===v} onChange={() => setPrice(v)} /> {l}
              </label>
            ))}
          </div>
          <div className="filter-title">Sort By</div>
          <div className="filter-opts">
            {[['default','Featured'],['priceLow','Price: Low to High'],['priceHigh','Price: High to Low'],['newest','Newest First']].map(([v,l]) => (
              <label key={v} className="filter-opt">
                <input type="radio" name="sort" checked={sort===v} onChange={() => setSort(v)} /> {l}
              </label>
            ))}
          </div>
          <button className="filter-btn" onClick={() => { setCat('All'); setPrice('all'); setSort('default'); }}>Clear Filters</button>
        </div>
        <div className="shop-products">
          <button className="filter-toggle-btn" onClick={() => setFiltersOpen(!filtersOpen)}>☰ Filter &amp; Sort</button>
          <div className="shop-top">
            <div className="shop-count">Showing {filtered.length} product{filtered.length===1?'':'s'}</div>
          </div>
          <div className="shop-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return <Suspense fallback={<div>Loading...</div>}><ShopContent /></Suspense>;
}