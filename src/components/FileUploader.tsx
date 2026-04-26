import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File as FileIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

interface FileUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: Record<string, string[]>;
  multiple?: boolean;
  label?: string;
  maxFiles?: number;
  autoOpen?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onFilesChange,
  accept = { 'application/pdf': ['.pdf'] },
  multiple = true,
  label = "Click or drag files to upload",
  maxFiles,
  autoOpen = false
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (multiple) {
      onFilesChange([...files, ...acceptedFiles].slice(0, maxFiles));
    } else {
      onFilesChange(acceptedFiles.slice(0, 1));
    }
  }, [files, onFilesChange, multiple, maxFiles]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxFiles,
    noClick: false // We still want clicks to work
  });

  React.useEffect(() => {
    if (autoOpen) {
      const timer = setTimeout(() => {
        open();
      }, 500); // Small delay to ensure render and transition
      return () => clearTimeout(timer);
    }
  }, [autoOpen, open]);

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onFilesChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-[2rem] p-8 transition-all duration-500 cursor-pointer text-center group",
          isDragActive 
            ? "border-red-600 bg-red-50/30 shadow-inner" 
            : "border-gray-100 hover:border-red-300 hover:bg-gray-50 shadow-sm hover:shadow-lg hover:shadow-gray-50",
          files.length > 0 && "p-6"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-red-50 group-hover:bg-red-100 p-4 rounded-2xl shadow-sm transition-all duration-300 relative z-10 group-hover:scale-110">
            <Upload className="w-6 h-6 text-red-600" />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black text-gray-900 tracking-tight">{label}</p>
            <div className="flex flex-col items-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {Object.keys(accept).includes('application/pdf') ? "PDF Files Only" : "Images Only"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="bg-gray-50 group-hover:bg-red-50 p-2 rounded-xl transition-colors">
                    <FileIcon className="w-4 h-4 text-gray-900 group-hover:text-red-500" />
                  </div>
                  <div className="flex flex-col overflow-hidden text-left">
                    <span className="text-xs font-black text-gray-900 truncate tracking-tight">
                      {file.name}
                    </span>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="p-2 hover:bg-red-50 text-gray-200 hover:text-red-600 rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
