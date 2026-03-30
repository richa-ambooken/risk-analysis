import React from 'react';
import { 
  Info, 
  Grid3X3,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { PredictionData } from '../types';

export default function Dashboard() {
  const [formData, setFormData] = React.useState<PredictionData>({
    applicantIncome: 50000,
    coapplicantIncome: 25000,
    loanAmount: 120000,
    loanTerm: '360',
    creditHistory: 'positive'
  });

  const [results, setResults] = React.useState({
    confidence: 82,
    riskLevel: 14.2,
    isHighRisk: false,
    matrix: {
      tn: 2842,
      fp: 156,
      fn: 312,
      tp: 890
    }
  });

  const [isCalculating, setIsCalculating] = React.useState(false);

  const handlePredict = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const totalIncome = formData.applicantIncome + formData.coapplicantIncome;
      const ratio = formData.loanAmount / (totalIncome || 1);
      let riskLevel = Math.min(100, ratio * 50);
      
      let confidencePenalty = 0;
      if (formData.creditHistory === 'negative') {
        riskLevel = Math.min(100, riskLevel + 40);
        confidencePenalty = 35;
      }
      
      const confidence = Math.max(10, Math.round(100 - riskLevel - confidencePenalty));
      const isHighRisk = riskLevel > 60 || formData.creditHistory === 'negative';

      // Update matrix based on risk
      const bias = riskLevel / 100;
      const total = 4200;
      let tp, fp, fn, tn;

      if (isHighRisk) {
        tp = Math.round(1200 + (bias * 400));
        fp = Math.round(400 + (bias * 300));
        fn = Math.round(100 + (bias * 50));
        tn = total - tp - fp - fn;
      } else {
        tp = Math.round(800 - (bias * 100));
        fp = Math.round(150 - (bias * 50));
        fn = Math.round(200 + (bias * 100));
        tn = total - tp - fp - fn;
      }

      setResults({
        confidence,
        riskLevel: parseFloat(riskLevel.toFixed(1)),
        isHighRisk,
        matrix: { tn, fp, fn, tp }
      });
      setIsCalculating(false);
    }, 800);
  };

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Model Prediction Engine</h1>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed">
          Execute high-fidelity risk assessments using our predictive matrix. Analyze applicant profile delta against historical performance metrics.
        </p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Prediction Input Form */}
        <section className="xl:col-span-5 glass-panel rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <TrendingUp size={20} />
              Applicant Profile
            </h2>
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-widest border border-primary/20">
              Active Analysis
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Applicant Income</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-sm">₹</span>
                <input 
                  className="w-full bg-surface-container-lowest border-none rounded-lg py-4 pl-10 pr-4 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all"
                  type="number"
                  value={formData.applicantIncome}
                  onChange={(e) => setFormData({...formData, applicantIncome: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Coapplicant Income</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-sm">₹</span>
                <input 
                  className="w-full bg-surface-container-lowest border-none rounded-lg py-4 pl-10 pr-4 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all"
                  type="number"
                  value={formData.coapplicantIncome}
                  onChange={(e) => setFormData({...formData, coapplicantIncome: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Loan Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-sm">₹</span>
                <input 
                  className="w-full bg-surface-container-lowest border-none rounded-lg py-4 pl-10 pr-4 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all"
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({...formData, loanAmount: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Loan Amount Term</label>
              <select 
                className="w-full bg-surface-container-lowest border-none rounded-lg py-4 px-4 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all appearance-none"
                value={formData.loanTerm}
                onChange={(e) => setFormData({...formData, loanTerm: e.target.value})}
              >
                <option value="360">360 Months</option>
                <option value="180">180 Months</option>
                <option value="120">120 Months</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Credit History</label>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setFormData({...formData, creditHistory: 'positive'})}
                  className={`flex-1 py-4 text-center rounded-lg transition-all font-medium border-none ${
                    formData.creditHistory === 'positive' 
                      ? 'bg-primary/20 ring-1 ring-primary text-primary' 
                      : 'bg-surface-container-lowest text-on-surface-variant'
                  }`}
                >
                  1.0 (Positive)
                </button>
                <button 
                  onClick={() => setFormData({...formData, creditHistory: 'negative'})}
                  className={`flex-1 py-4 text-center rounded-lg transition-all font-medium border-none ${
                    formData.creditHistory === 'negative' 
                      ? 'bg-error/20 ring-1 ring-error text-error' 
                      : 'bg-surface-container-lowest text-on-surface-variant'
                  }`}
                >
                  0.0 (Negative)
                </button>
              </div>
            </div>

            <button 
              onClick={handlePredict}
              disabled={isCalculating}
              className="primary-gradient-btn w-full py-4 rounded-lg mt-6 uppercase tracking-widest text-sm disabled:opacity-50"
            >
              {isCalculating ? 'Calculating Matrix...' : 'Predict Risk'}
            </button>
          </div>
        </section>

        {/* Insights and Matrix */}
        <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Confidence Meter */}
          <article className="glass-panel rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center text-center">
            <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-8">Confidence Meter</h3>
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              <svg className="w-full h-full -rotate-90">
                <circle className="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
                <motion.circle 
                  className={results.confidence < 40 ? 'text-error' : results.confidence < 70 ? 'text-tertiary' : 'text-primary'}
                  cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" 
                  strokeDasharray="553" 
                  initial={{ strokeDashoffset: 553 }}
                  animate={{ strokeDashoffset: 553 - (results.confidence / 100) * 553 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  strokeLinecap="round" strokeWidth="12"
                ></motion.circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-extrabold text-on-surface tracking-tighter">
                  {results.confidence}<span className="text-2xl">%</span>
                </span>
                <span className="text-[10px] font-semibold text-primary uppercase mt-1">Reliability</span>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {results.isHighRisk 
                ? "Significant variance detected. This profile exhibits high-risk indicators correlated with historical defaults."
                : "Prediction variance is within nominal research parameters for high-capital loans."}
            </p>
          </article>

          {/* Rapid Metrics Card */}
          <article className="bg-surface-container-low rounded-2xl p-8 shadow-xl flex flex-col justify-between">
            <div>
              <p className="text-[10px] text-tertiary font-bold uppercase tracking-[0.2em] mb-4">Risk Exposure</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Default Probability</span>
                  <span className="text-error font-mono">{results.riskLevel}%</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-1 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-error h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${results.riskLevel}%` }}
                    transition={{ duration: 1 }}
                  ></motion.div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Model Drift</span>
                  <span className="text-primary font-mono">0.02</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-1 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[20%]"></div>
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 rounded-xl bg-surface-container-lowest/50 border border-outline-variant/10">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-tertiary shrink-0" />
                <p className="text-[11px] text-on-surface-variant italic">
                  {results.isHighRisk 
                    ? "Alert: Debt-to-income ratio or credit flags exceed standard verification thresholds."
                    : "High income variance detected in historical cohort matching this profile."}
                </p>
              </div>
            </div>
          </article>

          {/* Overall Confusion Matrix */}
          <section className="md:col-span-2 glass-panel rounded-2xl p-8 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-on-surface">Overall Confusion Matrix</h3>
                <p className="text-xs text-on-surface-variant mt-1">Cross-validation performance on N=4,200 instances</p>
              </div>
              <Grid3X3 size={20} className="text-on-surface-variant/40" />
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="h-12"></div>
              <div className="bg-surface-container-lowest flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant rounded-tl-lg">Predicted: Low</div>
              <div className="bg-surface-container-lowest flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant rounded-tr-lg">Predicted: High</div>
              
              <div className="bg-surface-container-lowest flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant rounded-bl-lg">Actual: Low</div>
              <div className="aspect-square bg-primary/20 flex flex-col items-center justify-center border border-primary/20">
                <span className="text-2xl font-bold text-primary">{results.matrix.tn.toLocaleString()}</span>
                <span className="text-[10px] font-medium text-primary/60">True Neg</span>
              </div>
              <div className="aspect-square bg-error/5 flex flex-col items-center justify-center border border-error/10">
                <span className="text-2xl font-bold text-on-surface-variant">{results.matrix.fp.toLocaleString()}</span>
                <span className="text-[10px] font-medium text-on-surface-variant/30">False Pos</span>
              </div>
              
              <div className="bg-surface-container-lowest flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant rounded-br-lg">Actual: High</div>
              <div className="aspect-square bg-error/5 flex flex-col items-center justify-center border border-error/10">
                <span className="text-2xl font-bold text-on-surface-variant/40">{results.matrix.fn.toLocaleString()}</span>
                <span className="text-[10px] font-medium text-on-surface-variant/30">False Neg</span>
              </div>
              <div className="aspect-square bg-primary/20 flex flex-col items-center justify-center border border-primary/20">
                <span className="text-2xl font-bold text-primary">{results.matrix.tp.toLocaleString()}</span>
                <span className="text-[10px] font-medium text-primary/60">True Pos</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
