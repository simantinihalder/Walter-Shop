import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FilterPanel.css';

const BRANDS = ['Walter Signature', "Levi's", 'Gap', 'Mango', 'H&M', 'Premium Imported'];
const WOMEN_FITS = ['High-Rise', 'Mid-Rise', 'Bootcut', 'Flared', 'Relaxed Fit', 'Wide-Leg'];
const MEN_FITS = ['Slim Fit', 'Relaxed Fit', 'Straight Cut', 'Tapered', 'Bootcut'];
const SIZES = [24, 26, 28, 30, 32, 34, 36];

const FilterSection = ({ title, options, type, isGrid = false, activeFilters, onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="filter-section">
      <button 
        className="filter-section-header" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isOpen && (
        <div className={`filter-options ${isGrid ? 'grid-options' : 'list-options'}`}>
          {options.map((option) => {
            const isActive = activeFilters.includes(option);
            return (
              <button
                key={option}
                className={`filter-btn ${isActive ? 'active' : ''}`}
                onClick={() => onToggle(type, option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const FilterPanel = ({ filters, setFilters }) => {
  const handleToggle = (type, value) => {
    setFilters(prev => {
      const currentList = prev[type];
      const newList = currentList.includes(value)
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
      
      return { ...prev, [type]: newList };
    });
  };

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h2>Filters</h2>
        <button 
          className="clear-filters-btn"
          onClick={() => setFilters({ brands: [], fits: [], sizes: [] })}
        >
          Clear All
        </button>
      </div>

      <FilterSection 
        title="Brands" 
        options={BRANDS} 
        type="brands"
        activeFilters={filters.brands}
        onToggle={handleToggle}
      />
      
      <FilterSection 
        title="Women's Fits" 
        options={WOMEN_FITS} 
        type="fits"
        activeFilters={filters.fits}
        onToggle={handleToggle}
      />

      <FilterSection 
        title="Men's Fits" 
        options={MEN_FITS} 
        type="fits"
        activeFilters={filters.fits}
        onToggle={handleToggle}
      />

      <FilterSection 
        title="Size" 
        options={SIZES} 
        type="sizes"
        isGrid={true}
        activeFilters={filters.sizes}
        onToggle={handleToggle}
      />
    </div>
  );
};

export default FilterPanel;
