import React from 'react';
import { HeroBanner } from './HeroBanner';
import { CategoryHighlights } from './CategoryHighlights';
import { DealsSection } from './DealsSection';
import { BestSellers } from './BestSellers';
import { RecentlyViewed } from './RecentlyViewed';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-10">
      <HeroBanner />
      <CategoryHighlights />
      <DealsSection />
      <BestSellers />
      <RecentlyViewed />
    </div>
  );
};
