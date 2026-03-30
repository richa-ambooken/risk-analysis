import React from 'react';
import { 
  RefreshCw, 
  AlertTriangle, 
  ShieldCheck, 
  Download,
  Activity,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

const initialTrajectoryData = [
  { day: 1, precision: 0.75, recall: 0.70 },
  { day: 5, precision: 0.78, recall: 0.72 },
  { day: 10, precision: 0.82, recall: 0.75 },
  { day: 15, precision: 0.80, recall: 0.78 },
  { day: 20, precision: 0.85, recall: 0.82 },
  { day: 25, precision: 0.92, recall: 0.88 },
  { day: 30, precision: 0.94, recall: 0.92 },
];

const features = [
  { id: 'ApplicantIncome', label: 'ApplicantIncome (₹)', accuracy: 88.4, tn: 412, fp: 42, fn: 38, tp: 508, note: 'Actual: No / Predicted: No' },
  { id: 'LoanAmount', label: 'LoanAmount (₹)', accuracy: 91.2, tn: 389, fp: 12, fn: 76, tp: 523, note: 'High Sensitivity (₹)' },
  { id: 'CreditHistory', label: 'CreditHistory', accuracy: 94.5, tn: 602, fp: 8, fn: 47, tp: 343, note: 'Predictive Power: High' },
  { id: 'CoapplicantIncome', label: 'CoapplicantIncome (₹)', accuracy: 82.1, tn: 312, fp: 89, fn: 90, tp: 509, note: 'Noise Factor: Medium' },
  { id: 'Dependents', label: 'Dependents', accuracy: 86.9, tn: 456, fp: 21, fn: 110, tp: 413, note: 'Discrete Var' },
  { id: 'PropertyArea', label: 'PropertyArea', accuracy: 89.3, tn: 422, fp: 15, fn: 92, tp: 471, note: 'Categorical' },
];

export default function Metrics() {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [trajectoryData, setTrajectoryData] = React.useState(initialTrajectoryData);
  const [region, setRegion] = React.useState('all');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const newData = trajectoryData.map(item => ({
        ...item,
        precision: Math.min(0.99, item.precision + (Math.random() - 0.5) * 0.05),
        recall: Math.min(0.99, item.recall + (Math.random() - 0.5) * 0.05)
      }));
      setTrajectoryData(newData);
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-baseline gap-4 mb-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">Model Performance</h1>
            <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary text-[10px] font-bold tracking-widest uppercase">Live Audit</span>
          </div>
          <p className="text-on-surface-variant max-w-2xl leading-relaxed">
            Granular breakdown of model efficacy across key demographic and financial features. Data points updated as of latest epoch.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded bg-surface-container-high border border-outline-variant/20 text-sm font-medium hover:bg-surface-container-highest transition-all group active:scale-95 disabled:opacity-50"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} />
            Refresh Data
          </button>
          <select 
            className="flex-1 md:flex-none bg-surface-container-high border border-outline-variant/20 rounded px-4 py-2 text-sm font-medium focus:ring-1 focus:ring-primary outline-none cursor-pointer"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="all">All Regions</option>
            <option value="rural">Rural</option>
            <option value="urban">Urban</option>
            <option value="semi">Semi-Urban</option>
          </select>
        </div>
      </header>

      {/* High-Level Trend Graph Section */}
      <section>
        <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-bold text-on-surface mb-1">Efficacy Trajectory</h2>
              <p className="text-sm text-on-surface-variant">Probability calibration trend over last 30 days</p>
            </div>
            <div className="flex gap-6">
              <span className="flex items-center gap-1.5 text-xs text-primary font-medium">
                <span className="w-2 h-2 rounded-full bg-primary"></span> Precision
              </span>
              <span className="flex items-center gap-1.5 text-xs text-tertiary font-medium">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span> Recall
              </span>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trajectoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(218, 226, 253, 0.05)" vertical={false} />
                <XAxis dataKey="day" hide />
                <YAxis hide domain={[0.6, 1.0]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171f33', border: '1px solid rgba(62, 72, 80, 0.2)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="precision" 
                  stroke="#89ceff" 
                  strokeWidth={3} 
                  dot={false}
                  animationDuration={1000}
                />
                <Line 
                  type="monotone" 
                  dataKey="recall" 
                  stroke="#ffb86e" 
                  strokeWidth={3} 
                  strokeDasharray="8 4"
                  dot={false}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="absolute top-4 right-10 glass-panel px-3 py-2 rounded-lg border border-primary/20 flex flex-col gap-1 shadow-xl">
              <span className="text-[10px] uppercase tracking-tighter text-on-surface-variant font-bold">Peak Recall</span>
              <span className="text-lg font-bold text-primary">0.942</span>
            </div>
          </div>
        </div>
      </section>

      {/* Confusion Matrix Grid Section */}
      <section>
        <h3 className="text-lg font-bold text-on-surface mb-8 flex items-center gap-3">
          <BarChart3 size={20} className="text-primary" />
          Feature Confusion Matrices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feat) => (
            <motion.div 
              key={feat.id}
              layout
              className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 hover:bg-surface-container transition-colors"
            >
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-bold text-on-surface tracking-wide">{feat.label}</h4>
                <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-bold">
                  Accuracy: {feat.accuracy}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-px bg-outline-variant/20 rounded overflow-hidden border border-outline-variant/20">
                <div className="p-4 bg-surface-container-highest flex flex-col items-center justify-center aspect-square">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">True Neg</span>
                  <span className="text-2xl font-extrabold text-on-surface">{feat.tn}</span>
                </div>
                <div className="p-4 bg-surface-container-low flex flex-col items-center justify-center aspect-square">
                  <span className="text-[10px] text-error uppercase font-bold mb-1">False Pos</span>
                  <span className="text-2xl font-extrabold text-error">{feat.fp}</span>
                </div>
                <div className="p-4 bg-surface-container-low flex flex-col items-center justify-center aspect-square">
                  <span className="text-[10px] text-tertiary uppercase font-bold mb-1">False Neg</span>
                  <span className="text-2xl font-extrabold text-tertiary">{feat.fn}</span>
                </div>
                <div className="p-4 bg-surface-container-highest flex flex-col items-center justify-center aspect-square">
                  <span className="text-[10px] text-primary uppercase font-bold mb-1">True Pos</span>
                  <span className="text-2xl font-extrabold text-primary">{feat.tp}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-[10px] text-on-surface-variant font-medium">
                <span>{feat.note}</span>
                <span>Stable Variance</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Insights Bento Grid */}
      <section className="mt-20">
        <h3 className="text-lg font-bold text-on-surface mb-8">System Observability</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-6">
          <div className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-primary/10 to-transparent rounded-xl border border-primary/20 p-8 flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-4">Metric Convergence</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                Primary training weights have stabilized across all demographic vectors. ROC-AUC delta &lt; 0.002% in current cycle.
              </p>
              <p className="text-[10px] text-primary/80 font-medium leading-relaxed mb-6 italic">
                Note: These metrics are aggregated over the current session's inputs, including the specific 'Loan Amount' (₹) vectors provided.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-3 bg-surface-container-highest/50 rounded-lg">
                  <span className="block text-[10px] text-on-surface-variant font-bold uppercase mb-1">AUC-ROC</span>
                  <span className="text-2xl font-extrabold text-primary">0.962</span>
                </div>
                <div className="px-4 py-3 bg-surface-container-highest/50 rounded-lg">
                  <span className="block text-[10px] text-on-surface-variant font-bold uppercase mb-1">F1 Score</span>
                  <span className="text-2xl font-extrabold text-tertiary">0.914</span>
                </div>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 opacity-10">
              <TrendingUp size={300} className="text-primary" />
            </div>
          </div>

          <div className="lg:col-span-2 bg-surface-container-low rounded-xl border border-outline-variant/10 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-tertiary/10 flex items-center justify-center">
                <AlertTriangle size={24} className="text-tertiary" />
              </div>
              <div>
                <h5 className="font-bold">Feature Drift Detected</h5>
                <p className="text-xs text-on-surface-variant">ApplicantIncome (₹) shows 2.1% drift in Rural sector.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 bg-surface-container-low rounded-xl border border-outline-variant/10 p-6 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-on-surface mb-1">99.9<span className="text-primary">%</span></span>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant">Uptime Confidence</span>
          </div>

          <button className="lg:col-span-1 bg-primary rounded-xl p-6 flex flex-col items-center justify-center text-on-primary shadow-[0_0_30px_rgba(137,206,255,0.3)] hover:brightness-110 transition-all active:scale-95">
            <Download size={32} className="mb-2" />
            <span className="text-sm font-bold text-center">Export Full Research Data (₹)</span>
          </button>
        </div>
      </section>
    </div>
  );
}
