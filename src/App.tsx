/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { MergeTool } from './components/tools/MergeTool';
import { SplitTool } from './components/tools/SplitTool';
import { ImageToPdfTool } from './components/tools/ImageToPdfTool';
import { TextToPdfTool } from './components/tools/TextToPdfTool';
import { AITool } from './components/tools/AITool';
import { RotateTool } from './components/tools/RotateTool';
import { CompressTool } from './components/tools/CompressTool';
import { RemovePagesTool } from './components/tools/RemovePagesTool';
import { PDFToImageTool } from './components/tools/PDFToImageTool';
import { ProtectTool } from './components/tools/ProtectTool';
import { UnlockTool } from './components/tools/UnlockTool';
import { MetadataTool } from './components/tools/MetadataTool';
import { ToolPageWrapper } from './components/ToolPageWrapper';
import { ToolID, PDF_TOOLS } from './constants/tools';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowLeft, FileText } from 'lucide-react';
import { cn } from './lib/utils';

// Scroll to top on navigation component
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [pathname]);
  
  return null;
}

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split('/')[1] || 'home';
  const activeTool = path as ToolID | 'home';

  const getToolData = (id: string) => PDF_TOOLS.find(t => t.id === id);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white font-sans text-gray-900 overflow-hidden">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-[60]">
        <Link 
          to="/"
          className="flex items-center space-x-2.5 group"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div className="bg-red-600 p-1.5 rounded-lg shadow-lg shadow-red-100 transition-transform active:scale-95 group-hover:rotate-3">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-tighter uppercase font-sans">PDF Saathi</span>
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2.5 hover:bg-gray-100 rounded-2xl transition-all active:scale-90"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-[80] w-[280px] sm:w-[320px] transform transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] lg:relative lg:translate-x-0 lg:w-[280px] lg:z-10 bg-white shadow-2xl lg:shadow-none lg:border-r lg:border-gray-50",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar 
          activeTool={activeTool} 
          onToolChange={(id) => {
            navigate(id === 'home' ? '/' : `/${id}`);
            setIsSidebarOpen(false);
          }} 
        />
      </aside>

      <main className="flex-1 min-h-screen relative bg-white overflow-y-auto overflow-x-hidden">
        <div className="py-6 lg:py-10">
          {activeTool !== 'home' && (
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12 mb-8">
              <Link
                to="/"
                className="group inline-flex items-center text-[11px] font-black uppercase tracking-[0.4em] text-gray-300 hover:text-red-600 transition-all active:scale-95"
              >
                <div className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center mr-4 group-hover:border-red-100 transition-colors shadow-sm bg-white">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </div>
                Return to Toolkit
              </Link>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.99, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.01, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<HomeView onToolSelect={(id) => navigate(`/${id}`)} />} />
                
                <Route path="/merge" element={
                  <ToolPageWrapper 
                    title="Merge PDF Online" 
                    description="Combine multiple PDF files into one professional document in seconds." 
                    icon={getToolData('merge')?.icon!}
                    color={getToolData('merge')?.color!}
                    seoContent={
                      <div className="space-y-6 text-sm text-gray-500 font-medium leading-relaxed">
                        <p><strong>Merge PDF Online</strong> with absolute ease and professional precision using PDF Saathi's state-of-the-art merging engine. Our tool is optimized for individuals and businesses who need to <strong>combine multiple PDF files into one</strong> single, cohesive document without any software installation. Whether you are dealing with legal contracts, academic transcripts, or monthly business reports, our platform ensures that your pages are merged in the exact order you specify.</p>
                        <p>The <strong>PDF merger</strong> is a core utility in any document management suite. At PDF Saathi, we've optimized this process using WebAssembly-powered engines that perform the heavy lifting right in your browser. This means you don't have to wait for server-side queues or worry about your data being stored in a cloud database. Our commitment to <strong>privacy-first PDF tools</strong> ensures that whether you're merging two pages or two hundred, the data remains strictly under your control.</p>
                        <p><strong>Professional Use Cases:</strong> Developers use our platform to batch combine documentation, legal assistants use it to append addendums to contracts, and students use it to compile separate research papers into a single thesis. Our system handles meta-data intelligently, ensuring that bookmarks and internal links are preserved whenever possible. This attention to detail is why PDF Saathi is considered the <strong>best free PDF combiner</strong> available today.</p>
                        <p>Furthermore, our interface is designed for <strong>maximum efficiency</strong>. You can drag and drop dozens of files, reorder them with a simple swipe, and preview the final structure before initializing the merge. We also perform automatic structural checks to ensure that the resulting PDF is compliant with all modern viewing software, from Adobe Acrobat to basic browser viewers. No watermarks, no sign-ups, just pure document efficiency.</p>
                        <p>Keywords: Merge PDF Online, Combine PDF files, Free PDF Merger, Secure PDF Joiner, Online PDF Combiner, No Upload PDF Merging, Enterprise PDF Tools, Web-based PDF Combination.</p>
                      </div>
                    }
                  >
                    <MergeTool />
                  </ToolPageWrapper>
                } />

                <Route path="/split" element={
                  <ToolPageWrapper 
                    title="Split PDF Pages" 
                    description="Extract specific pages or split your PDF into multiple individual files." 
                    icon={getToolData('split')?.icon!}
                    color={getToolData('split')?.color!}
                    seoContent={
                      <div className="space-y-6 text-sm text-gray-500 font-medium leading-relaxed">
                        <p><strong>Split PDF Online</strong> and extract the specific pages you need with PDF Saathi’s powerful and precise splitting tool. Our platform allows you to <strong>break apart large PDF documents</strong> into smaller, manageable files or individually extract a single page from a massive report. This is the ideal solution for users who need to share only specific sections of a document while keeping the rest confidential.</p>
                        <p>The <strong>PDF splitter</strong> is engineered for surgical precision. You can define exact page ranges, extract every odd or even page, or simply pull out specific pages by their number. This level of control is essential for professionals dealing with <strong>bulk PDF management</strong>, where only a few pages of a 500-page document might be relevant for a client or stakeholder. Our tool ensures that each extracted file is a standalone, fully functional PDF with its own integrity.</p>
                        <p><strong>Architecture of Efficiency:</strong> Unlike traditional converters that re-render the entire document, our <strong>PDF page extractor</strong> operates on the raw object tree of the PDF. This method preserves absolute fidelity—text remains selectable, links remain clickable, and high-resolution images are never downsampled. It’s this <strong>lossless PDF splitting</strong> that makes us the choice of engineers, architects, and detail-oriented researchers across the globe.</p>
                        <p>Security remains our primary pillar. Because the extraction logic runs locally via your CPU, your sensitive data never touches the cloud. This <strong>offline-safe PDF extraction</strong> is critical for handling medical records, sensitive government papers, and restricted internal memos. Whether you're on a high-end workstation or a mobile phone, PDF Saathi brings the power of high-end desktop software to your simple browser tab. Streamline your file organization and protect your data with our world-class toolkit.</p>
                        <p>Keywords: Split PDF, Extract PDF Pages, Online PDF Splitter, Free PDF Cutter, Break PDF, Remove Pages From PDF, Safe PDF Splitting Tool, Lossless PDF Extraction, Bulk PDF Splitter.</p>
                      </div>
                    }
                  >
                    <SplitTool />
                  </ToolPageWrapper>
                } />

                <Route path="/compress" element={
                  <ToolPageWrapper 
                    title="Compress PDF File" 
                    description="Reduce PDF file size without losing quality for easy email sharing." 
                    icon={getToolData('compress')?.icon!}
                    color={getToolData('compress')?.color!}
                    seoContent={
                      <div className="space-y-6 text-sm text-gray-500 font-medium leading-relaxed">
                        <p><strong>Compress PDF Online</strong> to reduce file size significantly without sacrificing the clarity of your text or the quality of your images. Large PDF files are the primary cause of email bounces and slow website loading times. PDF Saathi’s <strong>PDF compressor</strong> uses advanced optimization algorithms to discard unnecessary metadata and compress embedded graphics, resulting in a lightweight file that is perfect for web sharing and storage.</p>
                        <p>Why do you need <strong>efficient PDF compression</strong>? High-resolution scans can easily reach 50MB+, which is well above the attachment limits of most email providers like Outlook or Gmail. Our <strong>online file shrinker</strong> intelligently assesses the document structure, identifying redundant streams and applying high-efficiency object compression. This process is tuned to ensure that while the byte-count drops, the visual readability for the human eye remains virtually indistinguishable from the original.</p>
                        <p><strong>The Security Advantage:</strong> Most users are hesitant to upload sensitive financial or medical reports to third-party servers for compression. PDF Saathi solves this by performing <strong>local PDF optimization</strong>. Your browser tab acts as a sandbox, processing the binary data using client-side JavaScript. This means your <strong>private documents are never uploaded</strong>, never stored, and never seen by anyone but you. It is the ultimate solution for professionals in privacy-sensitive industries like law and healthcare.</p>
                        <p>Beyond simple size reduction, our tool offers <strong>varied compression levels</strong> to suit your specific needs—from low-profile "Screen" optimization for fast web viewing to high-fidelity "Print" optimization. Join thousands of users who rely on PDF Saathi for their daily document needs and experience the fastest, safest, and most effective <strong>free PDF size reducer</strong> on the market today.</p>
                        <p>Keywords: Compress PDF, Reduce PDF Size, Shrink PDF Online, PDF Optimizer, Free PDF Compressor, Small PDF Converter, Online PDF Resizer, Local PDF Compression, Secure Document Shrinking.</p>
                      </div>
                    }
                  >
                    <CompressTool />
                  </ToolPageWrapper>
                } />

                <Route path="/image-to-pdf" element={
                  <ToolPageWrapper 
                    title="JPG to PDF Converter" 
                    description="Convert your images (JPG, PNG) into a high-quality PDF document." 
                    icon={getToolData('image-to-pdf')?.icon!}
                    color={getToolData('image-to-pdf')?.color!}
                    seoContent={
                      <div className="space-y-6 text-sm text-gray-500 font-medium leading-relaxed">
                        <p><strong>JPG to PDF Converter</strong>: Transform your digital photos and scans into professional, industry-standard PDF documents. PDF Saathi provides a seamless way to <strong>convert images to PDF</strong> while maintaining optimal page alignment and image clarity. Whether you have JPEG, PNG, or TIFF files, our converter intelligently compiles them into a single, high-quality PDF ready for submission.</p>
                        <p>The <strong>Image to PDF transformation</strong> is a vital tool for digital documentation. Students use it to convert photos of homework into single-file submissions, while remote workers use it to scan paper contracts into digital format using their phone cameras. Our engine supports <strong>batch image processing</strong>, allowing you to upload multiple files at once and arrange them in your preferred order before generating the final document.</p>
                        <p><strong>Optimization & Fidelity:</strong> We don't just paste images into a PDF; we optimize the container for each image. This ensures that the <strong>resultant PDF is lightweight</strong> yet maintains the full resolution of your original capture. Our system handles different aspect ratios gracefully, centering images and applying clean margins to ensure a consistent, professional look across all pages. This <strong>free online photo-to-PDF tool</strong> is designed to replace expensive desktop alternatives with a simple, browser-based experience.</p>
                        <p>Privacy is our bedrock. By using <strong>client-side image conversion</strong>, we ensure that your personal photos or sensitive document scans never leave your device's memory. No uploads means no risks of data interception or server-side breaches. Convert your JPGs, PNGs, and GIFs to PDF with the peace of mind that only PDF Saathi can provide.</p>
                        <p>Keywords: JPG to PDF, Image to PDF, Convert Photo to PDF, PNG to PDF, Online Image Converter, Compile Images to PDF, Free PDF Creator, Secure Photo Converter, Batch Image to PDF.</p>
                      </div>
                    }
                  >
                    <ImageToPdfTool />
                  </ToolPageWrapper>
                } />

                <Route path="/pdf-to-image" element={
                  <ToolPageWrapper 
                    title="PDF to JPG Extractor" 
                    description="Extract high-quality images from every page of your PDF file." 
                    icon={getToolData('pdf-to-image')?.icon!}
                    color={getToolData('pdf-to-image')?.color!}
                    seoContent={
                      <div className="space-y-6 text-sm text-gray-500 font-medium leading-relaxed">
                        <p><strong>PDF to JPG Extractor</strong>: Effortlessly turn your PDF pages into high-resolution image files. If you need to share a specific page of a report on social media or embed a PDF chart into a presentation, our <strong>PDF to image converter</strong> is the perfect solution. We extract every page of your PDF as individual, high-quality JPEG or PNG files, ensuring text remains sharp and colors vibrant.</p>
                        <p>Our <strong>PDF-to-Image rendering engine</strong> is designed for high-fidelity output. We use modern rendering libraries to rasterize each PDF page exactly as it would appear on a high-end printer. This is perfect for marketers extracting graphics for social media posts, or researchers who need to include document snippets in their own work. This <strong>free PDF extraction tool</strong> handles everything from simple text documents to complex, heavy-graphic brochures with ease.</p>
                        <p><strong>Customizable Exports:</strong> Why settle for low quality? Our system allows for <strong>high-DPI page extraction</strong>, ensuring that even small text remains legible when converted to a static image format. You can download individual pages or export the entire document as a ZIP file of images in one click. This <strong>online PDF to JPEG utility</strong> is built for speed and ease of use, with no registration required.</p>
                        <p>As with all PDF Saathi tools, your <strong>security is guaranteed</strong>. All rendering happens in your browser's private context. Your files stay on your hardware, and the images are generated locally. This level of <strong>confidential PDF extraction</strong> is unmatched by traditional cloud services. Unlock the visual potential of your documents today.</p>
                        <p>Keywords: PDF to JPG, PDF to Image, Extract PDF Pages as Images, Convert PDF to Photo, High Res PDF to Image, Online PDF to JPEG, Free PDF Graphics Extractor, PDF to PNG Extractor.</p>
                      </div>
                    }
                  >
                    <PDFToImageTool />
                  </ToolPageWrapper>
                } />

                <Route path="/ai" element={
                  <ToolPageWrapper 
                    title="AI PDF Assistant" 
                    description="Chat with your PDF and get instant summaries using Gemini AI." 
                    icon={getToolData('ai')?.icon!}
                    color={getToolData('ai')?.color!}
                    seoContent={
                      <div className="space-y-6 text-sm text-gray-500 font-medium leading-relaxed">
                        <p><strong>AI PDF Assistant</strong>: Step into the future of document management with PDF Saathi's <strong>AI-powered PDF reader</strong>. Powered by Google's advanced Gemini models, our tool allows you to <strong>chat with your PDF</strong>, ask complex questions, and receive instant, accurate summaries. This is an indispensable tool for researchers, law professionals, and students who need to parse through hundreds of pages of text efficiently.</p>
                        <p>Imagine being able to <strong>interrogate a 50-page legal contract</strong> or a 200-page academic thesis in seconds. Our <strong>Document Intelligence engine</strong> understands the context, hierarchy, and nuances of your text, allowing for semantic search and high-speed data extraction. No more "Ctrl+F" through endless paragraphs—simply ask the AI to "Find the termination clause" or "Summarize the methodology of the second chapter."</p>
                        <p><strong>The Privacy Frontier:</strong> While other AI tools require you to upload your files to their servers for training, PDF Saathi utilizes secure processing channels. We prioritize <strong>confidential AI analysis</strong>, ensuring that your sensitive business data or private research is handled with the utmost care. This is a <strong>next-gen PDF tool</strong> designed for a world where AI is a partner in our daily productivity.</p>
                        <p>Beyond simple summaries, our <strong>Smart PDF Chat</strong> can help you rephrase complex sections, translate specific paragraphs, and even generate follow-up questions to help you understand difficult concepts better. Experience the ultimate <strong>intelligent document assistant</strong> and transform how you interact with information forever.</p>
                        <p>Keywords: AI PDF Assistant, Chat with PDF, PDF Summarizer, AI Document Reader, Smart PDF Tool, Analyze PDF with AI, Gemini AI PDF, Document Intelligence, Semantic PDF Search.</p>
                      </div>
                    }
                  >
                    <AITool />
                  </ToolPageWrapper>
                } />

                <Route path="/rotate" element={
                  <ToolPageWrapper 
                    title="Rotate PDF Pages" 
                    description="Fix crooked documents by rotating pages clockwise or counter-clockwise." 
                    icon={getToolData('rotate')?.icon!}
                    color={getToolData('rotate')?.color!}
                    seoContent={
                      <div className="space-y-6 text-sm text-gray-500 font-medium leading-relaxed">
                        <p><strong>Rotate PDF Online</strong> and fix incorrectly oriented documents in seconds with PDF Saathi's intuitive rotation tool. It is common to receive scanned documents or PDF reports where certain pages are upside down or sideways. Our tool allows you to <strong>rotate PDF pages</strong> clockwise or counter-clockwise by 90-degree increments, ensuring a professional and readable viewing experience.</p>
                        <p>Why do documents come with incorrect orientation? Poor scanning practices or mobile photo-to-PDF apps often fail to detect the correct 'Up' vector. Our <strong>PDF orientation fixer</strong> provides a visual grid of your document pages, allowing you to select specific skewed pages and snap them back into place. This is essential for <strong>fixing medical charts</strong>, engineering blueprints, or landscape-oriented spreadsheets that were accidentally saved as portraits.</p>
                        <p><strong>Permanent & Lossless fixes:</strong> Unlike some viewers that only rotate the view temporary, PDF Saathi applies <strong>permanent rotation to the PDF metadata</strong>. This means when you share the document, it will appear correctly on every device, from tablets to printers. Our <strong>free PDF page flipper</strong> is fast, efficient, and requires no specialized knowledge. It's a professional-grade tool stripped of the complexity.</p>
                        <p>Security is baked in. By processing everything locally, we ensure your <strong>private documents are never uploaded</strong>. Whether it's a confidential bank statement or a personal ID scan, your data remains with you. Rotate your PDFs with confidence using the world's most secure and user-friendly document toolkit.</p>
                        <p>Keywords: Rotate PDF, Change PDF Orientation, Fix Crooked PDF, Online PDF Rotator, Free PDF Flip, Permanent PDF Rotation, Secure PDF Tools, Landscape to Portrait PDF.</p>
                      </div>
                    }
                  >
                    <RotateTool />
                  </ToolPageWrapper>
                } />

                <Route path="/protect" element={
                  <ToolPageWrapper 
                    title="Protect PDF Security" 
                    description="Add a strong password to your PDF to secure sensitive information." 
                    icon={getToolData('protect')?.icon!}
                    color={getToolData('protect')?.color!}
                    seoContent={
                      <div className="space-y-6 text-sm text-gray-500 font-medium leading-relaxed">
                        <p><strong>Protect PDF Online</strong>: Secure your most sensitive information with industrial-grade password protection using PDF Saathi’s <strong>PDF security tool</strong>. Whether you are sharing financial records, payroll data, or confidential legal documents, adding a password is the first line of defense against unauthorized access. Our tool allows you to <strong>lock PDFs with a password</strong>, ensuring that only trusted parties can view the content.</p>
                        <p>In the digital age, <strong>unprotected PDFs</strong> are a major security liability. A single accidental "CC" on an email can expose sensitive internal memos or private customer data. Our <strong>PDF encryption utility</strong> uses the same cryptographic standards relied upon by banks and government agencies. By applying a strong user password, you ensure that the content remains encrypted and unreadable to anyone without the key.</p>
                        <p><strong>Zero-Server Privacy:</strong> This is where PDF Saathi truly shines. Most protection tools require you to send your password and file to their server. We believe that is a fundamental flaw in security. Our <strong>local PDF protection</strong> encrypts the document entirely within your browser's memory. Your password never touches our servers, and your file never leaves your machine. It is <strong>Zero-Knowledge PDF security</strong> at its finest.</p>
                        <p>Simple, free, and incredibly powerful—our <strong>online PDF locker</strong> is designed for the modern security-conscious professional. Protect your reputation and your data by securing every outgoing document with PDF Saathi's reliable security suite.</p>
                        <p>Keywords: Protect PDF, Password Protect PDF, Secure PDF Online, Lock PDF, PDF Encryption, Free PDF Security, Encrypt PDF File, Safe PDF Locker, Zero-Knowledge Encryption.</p>
                      </div>
                    }
                  >
                    <ProtectTool />
                  </ToolPageWrapper>
                } />

                <Route path="/unlock" element={
                  <ToolPageWrapper 
                    title="Unlock PDF Online" 
                    description="Remove password security from your PDF to access it freely." 
                    icon={getToolData('unlock')?.icon!}
                    color={getToolData('unlock')?.color!}
                    seoContent={
                      <div className="space-y-6 text-sm text-gray-500 font-medium leading-relaxed">
                        <p><strong>Unlock PDF Online</strong>: Remove restrictions and passwords from your PDF files instantly with PDF Saathi. Often, we receive protected documents where the password is known but burdensome for daily use. Our <strong>PDF unlocker</strong> allows you to strip away these security layers, giving you full access to copy, edit, and print your documents without repetitive authentication.</p>
                        <p>Our <strong>PDF password remover</strong> is designed for convenience. It doesn't "crack" passwords; rather, it uses a provided password to de-crypt the PDF stream and save a new, unlocked version of the file. This is ideal for archiving documents for personal use or preparing files for systems that do not support encrypted PDF attachments.</p>
                        <p>Keywords: Unlock PDF, Remove PDF Password, PDF Decrypter, Open Protected PDF, Free PDF Unlocker Online, Secure Password Removal.</p>
                      </div>
                    }
                  >
                    <UnlockTool />
                  </ToolPageWrapper>
                } />

                <Route path="/metadata" element={
                  <ToolPageWrapper 
                    title="Metadata Scrub" 
                    description="Remove hidden tracking metadata from your PDF files for ultimate privacy." 
                    icon={getToolData('metadata')?.icon!}
                    color={getToolData('metadata')?.color!}
                    seoContent={
                      <div className="space-y-6 text-sm text-gray-500 font-medium leading-relaxed">
                        <p><strong>PDF Metadata Scrubber</strong>: Ensure your documents are truly private by removing hidden metadata before sharing. Every PDF contains internal information like the author's name, the software used to create it, and even the exact date and time of modification. Our <strong>metadata removal tool</strong> strips away these hidden identifiers, ensuring your anonymity.</p>
                        <p>Privacy is more than just encrypting content. By <strong>cleaning PDF metadata</strong>, you prevent accidental leaks of internal company information or personal computer names. This is an essential step for journalists, whistleblowers, and corporate professionals who need to share documents securely.</p>
                        <p>Keywords: Remove PDF Metadata, Clean PDF, PDF Privacy Tool, Scrub PDF, Hidden Data Remover, Anonymous PDF sharing.</p>
                      </div>
                    }
                  >
                    <MetadataTool />
                  </ToolPageWrapper>
                } />

                <Route path="/remove-pages" element={
                  <ToolPageWrapper 
                    title="Remove PDF Pages" 
                    description="Delete unnecessary pages from your PDF file instantly." 
                    icon={getToolData('remove-pages')?.icon!}
                    color={getToolData('remove-pages')?.color!}
                    seoContent={
                      <div className="space-y-6 text-sm text-gray-500 font-medium leading-relaxed">
                        <p><strong>Remove PDF Pages Online</strong>: Clean up your PDF documents by instantly deleting unnecessary or sensitive pages with PDF Saathi. Often, a large document contains filler pages, old drafts, or confidential annexes that you don't want to share. Our <strong>PDF page removal tool</strong> allows you to precisely target and discard these pages, leaving you with a lean and professional final document.</p>
                        <p>How do you effectively <strong>prune a PDF file</strong>? Beyond simply deleting a page, our tool understands the internal cross-reference table of the PDF format. When you discard a page, we ensure that the page numbering, internal links, and document outline are re-cached correctly. This results in a smaller, <strong>optimized PDF document</strong> that is easier to navigate and faster to load. It is the perfect solution for preparing final submissions by removing rough work or duplicate scans.</p>
                        <p><strong>Use Cases for Professionals:</strong> HR Managers use our tool to remove sensitive candidate information from shared reports, Legal assistants use it to strip out non-relevant clauses for clients, and Students use it to trim down oversized ebooks to just the required chapters. Our <strong>free PDF page deleter</strong> is designed to be fast and completely intuitive—no tutorials required.</p>
                        <p>As always, your <strong>privacy is guaranteed</strong>. All page manipulation is performed in your browser's private sandbox. We never see your pages, and your files never touch a cloud server. This <strong>secure PDF trimming</strong> is a major advantage for those handling restricted or private data. Prune your documents with ease and total peace of mind today.</p>
                        <p>Keywords: Remove PDF Pages, Delete PDF Pages, PDF Page Remover, Trim PDF, Online PDF Cutter, Free PDF Page Deletion, Secure PDF Editor, Prune PDF File, Local PDF Trimmer.</p>
                      </div>
                    }
                  >
                    <RemovePagesTool />
                  </ToolPageWrapper>
                } />

                <Route path="/text-to-pdf" element={
                  <ToolPageWrapper 
                    title="Text to PDF Creator" 
                    description="Write or paste text and convert it into a clean PDF document." 
                    icon={getToolData('text-to-pdf')?.icon!}
                    color={getToolData('text-to-pdf')?.color!}
                    seoContent={
                      <div className="space-y-6 text-sm text-gray-500 font-medium leading-relaxed">
                        <p><strong>Text to PDF Creator</strong>: Transform your drafts, notes, and plain text into professionally formatted PDF documents instantly. PDF Saathi’s <strong>online PDF generator</strong> allows you to type or paste content directly into the browser and output a clean, high-resolution PDF file. This is the perfect solution for creating formal letters, study notes, or quick documentation on the fly.</p>
                        <p>Why use an <strong>online text-to-PDF utility</strong>? Sometimes you don't have access to a full word processor but need to send a professional-looking letter or memo. Our tool provides a focused writing environment that exports directly to a <strong>standardized PDF container</strong>. We ensure that your text is rendered with high-fidelity fonts that are universally compatible with all devices, from e-readers to office printers.</p>
                        <p><strong>Speed & Customization:</strong> Our engine is built for <strong>instant PDF generation</strong>. As you type or paste your content, we calculate the page layout in real-time. The resulting PDF is lightweight, searchable, and follows all modern document accessibility standards. This <strong>free PDF maker</strong> is ideal for developers creating quick README documents, or writers drafting snippets that need to be shared in a non-editable format.</p>
                        <p>Your <strong>security is our priority</strong>. Your text is never sent to a backend server; it remains in your browser's local state until you initialize the download. This level of <strong>private document creation</strong> is unmatched. Write your confidential memos or quick notes directly to PDF with the peace of mind that only PDF Saathi's local processing can provide.</p>
                        <p>Keywords: Text to PDF, Online PDF Creator, Free PDF Generator, Convert Text to PDF, Write PDF Online, Instant PDF Maker, Private PDF Creation Tool, Plain Text to PDF.</p>
                      </div>
                    }
                  >
                    <TextToPdfTool />
                  </ToolPageWrapper>
                } />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pb-12">
          <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-2 opacity-30 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
               <FileText className="w-4 h-4" />
               <span>PDF SAATHI &trade; ECOSYSTEM</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 opacity-40 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
              <a href="#" className="hover:text-red-600 transition-colors">Global Security</a>
              <a href="#" className="hover:text-red-600 transition-colors">Privacy Trust</a>
              <a href="#" className="hover:text-red-600 transition-colors">Legal Terms</a>
              <a href="#" className="hover:text-red-600 transition-colors">Developer API</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router basename="/pdf_saathi">
      <ScrollToTop />
      <MainLayout />
    </Router>
  );
}

