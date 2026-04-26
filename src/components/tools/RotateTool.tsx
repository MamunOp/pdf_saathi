import React, { useState } from 'react';
import { FileUploader } from '../FileUploader';
import { SuccessState } from './SuccessState';
import { rotatePDF } from '@/lib/pdf';
import { downloadFile } from '@/lib/utils';
import { Loader2, RotateCw } from 'lucide-react';

export const RotateTool: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [degrees, setDegrees] = useState(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null);

  const handleRotate = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const data = await rotatePDF(files[0], degrees);
      setPdfData(data);
    } catch (error) {
      console.error('Rotation failed:', error);
      alert('Failed to rotate PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setDegrees(90);
    setPdfData(null);
  };

  if (pdfData) {
    return (
      <SuccessState 
        onReset={handleReset} 
        data={pdfData}
        fileName={`rotated_${files[0].name}`}
        message={`Successfully rotated the document by ${degrees} degrees.`}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Select File</h3>
            <p className="text-sm font-bold text-gray-400">Choose the PDF you want to re-orient.</p>
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
          onFilesChange={(newFiles) => setFiles(newFiles.slice(0, 1))} 
          multiple={false}
          label="Click or drag PDF here"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="space-y-4 p-8 bg-gray-50 rounded-[2rem] border border-gray-100 relative overflow-hidden group">
            <div className="space-y-4 relative z-10">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 block text-center">Rotation Angle</label>
              <div className="flex justify-center space-x-3">
                {[90, 180, 270].map((deg) => (
                  <button
                    key={deg}
                    onClick={() => setDegrees(deg)}
                    className={`px-8 py-4 rounded-2xl text-sm font-black transition-all ${
                      degrees === deg 
                        ? 'bg-red-600 text-white shadow-xl shadow-red-100' 
                        : 'bg-white border border-gray-100 text-gray-400 hover:border-red-100 hover:text-red-600'
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 pt-6 border-t border-gray-50">
            <button
              onClick={handleRotate}
              disabled={isProcessing}
              className="group relative inline-flex items-center justify-center px-12 py-4 bg-red-600 text-white rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-100 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="relative z-10 flex items-center">
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Rotating...
                  </>
                ) : (
                  <>
                    <RotateCw className="w-5 h-5 mr-3" />
                    Rotate PDF
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
