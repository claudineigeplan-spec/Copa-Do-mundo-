import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const getStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-emerald-950/90 border-emerald-500/30',
          text: 'text-emerald-200',
          icon: <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
        };
      case 'error':
        return {
          bg: 'bg-red-950/90 border-red-500/30',
          text: 'text-red-200',
          icon: <AlertTriangle className="text-red-400 shrink-0" size={18} />
        };
      default:
        return {
          bg: 'bg-blue-950/90 border-blue-500/30',
          text: 'text-blue-200',
          icon: <Info className="text-blue-400 shrink-0" size={18} />
        };
    }
  };

  const style = getStyle();

  return (
    <div 
      className={`flex items-center justify-between p-3.5 rounded-xl border ${style.bg} backdrop-blur-md shadow-lg transition-all duration-300 transform translate-y-0 scale-100 max-w-sm w-80 animate-fade-in-up`}
      style={{ boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.47)' }}
    >
      <div className="flex items-center space-x-2.5">
        {style.icon}
        <span className={`text-xs font-semibold tracking-wide ${style.text}`}>{toast.message}</span>
      </div>
      <button 
        onClick={() => onClose(toast.id)}
        className="text-white/40 hover:text-white transition-colors duration-150 p-1 rounded-lg"
      >
        <X size={14} />
      </button>
    </div>
  );
};
