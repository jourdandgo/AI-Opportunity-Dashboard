/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Recommendation, Department, Idea } from '../types';
import { DEPARTMENTS } from '../constants';
import { Calculator, Send, AlertCircle, TrendingUp, Zap, Settings, PlusCircle } from 'lucide-react';

interface ScoreIdeaFormProps {
  onSubmit: (idea: Omit<Idea, 'id' | 'totalScore' | 'recommendation' | 'createdAt'>) => void;
}

export default function ScoreIdeaForm({ onSubmit }: ScoreIdeaFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState<Department>('HR');
  const [notes, setNotes] = useState('');
  const [reach, setReach] = useState(3);
  const [impact, setImpact] = useState(3);
  const [feasibility, setFeasibility] = useState(3);

  const totalScore = reach + impact + feasibility;

  const getRecommendation = (score: number): Recommendation => {
    if (score >= 13) return 'Pursue';
    if (score >= 10) return 'Pilot';
    if (score >= 7) return 'Refine';
    return 'Park';
  };

  const rec = getRecommendation(totalScore);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    
    onSubmit({
      title,
      description,
      department,
      notes,
      reach,
      impact,
      feasibility
    });

    setTitle('');
    setDescription('');
    setNotes('');
    setReach(3);
    setImpact(3);
    setFeasibility(3);
  };

  const ScoreSlider = ({ 
    label, 
    value, 
    onChange, 
    icon: Icon,
    description 
  }: { 
    label: string, 
    value: number, 
    onChange: (v: number) => void,
    icon: any,
    description: string
  }) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-300/80 flex items-center gap-2">
          <Icon size={14} className="text-indigo-400" />
          {label}
        </label>
        <span className="text-sm font-black text-white bg-white/10 w-8 h-8 flex items-center justify-center rounded-lg border border-white/10">
          {value}
        </span>
      </div>
      <p className="text-[10px] text-indigo-200/50 italic mb-2 tracking-wide font-medium">{description}</p>
      <div className="relative group/slider">
          <input
            type="range"
            min="1"
            max="5"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-indigo-900 rounded-full appearance-none cursor-pointer accent-white transition-all ring-offset-indigo-900 focus:ring-2 focus:ring-white/20"
          />
      </div>
      <div className="flex justify-between text-[9px] font-black text-indigo-800 tracking-[0.3em] uppercase">
        <span>MIN</span>
        <span>MAX</span>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
      {/* Left Col: Info */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="bento-card p-8 bg-slate-900/40 relative overflow-hidden h-full">
          <div className="absolute top-0 right-0 p-8 text-indigo-500/10 pointer-events-none">
            <Send size={160} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <PlusCircle size={20} className="text-white" />
            </div>
            Capture Opportunity
          </h2>
          
          <form id="idea-form" onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Opportunity Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., automated rfp responder"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-slate-700 font-semibold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as Department)}
                  className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white font-semibold appearance-none cursor-pointer"
                >
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Problem Description</label>
              <textarea
                required
                rows={4}
                placeholder="What pain point does this AI solution solve? Be specific..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none text-white placeholder-slate-700 leading-relaxed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Implementation Notes</label>
              <textarea
                rows={2}
                placeholder="Optional: Technical hurdles, existing data sources..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none text-white placeholder-slate-700 text-sm italic"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Right Col: Scoring */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="bento-card p-8 bg-indigo-950 font-sans border-indigo-500/30 flex flex-col h-full ring-1 ring-indigo-500/20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-white uppercase italic tracking-tighter">
                Logic <span className="text-indigo-400">Framework</span>
            </h2>
            <Calculator size={20} className="text-indigo-400" />
          </div>

          <div className="space-y-10 grow">
            <ScoreSlider
              label="Reach"
              value={reach}
              onChange={setReach}
              icon={TrendingUp}
              description="Scaling potential across teams."
            />
            <ScoreSlider
              label="Impact"
              value={impact}
              onChange={setImpact}
              icon={Zap}
              description="Value generated if successful."
            />
            <ScoreSlider
              label="Feasibility"
              value={feasibility}
              onChange={setFeasibility}
              icon={Settings}
              description="Ease of implementation."
            />
          </div>

          <div className="mt-12 space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300/60 mb-1">Result</p>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block ${
                    rec === 'Pursue' ? 'status-pursue' : 
                    rec === 'Pilot' ? 'status-pilot' : 
                    rec === 'Refine' ? 'status-refine' : 
                    'status-park'
                  }`}>
                    {rec}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300/60 mb-1">Score</p>
                  <p className="text-4xl font-black text-white">{totalScore}<span className="text-base text-indigo-400/40">.0</span></p>
                </div>
            </div>

            <button
                form="idea-form"
                type="submit"
                className="w-full py-4 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 uppercase tracking-widest text-xs active:scale-95"
            >
                <PlusCircle size={16} />
                Submit to Pipeline
            </button>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl flex gap-4">
          <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
          <p className="text-xs text-amber-200/70 leading-relaxed italic font-medium">
            High scores (13+) are candidates for direct implementation. Check "Feasibility" first to avoid complex roadblocks.
          </p>
        </div>
      </div>
    </div>
  );
}
