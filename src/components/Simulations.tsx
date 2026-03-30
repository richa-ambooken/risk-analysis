import React from 'react';
import { 
  Activity, 
  ShieldAlert, 
  History, 
  Download, 
  Layers,
  Zap
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
import { motion } from 'motion/react';
import { SimulationParams } from '../types';

const baseData = [
  { density: 0, accuracy: 98, baseline: 98 },
  { density: 0.1, accuracy: 97.5, baseline: 97.5 },
  { density: 0.2, accuracy: 96.5, baseline: 96.5 },
  { density: 0.3, accuracy: 95, baseline: 95 },
  { density: 0.4, accuracy: 92.5, baseline: 92.5 },
  { density: 0.5, accuracy: 89, baseline: 89 },
  { density: 0.6, accuracy: 84, baseline: 84 },
  { density: 0.7, accuracy: 76, baseline: 76 },
  { density: 0.8, accuracy: 62, baseline: 62 },
  { density: 0.9, accuracy: 45, baseline: 45 },
  { density: 1.0, accuracy: 25, baseline: 25 },
];

export default function Simulations() {
  const [params, setParams] = React.useState<SimulationParams>({
    jitter: 42,
    drift: 12,
    perturbation: 5
  });

  const [isSimulating, setIsSimulating] = React.useState(false);
  const [chartData, setChartData] = React.useState(baseData);
  const [metrics, setMetrics] = React.useState({
    var: 4.2,
    fragility: 'Critical',
    lastTest: '02:14'
  });

  const updateSimulation = () => {
    const jFactor = params.jitter / 100;
    const dFactor = params.drift / 100;
    
    const newData = baseData.map((item, i) => {
      const x = i / 10;
      const penalty = (x * jFactor * 40) + (Math.pow(x, 1.5) * dFactor * 60);
      return {
        ...item,
        accuracy: Math.max(5, item.baseline - penalty)
      };
    });
    
    setChartData(newData);

    const totalStress = params.jitter + params.drift;
    const impact = (params.jitter * 0.02) + (params.drift * 0.05) + (params.perturbation * 0.03);
    
    setMetrics({
      var: parseFloat((4.2 + impact).toFixed(1)),
      fragility: totalStress < 30 ? 'Stable' : totalStress < 70 ? 'Critical' : 'Extreme',
      lastTest: metrics.lastTest
    });
  };

  React.useEffect(() => {
    updateSimulation();
  }, [params]);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const now = new Date();
      setMetrics(prev => ({
        ...prev,
        lastTest: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      }));
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Model Stress Testing</h1>
        <p className="text-on-surface-variant max-w-2xl font-light leading-relaxed">
          Simulate synthetic noise and edge-case environmental factors to evaluate model robustness and predict degradation thresholds.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Controls Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <section className="p-8 rounded-2xl bg-surface-container-low shadow-sm border border-outline-variant/10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-8">Noise Parameters</h3>
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-tighter">Gaussian Jitter</label>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{(params.jitter / 100).toFixed(2)}σ</span>
                </div>
                <input 
                  type="range" 
                  className="w-full accent-primary"
                  value={params.jitter}
                  onChange={(e) => setParams({...params, jitter: parseInt(e.target.value)})}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-tighter">Data Drift</label>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{params.drift}%</span>
                </div>
                <input 
                  type="range" 
                  className="w-full accent-primary"
                  value={params.drift}
                  onChange={(e) => setParams({...params, drift: parseInt(e.target.value)})}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-tighter">Adversarial Perturbation</label>
                  <span className="text-xs font-mono text-tertiary bg-tertiary/10 px-2 py-0.5 rounded">{(params.perturbation / 100).toFixed(2)}α</span>
                </div>
                <input 
                  type="range" 
                  className="w-full accent-tertiary"
                  value={params.perturbation}
                  onChange={(e) => setParams({...params, perturbation: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <button 
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="mt-12 w-full py-4 primary-gradient-btn rounded-lg disabled:opacity-50"
            >
              {isSimulating ? 'Processing...' : 'Run Simulation'}
            </button>
          </section>

          <section className="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">Environment Metadata</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-surface-container-high/40">
                <p className="text-[10px] text-on-surface-variant uppercase mb-1">Epochs</p>
                <p className="text-lg font-bold">1,200</p>
              </div>
              <div className="p-4 rounded-lg bg-surface-container-high/40">
                <p className="text-[10px] text-on-surface-variant uppercase mb-1">Latency</p>
                <p className="text-lg font-bold">{(24 + (params.jitter + params.drift) * 0.1).toFixed(0)}ms</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant/10">
              <p className="text-[10px] text-on-surface-variant uppercase mb-2">Simulated Loan Impact</p>
              <p className="text-xs font-mono text-primary">₹50,00,000</p>
            </div>
          </section>
        </div>

        {/* Visualization Area */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <section className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10 relative">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-lg font-bold text-on-surface">Accuracy vs. Noise Density</h3>
                <p className="text-sm text-on-surface-variant">Real-time degradation profile for Model v4.2-Aether</p>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant uppercase">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Primary
                </span>
                <span className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant uppercase">
                  <span className="w-2 h-2 rounded-full bg-outline"></span> Baseline
                </span>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#89ceff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#89ceff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(218, 226, 253, 0.05)" vertical={false} />
                  <XAxis 
                    dataKey="density" 
                    stroke="#88929b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#88929b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#171f33', border: '1px solid rgba(62, 72, 80, 0.2)', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#89ceff" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorAcc)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="baseline" 
                    stroke="#3e4850" 
                    strokeDasharray="5 5" 
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 flex justify-between text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">
              <span>Low Interference</span>
              <span>Medium Degradation</span>
              <span>Critical Failure Point</span>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-4">
                <Zap size={20} className="text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Value at Risk</span>
              </div>
              <p className="text-3xl font-extrabold text-on-surface">₹{metrics.var}M</p>
              <p className="text-xs text-on-surface-variant mt-2">Estimated loss potential at current noise density.</p>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert size={20} className={metrics.fragility === 'Stable' ? 'text-primary' : metrics.fragility === 'Critical' ? 'text-tertiary' : 'text-error'} />
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Fragility</span>
              </div>
              <p className={`text-3xl font-extrabold ${metrics.fragility === 'Stable' ? 'text-primary' : metrics.fragility === 'Critical' ? 'text-tertiary' : 'text-error'}`}>
                {metrics.fragility}
              </p>
              <p className="text-xs text-on-surface-variant mt-2">
                {metrics.fragility === 'Stable' ? 'High resistance to simulated environmental noise.' : 'Sensitive to adversarial data drift beyond 15%.'}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-4">
                <History size={20} className="text-on-surface-variant" />
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Last Test</span>
              </div>
              <p className="text-3xl font-extrabold text-on-surface">{metrics.lastTest}</p>
              <p className="text-xs text-on-surface-variant mt-2">Standardized noise profile suite executed.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <section className="mt-16">
        <div className="p-10 rounded-3xl bg-surface-container-low border border-outline-variant/10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-md">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-widest mb-4">Spatial Variance Analysis</span>
              <h2 className="text-3xl font-bold mb-4">Neural Stability Heatmap</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Visualizing neuron activation variance under simulated peak stress. Intensity weighted by loan principal magnitude (₹50L base).
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-2 border border-primary/30 text-primary text-xs font-bold rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-2">
                  <Download size={14} /> Export Report
                </button>
                <button className="px-6 py-2 bg-surface-container-high text-on-surface text-xs font-bold rounded-lg hover:bg-surface-variant transition-colors flex items-center gap-2">
                  <Layers size={14} /> Compare Models
                </button>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-xl h-48 flex gap-1 items-end">
              {[30, 45, 65, 80, 95, 85, 98, 60, 40, 30].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className={`flex-1 rounded-t-lg ${h > 85 ? 'bg-tertiary' : h > 50 ? 'bg-primary' : 'bg-surface-container-highest'}`}
                ></motion.div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
}
