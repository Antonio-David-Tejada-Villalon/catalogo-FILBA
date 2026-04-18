"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Libro } from '@/lib/dataService';
import { cn } from '@/lib/utils';

interface LibroCardProps {
  libro: Libro;
  onAdd: (libro: Libro, cantidad: number) => void;
  onShowDetails: (libro: Libro) => void;
}

export const LibroCard = ({ libro, onAdd, onShowDetails }: LibroCardProps) => {
  const [cantidad, setCantidad] = useState(1);

  const imagenUrl = !libro.imagen_url || libro.imagen_url === "NO_ENCONTRADO" 
    ? "https://images.unsplash.com/photo-1543005157-8651ce74c0ef?q=80&w=1000&auto=format&fit=crop"
    : libro.imagen_url;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-3xl overflow-hidden group border border-white/20 dark:border-white/10"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={imagenUrl}
          alt={libro.titulo}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <button
            onClick={() => onShowDetails(libro)}
            className="w-full py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/30 transition-colors"
          >
            <Info size={16} />
            Ver Detalles
          </button>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-apple-blue transition-colors">
            {libro.titulo}
          </h3>
          <p className="text-sm text-foreground/60">{libro.autor}</p>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-full p-1">
            <button
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-medium">{cantidad}</span>
            <button
              onClick={() => setCantidad(cantidad + 1)}
              className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          
          <button
            onClick={() => onAdd(libro, cantidad)}
            className="flex-1 bg-foreground text-background py-2 rounded-full text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <ShoppingCart size={16} />
            Agregar
          </button>
        </div>
      </div>
    </motion.div>
  );
};
