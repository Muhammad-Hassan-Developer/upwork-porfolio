import React from 'react';

function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {stats.map((item, index) => (
        <div key={index} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{item.label}</p>
            <h3 className="text-2xl font-bold text-white mt-2 font-mono">{item.value}</h3>
          </div>
          <div className="mt-4 flex items-center text-xs">
            <span className={`font-medium ${item.trendType === 'up' ? 'text-emerald-400' : 'text-blue-400'}`}>
              {item.trend}
            </span>
            <span className="text-slate-500 ml-2">{item.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsGrid;