import React, { useState } from 'react';
import { FileUploader } from '../FileUploader';
import { extractTextFromPDF } from '@/lib/pdf-text';
import { summarizePDF, chatWithPDF } from '@/services/geminiService';
import { Loader2, Sparkles, Send, Bot, User, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

export const AITool: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [extractedText, setExtractedText] = useState('');
  const [summary, setSummary] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const handleProcess = async (uploadedFiles: File[]) => {
    if (uploadedFiles.length === 0) return;
    setFiles(uploadedFiles.slice(0, 1));
    setIsProcessing(true);
    setSummary('');
    setChatHistory([]);
    try {
      const text = await extractTextFromPDF(uploadedFiles[0]);
      setExtractedText(text);
    } catch (error) {
      console.error('Extraction failed:', error);
      alert('Failed to read PDF content.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSummarize = async () => {
    if (!extractedText) return;
    setIsSummarizing(true);
    try {
      const result = await summarizePDF(extractedText);
      setSummary(result || 'Failed to generate summary.');
    } catch (error) {
      console.error('Summary failed:', error);
      alert('AI Summarization failed. Please check your Gemini API key.');
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleChat = async () => {
    if (!extractedText || !question.trim()) return;
    const userMsg: Message = { role: 'user', parts: [{ text: question }] };
    setChatHistory(prev => [...prev, userMsg]);
    const currentQuestion = question;
    setQuestion('');
    setIsChatting(true);

    try {
      const result = await chatWithPDF(extractedText, currentQuestion, chatHistory);
      const modelMsg: Message = { role: 'model', parts: [{ text: result || 'I am sorry, I could not answer that.' }] };
      setChatHistory(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error('Chat failed:', error);
      alert('AI Chat failed.');
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      {!extractedText ? (
        <FileUploader 
          files={files} 
          onFilesChange={handleProcess} 
          multiple={false}
          label="Upload a PDF for AI Analysis"
        />
      ) : (
        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border border-purple-100">
          <div className="flex items-center space-x-3">
            <Bot className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-900 truncate max-w-[200px]">{files[0].name}</span>
          </div>
          <button 
            onClick={() => {
              setExtractedText('');
              setFiles([]);
              setSummary('');
              setChatHistory([]);
            }}
            className="p-2 hover:bg-purple-100 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4 text-purple-600" />
          </button>
        </div>
      )}

      {isProcessing && (
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          <p className="text-sm text-gray-500">Reading document contents...</p>
        </div>
      )}

      {extractedText && !isProcessing && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Summary Section */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 border-bottom border-gray-50 flex items-center justify-between bg-gray-50/30">
              <h3 className="font-semibold text-gray-900">AI Summary</h3>
              {!summary && (
                <button
                  onClick={handleSummarize}
                  disabled={isSummarizing}
                  className="px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isSummarizing ? 'Generating...' : 'Generate Summary'}
                </button>
              )}
            </div>
            {summary && (
              <div className="p-6 prose prose-sm max-w-none text-gray-700">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            )}
            {!summary && !isSummarizing && (
              <div className="p-12 text-center text-gray-400 text-sm italic">
                Get a quick overview of your document.
              </div>
            )}
            {isSummarizing && (
               <div className="p-8 flex flex-col items-center justify-center space-y-3">
                 <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                 <span className="text-xs text-purple-600 font-medium">Brewing a summary...</span>
               </div>
            )}
          </div>

          {/* Chat Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 px-2">Ask Questions</h3>
            <div className="bg-gray-50 rounded-3xl border border-gray-100 flex flex-col min-h-[400px]">
              <div className="flex-1 p-6 space-y-4 max-h-[500px] overflow-y-auto">
                <AnimatePresence initial={false}>
                  {chatHistory.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-2 opacity-30 grayscale py-8">
                      <Bot className="w-12 h-12" />
                      <p className="text-sm">Ask anything about the document.</p>
                    </div>
                  ) : (
                    chatHistory.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "flex items-start space-x-3 max-w-[85%]",
                          msg.role === 'user' ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
                        )}
                      >
                        <div className={cn(
                          "p-2 rounded-full flex-shrink-0",
                          msg.role === 'user' ? "bg-black" : "bg-purple-600"
                        )}>
                          {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                        </div>
                        <div className={cn(
                          "px-4 py-3 rounded-2xl text-sm shadow-sm",
                          msg.role === 'user' ? "bg-black text-white rounded-tr-none" : "bg-white text-gray-800 border border-purple-50 rounded-tl-none"
                        )}>
                          <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                        </div>
                      </motion.div>
                    ))
                  )}
                  {isChatting && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start space-x-3 mr-auto"
                    >
                      <div className="bg-purple-600 p-2 rounded-full flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-purple-50">
                        <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-4 bg-white border-t border-gray-100 rounded-b-3xl">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                    placeholder="Ask about something in the PDF..."
                    className="w-full px-5 py-3 pr-12 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 outline-none transition-all text-sm"
                  />
                  <button
                    onClick={handleChat}
                    disabled={!question.trim() || isChatting}
                    className="absolute right-2 p-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all disabled:opacity-50 disabled:grayscale"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
