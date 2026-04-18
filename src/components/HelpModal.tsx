"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ShoppingBag, FileText, Mail, HelpCircle, CheckCircle2 } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  const steps = [
    {
      icon: <BookOpen className="text-apple-blue" />,
      title: "Explora el Catálogo",
      desc: "Navega por las páginas o usa el buscador para encontrar los libros que te interesan. No mostramos precios ya que trabajamos con presupuestos personalizados."
    },
    {
      icon: <ShoppingBag className="text-apple-blue" />,
      title: "Agrega a tu Pedido",
      desc: "Haz clic en 'Agregar' para sumar libros a tu lista. Puedes gestionar las cantidades desde el icono de la bolsa de compras en la parte superior."
    },
    {
      icon: <FileText className="text-apple-blue" />,
      title: "Genera la Solicitud",
      desc: "Cuando termines, haz clic en 'Continuar Solicitud'. Podrás exportar tu lista a PDF o Excel, o generar un correo directamente."
    },
    {
      icon: <Mail className="text-apple-blue" />,
      title: "Envía para Presupuesto",
      desc: "Envía tu archivo o el listado a direccionbpsj@gmail.com. Te responderemos a la brevedad con el presupuesto detallado de tu selección."
    }
  ];

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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-background/80 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl z-[110] overflow-hidden"
          >
            <div className="p-8 md:p-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-apple-blue rounded-2xl text-white">
                    <HelpCircle size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">¿Cómo hacer un pedido?</h2>
                    <p className="text-sm text-foreground/50">Guía rápida paso a paso</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-apple-blue/10 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg">{step.title}</h4>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-foreground text-background rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <CheckCircle2 size={18} />
                  ¡Entendido!
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
