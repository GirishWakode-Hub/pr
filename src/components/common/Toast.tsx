import React from 'react';
import { usePR } from '../../context/PRContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePR();

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-container"
      className="fixed bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))] left-4 right-4 sm:left-auto sm:right-5 z-50 flex flex-col gap-2.5 sm:max-w-sm pointer-events-none"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className="pointer-events-auto bg-[#05070A] border border-white/20 text-white rounded-sm p-4 shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom-5 fade-in duration-200"
          >
            {isSuccess && <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />}
            {isWarning && <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />}
            {isError && <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />}
            {isInfo && <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />}

            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold uppercase tracking-wider text-white">{toast.title}</div>
              {toast.message && (
                <div className="text-[11px] text-white/60 mt-0.5 leading-snug font-light">{toast.message}</div>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/40 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
