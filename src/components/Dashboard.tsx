/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Idea, Recommendation, Department } from '../types';
import { DEPARTMENTS, CATALOG_DATA } from '../constants';
import { BarChart3, Lightbulb, CheckCircle2, FlaskConical, PenTool, Archive, BrainCircuit, Filter, TrendingUp, Zap, Settings } from 'lucide-react';

interface DashboardProps {
  ideas: Idea[];
}

export default function Dashboard({ ideas }: DashboardProps) {
  const [activeDept, setActiveDept] = useState<Department>('All');

  const filteredIdeas = useMemo(() => {
    if (activeDept === 'All') return ideas;
    return ideas.filter(i => i.department === activeDept);
  }, [ideas, activeDept]);

  const getCount = (r: Recommendation) => filteredIdeas.filter(i => i.recommendation === r).length;

  const stats = [
    { label: 'Catalog', value: CATALOG_DATA.length, icon: Archive, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Vetted Ideas', value: filteredIdeas.length, icon: Lightbulb, color: 'text-white', bg: 'bg-white/10' },
    { label: 'Pursue', value: getCount('Pursue'), icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Pilot', value: getCount('Pilot'), icon: FlaskConical, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Refine', value: getCount('Refine'), icon: PenTool, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Park', value: getCount('Park'), icon: BarChart3, color: 'text-slate-400', bg: 'bg-slate-500/10' },
  ];

  const deptCounts = DEPARTMENTS.reduce((acc, dept) => {
    acc[dept] = ideas.filter(i => i.department === dept).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      {/* Dashboard Toolbar */}
      <div className="bento-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between ring-1 ring-white/5 bg-slate-900/40">
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mr-2 shrink-0 flex items-center gap-1">
            <Filter size={12} />
            Slice by Dept
          </span>
          {['All', ...DEPARTMENTS].map(dept => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept as Department)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
                activeDept === dept 
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20' 
                : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bento-card p-5 group hover:border-white/20 transition-all">
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              <stat.icon size={20} />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12 xl:col-span-8 bento-card p-8 bg-gradient-to-br from-slate-900/60 to-slate-900/90">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 size={20} className="text-indigo-400" />
              Organizational Distribution
            </h3>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Demand</span>
                </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            {DEPARTMENTS.map(dept => {
              const count = deptCounts[dept];
              const maxCount = Math.max(...Object.values(deptCounts), 1);
              const percentage = (count / maxCount) * 100;

              return (
                <div key={dept} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${activeDept === dept ? 'text-indigo-400' : 'text-slate-500'}`}>
                        {dept}
                    </span>
                    <span className="text-white font-black text-xs">{count} <span className="text-slate-600 text-[10px]">IDEAS</span></span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        activeDept === dept ? 'bg-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.8)]' : 'bg-slate-700'
                      }`} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-4 bento-card p-8 bg-indigo-600 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 text-indigo-400 opacity-20 rotate-12 scale-150 transition-transform group-hover:rotate-45 duration-700">
                <BrainCircuit size={200} />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center">
                <h3 className="text-3xl font-black text-white mb-4 italic tracking-tighter">Strategic Impact</h3>
                <p className="text-indigo-100 mb-8 leading-relaxed font-medium">
                    Filtered view for <span className="text-white font-black underline decoration-indigo-400 underline-offset-4">{activeDept}</span>. 
                    {filteredIdeas.length > 0 
                      ? ` Identified ${filteredIdeas.length} high-potential internal transformations.` 
                      : " No active submissions for this function. Explore the catalog for inspiration."}
                </p>
                <div className="flex flex-wrap gap-2">
                    <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10 flex items-center gap-2">
                        <TrendingUp size={14} className="text-indigo-300" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Efficiency First</span>
                    </div>
                    <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10 flex items-center gap-2">
                        <Zap size={14} className="text-indigo-300" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Rapid ROI</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* High Potential Opportunities */}
      {filteredIdeas.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp size={20} className="text-emerald-400" />
              High Potential Roadmap
            </h3>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Prioritized by Score</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIdeas
              .sort((a, b) => b.totalScore - a.totalScore)
              .slice(0, 6)
              .map(idea => (
                <div key={idea.id} className="bento-card p-6 bg-slate-900 shadow-xl hover:bg-slate-800/50 transition-all border-l-4 border-l-indigo-500 group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded">
                      {idea.department}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-black text-white">{idea.totalScore}</span>
                      <span className="text-[8px] font-bold text-slate-500 uppercase">Score</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 line-clamp-1 group-hover:text-indigo-300 transition-colors">{idea.title}</h4>
                  <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      idea.recommendation === 'Pursue' ? 'text-emerald-400' :
                      idea.recommendation === 'Pilot' ? 'text-amber-400' :
                      idea.recommendation === 'Refine' ? 'text-blue-400' : 'text-slate-500'
                    }`}>
                      {idea.recommendation}
                    </span>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 opacity-50">
                            <Zap size={10} className="text-slate-400" />
                            <span className="text-[9px] font-medium text-slate-400">{idea.impact}</span>
                        </div>
                        <div className="flex items-center gap-1 opacity-50">
                            <Settings size={10} className="text-slate-400" />
                            <span className="text-[9px] font-medium text-slate-400">{idea.feasibility}</span>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
