import React, { useState } from 'react';
import { FileUploader } from '../FileUploader';
import { SuccessState } from './SuccessState';
import { scrubMetadata } from '@/lib/pdf';
import { Loader2, FileSearch } from 'lucide-react';

export const MetadataTool: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedData, setProcessedData] = useState<Uint8Array | null>(null);

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const data = await scrubMetadata(files[0]);
      setProcessedData(data);
    } catch (error) {
      console.error('Metadata scrub failed:', error);
      alert('Failed to scrub metadata.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setProcessedData(null);
  };

  if (processedData) {
    return (
      <SuccessState 
        onReset={handleReset} 
        data={processedData}
        fileName={`scrubbed_${files[0].name}`}
        message="Successfully removed all hidden metadata from your PDF."
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Select File</h3>
            <p className="text-sm font-bold text-gray-400">Choose the PDF you want to clean tracking data from.</p>
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
        <div className="flex flex-col items-center justify-center space-y-6 pt-6 border-t border-gray-50">
          <div className="text-center space-y-2">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Privacy Protection</p>
            <p className="text-xs text-gray-300 font-medium max-w-xs mx-auto">
              We'll remove author, software, and timestamp metadata from your file.
            </p>
          </div>

          <button
            onClick={handleProcess}
            disabled={files.length === 0 || isProcessing}
            className="group relative inline-flex items-center justify-center px-12 py-4 bg-red-600 text-white rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-100 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="relative z-10 flex items-center">
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Scrubbing...
                </>
              ) : (
                <>
                  <FileSearch className="w-5 h-5 mr-3" />
                  Remove Metadata
                </>
              )}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
