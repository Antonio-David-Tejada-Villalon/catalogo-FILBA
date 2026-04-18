"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Download, Info, Send } from 'lucide-react';
import { CartItem } from '@/hooks/useCart';

interface CheckoutOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onExport: (type: 'excel' | 'pdf') => void;
}

export const CheckoutOptionsModal = ({ isOpen, onClose, items, onExport }: CheckoutOptionsModalProps) => {
  const handleEmailDirect = () => {
    const email = "direccionbpsj@gmail.com";
    const subject = "Solicitud de Presupuesto - Mi Librería";

    let body = "Hola, me gustaría solicitar un presupuesto para los siguientes libros:\n\n";
    items.forEach(item => {
      body += `- ${item.cantidad}x ${item.titulo} (${item.autor}) - [${item.editorial}]\n`;
    });
    body += "\nEspero su respuesta. Gracias.";

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-background/80 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl z-[110] overflow-hidden"
          >
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-apple-blue rounded-2xl text-white">
                    <Send size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Enviar Solicitud</h2>
                    <p className="text-sm text-foreground/50">Elige cómo prefieres enviarlo</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={handleEmailDirect}
                  className="p-6 glass hover:bg-apple-blue/10 hover:border-apple-blue/30 transition-all rounded-3xl flex items-start gap-4 text-left group"
                >
                  <div className="p-3 bg-apple-blue/10 text-apple-blue rounded-xl group-hover:bg-apple-blue group-hover:text-white transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Abrir App de Correo</h4>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      Genera un email automáticamente con la lista escrita. Ideal para móviles.
                    </p>
                  </div>
                </button>

                <div className="relative">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-white/5" />
                  <span className="relative z-10 mx-auto px-4 bg-background/0 text-[10px] uppercase tracking-widest text-foreground/20 font-bold flex justify-center">O descargar archivo</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => onExport('pdf')}
                    className="p-4 glass hover:bg-white/5 transition-all rounded-2xl flex flex-col items-center gap-2 text-center group"
                  >
                    <Download size={20} className="text-foreground/40 group-hover:text-foreground transition-colors" />
                    <span className="text-sm font-bold text-foreground/60 group-hover:text-foreground">PDF</span>
                  </button>
                  <button
                    onClick={() => onExport('excel')}
                    className="p-4 glass hover:bg-white/5 transition-all rounded-2xl flex flex-col items-center gap-2 text-center group"
                  >
                    <Download size={20} className="text-foreground/40 group-hover:text-foreground transition-colors" />
                    <span className="text-sm font-bold text-foreground/60 group-hover:text-foreground">Excel</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-black/5 dark:bg-white/5 rounded-2xl flex gap-3">
                <Info size={20} className="text-apple-blue flex-shrink-0" />
                <p className="text-xs text-foreground/60 leading-relaxed">
                  Recuerda enviar el correo a <span className="text-apple-blue font-bold">direccionbpsj@gmail.com</span> para que podamos procesar tu solicitud.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
