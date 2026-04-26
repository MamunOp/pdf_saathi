import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Download, RefreshCw } from 'lucide-react';
import { downloadFile } from '@/lib/utils';

interface SuccessStateProps {
  onReset: () => void;
  data: Uint8Array | null;
  fileName: string;
  mimeType?: string;
  message?: string;
  details?: React.ReactNode;
}

export const SuccessState: React.FC<SuccessStateProps> = ({ 
  onReset, 
  data, 
  fileName, 
  mimeType = 'application/pdf',
  message = "File processed successfully!",
  details
}) => {
  useEffect(() => {
    // Attempt download on mount
    let timer: any;
    if (data) {
      timer = setTimeout(() => {
        try {
          downloadFile(data, fileName, mimeType);
        } catch (e) {
          console.error('Auto download failed', e);
        }
      }, 500);
    }
    
    // Smooth scroll to the success message
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimer);
    };
  }, [data, fileName, mimeType]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="max-w-[800px] mx-auto p-6 sm:p-10 space-y-8 text-center"
    >
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-green-500 blur-[40px] opacity-10" />
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-[2rem] mx-auto flex items-center justify-center shadow-xl shadow-green-100 relative z-10 hover:scale-105 transition-transform">
          <Check className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-[1000] tracking-tighter text-gray-900 leading-tight">
            Success! <span className="text-green-600">It's ready.</span>
          </h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Process completed successfully</p>
        </div>
        <p className="text-lg text-gray-500 font-bold max-w-xl mx-auto leading-relaxed">
          {message} You can now download your file below.
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-6 sm:p-8 space-y-6">
        {details && (
          <div className="py-4 border-b border-gray-200/30 text-center">
            {details}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <button
            onClick={() => data && downloadFile(data, fileName, mimeType)}
            className="w-full sm:w-auto flex items-center justify-center space-x-3 px-10 py-5 bg-red-600 text-white rounded-2xl font-black text-lg hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-100 group"
          >
            <Download className="w-6 h-6 group-hover:translate-y-0.5 transition-transform" />
            <span>Download Now</span>
          </button>
          <button
            onClick={onReset}
            className="w-full sm:w-auto flex items-center justify-center space-x-3 px-10 py-5 bg-white text-gray-900 border border-gray-200 rounded-2xl font-black text-base hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Start New Task</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 pt-4">
        <div className="h-px w-16 bg-gray-100" />
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
          PDF SAATHI &bull; 100% PRIVATE
        </p>
      </div>
    </motion.div>
  );
};
