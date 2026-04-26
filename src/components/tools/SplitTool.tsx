import React, { useState } from 'react';
import { FileUploader } from '../FileUploader';
import { SuccessState } from './SuccessState';
import { splitPDF } from '@/lib/pdf';
import { downloadFile } from '@/lib/utils';
import { Loader2, Scissors } from 'lucide-react';

export const SplitTool: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [pageRange, setPageRange] = useState('');
  const [isSplitting, setIsSplitting] = useState(false);
  const [splitDocs, setSplitDocs] = useState<Uint8Array[]>([]);

  const handleSplit = async () => {
    if (files.length === 0 || !pageRange) return;
    setIsSplitting(true);
    try {
      const data = await splitPDF(files[0], pageRange);
      setSplitDocs(data);
    } catch (error) {
      console.error('Split failed:', error);
      alert('Failed to split PDF. Please check the page range (e.g., "1-3, 5").');
    } finally {
      setIsSplitting(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setPageRange('');
    setSplitDocs([]);
  };

  if (splitDocs.length > 0) {
    return (
      <SuccessState 
        onReset={handleReset} 
        data={splitDocs[0]} 
        fileName={`split_part_1.pdf`}
        message={`Successfully split your PDF into ${splitDocs.length} parts.`}
        details={
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Your files are ready. If multiple files were generated, they have been downloaded individually.</p>
            {splitDocs.length > 1 && (
              <button 
                onClick={() => {
                  splitDocs.forEach((doc, i) => downloadFile(doc, `split_part_${i+1}.pdf`, 'application/pdf'))
                }}
                className="text-red-600 font-bold text-xs uppercase tracking-widest hover:underline"
              >
                Download all parts again
              </button>
            )}
          </div>
        }
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Select File</h3>
            <p className="text-sm font-bold text-gray-400">Choose the PDF you want to split into smaller parts.</p>
          </div>
          <div className="px-4 py-2 bg-gray-50 rounded-full border border-gray-100 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${files.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {files.length > 0 ? 'File selected' : 'No file'}
            </span>
          </div>
        </div>
        
        <FileUploader 
          files={files} 
          onFilesChange={(newFiles) => setFiles(newFiles.slice(0, 1))} 
          multiple={false}
          label="Click or drag PDF here"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="space-y-4 p-8 bg-gray-50 rounded-[2rem] border border-gray-100 relative overflow-hidden group">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Page Numbers</label>
                <div className="text-[10px] font-bold text-red-600 bg-red-100/50 px-2.5 py-1 rounded-lg">Required</div>
              </div>
              <input
                type="text"
                placeholder='e.g. 1-4, 7, 12-15'
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                className="w-full px-8 py-6 bg-white border border-gray-200 rounded-2xl focus:border-red-600 outline-none transition-all placeholder:text-gray-200 font-black text-xl tracking-tight"
              />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Use commas for separate pages and dashes for ranges.</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 pt-6 border-t border-gray-50">
            <button
              onClick={handleSplit}
              disabled={!pageRange || isSplitting}
              className="group relative inline-flex items-center justify-center px-12 py-4 bg-red-600 text-white rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-100 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="relative z-10 flex items-center">
                {isSplitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Splitting...
                  </>
                ) : (
                  <>
                    <Scissors className="w-5 h-5 mr-3" />
                    Split PDF
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
