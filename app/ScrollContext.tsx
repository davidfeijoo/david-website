'use client';

import React, { createContext, useContext, useState } from 'react';

interface ScrollContextType {
  isContactActive: boolean;
  setIsContactActive: (active: boolean) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [isContactActive, setIsContactActive] = useState(false);

  return (
    <ScrollContext.Provider value={{ isContactActive, setIsContactActive }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
}
