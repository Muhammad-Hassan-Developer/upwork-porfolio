import React from 'react';

function TitleBox({ title, subtitle }) {
  return (
    <div className="mb-6 flex justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white capitalize">
          {title}
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          {subtitle}
        </p>
      </div>
      {/* Live Server Indicator */}
      <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-emerald-400">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        AGENT STATE: ACTIVE
      </div>
    </div>
  );
}

export default TitleBox;