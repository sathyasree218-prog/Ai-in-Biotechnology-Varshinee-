import React from 'react';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';
import { ArrowLeft, Download, Share2 } from 'lucide-react';

interface Props {
  content: string;
  onBack: () => void;
}

export default function AnalysisResult({ content, onBack }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="flex justify-between items-center mb-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-brand-800 hover:opacity-70 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Form
        </button>
        <div className="flex gap-4">
          <button className="p-2 rounded-full hover:bg-brand-100 transition-all text-brand-800">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-brand-100 transition-all text-brand-800">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="glass-card p-10 md:p-16 mb-12">
        <div className="prose max-w-none prose-headings:font-serif prose-headings:font-normal prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-brand-900/80 prose-li:text-brand-900/80">
          <Markdown>{content}</Markdown>
        </div>
      </div>

      <div className="text-center pb-12">
        <p className="text-sm text-brand-800/40 italic">
          Disclaimer: This analysis is for educational purposes only and does not constitute medical advice. 
          Always consult with a board-certified dermatologist for medical concerns.
        </p>
      </div>
    </motion.div>
  );
}
