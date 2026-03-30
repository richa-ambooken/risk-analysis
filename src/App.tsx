import React from 'react';
import { Page, User } from './types';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Simulations from './components/Simulations';
import Metrics from './components/Metrics';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<Page>('login');
  const [user, setUser] = React.useState<User | null>(null);

  const handleLogin = (username: string, email: string) => {
    setUser({
      username,
      role: 'Risk Intelligence',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
    });
    setCurrentPage('predictions');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  if (currentPage === 'login' || !user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage} 
      user={user}
      onLogout={handleLogout}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {currentPage === 'predictions' && <Dashboard />}
          {currentPage === 'simulations' && <Simulations />}
          {currentPage === 'metrics' && <Metrics />}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
