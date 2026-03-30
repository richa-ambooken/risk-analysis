import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  BarChart3, 
  Bell, 
  ShieldCheck,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Page, User } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  user: User;
  onLogout: () => void;
}

export default function Layout({ children, currentPage, setCurrentPage, user, onLogout }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'predictions' as Page, label: 'Predictions', icon: LayoutDashboard },
    { id: 'simulations' as Page, label: 'Simulations', icon: Activity },
    { id: 'metrics' as Page, label: 'Metrics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-16 bg-background/80 backdrop-blur-xl border-b border-outline-variant/5 shadow-2xl">
        <div className="flex items-center gap-4 md:gap-8">
          <button 
            className="lg:hidden text-on-surface-variant hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="text-lg md:text-xl font-bold brand-gradient tracking-tight">
            Model Failure and Risk Analysis
          </span>
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  currentPage === item.id 
                    ? 'text-primary bg-primary/10' 
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative group cursor-pointer">
            <Bell size={20} className="text-on-surface-variant group-hover:text-primary transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
          </div>
          
          <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/20">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-on-surface">{user.username}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{user.role}</p>
            </div>
            <div className="relative group">
              <img 
                src={user.avatar} 
                alt="User Profile" 
                className="w-8 h-8 rounded-full border border-primary/20 cursor-pointer"
                referrerPolicy="no-referrer"
              />
              <div className="absolute right-0 top-full mt-2 w-48 py-2 glass-panel rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button 
                  onClick={onLogout}
                  className="w-full px-4 py-2 text-left text-xs text-error hover:bg-error/10 flex items-center gap-2"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar Navigation */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-surface-container-low hidden lg:flex flex-col py-8 border-r border-outline-variant/5">
          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentPage === item.id 
                    ? 'bg-primary/10 text-primary border-r-2 border-primary' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="mt-auto px-6 py-4">
            <div className="p-4 rounded-xl bg-surface-container-highest/30 border border-outline-variant/10">
              <p className="text-[10px] text-primary font-bold uppercase tracking-tighter mb-1">System Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-xs text-on-surface-variant italic">Models Synced</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[60] lg:hidden"
              />
              <motion.aside 
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                className="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-[70] flex flex-col py-8 lg:hidden border-r border-outline-variant/10"
              >
                <div className="px-6 mb-8">
                  <span className="text-lg font-bold brand-gradient">Aether Risk</span>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                        currentPage === item.id 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64 p-4 md:p-8 overflow-x-hidden relative">
          {/* Background Accents */}
          <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-tertiary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
