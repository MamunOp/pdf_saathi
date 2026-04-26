import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, LucideLock, Zap, ArrowRight } from 'lucide-react';
import { PDF_TOOLS, ToolID } from '../constants/tools';
import { Link } from 'react-router-dom';

interface ToolPageWrapperProps {
  title: string;
  description: string;
  seoContent: React.ReactNode;
  children: React.ReactNode;
  icon: React.ElementType;
  color: string;
}

export const ToolPageWrapper: React.FC<ToolPageWrapperProps> = ({ 
  title, 
  description, 
  seoContent, 
  children, 
  icon: Icon,
  color 
}) => {
  const toolContentRef = useRef<HTMLDivElement>(null);
  const currentPath = window.location.pathname.split('/')[1] || '';

  useEffect(() => {
    // Smooth scroll to tool content on mount
    const timer = setTimeout(() => {
      toolContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const relatedTools = PDF_TOOLS.filter(t => t.id !== currentPath).slice(0, 4);

  return (
    <div className="space-y-8 sm:space-y-12 pb-8 sm:pb-16">
      {/* Tool Header - Immersion Section */}
      <section className="text-center space-y-2 sm:space-y-4 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center space-y-3 sm:space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100/50">
            <div className={`w-1.5 h-1.5 rounded-full ${color.split(' ')[0]}`} />
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-gray-500">Simple PDF Tool</span>
          </div>

          <div className={`w-14 h-14 sm:w-20 sm:h-20 mx-auto rounded-[1.2rem] sm:rounded-[1.8rem] flex items-center justify-center shadow-xl shadow-black/5 ${color} relative`}>
            <div className="absolute inset-0 bg-white/10 rounded-[1.2rem] sm:rounded-[1.8rem] backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity" />
            <Icon className="w-6 h-6 sm:w-10 sm:h-10 text-white relative z-10" />
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-5xl font-black tracking-tighter text-gray-900 leading-tight text-balance">
              {title}
            </h1>
            <p className="text-sm sm:text-xl text-gray-400 max-w-xl mx-auto font-medium leading-relaxed tracking-tight text-balance">
              {description}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Unified Quick Navigation - Always visible before work */}
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {relatedTools.map((t) => (
              <Link
                key={t.id}
                to={`/${t.id}`}
                className="group flex items-center space-x-2 px-4 py-2 bg-white border border-gray-100 rounded-full text-[10px] sm:text-[11px] font-bold text-gray-400 hover:border-red-100 hover:text-red-500 transition-all active:scale-95 shadow-sm"
              >
                <t.icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-widest">{t.name}</span>
              </Link>
            ))}
          </div>
          <div className="h-px w-12 bg-gray-100" />
          <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">Switch tool instantly</p>
        </div>
      </div>

      {/* Tool Action Workspace */}
      <motion.div 
        ref={toolContentRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="scroll-mt-32 max-w-[1200px] mx-auto px-4 sm:px-6"
      >
        <div className="bg-gray-50/50 border border-gray-100 rounded-[1.5rem] sm:rounded-[2.5rem] p-1.5 sm:p-6 shadow-xl shadow-gray-100/10">
          <div className="bg-white border border-gray-100 rounded-[1.2rem] sm:rounded-[2rem] shadow-sm overflow-hidden">
            {children}
          </div>
        </div>
      </motion.div>

      {/* Advanced Documentation Section */}
      <section className="px-6 sm:px-12 lg:px-16 max-w-[1400px] mx-auto space-y-12 sm:space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-24 items-start">
          <div className="lg:col-span-8 space-y-10 sm:space-y-16">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-gray-900 leading-[1.1]">
                Mastering <span className="text-red-600">{title.split(' ')[0]}</span> <br /> 
                <span className="text-gray-300">Operations.</span>
              </h2>
              <div className="text-lg sm:text-xl text-gray-500 font-medium leading-relaxed space-y-8 prose prose-gray">
                {seoContent}
              </div>
            </div>

            {/* Feature Grid - Miniature */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Edge Latency', val: '0.04ms', icon: Zap },
                { label: 'Encryption', val: 'AES-256', icon: LucideLock },
                { label: 'Logic Check', val: 'Strict', icon: Sparkles },
              ].map((pill, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 space-y-4">
                  <pill.icon className="w-5 h-5 text-red-600" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{pill.label}</span>
                    <span className="text-lg font-black text-gray-900">{pill.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-4 sticky top-32 space-y-8">
            <div className="p-8 rounded-[2.5rem] bg-gray-900 text-white space-y-6 shadow-2xl shadow-gray-200">
               <div className="flex items-center space-x-3 text-red-500">
                 <Icon className="w-6 h-6" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">Protocol Specs</span>
               </div>
               <h4 className="text-2xl font-black tracking-tight">{title.split(' ')[0]} Engine v2</h4>
               <div className="space-y-4">
                 {[
                   'Native Browser Runtime',
                   'Zero Data Persistence',
                   'Mathematically Lossless',
                   'Meta-data Integrity',
                   'Universal Compatibility'
                 ].map((spec, i) => (
                   <div key={i} className="flex items-center space-x-3 text-xs font-bold text-gray-400">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                     <span>{spec}</span>
                   </div>
                 ))}
               </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 space-y-4">
               <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Developer Note</span>
               <p className="text-sm font-medium text-gray-500 leading-relaxed">
                 Every byte is processed using the user's local CPU. This ensures that even for high-volume transactions, latency is determined only by hardware capacity, not network congestion.
               </p>
            </div>
          </div>
        </div>

        {/* Global Documentation Card */}
        <div className="bg-white border border-gray-100 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 space-y-8 shadow-sm">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <h3 className="text-2xl sm:text-5xl font-black text-gray-900 tracking-tighter leading-tight text-balance">The definitive guide to <span className="text-red-600">PDF optimization</span> & management.</h3>
            <div className="h-1.5 w-16 sm:w-24 bg-red-600 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 text-lg text-gray-500 font-medium leading-relaxed">
            <div className="space-y-8">
              <p>The Portable Document Format (PDF) has remained the industry standard for over 30 years because of its ability to preserve formatting across all devices. PDF Saathi changes the game by providing <strong>professional-grade PDF tools</strong> right in your browser.</p>
              <p>Our commitment to security means we use <strong>WebAssembly and JavaScript-based PDF processing</strong>. We manipulate the internal structure of your documents without ever needing to transmit the actual content to a cloud server.</p>
            </div>
            <div className="space-y-8">
              <p>In addition to standard features, we optimize every output for SEO and web delivery. When you <strong>compress a PDF</strong> or <strong>convert JPG to PDF</strong>, we strip away redundant binary data, ensuring your files are as small as possible.</p>
              <div className="pt-8 flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] opacity-40">
                <span>{title}</span>
                <span>PDF Online</span>
                <span>Free Tools</span>
                <span>Secure Core</span>
                <span>No Upload</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
