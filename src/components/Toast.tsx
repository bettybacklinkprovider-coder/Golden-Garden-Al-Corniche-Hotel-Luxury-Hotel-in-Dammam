import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  const bgColors = {
    success: 'bg-stone-900 border-amber-500 text-stone-100',
    error: 'bg-stone-900 border-red-500 text-stone-100',
    info: 'bg-stone-900 border-blue-500 text-stone-100',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-slide-up">
      <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-2xl ${bgColors[toast.type]}`}>
        {icons[toast.type]}
        <p className="text-xs sm:text-sm font-medium leading-relaxed flex-1">{toast.message}</p>
        <button onClick={onClose} className="p-1 hover:bg-stone-800 rounded-md text-stone-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
