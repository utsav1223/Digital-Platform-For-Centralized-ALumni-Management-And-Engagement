import React from 'react';

export default function FilterPill({ label, value, activeValue, onClick, colorClass = "bg-slate-900 border-slate-900" }) {
  const isActive = activeValue === value;
  return (
    <button
      onClick={() => onClick(value)}
      className={`
        px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all duration-300
        ${isActive 
          ? `${colorClass} text-white shadow-md transform scale-105` 
          : 'bg-white text-slate-500 border-slate-200 shadow-sm hover:border-slate-300'
        }
      `}
    >
      {label}
    </button>
  );
}