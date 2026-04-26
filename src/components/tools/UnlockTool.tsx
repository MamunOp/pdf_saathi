import React, { useState } from 'react';
import { FileUploader } from '../FileUploader';
import { SuccessState } from './SuccessState';
import { unlockPDF } from '@/lib/pdf';
import { Loader2, Unlock, Lock } from 'lucide-react';

export const UnlockTool: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedData, setProcessedData] = useState<Uint8Array | null>(null);

  const handleProcess = async () => {
    if (files.length === 0 || !password) return;
    setIsProcessing(true);
    try {
      const data = await unlockPDF(files[0], password);
      setProcessedData(data);
    } catch (error) {
      console.error('Unlock failed:', error);
      alert('Failed to unlock PDF. Please check the password.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setProcessedData(null);
    setPassword('');
  };

  if (processedData) {
    return (
      <SuccessState 
        onReset={handleReset} 
        data={processedData}
        fileName={`unlocked_${files[0].name}`}
        message="Successfully removed password protection from your PDF."
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Select File</h3>
            <p className="text-sm font-bold text-gray-400">Choose the locked PDF you want to access.</p>
          </div>
          <div className="px-4 py-2 bg-gray-50 rounded-full border border-gray-100 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${files.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {files.length > 0 ? 'File selected' : 'Ready'}
            </span>
          </div>
        </div>
        
        <FileUploader 
          files={files} 
          onFilesChange={setFiles} 
          multiple={false}
          label="Click or drag PDF here"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="space-y-4 p-8 bg-gray-50 rounded-[2rem] border border-gray-100 relative overflow-hidden group">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Document Password</label>
                <div className="text-[10px] font-bold text-red-600 bg-red-100/50 px-2.5 py-1 rounded-lg">Required</div>
              </div>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full pl-16 pr-8 py-6 bg-white border border-gray-100 rounded-2xl font-black text-xl tracking-tight focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 pt-6 border-t border-gray-50">
            <button
              onClick={handleProcess}
              disabled={files.length === 0 || !password || isProcessing}
              className="group relative inline-flex items-center justify-center px-12 py-4 bg-red-600 text-white rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-100 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="relative z-10 flex items-center">
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Unlocking...
                  </>
                ) : (
                  <>
                    <Unlock className="w-5 h-5 mr-3" />
                    Unlock PDF
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
