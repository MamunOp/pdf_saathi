import React from 'react';
import { PDF_TOOLS, ToolID } from '../constants/tools';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ChevronRight, Zap, Lock as LucideLock, Sparkles, FileText } from 'lucide-react';

interface HomeViewProps {
  onToolSelect: (id: ToolID) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onToolSelect }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-12 sm:space-y-20 pb-16">
      {/* Hero Section - The Masterpiece */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        {/* Advanced radial background with sophisticated layering */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(60%_60%_at_50%_0%,_var(--tw-colors-red-50)_0%,_transparent_100%)] pointer-events-none opacity-80" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/graphy-light.png')] opacity-[0.03] pointer-events-none" />
        
        <div className="relative z-10 text-center space-y-10 max-w-6xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-red-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-red-600 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast, Private & Free</span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-7xl lg:text-8xl font-[1000] tracking-tighter text-gray-900 leading-[0.9] text-balance text-center"
            >
              PDF Tools <br className="hidden sm:block" />
              Made <span className="text-red-600">Easy.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed font-sans text-center px-4 tracking-tight"
            >
              Merge, split, and compress your PDFs in seconds. Your files never leave your computer, so they stay 100% private.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <button 
              onClick={() => {
                const element = document.getElementById('tools-grid');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-10 py-5 bg-gray-900 text-white rounded-[2rem] font-black text-xl hover:bg-black transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.2)] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center">
                Get Started
                <ChevronRight className="w-5 h-5 ml-2.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <div className="flex items-center space-x-4 px-6 py-3 bg-white/50 backdrop-blur-xl rounded-full border border-gray-100 shadow-sm">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-br from-gray-50 to-gray-200" />
                ))}
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                <span className="text-gray-900">14k+</span> Trusted Users
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Section - The Grid */}
      <div id="tools-grid" className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 scroll-mt-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-10 border-b border-gray-100 pb-6 sm:pb-8">
          <div className="space-y-3 sm:space-y-4 max-w-xl">
            <h2 className="text-3xl sm:text-6xl font-black tracking-tighter text-gray-900">Your Toolkit.</h2>
            <p className="text-base sm:text-lg text-gray-400 font-bold leading-relaxed">
              Everything you need to manage your PDF files in one place.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-300">
             <div className="w-2 h-2 rounded-full bg-green-500" />
             <span>All tools ready</span>
          </div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {PDF_TOOLS.map((tool) => (
            <motion.div
              key={tool.id}
              variants={item}
              onClick={() => onToolSelect(tool.id)}
              className="group relative bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-100 hover:border-red-100 transition-all duration-500 cursor-pointer flex flex-col h-full hover:shadow-[0_40px_60px_-15px_rgba(0,0,0,0.08)] active:scale-[0.98]"
            >
              <div className={cn(
                "w-12 h-12 sm:w-16 sm:h-16 rounded-[1rem] sm:rounded-[1.5rem] flex items-center justify-center mb-6 sm:mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-xl shadow-black/5 mx-auto sm:mx-0",
                tool.color
              )}>
                <tool.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              
              <div className="flex-1 space-y-3 sm:space-y-4 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight group-hover:text-red-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-bold opacity-70 group-hover:opacity-100 transition-opacity text-center sm:text-left line-clamp-3">
                  {tool.description}
                </p>
              </div>
              
              <div className="mt-10 flex items-center justify-between pt-6 border-t border-gray-50">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest group-hover:text-red-500 transition-colors">
                  Open Tool
                </span>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:translate-x-2">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Feature Section - Bento Grid V3 */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Hero Bento Card */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-20 flex flex-col justify-center space-y-8 sm:space-y-12 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50 rounded-full blur-[150px] -mr-[300px] -mt-[300px] opacity-40 transition-all duration-1000 group-hover:opacity-60" />
            
            <div className="relative z-10 space-y-6 sm:space-y-8 text-center lg:text-left">
              <h2 className="text-3xl sm:text-6xl font-[1000] tracking-tighter text-gray-900 leading-[0.9] text-balance">
                Architectural <br />
                <span className="text-red-600">Integrity.</span>
              </h2>
              <p className="text-base sm:text-xl text-gray-400 font-bold leading-relaxed max-w-xl text-center lg:text-left mx-auto lg:mx-0">
                Forget the compromise of cloud-based processing. We've built a sanctuary for 
                your documents—where power meets privacy.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-10 pt-8 text-center lg:text-left">
              {[
                { icon: Zap, title: "Edge Processing", desc: "Native binary execution with the speed of local hardware." },
                { icon: LucideLock, title: "Private-by-Design", desc: "No tracker footprints or external telemetry." },
                { icon: Sparkles, title: "Cognitive Engine", desc: "Semantic analysis with surgical precision." },
                { icon: FileText, title: "Vector Fidelity", desc: "Preserve every vector and font with absolute fidelity." }
              ].map((feature, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-[1.2rem] flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-red-600 transition-all mx-auto lg:mx-0 shadow-sm">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-gray-900 tracking-tight">{feature.title}</h4>
                    <p className="text-sm text-gray-400 font-bold leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Feature Card */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="flex-1 bg-gray-900 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-16 flex flex-col items-center justify-center text-center space-y-8 sm:space-y-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(800px_at_100%_100%,_rgba(220,38,38,0.15),transparent)] opacity-60" />
              
              <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 bg-red-600 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center rotate-3 shadow-2xl transition-transform duration-1000 group-hover:scale-110">
                <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              
              <div className="relative z-10 space-y-4 sm:space-y-6">
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1]">Professional <br />Grade</h3>
                <p className="text-gray-400 text-base sm:text-lg font-bold leading-relaxed opacity-70 text-center sm:text-left max-w-sm mx-auto">
                  Trusted for local, high-fidelity document transformation.
                </p>
              </div>

              <div className="relative z-10 px-8 py-3 bg-white/5 text-white rounded-full text-xs font-black uppercase tracking-[0.4em] border border-white/10 backdrop-blur-2xl">
                SANDBOXED RUNTIME
              </div>
            </div>

            <div className="h-44 bg-red-600 rounded-[3rem] p-8 flex items-center justify-between group overflow-hidden relative">
              <div className="space-y-2 relative z-10">
                <h4 className="text-2xl font-black text-white tracking-tight">Open Source Core</h4>
                <p className="text-white/80 text-[9px] font-black uppercase tracking-[0.3em]">v2.4 Ready</p>
              </div>
              <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center text-red-600 shadow-2xl relative z-10">
                <LucideLock className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section - The Manifesto */}
      <footer className="max-w-7xl mx-auto px-6 sm:px-12 py-16 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 text-center lg:text-left">
            <h3 className="text-5xl sm:text-7xl font-black tracking-tighter text-gray-900 leading-[0.9]">The Future of <br /><span className="text-red-600">Documents.</span></h3>
            <div className="h-2 w-24 bg-red-600 rounded-full mx-auto lg:mx-0" />
            <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed font-bold max-w-2xl mx-auto lg:mx-0 tracking-tight">
              We've combined legacy PDF standards with fluidity. No accounts, no telemetry—just professional instruments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-10 rounded-[3rem] bg-gray-50 border border-gray-100 space-y-6 hover:shadow-xl transition-all hover:-translate-y-1">
              <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-red-600">Local Engine.</h4>
              <p className="text-lg text-gray-800 font-bold leading-relaxed">Clean object mutation using isolated memory sandboxes.</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-gray-50 border border-gray-100 space-y-6 hover:shadow-xl transition-all hover:-translate-y-1">
              <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-red-600">Zero Trust.</h4>
              <p className="text-lg text-gray-800 font-bold leading-relaxed">Your workspace is an air-gapped relative of the cloud.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-[4rem] p-8 sm:p-16 space-y-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
          
          <div className="space-y-10 relative z-10">
            <h4 className="font-black text-red-600 uppercase tracking-[0.4em] text-xs">System Philosophy</h4>
            <h5 className="text-4xl sm:text-7xl font-black text-white tracking-tighter leading-[0.9]">Zero Uploads. <span className="text-white/20">Zero Compromise.</span></h5>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
            {[
              { label: "01", title: "Isolated", desc: "Operations contained within private memory sandboxes." },
              { label: "02", title: "Fidelity", desc: "Direct transformation of PDF streams ensures zero loss." },
              { label: "03", title: "Integrity", desc: "Gemini-powered insights with security-first design." }
            ].map((col, i) => (
              <div key={i} className="space-y-8">
                <div className="text-5xl font-black text-red-600/30 font-mono tracking-tighter">{col.label}</div>
                <div className="space-y-4">
                  <h6 className="text-2xl font-black text-white tracking-tight">{col.title}</h6>
                  <p className="text-gray-400 text-lg font-bold leading-relaxed opacity-60">{col.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-16 border-t border-gray-100 text-center space-y-12">
          <div className="space-y-8">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.6em]">Instrumentation Index</p>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
               {["PDF Merger", "Split PDF", "Compress PDF", "JPG to PDF", "PDF to JPG", "AI Assistant", "Secure Protect", "Structural Rotate", "Metadata Scrub"].map(tag => (
                 <span key={tag} className="hover:text-red-600 transition-all cursor-pointer px-5 py-2 hover:bg-red-50 rounded-full">{tag}</span>
               ))}
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4">
             <div className="w-10 h-10 bg-gray-50 p-2.5 rounded-xl shadow-sm">
               <FileText className="w-full h-full text-gray-400" />
             </div>
             <p className="text-[11px] font-black text-gray-300 uppercase tracking-[1em]">PDF SAATHI © 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

