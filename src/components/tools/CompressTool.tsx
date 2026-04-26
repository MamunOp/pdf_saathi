import React, { useState } from 'react';
import { FileUploader } from '../FileUploader';
import { SuccessState } from './SuccessState';
import { compressPDF } from '@/lib/pdf';
import { downloadFile } from '@/lib/utils';
import { Loader2, Zap, Share2, Download } from 'lucide-react';

export const CompressTool: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ originalSize: number, compressedSize: number } | null>(null);
  const [compressedData, setCompressedData] = useState<Uint8Array | null>(null);

  const handleCompress = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setResult(null);
    try {
      const data = await compressPDF(files[0]);
      setCompressedData(data);
      setResult({
        originalSize: files[0].size,
        compressedSize: data.length
      });
    } catch (error) {
      console.error('Compression failed:', error);
      alert('Failed to compress PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setResult(null);
    setCompressedData(null);
  };

  if (result && compressedData) {
    return (
      <SuccessState 
        onReset={handleReset} 
        data={compressedData}
        fileName={`compressed_${files[0].name}`}
        message="Your PDF has been significantly reduced in size while preserving visual quality."
        details={
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Before</p>
              <p className="text-lg font-bold">{(result.originalSize / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <div className="h-8 w-px bg-gray-100" />
            <div className="text-center">
              <p className="text-[10px] font-bold text-teal-500 uppercase tracking-widest mb-1">After</p>
              <p className="text-lg font-bold text-teal-600">{(result.compressedSize / 1024 / 1024).toFixed(2)} MB</p>
            </div>
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
            <p className="text-sm font-bold text-gray-400">Choose a PDF to make its file size smaller.</p>
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
          onFilesChange={(newFiles) => {
            setFiles(newFiles.slice(0, 1));
            setResult(null);
            setCompressedData(null);
          }} 
          multiple={false}
          label="Click or drag PDF here"
        />
      </div>

      {files.length > 0 && !result && (
        <div className="flex flex-col items-center justify-center space-y-6 pt-6 border-t border-gray-50 animate-in fade-in slide-in-from-top-8 duration-700">
           <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 w-full max-w-sm space-y-4">
              <p className="text-xs font-bold text-gray-500 text-center leading-relaxed">
                We'll reduce the file size as much as possible while keeping the quality high.
              </p>
           </div>

          <button
            onClick={handleCompress}
            disabled={isProcessing}
            className="group relative inline-flex items-center justify-center px-12 py-4 bg-red-600 text-white rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-100 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="relative z-10 flex items-center">
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Compressing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-3 fill-white" />
                  Compress PDF
                </>
              )}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

