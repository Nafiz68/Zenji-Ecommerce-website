import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-[#0A0A0A] border border-white/20 text-white shadow-2xl animate-slideUp backdrop-blur-md"
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-[#BC0100] flex-shrink-0 mt-0.5" />
          ) : toast.type === 'info' ? (
            <Info className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#BC0100] flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <span className="block font-jetbrains text-[10px] font-bold tracking-widest text-[#BC0100] uppercase">
              {toast.title}
            </span>
            <p className="font-ibm text-xs text-white/90 mt-0.5 leading-snug">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
