import React, { useState } from 'react';
import { FileUploader } from '../FileUploader';
import { SuccessState } from './SuccessState';
import { mergePDFs } from '@/lib/pdf';
import { downloadFile } from '@/lib/utils';
import { Loader2, Zap } from 'lucide-react';

export const MergeTool: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedData, setMergedData] = useState<Uint8Array | null>(null);

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsMerging(true);
    try {
      const data = await mergePDFs(files);
      setMergedData(data);
    } catch (error) {
      console.error('Merge failed:', error);
      alert('Failed to merge PDFs. Please ensure they are valid PDF files.');
    } finally {
      setIsMerging(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setMergedData(null);
  };

  if (mergedData) {
    return (
      <SuccessState 
        onReset={handleReset} 
        data={mergedData}
        fileName="merged_document.pdf"
        message={`Successfully merged ${files.length} PDF documents into one.`}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Select Files</h3>
            <p className="text-sm font-bold text-gray-400">Choose the PDF files you want to join together.</p>
          </div>
          <div className="px-4 py-2 bg-gray-50 rounded-full border border-gray-100 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${files.length >= 2 ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {files.length} Files Added
            </span>
          </div>
        </div>
        
        <FileUploader 
          files={files} 
          onFilesChange={setFiles} 
          label="Click or drag PDFs here"
        />
      </div>

      {files.length > 0 && (
        <div className="flex flex-col items-center justify-center space-y-6 pt-6 border-t border-gray-50">
          <div className="text-center space-y-2">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Ready to go</p>
            <p className="text-xs text-gray-300 font-medium max-w-xs mx-auto">
              {files.length < 2 
                ? "Please add at least 2 files to merge them." 
                : "Looking good! Click the button below to join your files."}
            </p>
          </div>

          <button
            onClick={handleMerge}
            disabled={files.length < 2 || isMerging}
            className="group relative inline-flex items-center justify-center px-12 py-4 bg-red-600 text-white rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-100 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="relative z-10 flex items-center">
              {isMerging ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Merging...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-3 fill-white" />
                  Merge PDFs
                </>
              )}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
