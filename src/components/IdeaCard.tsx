/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Idea } from '../types';
import { Calendar, Trash2 } from 'lucide-react';

interface IdeaCardProps {
  idea: Idea;
  onDelete: (id: string) => void;
  key?: React.Key;
}

export default function IdeaCard({ idea, onDelete }: IdeaCardProps) {
  const recStyle = {
    Pursue: 'status-pursue',
    Pilot: 'status-pilot',
    Refine: 'status-refine',
    Park: 'status-park',
  }[idea.recommendation];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bento-card p-6 flex flex-col md:flex-row gap-6 hover:border-indigo-500/30 transition-colors group relative"
    >
      <div className="flex flex-col items-center justify-center p-4 bg-slate-800/40 rounded-xl min-w-[120px] border border-slate-700/50">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Impact Score</p>
        <div className="flex items-center gap-2">
            <span className="text-4xl font-black text-white">{idea.totalScore}</span>
            <span className="text-slate-600 font-bold self-end mb-1">/15</span>
        </div>
        <div className={`mt-3 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${recStyle}`}>
          {idea.recommendation}
        </div>
      </div>

      <div className="grow space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
            {idea.department}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold tracking-widest uppercase">
            <Calendar size={12} className="text-indigo-500" />
            {new Date(idea.createdAt).toLocaleDateString()}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white tracking-tight">{idea.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">{idea.description}</p>
        
        {idea.notes && (
          <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Strategy Notes</p>
            <p className="text-indigo-200/70 text-xs italic leading-relaxed">{idea.notes}</p>
          </div>
        )}

        <div className="pt-2 grid grid-cols-3 sm:flex gap-6">
          {[
            { label: 'Reach', val: idea.reach },
            { label: 'Impact', val: idea.impact },
            { label: 'Feasibility', val: idea.feasibility }
          ].map(metric => (
            <div key={metric.label} className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">{metric.label}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(v => (
                  <div key={v} className={`w-3.5 h-1.5 rounded-sm ${v <= metric.val ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onDelete(idea.id)}
        className="absolute top-4 right-4 p-2 text-slate-600 hover:text-rose-500 transition-all hover:bg-rose-500/10 rounded-lg group-hover:opacity-100 md:opacity-0"
        title="Delete"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
}
