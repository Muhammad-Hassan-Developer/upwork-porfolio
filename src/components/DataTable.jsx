import React from 'react';

function DataTable({ title, headers, rows }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      {/* Table Header / Title */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
        <h3 className="font-semibold text-white">{title}</h3>
        <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md font-mono">
          {rows.length} Records Found
        </span>
      </div>

      {/* Actual Data Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
            <tr>
              {headers.map((head, i) => (
                <th key={i} className="px-6 py-4 font-semibold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-slate-800/30 transition-colors">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 font-mono text-xs">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;