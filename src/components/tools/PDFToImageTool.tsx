import React, { useState } from 'react';
import { FileUploader } from '../FileUploader';
import { SuccessState } from './SuccessState';
import { pdfToImages } from '@/lib/pdf';
import { downloadFile } from '@/lib/utils';
import { Loader2, ImageIcon, Download } from 'lucide-react';
import { motion } from 'motion/react';

export const PDFToImageTool: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setImages([]);
    try {
      const imageUrls = await pdfToImages(files[0]);
      setImages(imageUrls);
    } catch (error) {
      console.error('Conversion failed:', error);
      alert('Failed to convert PDF to images.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setImages([]);
  };

  if (images.length > 0) {
    return (
      <div className="space-y-8">
        <SuccessState 
          onReset={handleReset} 
          data={null}
          fileName=""
          message={`Successfully converted ${images.length} pages to high-quality images.`}
          details={<p className="text-sm font-medium text-gray-500">Your images are ready. You can view them below and download individually.</p>}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((url, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative aspect-[3/4] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
            >
              <img src={url} alt={`Page ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                <p className="text-white font-bold mb-4">Page {i + 1}</p>
                <button
                  onClick={() => downloadFile(url, `page_${i + 1}.jpg`)}
                  className="p-3 bg-white text-black rounded-full"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-6">
      <FileUploader 
        files={files} 
        onFilesChange={(newFiles) => {
          setFiles(newFiles.slice(0, 1));
          setImages([]);
        }} 
        multiple={false}
        label="Select a PDF file to convert"
      />

      {files.length > 0 && images.length === 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleConvert}
            disabled={isProcessing}
            className="inline-flex items-center justify-center px-12 py-4 bg-yellow-500 text-black rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-yellow-100 disabled:opacity-50"
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <ImageIcon className="w-5 h-5 mr-2" />
            )}
            {isProcessing ? 'Converting...' : 'Convert to JPG'}
          </button>
        </div>
      )}
    </div>
  );
};

