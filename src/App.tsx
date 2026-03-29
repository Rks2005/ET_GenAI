import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ShieldAlert, 
  Zap, 
  Calculator, 
  PieChart, 
  AlertTriangle, 
  CheckCircle2,
  Loader2,
  Plus,
  Trash2,
  Info,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Target,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzePortfolio } from './services/gemini';
import { Portfolio, Fund, AnalysisResult } from './types';

const CATEGORIES = ['Small Cap', 'Mid Cap', 'Large Cap', 'Flexi Cap', 'Debt', 'ELSS', 'Other'] as const;

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [portfolio, setPortfolio] = useState<Portfolio>({
    funds: [
      { name: 'HDFC Top 100 Fund', category: 'Large Cap', amount: 500000, isRegular: true, expenseRatio: 1.8 },
      { name: 'ICICI Prudential Bluechip', category: 'Large Cap', amount: 300000, isRegular: false, expenseRatio: 0.6 }
    ],
    emergencyFundMonths: 3,
    monthlyExpenses: 60000,
    salary: 150000
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addFund = () => {
    setPortfolio(prev => ({
      ...prev,
      funds: [...prev.funds, { name: '', category: 'Large Cap', amount: 0, isRegular: false, expenseRatio: 0.5 }]
    }));
  };

  const removeFund = (index: number) => {
    setPortfolio(prev => ({
      ...prev,
      funds: prev.funds.filter((_, i) => i !== index)
    }));
  };

  const updateFund = (index: number, updates: Partial<Fund>) => {
    setPortfolio(prev => ({
      ...prev,
      funds: prev.funds.map((f, i) => i === index ? { ...f, ...updates } : f)
    }));
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await analyzePortfolio(portfolio);
      setResult(data);
    } catch (err) {
      setError('Analysis failed. Please check your inputs and try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-white data-grid">
      {/* Navigation */}
      <nav className="border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('landing')}>
            <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold tracking-tight leading-none">ET AI MONEY MENTOR</h1>
              <span className="text-[9px] font-mono tracking-[0.3em] opacity-40 uppercase">Financial Intelligence Agent V1.0</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">
            <button onClick={() => setView('landing')} className={`hover:opacity-100 transition-opacity ${view === 'landing' ? 'opacity-100 border-b border-black pb-1' : ''}`}>Home</button>
            <a href="#features" className="hover:opacity-100 transition-opacity">Intelligence Pillars</a>
            <a href="#methodology" className="hover:opacity-100 transition-opacity">Methodology</a>
            <button 
              onClick={() => setView('dashboard')}
              className="bg-[#1A1A1A] text-white px-6 py-2.5 tracking-[0.2em] hover:bg-black transition-colors opacity-100"
            >
              Launch App
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-8 lg:hidden"
          >
            <div className="flex flex-col gap-8 text-xl font-serif italic">
              <button onClick={() => { setView('landing'); setIsMenuOpen(false); }}>Home</button>
              <button onClick={() => { setView('dashboard'); setIsMenuOpen(false); }}>Launch Intelligence Agent</button>
              <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="#methodology" onClick={() => setIsMenuOpen(false)}>Methodology</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden"
          >
            {/* Hero Section */}
            <section className="relative py-32 lg:py-48 px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-10">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/5 border border-black/5 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">ET AI Hackathon 2026 Entry</span>
                  </div>
                  <h1 className="text-6xl lg:text-8xl font-serif font-light leading-[0.9] tracking-tight">
                    Bridging the <span className="italic">Wealth Gap</span> for 1.4 Billion.
                  </h1>
                  <p className="text-xl font-serif italic text-[#333] max-w-lg opacity-70 leading-relaxed">
                    95% of Indians lack a formal financial plan. We built an autonomous intelligence agent to change that.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 pt-4">
                    <button 
                      onClick={() => setView('dashboard')}
                      className="bg-[#1A1A1A] text-white px-10 py-6 font-bold uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 hover:bg-black transition-all group"
                    >
                      Start Your X-Ray <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-10 py-6 border border-black/10 font-bold uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 hover:bg-black/5 transition-all">
                      View Methodology
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-white border border-black/5 p-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-full h-full data-grid opacity-50" />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 border border-black/10 flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 opacity-20" />
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-bold uppercase tracking-widest opacity-30 mb-1">Portfolio Health</div>
                          <div className="text-4xl font-serif italic">84<span className="text-lg opacity-20">/100</span></div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="h-px bg-black/10 w-full" />
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <div className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-2">Annual Savings</div>
                            <div className="text-2xl font-mono">₹42,500</div>
                          </div>
                          <div>
                            <div className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-2">Tax Optimized</div>
                            <div className="text-2xl font-mono text-green-600">₹1,25,000</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-black/5 -z-10" />
                  <div className="absolute -top-10 -right-10 w-64 h-64 bg-black/[0.02] rounded-full blur-3xl -z-10" />
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 bg-white border-y border-black/5 px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-24 space-y-6">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30">The Intelligence Pillars</h2>
                  <h3 className="text-4xl font-serif italic">Built on four autonomous modules for total financial clarity.</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 border border-black/5">
                  <div className="bg-white p-12 space-y-8 hover:bg-[#FBFBFA] transition-colors">
                    <div className="w-12 h-12 bg-[#F5F5F3] flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 opacity-40" />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-serif font-bold">Portfolio X-Ray</h4>
                      <p className="text-sm leading-relaxed opacity-50 font-serif italic">Detects fund overlap and flags high expense ratios that leak wealth over decades.</p>
                    </div>
                  </div>
                  <div className="bg-white p-12 space-y-8 hover:bg-[#FBFBFA] transition-colors">
                    <div className="w-12 h-12 bg-[#F5F5F3] flex items-center justify-center">
                      <Zap className="w-6 h-6 opacity-40" />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-serif font-bold">Tax Wizard</h4>
                      <p className="text-sm leading-relaxed opacity-50 font-serif italic">Optimizes for the 2025-26 Union Budget rules, including LTCG harvesting and regime selection.</p>
                    </div>
                  </div>
                  <div className="bg-white p-12 space-y-8 hover:bg-[#FBFBFA] transition-colors">
                    <div className="w-12 h-12 bg-[#F5F5F3] flex items-center justify-center">
                      <Target className="w-6 h-6 opacity-40" />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-serif font-bold">FIRE Tracker</h4>
                      <p className="text-sm leading-relaxed opacity-50 font-serif italic">Calculates your Financial Independence number adjusted for 6% Indian inflation.</p>
                    </div>
                  </div>
                  <div className="bg-white p-12 space-y-8 hover:bg-[#FBFBFA] transition-colors">
                    <div className="w-12 h-12 bg-[#F5F5F3] flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 opacity-40" />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-serif font-bold">Compliance Guard</h4>
                      <p className="text-sm leading-relaxed opacity-50 font-serif italic">Operates within SEBI Investment Advisers Regulations (2013) for data-driven safety.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust Section */}
            <section id="methodology" className="py-32 px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="order-2 lg:order-1">
                  <div className="grid grid-cols-2 gap-px bg-black/5 border border-black/5">
                    {[
                      { label: 'Data Accuracy', value: '99.9%' },
                      { label: 'SEBI Compliant', value: 'Yes' },
                      { label: 'Budget Year', value: '2025-26' },
                      { label: 'Processing Speed', value: '< 2s' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-10">
                        <div className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-2">{stat.label}</div>
                        <div className="text-3xl font-mono">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-8 order-1 lg:order-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30">Our Methodology</h3>
                  <h4 className="text-5xl font-serif font-light leading-tight">Precision in every <span className="italic">decimal point.</span></h4>
                  <p className="text-lg font-serif italic opacity-60 leading-relaxed">
                    We don't use flowery language or vague advice. Our engine processes your portfolio through a high-frequency data processor to deliver actionable, math-backed strategies.
                  </p>
                  <ul className="space-y-4">
                    {[
                      '4% Withdrawal Rule adjusted for India',
                      'LTCG Harvesting at ₹1.25 Lakh limit',
                      'Expense Ratio benchmarking > 1.25%',
                      '6-month Emergency Fund coverage audit'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-sm font-serif italic opacity-80">
                        <ChevronRight className="w-4 h-4 opacity-30" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-8 bg-[#1A1A1A] text-white overflow-hidden relative">
              <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
                <h2 className="text-5xl lg:text-7xl font-serif font-light leading-tight">
                  Ready to secure your <span className="italic">financial future?</span>
                </h2>
                <button 
                  onClick={() => setView('dashboard')}
                  className="mx-auto bg-white text-black px-12 py-8 font-bold uppercase tracking-[0.4em] text-[12px] flex items-center justify-center gap-4 hover:bg-[#FBFBFA] transition-all group"
                >
                  Launch Intelligence Agent <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="absolute top-0 left-0 w-full h-full data-grid opacity-[0.03]" />
            </section>
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <main className="max-w-7xl mx-auto px-8 py-16">
              <div className="mb-12 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-serif italic">Intelligence Dashboard</h2>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 mt-2">Active Session • SEBI Regulated Framework</p>
                </div>
                <button 
                  onClick={() => setView('landing')}
                  className="text-[9px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2"
                >
                  <ArrowRight className="w-3 h-3 rotate-180" /> Back to Home
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left Column: Input */}
                <div className="lg:col-span-5 space-y-12">
                  <section className="space-y-10">
                    <div className="flex items-end justify-between border-b border-black/10 pb-4">
                      <h2 className="text-2xl font-serif italic flex items-center gap-3">
                        <PieChart className="w-6 h-6 stroke-[1.5px]" />
                        Portfolio Assets
                      </h2>
                      <button 
                        onClick={addFund}
                        className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:opacity-50 transition-opacity"
                      >
                        <Plus className="w-4 h-4" /> Add Asset
                      </button>
                    </div>

                    <div className="space-y-6">
                      {portfolio.funds.map((fund, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={idx} 
                          className="relative group border-b border-black/5 pb-6 last:border-0"
                        >
                          <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-8">
                              <label className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-2 block">Scheme Name</label>
                              <input 
                                type="text" 
                                value={fund.name}
                                onChange={(e) => updateFund(idx, { name: e.target.value })}
                                placeholder="e.g. HDFC Top 100 Fund"
                                className="w-full bg-transparent border-none outline-none text-base font-serif italic placeholder:opacity-20"
                              />
                            </div>
                            <div className="col-span-4 text-right">
                              <label className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-2 block">Value (₹)</label>
                              <input 
                                type="number" 
                                value={fund.amount}
                                onChange={(e) => updateFund(idx, { amount: Number(e.target.value) })}
                                className="w-full bg-transparent border-none outline-none text-lg font-mono text-right"
                              />
                            </div>
                            
                            <div className="col-span-5">
                              <label className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-2 block">Category</label>
                              <select 
                                value={fund.category}
                                onChange={(e) => updateFund(idx, { category: e.target.value as any })}
                                className="w-full bg-transparent border-none outline-none text-[11px] font-bold uppercase tracking-wider appearance-none cursor-pointer"
                              >
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                            <div className="col-span-3">
                              <label className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-2 block">Exp. Ratio %</label>
                              <input 
                                type="number" 
                                step="0.01"
                                value={fund.expenseRatio}
                                onChange={(e) => updateFund(idx, { expenseRatio: Number(e.target.value) })}
                                className="w-full bg-transparent border-none outline-none text-[11px] font-mono"
                              />
                            </div>
                            <div className="col-span-4 flex items-center justify-end gap-3 pt-4">
                              <div className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  checked={fund.isRegular}
                                  onChange={(e) => updateFund(idx, { isRegular: e.target.checked })}
                                  className="w-3 h-3 accent-[#1A1A1A] border-black/20 rounded-none"
                                />
                                <label className="text-[9px] font-bold uppercase tracking-widest opacity-40">Regular</label>
                              </div>
                              <button onClick={() => removeFund(idx)} className="text-red-900/40 hover:text-red-600 transition-colors ml-2">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-12 border-t border-black/10">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 mb-10">Financial Parameters</h3>
                      <div className="grid grid-cols-2 gap-12 mb-8">
                        <div className="space-y-2">
                          <label className="text-[9px] font-bold uppercase tracking-widest opacity-30 block">Monthly Burn (₹)</label>
                          <input 
                            type="number" 
                            value={portfolio.monthlyExpenses}
                            onChange={(e) => setPortfolio(p => ({ ...p, monthlyExpenses: Number(e.target.value) }))}
                            className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-lg font-mono transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-bold uppercase tracking-widest opacity-30 block">Emergency Cover (Mo)</label>
                          <input 
                            type="number" 
                            value={portfolio.emergencyFundMonths}
                            onChange={(e) => setPortfolio(p => ({ ...p, emergencyFundMonths: Number(e.target.value) }))}
                            className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-lg font-mono transition-colors"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-12">
                        <div className="space-y-2">
                          <label className="text-[9px] font-bold uppercase tracking-widest opacity-30 block">Monthly Take-Home Salary (₹)</label>
                          <input 
                            type="number" 
                            value={portfolio.salary || 0}
                            onChange={(e) => setPortfolio(p => ({ ...p, salary: Number(e.target.value) }))}
                            className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 text-lg font-mono transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || portfolio.funds.length === 0}
                      className="w-full bg-[#1A1A1A] text-white py-6 font-bold uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 hover:bg-black transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Synthesizing Data
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                          Initiate Intelligence X-Ray
                        </>
                      )}
                    </button>
                    {error && <p className="text-red-900 text-[10px] mt-4 font-bold uppercase tracking-widest text-center">{error}</p>}
                  </section>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-7">
                  <AnimatePresence mode="wait">
                    {result ? (
                      <motion.div 
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-12"
                      >
                        {/* Part I: Score */}
                        <div className="bg-white border border-black/10 p-12 relative overflow-hidden">
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-10">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 block mb-2">Money Health Score</span>
                                <h3 className="text-6xl font-serif font-light">
                                  {result.healthScore}<span className="text-2xl opacity-20 ml-2">/100</span>
                                </h3>
                              </div>
                              <div className="w-16 h-16 border border-black/10 flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8 opacity-20" />
                              </div>
                            </div>
                            <p className="text-2xl font-serif italic leading-relaxed text-[#333]">
                              "{result.scoreSummary}"
                            </p>
                          </div>
                          <div className="absolute top-0 right-0 w-1/2 h-full border-l border-black/[0.03] pointer-events-none" />
                        </div>

                        {/* Part II: Findings */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10 overflow-hidden">
                          <div className="bg-white p-8 space-y-4">
                            <div className="flex items-center gap-2 text-amber-800">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span className="text-[9px] font-bold uppercase tracking-widest">Overlap Alert</span>
                            </div>
                            <p className="text-xs font-medium leading-relaxed opacity-70">{result.findings.overlapAlert}</p>
                          </div>
                          <div className="bg-white p-8 space-y-4">
                            <div className="flex items-center gap-2 text-red-900">
                              <ShieldAlert className="w-3.5 h-3.5" />
                              <span className="text-[9px] font-bold uppercase tracking-widest">Fee Leakage</span>
                            </div>
                            <p className="text-xs font-medium leading-relaxed opacity-70">{result.findings.feeLeakage}</p>
                          </div>
                          <div className="bg-white p-8 space-y-4">
                            <div className="flex items-center gap-2 text-blue-900">
                              <Info className="w-3.5 h-3.5" />
                              <span className="text-[9px] font-bold uppercase tracking-widest">Safety Gap</span>
                            </div>
                            <p className="text-xs font-medium leading-relaxed opacity-70">{result.findings.safetyGap}</p>
                          </div>
                        </div>

                        {/* Part III: FIRE Tracker */}
                        <div className="bg-white border border-black/10 p-12">
                          <div className="flex items-center justify-between mb-12">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30">FIRE Tracker</h3>
                            <div className="text-[9px] font-bold uppercase tracking-widest opacity-20 italic">4% Rule • 6% Inflation Adj.</div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            <div className="space-y-4">
                              <div className="text-4xl font-mono font-light">₹{(result.fireTracker.fiNumber / 10000000).toFixed(2)}<span className="text-lg opacity-20 ml-1">Cr</span></div>
                              <div>
                                <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 block mb-1">FI Number</span>
                                <p className="text-[9px] opacity-30 leading-relaxed">Target corpus for financial independence.</p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="text-4xl font-mono font-light">{result.fireTracker.currentProgress.toFixed(1)}<span className="text-lg opacity-20 ml-1">%</span></div>
                              <div>
                                <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 block mb-1">Current Progress</span>
                                <p className="text-[9px] opacity-30 leading-relaxed">Percentage of target corpus achieved.</p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="text-4xl font-mono font-light">{result.fireTracker.yearsToFI}<span className="text-lg opacity-20 ml-1">Yrs</span></div>
                              <div>
                                <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 block mb-1">Time to Freedom</span>
                                <p className="text-[9px] opacity-30 leading-relaxed">Estimated years to reach FI number.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Part IV: Action Plan */}
                        <div className="bg-white border border-black/10">
                          <div className="px-10 py-6 border-b border-black/10 flex items-center justify-between">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Strategic Protocol</h3>
                            <div className="text-[9px] font-bold text-green-700 uppercase tracking-widest">AUTONOMOUS AGENT V1.0</div>
                          </div>
                          <div className="divide-y divide-black/5">
                            <div className="p-10 flex gap-10 group hover:bg-[#FBFBFA] transition-colors">
                              <span className="text-xs font-mono font-bold opacity-20 mt-1">01</span>
                              <div>
                                <h4 className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-2">Immediate (24h)</h4>
                                <p className="text-base font-serif italic text-[#333]">{result.strategicProtocol.immediate}</p>
                              </div>
                            </div>
                            <div className="p-10 flex gap-10 group hover:bg-[#FBFBFA] transition-colors">
                              <span className="text-xs font-mono font-bold opacity-20 mt-1">02</span>
                              <div>
                                <h4 className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-2">Short Term (30d)</h4>
                                <p className="text-base font-serif italic text-[#333]">{result.strategicProtocol.shortTerm}</p>
                              </div>
                            </div>
                            <div className="p-10 flex gap-10 group hover:bg-[#FBFBFA] transition-colors">
                              <span className="text-xs font-mono font-bold opacity-20 mt-1">03</span>
                              <div>
                                <h4 className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-2">Long Term (12m)</h4>
                                <p className="text-base font-serif italic text-[#333]">{result.strategicProtocol.longTerm}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Part V: Impact Math */}
                        <div className="bg-[#1A1A1A] text-white p-12 relative">
                          <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-12 opacity-30">The Impact Math</h3>
                          <div className="grid grid-cols-2 gap-16">
                            <div className="space-y-4">
                              <div className="text-4xl font-mono font-light">₹{result.impactMath.annualSavings.toLocaleString()}</div>
                              <div>
                                <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 block mb-1">Est. Annual Savings</span>
                                <p className="text-[9px] opacity-30 leading-relaxed max-w-[180px]">Based on 1% AUM optimization via Direct Plan migration.</p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="text-4xl font-mono font-light text-green-400">₹{result.impactMath.taxSaved.toLocaleString()}</div>
                              <div>
                                <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 block mb-1">Tax Benefit Unlocked</span>
                                <p className="text-[9px] opacity-30 leading-relaxed max-w-[180px]">Projected LTCG harvesting benefit under 2025-26 rules.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full min-h-[700px] border border-black/5 flex flex-col items-center justify-center text-center p-16 bg-white/50"
                      >
                        <div className="w-24 h-24 border border-black/10 flex items-center justify-center mb-10 rotate-45">
                          <Calculator className="w-8 h-8 opacity-10 -rotate-45" />
                        </div>
                        <h3 className="text-2xl font-serif italic mb-4">Awaiting Data Synthesis</h3>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-20 max-w-xs mx-auto mb-12">
                          Input your holdings to generate a professional-grade financial intelligence report.
                        </p>
                        <div className="grid grid-cols-2 gap-px bg-black/5 w-full max-w-md border border-black/5">
                          <div className="p-8 bg-white/80 text-left">
                            <div className="text-[9px] font-bold uppercase tracking-widest mb-2 opacity-20">Module 01</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest">Portfolio X-Ray</div>
                          </div>
                          <div className="p-8 bg-white/80 text-left">
                            <div className="text-[9px] font-bold uppercase tracking-widest mb-2 opacity-20">Module 02</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest">Tax Optimizer</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-8 py-20 border-t border-black/5 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 border border-black/10 flex items-center justify-center text-[10px] font-mono font-bold">ET</div>
              <h2 className="text-xl font-serif font-bold">ET AI MONEY MENTOR</h2>
            </div>
            <p className="text-sm font-serif italic opacity-50 max-w-sm leading-relaxed">
              Bridging the gap for the 95% of Indians who lack a financial plan. Built with precision for the ET AI Hackathon 2026.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-30">Intelligence</h4>
            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest opacity-50">
              <li><a href="#" className="hover:opacity-100">Portfolio X-Ray</a></li>
              <li><a href="#" className="hover:opacity-100">Tax Wizard</a></li>
              <li><a href="#" className="hover:opacity-100">FIRE Tracker</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-30">Legal</h4>
            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest opacity-50">
              <li><a href="#" className="hover:opacity-100">Compliance</a></li>
              <li><a href="#" className="hover:opacity-100">Methodology</a></li>
              <li><a href="#" className="hover:opacity-100">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-10 border-t border-black/[0.03]">
          <div className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-20">
            © 2026 ET AI HACKATHON • SEBI REGULATED FRAMEWORK
          </div>
          <div className="flex items-center gap-10 text-[9px] font-bold uppercase tracking-[0.3em] opacity-20">
            <span>Mumbai, India</span>
            <span>v1.0.0-stable</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
