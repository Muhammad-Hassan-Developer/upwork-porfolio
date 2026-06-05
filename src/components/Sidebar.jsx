import React from 'react';
import { MessageSquare, Users, Terminal, BarChart2, FileText, LogOut } from 'lucide-react';

function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: 'chatbot', name: 'AI Chatbot Center', icon: MessageSquare },
    { id: 'leads', name: 'Lead Gen System', icon: Users },
    { id: 'jarvis', name: 'Jarvis OS Agent', icon: Terminal },
    { id: 'mlflow', name: 'MLflow Analytics', icon: BarChart2 },
    { id: 'cvanalyser', name: 'CV Analyser', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 font-sans">
      <div className="p-6">
        {/* Profile/Brand Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20">
            H
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-wide text-white">HASSAN'S AI</h2>
            <p className="text-xs text-blue-400 font-medium">Production Portfolio</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Inside Sidebar */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800/50 hover:text-red-400 transition-all duration-200"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;