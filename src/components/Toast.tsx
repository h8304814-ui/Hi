import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-auto z-50 sm:max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl shadow-2xl border text-xs font-medium ${
          toast.type === 'success'
            ? 'bg-stone-900 text-stone-100 border-stone-700'
            : toast.type === 'error'
            ? 'bg-rose-950 text-rose-100 border-rose-800'
            : 'bg-stone-900 text-stone-100 border-stone-700'
        }`}
      >
        {toast.type === 'success' && (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        )}
        {toast.type === 'error' && (
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
        )}
        {toast.type === 'info' && (
          <Info className="w-5 h-5 text-[#C5A059] shrink-0" />
        )}

        <span className="flex-1 leading-snug">{toast.message}</span>
      </div>
    </div>
  );
};
