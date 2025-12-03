import React from 'react';

export default function StatCard({ title, count, icon, colorClass }) {
  return (
    <div className="flex items-center p-4 bg-white rounded-xl border border-white shadow-lg shadow-slate-200/50">
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-bold text-slate-800">{count}</p>
      </div>
    </div>
  );
}