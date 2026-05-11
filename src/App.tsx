/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Department, 
  UseCase, 
  Idea, 
  Recommendation 
} from './types';
import { DEPARTMENTS, CATALOG_DATA } from './constants';
import UseCaseCard from './components/UseCaseCard';
import UseCaseModal from './components/UseCaseModal';
import ScoreIdeaForm from './components/ScoreIdeaForm';
import IdeaCard from './components/IdeaCard';
import Dashboard from './components/Dashboard';
import { 
  Library, 
  Calculator, 
  ListTodo, 
  LayoutDashboard, 
  Search,
  PlusCircle,
  BrainCircuit,
  Filter,
  Zap
} from 'lucide-react';

type View = 'catalog' | 'score' | 'ideas' | 'dashboard';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedDept, setSelectedDept] = useState<Department>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [ideas, setIdeas] = useState<Idea[]>([]);

  // Load ideas from local storage
  useEffect(() => {
    const saved = localStorage.getItem('ai_opportunity_hub_ideas');
    if (saved) {
      try {
        setIdeas(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved ideas', e);
      }
    }
  }, []);

  // Save ideas to local storage
  useEffect(() => {
    localStorage.setItem('ai_opportunity_hub_ideas', JSON.stringify(ideas));
  }, [ideas]);

  const filteredCatalog = useMemo(() => {
    return CATALOG_DATA.filter(uc => {
      const matchDept = selectedDept === 'All' || uc.department === selectedDept;
      const matchSearch = uc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          uc.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDept && matchSearch;
    });
  }, [selectedDept, searchQuery]);

  const handleAddIdea = (newIdeaData: Omit<Idea, 'id' | 'totalScore' | 'recommendation' | 'createdAt'>) => {
    const score = newIdeaData.reach + newIdeaData.impact + newIdeaData.feasibility;
    const getRec = (s: number): Recommendation => {
      if (s >= 13) return 'Pursue';
      if (s >= 10) return 'Pilot';
      if (s >= 7) return 'Refine';
      return 'Park';
    };

    const idea: Idea = {
      ...newIdeaData,
      id: Math.random().toString(36).substr(2, 9),
      totalScore: score,
      recommendation: getRec(score),
      createdAt: Date.now()
    };

    setIdeas(prev => [idea, ...prev]);
    setActiveView('ideas'); // Switch to ideas view after submission
  };

  const handleDeleteIdea = (id: string) => {
    setIdeas(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Sidebar / Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => setActiveView('catalog')}
            >
              <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-all shadow-lg shadow-indigo-600/20">
                <BrainCircuit className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white uppercase italic">
                AI <span className="text-indigo-400 not-italic">OPPORTUNITY</span>
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {[
                { id: 'catalog', label: 'Catalog', icon: Library },
                { id: 'score', label: 'Score Idea', icon: Calculator },
                { id: 'ideas', label: 'Pipeline', icon: ListTodo },
                { id: 'dashboard', label: 'Insights', icon: LayoutDashboard },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as View)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeView === item.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveView('score')}
                className="md:hidden bg-indigo-600 text-white p-2 rounded-lg"
              >
                <PlusCircle size={20} />
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-full">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                  <span className="text-[10px] font-black text-white">JD</span>
                </div>
                <span className="text-xs font-bold text-slate-300 hidden sm:inline">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeView === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              {/* Hero Section */}
              <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                  <Zap size={12} />
                  Enterprise AI Discovery
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
                  Discover Your <br/>
                  <span className="text-indigo-400">Next Big Win</span>
                </h2>
                <p className="text-slate-400 text-lg">
                  Curated library of high-impact AI use cases vetted for feasibility.
                </p>
              </div>

              {/* Filters */}
              <div className="bento-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-[4.5rem] z-30 ring-1 ring-white/5">
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mr-2 shrink-0 flex items-center gap-1">
                    <Filter size={12} />
                    Dept
                  </span>
                  {['All', ...DEPARTMENTS].map(dept => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDept(dept as Department)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
                        selectedDept === dept 
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20' 
                        : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-700/50 hover:text-white'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    type="text"
                    placeholder="Search use cases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Catalog Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredCatalog.map(uc => (
                  <UseCaseCard 
                    key={uc.id} 
                    useCase={uc} 
                    onViewDetails={setSelectedUseCase} 
                  />
                ))}
                {filteredCatalog.length === 0 && (
                  <div className="col-span-full py-24 text-center bento-card">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-600 mb-4 border border-slate-700">
                      <Search size={32} />
                    </div>
                    <p className="text-slate-400 font-medium">No matches found.</p>
                    <button 
                      onClick={() => {setSelectedDept('All'); setSearchQuery('');}}
                      className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors mt-2"
                    >
                      Reset filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeView === 'score' && (
            <motion.div
              key="score"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-10 text-center">
                <h2 className="text-4xl font-black text-white mb-2">Score New Idea</h2>
                <p className="text-slate-400">Validate opportunities with the RIF framework.</p>
              </div>
              <ScoreIdeaForm onSubmit={handleAddIdea} />
            </motion.div>
          )}

          {activeView === 'ideas' && (
            <motion.div
              key="ideas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900/50 p-6 rounded-2xl border border-slate-800 gap-4 mb-4">
                <div>
                  <h2 className="text-3xl font-black text-white leading-none">Opportunity Pipeline</h2>
                  <p className="text-slate-500 mt-2">Vetted AI ideas ready for decision.</p>
                </div>
                <button 
                  onClick={() => setActiveView('score')}
                  className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                  <PlusCircle size={18} />
                  Add New Opportunity
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {ideas.map(idea => (
                  <IdeaCard 
                    key={idea.id} 
                    idea={idea} 
                    onDelete={handleDeleteIdea} 
                  />
                ))}
                
                {ideas.length === 0 && (
                  <div className="py-24 text-center bento-card bg-slate-900/30 border-dashed border-2">
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-600 mb-6">
                      <ListTodo size={40} />
                    </div>
                    <div className="max-w-xs mx-auto space-y-4">
                       <h3 className="text-xl font-bold text-white">Your pipeline is empty</h3>
                       <p className="text-slate-500">Capture internal pain points and score them to see recommendations.</p>
                       <button 
                        onClick={() => setActiveView('score')}
                        className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all"
                      >
                        Start Evaluation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <div className="mb-10">
                <h2 className="text-4xl font-black text-white leading-none">Hub Pulse</h2>
                <p className="text-slate-500 mt-2 font-medium">Real-time metrics on AI adoption and demand.</p>
              </div>
              <Dashboard ideas={ideas} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Nav Bar */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-[340px]">
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl flex justify-around p-2 ring-1 ring-white/5">
           {[
            { id: 'catalog', icon: Library, label: 'Browse' },
            { id: 'ideas', icon: ListTodo, label: 'Ideas' },
            { id: 'dashboard', icon: LayoutDashboard, label: 'Pulse' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all grow ${
                activeView === item.id ? 'text-indigo-400 bg-white/10' : 'text-slate-500'
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <UseCaseModal 
        useCase={selectedUseCase} 
        onClose={() => setSelectedUseCase(null)} 
      />
    </div>
  );
}
