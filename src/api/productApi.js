import { PRODUCTS_DB } from '../data/productsData';

/**
 * Returns products from the robust 30-item local dataset.
 * Instantly serves pre-validated, direct-linking image URLs to completely
 * eliminate fallback "DENIM" placeholders.
 */
export const fetchProducts = async (filters = {}) => {
  let results = [...PRODUCTS_DB];

  // Apply filters seamlessly
  if (filters.brands && filters.brands.length > 0) {
    results = results.filter(p => filters.brands.includes(p.brand));
  }
  
  if (filters.fits && filters.fits.length > 0) {
    results = results.filter(p => filters.fits.includes(p.fit));
  }

  if (filters.sizes && filters.sizes.length > 0) {
    results = results.filter(p => 
      p.availableSizes.some(size => filters.sizes.includes(size))
    );
  }

  if (filters.category) {
    results = results.filter(p => p.category === filters.category);
  }

  return results;
};
