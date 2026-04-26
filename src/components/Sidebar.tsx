import React from 'react';
import { 
  FileText,
  Home,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PDF_TOOLS, ToolID } from '@/constants/tools';

interface SidebarProps {
  activeTool: ToolID | 'home';
  onToolChange: (id: ToolID | 'home') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTool, onToolChange }) => {
  return (
    <div className="w-full lg:w-64 bg-white flex flex-col h-full">
      {/* Sidebar Header */}
      <div 
        className="px-6 pt-8 pb-10 flex items-center space-x-2.5 cursor-pointer group"
        onClick={() => onToolChange('home')}
      >
        <div className="bg-gray-900 p-1.5 rounded-lg group-hover:bg-red-600 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-gray-100">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col -space-y-1">
          <h1 className="text-lg font-black tracking-tighter uppercase text-gray-900">Saathi</h1>
          <span className="text-[8px] font-black tracking-[0.3em] text-red-600 uppercase">Toolkit</span>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        <button
          onClick={() => onToolChange('home')}
          className={cn(
            "w-full flex items-center group px-4 py-3 rounded-xl transition-all duration-300 active:scale-95",
            activeTool === 'home' 
              ? "bg-gray-50 text-gray-900 font-bold" 
              : "text-gray-400 hover:text-gray-900 font-medium"
          )}
        >
          <Home className={cn(
            "w-4 h-4 mr-3 transition-colors",
            activeTool === 'home' ? "text-red-600" : "text-gray-300 group-hover:text-gray-400"
          )} />
          <span className="text-[13px]">Home</span>
        </button>

        <div className="pt-6 pb-2">
          <div className="flex items-center space-x-2 px-4 mb-4">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-300">Instruments</span>
            <div className="h-px bg-gray-100 flex-1" />
          </div>
          
          <div className="space-y-1">
            {PDF_TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onToolChange(tool.id)}
                className={cn(
                  "w-full flex items-center group px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95",
                  activeTool === tool.id 
                    ? "bg-gray-900 text-white font-bold shadow-xl shadow-gray-300" 
                    : "text-gray-500 hover:bg-gray-50/80 font-medium"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-lg mr-3 transition-all duration-500",
                  activeTool === tool.id ? tool.color : "bg-gray-50 group-hover:bg-white group-hover:shadow-sm"
                )}>
                  <tool.icon className={cn(
                    "w-3.5 h-3.5",
                    activeTool === tool.id ? "text-white" : "text-gray-400 group-hover:text-red-500"
                  )} />
                </div>
                <span className="flex-1 text-left text-[12px] truncate tracking-tight">
                  {tool.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-3">
        <div className="bg-gray-50/80 p-4 rounded-[1.5rem] border border-gray-100 space-y-3">
           <div className="flex items-center space-x-2">
             <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-3 h-3 text-green-600" />
             </div>
             <div className="flex flex-col -space-y-1">
                <span className="text-[9px] font-black text-gray-900">Secure Node</span>
                <span className="text-[8px] font-medium text-gray-500 uppercase tracking-widest leading-none">v2.4 Ready</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};


