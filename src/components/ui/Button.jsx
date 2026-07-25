import React from 'react';

const VARIANTS = {
  primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm disabled:opacity-40 disabled:cursor-not-allowed',
  ghost: 'bg-transparent border border-slate-200 text-slate-700 hover:bg-slate-50',
  dark: 'bg-slate-900 hover:bg-slate-800 text-white',
};

export default function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button
      className={`px-5 py-3 rounded-xl font-medium text-sm transition-colors ${VARIANTS[variant] || VARIANTS.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}