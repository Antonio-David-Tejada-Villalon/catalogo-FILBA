"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, BookOpen, ArrowRight, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Libro, getLibros } from '@/lib/dataService';
import { useCart } from '@/hooks/useCart';
import { LibroCard } from '@/components/LibroCard';
import { BookDetailModal } from '@/components/BookDetailModal';
import { CartSidebar } from '@/components/CartSidebar';
import { ExportModal } from '@/components/ExportModal';
import { HelpModal } from '@/components/HelpModal';
import { CheckoutOptionsModal } from '@/components/CheckoutOptionsModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { exportToExcel, exportToPDF } from '@/lib/exportUtils';
import Image from 'next/image';

export default function CatalogPage() {
  const [books, setBooks] = useState<Libro[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<Libro | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCheckoutOptionsOpen, setIsCheckoutOptionsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    isSidebarOpen,
    setIsSidebarOpen
  } = useCart();

  useEffect(() => {
    setBooks(getLibros());
  }, []);

  const filteredBooks = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return books.filter(book => 
      book.titulo.toLowerCase().includes(term) ||
      book.autor.toLowerCase().includes(term) ||
      book.descripcion.toLowerCase().includes(term)
    );
  }, [books, searchTerm]);

  // Reset to page 1 searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBooks, currentPage]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const handleShowDetails = (book: Libro) => {
    setSelectedBook(book);
    setIsDetailOpen(true);
  };

  const handleExport = async (fileName: string, type: 'excel' | 'pdf') => {
    if (type === 'excel') {
      await exportToExcel(cart, fileName);
    } else {
      await exportToPDF(cart, fileName);
    }
    setIsExportOpen(false);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="min-h-screen bg-background selection:bg-apple-blue selection:text-white">
      {/* Navigation / Header */}
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 overflow-hidden rounded-xl">
              <Image 
                src="/logo.png" 
                alt="Logo Librería Reyna Domínguez" 
                fill 
                priority
                sizes="48px"
                className="object-contain"
              />
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight hidden sm:block">
                Librería <span className="text-apple-blue font-black">Reyna Domínguez</span>
            </h1>
          </div>

          <div className="flex-1 max-w-lg mx-6 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-apple-blue transition-colors" size={20} />
            <input
              type="text"
              placeholder="Buscar por título, autor o palabras clave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-black/5 dark:bg-white/5 border border-transparent focus:border-apple-blue/50 focus:bg-background rounded-full outline-none transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="relative p-3 glass rounded-2xl hover:bg-apple-blue/10 hover:border-apple-blue/30 transition-all group"
            >
                <ShoppingBag size={24} className="group-hover:scale-110 transition-transform text-apple-blue" />
                {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-apple-blue text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg border-2 border-background">
                    {cartCount}
                </span>
                )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Explorar Catálogo</h2>
            <p className="text-lg text-foreground/60">Descubre historias increíbles entre nuestros {books.length}+ títulos.</p>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="px-4 py-2 bg-apple-blue/10 text-apple-blue rounded-full">
              {filteredBooks.length} resultados
            </span>
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <>
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence mode='popLayout'>
                {paginatedBooks.map((book) => (
                  <LibroCard 
                    key={book.id} 
                    libro={book} 
                    onAdd={addToCart} 
                    onShowDetails={handleShowDetails} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex flex-col items-center gap-6">
                <div className="flex items-center gap-2 p-2 glass rounded-[2rem]">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-3 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent rounded-full transition-all"
                  >
                    <ArrowRight className="rotate-180" size={20} />
                  </button>
                  
                  <div className="flex items-center px-4 gap-1">
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      // Only show first, last, and pages around current
                      if (
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={cn(
                              "w-10 h-10 rounded-full text-sm font-bold transition-all",
                              currentPage === page 
                                ? "bg-apple-blue text-white shadow-lg shadow-apple-blue/30 scale-110" 
                                : "hover:bg-black/5 dark:hover:bg-white/5"
                            )}
                          >
                            {page}
                          </button>
                        );
                      }
                      if (page === 2 || page === totalPages - 1) {
                        return <span key={page} className="px-1 opacity-30">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-3 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent rounded-full transition-all"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
                <p className="text-sm text-foreground/40 font-medium">
                  Página {currentPage} de {totalPages}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="py-32 text-center space-y-4">
            <div className="inline-flex p-6 rounded-[2.5rem] bg-black/5 dark:bg-white/5 text-foreground/20">
              <Search size={48} />
            </div>
            <h3 className="text-2xl font-bold">No encontramos lo que buscas</h3>
            <p className="text-foreground/60">Prueba con otras palabras clave o busca un autor diferente.</p>
          </div>
        )}
      </main>

      {/* Modals & Sidebar */}
      <BookDetailModal 
        libro={selectedBook} 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
      />
      
      <CartSidebar 
        items={cart} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onRemove={removeFromCart} 
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
            setIsSidebarOpen(false);
            setIsCheckoutOptionsOpen(true);
        }}
      />

      <CheckoutOptionsModal
        isOpen={isCheckoutOptionsOpen}
        onClose={() => setIsCheckoutOptionsOpen(false)}
        items={cart}
        onExport={(type) => handleExport('Solicitud_Presupuesto', type)}
      />

      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
      />

      <ExportModal 
        isOpen={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
        onExport={handleExport} 
      />

      {/* Floating Help Button */}
      <button
        onClick={() => setIsHelpOpen(true)}
        className="fixed bottom-8 right-8 p-4 bg-apple-blue text-white rounded-2xl shadow-2xl shadow-apple-blue/40 hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <HelpCircle size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-4 px-3 py-1 bg-background/80 backdrop-blur-md border border-white/20 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          ¿Necesitas ayuda?
        </span>
      </button>
    </div>
  );
}
