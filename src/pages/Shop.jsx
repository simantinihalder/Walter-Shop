import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterPanel from '../components/ui/FilterPanel';
import ProductGrid from '../components/ui/ProductGrid';
import { fetchProducts } from '../api/productApi';
import './Shop.css';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState([]);
  
  // State for interactive filters
  const [filters, setFilters] = useState({
    brands: [],
    fits: [],
    sizes: [],
    category: categoryParam || null
  });

  // Ensure category changes from the URL are reflected instantly
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: categoryParam || null
    }));
  }, [categoryParam]);

  // Load products synchronously (no loading spinner required for instant local DB)
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts(filters);
      setProducts(data);
    };
    
    loadProducts();
  }, [filters]);

  return (
    <div className="shop-page container">
      <div className="shop-header">
        <h1 className="shop-title">
          {categoryParam === 'men' ? "Men's Denim" : categoryParam === 'women' ? "Women's Denim" : "Denim Collection"}
        </h1>
        <p className="shop-subtitle">Discover your perfect fit.</p>
      </div>
      
      <div className="shop-layout">
        <aside className="shop-sidebar">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </aside>
        
        <main className="shop-main">
          {/* Instant render grid. Standard lazy loading handled within img tags. */}
          <ProductGrid products={products} />
        </main>
      </div>
    </div>
  );
};

export default Shop;
