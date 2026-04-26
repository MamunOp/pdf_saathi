import React, { useState } from 'react';
import { FileUploader } from '../FileUploader';
import { SuccessState } from './SuccessState';
import { removePages } from '@/lib/pdf';
import { downloadFile } from '@/lib/utils';
import { Loader2, Trash2 } from 'lucide-react';

export const RemovePagesTool: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [pageIndices, setPageIndices] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null);

  const handleRemove = async () => {
    if (files.length === 0 || !pageIndices) return;
    setIsProcessing(true);
    try {
      // Input like "1, 2, 5"
      const indices = pageIndices.split(',')
        .map(s => parseInt(s.trim()))
        .filter(n => !isNaN(n))
        .map(n => n - 1); // 1-indexed to 0-indexed

      const data = await removePages(files[0], indices);
      setPdfData(data);
    } catch (error) {
      console.error('Removal failed:', error);
      alert('Failed to remove pages. Check your input.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setPageIndices('');
    setPdfData(null);
  };

  if (pdfData) {
    return (
      <SuccessState 
        onReset={handleReset} 
        data={pdfData}
        fileName={`cleaned_${files[0].name}`}
        message={`Successfully removed pages from the document.`}
      />
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-6">
      <FileUploader 
        files={files} 
        onFilesChange={(newFiles) => setFiles(newFiles.slice(0, 1))} 
        multiple={false}
        label="Select a PDF to modify"
      />

      {files.length > 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500 bg-white p-6 rounded-[1.8rem] border border-gray-100 shadow-sm">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pages to Remove</label>
            <input 
              type="text" 
              placeholder="e.g. 1, 3, 5" 
              value={pageIndices}
              onChange={(e) => setPageIndices(e.target.value)}
              className="w-full px-5 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-red-100 outline-none transition-all placeholder:text-gray-300 font-bold"
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleRemove}
              disabled={!pageIndices.trim() || isProcessing}
              className="inline-flex items-center justify-center px-10 py-3.5 bg-red-600 text-white rounded-xl font-black text-sm hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-100 disabled:opacity-30 disabled:hover:scale-100"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              {isProcessing ? 'Removing...' : 'Remove Pages'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
