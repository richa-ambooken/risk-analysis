import React from 'react';
import { User, Mail, Key, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: (username: string, email: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = React.useState('researcher_alpha');
  const [email, setEmail] = React.useState('richa.ambooken@gmail.com');
  const [securityKey, setSecurityKey] = React.useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, email);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center overflow-hidden relative">
      {/* Atmospheric Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-tertiary-container/5 rounded-full blur-[100px]"></div>
      </div>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Header / Logo */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight brand-gradient mb-2">
            Model Failure and Risk Analysis
          </h1>
          <p className="text-on-surface-variant text-sm tracking-widest uppercase font-medium">
            Risk Intelligence Portal
          </p>
        </div>

        {/* Login Container */}
        <div className="glass-panel p-10 rounded-2xl shadow-[0px_20px_40px_rgba(6,14,32,0.4)] relative border border-outline-variant/15">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Field: Username */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-on-surface-variant ml-1" htmlFor="username">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                  <User size={20} className="text-on-surface-variant/60" />
                </div>
                <input 
                  className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary py-3.5 pl-12 pr-4 rounded-lg text-on-surface placeholder:text-outline/50 transition-all outline-none"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="analyst_id"
                  type="text"
                  required
                />
              </div>
            </div>

            {/* Field: Email Address */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-on-surface-variant ml-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                  <Mail size={20} className="text-on-surface-variant/60" />
                </div>
                <input 
                  className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary py-3.5 pl-12 pr-4 rounded-lg text-on-surface placeholder:text-outline/50 transition-all outline-none"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  type="email"
                  required
                />
              </div>
            </div>

            {/* Field: Security Key */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-xs font-semibold text-on-surface-variant" htmlFor="security_key">
                  Security Key
                </label>
                <button type="button" className="text-[10px] text-primary/70 hover:text-primary font-medium tracking-wide uppercase transition-colors">
                  Forgot Key?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                  <Key size={20} className="text-on-surface-variant/60" />
                </div>
                <input 
                  className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary py-3.5 pl-12 pr-4 rounded-lg text-on-surface placeholder:text-outline/50 transition-all outline-none"
                  id="security_key"
                  value={securityKey}
                  onChange={(e) => setSecurityKey(e.target.value)}
                  placeholder="••••••••••••"
                  type="password"
                  required
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4">
              <button 
                className="primary-gradient-btn w-full py-4 px-6 rounded-lg flex items-center justify-center gap-3"
                type="submit"
              >
                <span>Access Dashboard</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>

        {/* Decorative Corner Accents */}
        <div className="fixed top-8 left-8 w-12 h-px bg-outline/20"></div>
        <div className="fixed top-8 left-8 w-px h-12 bg-outline/20"></div>
        <div className="fixed bottom-8 right-8 w-12 h-px bg-outline/20"></div>
        <div className="fixed bottom-8 right-8 w-px h-12 bg-outline/20"></div>
      </motion.main>
    </div>
  );
}
