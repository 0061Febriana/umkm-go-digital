"use client";

import { useState, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastEventDetail {
  message: string;
  type: ToastType;
}

export const showToast = (message: string, type: ToastType = 'info') => {
  const event = new CustomEvent<ToastEventDetail>('show-toast', { detail: { message, type } });
  window.dispatchEvent(event);
};

export default function Toast() {
  const [toasts, setToasts] = useState<(ToastEventDetail & { id: number })[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastEventDetail>;
      const id = Date.now() + Math.random();
      setToasts(prev => [...prev, { ...customEvent.detail, id }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 3000);
    };

    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '24px', 
      right: '24px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '12px', 
      zIndex: 9999 
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type === 'success' ? '#2E7D32' : t.type === 'error' ? '#D32F2F' : '#333',
          color: 'white', 
          padding: '14px 24px', 
          borderRadius: '8px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontWeight: 600, 
          fontSize: '0.95rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeInUp 0.3s ease'
        }}>
          {t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : 'ℹ️'} {t.message}
        </div>
      ))}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
