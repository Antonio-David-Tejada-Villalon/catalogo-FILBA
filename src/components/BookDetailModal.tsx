"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Quote } from 'lucide-react';
import { Libro } from '@/lib/dataService';
import Image from 'next/image';

interface BookDetailModalProps {
  libro: Libro | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookDetailModal = ({ libro, isOpen, onClose }: BookDetailModalProps) => {
  if (!libro) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-background/80 backdrop-blur-xl border border-white/20 rounded-[2.5rem] shadow-2xl z-[60] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors z-[70]"
            >
              <X size={20} />
            </button>

            <div className="relative w-full md:w-2/5 aspect-[3/4] md:aspect-auto h-64 md:h-auto overflow-hidden">
              <Image
                src={libro.imagen_url}
                alt={libro.titulo}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 p-8 md:p-10 flex flex-col justify-start overflow-y-auto">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-apple-blue/10 text-apple-blue rounded-full text-xs font-semibold uppercase tracking-wider">
                  <BookOpen size={14} />
                  {libro.editorial}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  {libro.titulo}
                </h2>
                
                <p className="text-xl text-foreground/60 italic">
                   {libro.autor}
                </p>

                <div className="w-12 h-1 bg-apple-blue/30 rounded-full" />

                <div className="relative pt-4">
                  <Quote className="absolute -top-1 -left-4 opacity-10 text-apple-blue" size={48} />
                  <p className="text-lg leading-relaxed text-foreground/80">
                    {libro.descripcion}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
