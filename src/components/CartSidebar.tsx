"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem } from '@/hooks/useCart';
import Image from 'next/image';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, catidad: number) => void;
  onCheckout: () => void;
}

export const CartSidebar = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQuantity,
  onCheckout
}: CartSidebarProps) => {
  // Total calculation removed as prices are no longer displayed

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background/90 backdrop-blur-2xl border-l border-white/20 z-[90] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-apple-blue rounded-xl text-white">
                  <ShoppingBag size={20} />
                </div>
                <h2 className="text-xl font-bold">Resumen de Pedido</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-foreground/40 space-y-4">
                  <ShoppingBag size={48} />
                  <p className="text-lg">Tu carrito está vacío</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-4 p-4 glass rounded-2xl relative group"
                  >
                    <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.imagen_url}
                        alt={item.titulo}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-sm line-clamp-2">{item.titulo}</h4>
                        <p className="text-xs text-foreground/50">{item.autor}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-full px-2 py-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.cantidad - 1)}
                            className="p-1"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs font-bold">{item.cantidad}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}
                            className="p-1"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onRemove(item.id)}
                      className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Trash2 size={12} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 glass-dark rounded-t-[2rem] space-y-4">
                <div className="text-sm text-foreground/60 text-center pb-2">
                  Se generará una lista detallada para que solicites tu presupuesto vía email.
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full py-4 bg-apple-blue hover:bg-apple-blue/90 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-apple-blue/20"
                >
                  Continuar Solicitud
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
