import React, { useState, useEffect } from 'react';
import './DynamicImage.css';

const DynamicImage = ({ primaryUrl, secondaryUrl, altText }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // We determine which URL to show
  const currentUrl = isHovered && secondaryUrl && !hasError ? secondaryUrl : primaryUrl;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [currentUrl]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div 
      className="dynamic-image-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Skeleton Loader */}
      {isLoading && !hasError && (
        <div className="image-skeleton"></div>
      )}

      {/* Error / Fallback State */}
      {hasError && (
        <div className="image-fallback">
          <svg className="denim-texture-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="var(--color-slate-dark)"/>
            <path d="M20 20L80 80M80 20L20 80" stroke="var(--color-denim-indigo)" strokeWidth="2" opacity="0.3"/>
            <text x="50" y="55" fill="var(--color-white)" fontSize="12" textAnchor="middle" opacity="0.8">DENIM</text>
          </svg>
        </div>
      )}

      {/* Actual Image stream */}
      {!hasError && (
        <img 
          src={currentUrl} 
          alt={altText} 
          className={`dynamic-img ${isLoading ? 'hidden' : 'visible'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default DynamicImage;
