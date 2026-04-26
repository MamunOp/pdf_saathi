import React from 'react';
import { 
  Zap, 
  Scissors, 
  Image as ImageIcon, 
  Type, 
  Sparkles, 
  RotateCw, 
  EyeOff, 
  Maximize, 
  FileSearch,
  Layout,
  Trash2,
  Lock,
  Download
} from 'lucide-react';

export type ToolID = 
  | 'home' 
  | 'merge' 
  | 'split' 
  | 'image-to-pdf' 
  | 'pdf-to-image' 
  | 'text-to-pdf' 
  | 'ai' 
  | 'rotate' 
  | 'compress' 
  | 'protect' 
  | 'unlock'
  | 'metadata'
  | 'remove-pages';

export interface PDFTool {
  id: ToolID;
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
  category: 'organize' | 'convert' | 'optimize' | 'security' | 'ai';
}

export const PDF_TOOLS: PDFTool[] = [
  { id: 'merge', name: 'Merge PDF', icon: Zap, description: 'Combine PDFs in the order you want with the easiest PDF merger available.', color: 'bg-red-500', category: 'organize' },
  { id: 'split', name: 'Split PDF', icon: Scissors, description: 'Separate one page or a whole set for easy conversion into independent PDF files.', color: 'bg-blue-500', category: 'organize' },
  { id: 'remove-pages', name: 'Remove Pages', icon: Trash2, description: 'Remove pages from a PDF document to get just the pages you need.', color: 'bg-orange-500', category: 'organize' },
  { id: 'rotate', name: 'Rotate PDF', icon: RotateCw, description: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!', color: 'bg-purple-500', category: 'organize' },
  
  { id: 'image-to-pdf', name: 'JPG to PDF', icon: ImageIcon, description: 'Convert JPG, PNG, BMP, GIF and TIFF images to PDF in seconds. Easily adjust orientation and margins.', color: 'bg-green-500', category: 'convert' },
  { id: 'pdf-to-image', name: 'PDF to JPG', icon: ImageIcon, description: 'Extract all images that are within a PDF or convert each page to a JPG image.', color: 'bg-yellow-500', category: 'convert' },
  { id: 'text-to-pdf', name: 'Text to PDF', icon: Type, description: 'Create a professional PDF from plain text in seconds.', color: 'bg-indigo-500', category: 'convert' },
  
  { id: 'compress', name: 'Compress PDF', icon: Maximize, description: 'Reduce file size while optimizing for maximal PDF quality.', color: 'bg-teal-500', category: 'optimize' },
  
  { id: 'protect', name: 'Protect PDF', icon: Lock, description: 'Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.', color: 'bg-pink-500', category: 'security' },
  { id: 'unlock', name: 'Unlock PDF', icon: Download, description: 'Remove PDF password security, so you can use your PDFs however you want.', color: 'bg-amber-500', category: 'security' },
  { id: 'metadata', name: 'Metadata Scrub', icon: FileSearch, description: 'Remove hidden metadata from your PDF files for ultimate privacy.', color: 'bg-slate-500', category: 'security' },
  
  { id: 'ai', name: 'AI Intelligence', icon: Sparkles, description: 'The power of AI at your service. Summarize and chat with any PDF instantly.', color: 'bg-violet-600', category: 'ai' },
];
