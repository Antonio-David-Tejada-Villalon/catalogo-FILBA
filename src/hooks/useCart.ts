"use client";

import { useState, useEffect } from 'react';
import { Libro } from '@/lib/dataService';

export interface CartItem extends Libro {
  cantidad: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (libro: Libro, cantidad: number) => {
    if (cantidad <= 0) return;
    
    setCart(prev => {
      const existing = prev.find(item => item.id === libro.id);
      if (existing) {
        return prev.map(item => 
          item.id === libro.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      }
      return [...prev, { ...libro, cantidad }];
    });
    setIsSidebarOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, cantidad: number) => {
    setCart(prev => 
      prev.map(item => item.id === id ? { ...item, cantidad } : item).filter(item => item.cantidad > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isSidebarOpen,
    setIsSidebarOpen
  };
};
