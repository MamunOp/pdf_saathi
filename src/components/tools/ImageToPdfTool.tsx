import React, { useState } from 'react';
import { FileUploader } from '../FileUploader';
import { SuccessState } from './SuccessState';
import { imageToPDF } from '@/lib/pdf';
import { downloadFile } from '@/lib/utils';
import { Loader2, Image as ImageIcon } from 'lucide-react';

export const ImageToPdfTool: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsConverting(true);
    try {
      const data = await imageToPDF(files);
      setPdfData(data);
    } catch (error) {
      console.error('Conversion failed:', error);
      alert('Failed to convert images to PDF.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setPdfData(null);
  };

  if (pdfData) {
    return (
      <SuccessState 
        onReset={handleReset} 
        data={pdfData}
        fileName="images_to_pdf.pdf"
        message={`Successfully converted ${files.length} images into a PDF.`}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Select Images</h3>
            <p className="text-sm font-bold text-gray-400">Choose images (JPG, PNG) to compile into a PDF.</p>
          </div>
          <div className="px-4 py-2 bg-gray-50 rounded-full border border-gray-100 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${files.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {files.length} Photos
            </span>
          </div>
        </div>
        
        <FileUploader 
          files={files} 
          onFilesChange={setFiles} 
          accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
          label="Click or drag images here"
        />
      </div>

      {files.length > 0 && (
        <div className="flex flex-col items-center justify-center space-y-6 pt-6 border-t border-gray-50 animate-in fade-in slide-in-from-top-8">
          <button
            onClick={handleConvert}
            disabled={isConverting}
            className="inline-flex items-center justify-center px-12 py-4 bg-red-600 text-white rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-100 disabled:opacity-30 disabled:hover:scale-100"
          >
            {isConverting ? (
              <>
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <ImageIcon className="w-5 h-5 mr-3" />
                Convert to PDF
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
