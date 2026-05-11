/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { UseCase } from '../types';
import { X, TrendingUp, ShieldAlert, Zap, Settings } from 'lucide-react';

interface UseCaseModalProps {
  useCase: UseCase | null;
  onClose: () => void;
}

export default function UseCaseModal({ useCase, onClose }: UseCaseModalProps) {
  if (!useCase) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-slate-900 border border-white/10 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col ring-1 ring-white/5"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex justify-between items-start bg-gradient-to-r from-slate-900 to-indigo-900/20">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
                  {useCase.department}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Ref: {useCase.id}
                </span>
              </div>
              <h2 className="text-3xl font-black text-white leading-tight tracking-tight">
                {useCase.title}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-500 hover:text-white border border-transparent hover:border-white/10"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto grow space-y-10 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4 flex items-center gap-2">
                  <span className="w-6 h-[1px] bg-rose-500/30"></span>
                  The Problem
                </h3>
                <div className="bg-rose-500/5 p-5 rounded-2xl border border-rose-500/10">
                  <div className="flex gap-4 items-start">
                    <ShieldAlert className="text-rose-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-slate-300 text-sm leading-relaxed">{useCase.painPoint}</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4 flex items-center gap-2">
                  <span className="w-6 h-[1px] bg-emerald-500/30"></span>
                  The Benefit
                </h3>
                <div className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10">
                  <div className="flex gap-4 items-start">
                    <Zap className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-slate-300 text-sm leading-relaxed">{useCase.benefit}</p>
                  </div>
                </div>
              </section>
            </div>

            <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4 flex items-center gap-2">
                  <span className="w-10 h-[1px] bg-indigo-500/30"></span>
                  Detailed Description
                </h3>
                <p className="text-slate-400 text-base leading-relaxed bg-white/2 p-6 rounded-2xl border border-white/5">
                  {useCase.description}
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4 flex items-center gap-2">
                  <TrendingUp size={14} className="text-indigo-400" />
                  Key Results
                </h3>
                <div className="flex flex-wrap gap-2">
                  {useCase.kpis.map((kpi, idx) => (
                    <div key={idx} className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs font-bold text-slate-300">
                      {kpi}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4 flex items-center gap-2">
                  Engineering Complexity
                </h3>
                <div className="bg-slate-800/30 p-5 rounded-2xl border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-white mb-1">{useCase.complexity}</p>
                    <p className="text-[10px] font-medium text-slate-500 italic max-w-[140px]">
                      {useCase.complexity === 'Low' ? 'Rapid deployment.' : 
                       useCase.complexity === 'Medium' ? 'Pipeline required.' : 
                       'Deep integration.'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                    <Settings className="text-indigo-400" size={24} />
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 bg-slate-900 border-t border-white/5 flex gap-4">
            <button
              onClick={onClose}
              className="grow py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-[0.2em] text-xs rounded-xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              CLOSE EXPLORER
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
