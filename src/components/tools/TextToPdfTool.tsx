import React, { useState } from 'react';
import { SuccessState } from './SuccessState';
import { textToPDF } from '@/lib/pdf';
import { downloadFile } from '@/lib/utils';
import { Loader2, FileText, Type } from 'lucide-react';

export const TextToPdfTool: React.FC = () => {
  const [text, setText] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleConvert = async () => {
    if (!text.trim()) return;
    setIsConverting(true);
    try {
      const data = await textToPDF(text);
      setPdfData(data);
    } catch (error) {
      console.error('Conversion failed:', error);
      alert('Failed to convert text to PDF.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setText('');
    setPdfData(null);
  };

  if (pdfData) {
    return (
      <SuccessState 
        onReset={handleReset} 
        data={pdfData}
        fileName="text_to_pdf.pdf"
        message={`Successfully created a PDF document from your text.`}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Enter Content</h3>
            <p className="text-sm font-bold text-gray-400">Type or paste the text you want to turn into a PDF.</p>
          </div>
        </div>

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full min-h-[300px] p-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] focus:border-red-600 focus:bg-white outline-none transition-all resize-none shadow-sm placeholder:text-gray-300 font-medium"
          />
          <div className="absolute top-8 right-8 text-gray-200">
            <Type className="w-12 h-12" />
          </div>
        </div>

        {text.trim() && (
          <div className="flex flex-col items-center justify-center space-y-6 pt-6 border-t border-gray-50 animate-in fade-in slide-in-from-top-8">
            <button
              onClick={handleConvert}
              disabled={isConverting}
              className="inline-flex items-center justify-center px-12 py-4 bg-red-600 text-white rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-100 disabled:opacity-30 disabled:hover:scale-100"
            >
              {isConverting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-3" />
                  Generate PDF
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
