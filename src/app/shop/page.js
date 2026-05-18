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

  const filtered = useMemo(() => {
    let r = [...PRODUCTS].filter(p => {
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
    <div className="shop-page">
      <div className="page-hero">
        <h1>{cat === 'All' ? 'Collection' : cat}</h1>
        <p>Premium quality menswear crafted in Pakistan</p>
      </div>

      <div className="shop-container">
        <div className="shop-toolbar">
          <div className="toolbar-left">
            <div className="breadcrumb-inline">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span>Shop</span>
            </div>
            <div className="shop-count">{filtered.length} Items</div>
          </div>

          <div className="toolbar-right">
            <div className="filter-group-inline">
              <select value={cat} onChange={(e) => setCat(e.target.value)} className="shop-select">
                <option value="All">All Categories</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Polo">Polo</option>
                <option value="Shirts">Shirts</option>
                <option value="Denim">Denim</option>
              </select>

              <select value={price} onChange={(e) => setPrice(e.target.value)} className="shop-select">
                <option value="all">All Prices</option>
                <option value="under2500">Under PKR 2,500</option>
                <option value="2500to3500">PKR 2,500 – 3,500</option>
                <option value="above3500">Above PKR 3,500</option>
              </select>

              <select value={sort} onChange={(e) => setSort(e.target.value)} className="shop-select">
                <option value="default">Sort By: Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>

              {(cat !== 'All' || price !== 'all' || sort !== 'default') && (
                <button className="clear-link" onClick={() => { setCat('All'); setPrice('all'); setSort('default'); }}>
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="shop-grid-main">
          {filtered.length > 0 ? (
            <div className="shop-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="no-results">
              <p>No products match your filters.</p>
              <button className="btn-outline" onClick={() => { setCat('All'); setPrice('all'); setSort('default'); }}>Clear All Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
