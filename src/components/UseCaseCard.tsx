/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { UseCase } from '../types';
import { ChevronRight, Info } from 'lucide-react';

interface UseCaseCardProps {
  useCase: UseCase;
  onViewDetails: (uc: UseCase) => void;
  key?: React.Key;
}

export default function UseCaseCard({ useCase, onViewDetails }: UseCaseCardProps) {
  const complexityColor = {
    Low: 'status-pursue text-[10px]',
    Medium: 'status-pilot text-[10px]',
    High: 'status-refine text-[10px]',
  }[useCase.complexity];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bento-card p-5 group flex flex-col h-full cursor-pointer hover:border-indigo-500/50 transition-all duration-300 bg-gradient-to-br from-slate-900/40 to-slate-900/80"
      onClick={() => onViewDetails(useCase)}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-800/50 px-2 py-1 rounded border border-slate-700/50">
          {useCase.department}
        </span>
        <span className={`font-bold uppercase tracking-widest px-2 py-1 rounded ${complexityColor}`}>
          {useCase.complexity}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors leading-tight tracking-tight">
        {useCase.title}
      </h3>
      
      <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
        {useCase.description}
      </p>
      
      <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex -space-x-1.5 scrollbar-hide">
          {useCase.kpis.slice(0, 2).map((kpi, idx) => (
            <div key={idx} className="inline-flex items-center justify-center h-6 px-2 text-[9px] font-bold uppercase tracking-wider bg-slate-800 text-slate-500 border border-slate-700 rounded-full">
              {kpi}
            </div>
          ))}
        </div>
        <button className="text-indigo-400 font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
          EXPLORE
          <ChevronRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}
