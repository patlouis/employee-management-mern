import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const payload = isLogin ? { email, password } : { name: fullName, email, password };

    try {
      const res = await axios.post(`http://localhost:3000${endpoint}`, payload);
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userName', res.data.name);
        navigate('/employees');
      } else {
        alert("Account created! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#f8fafc] dark:bg-slate-900 font-sans transition-colors duration-300 overflow-x-hidden">
      
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200/40 dark:bg-indigo-900/20 rounded-full blur-3xl -z-0 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl -z-0" />

      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full relative z-20">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-200 dark:shadow-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Employee Management</span>
        </div>
        
        <button 
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 p-2 px-4 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm transition-all cursor-pointer text-sm font-semibold group"
        >
          <span className="group-hover:rotate-12 transition-transform">
            {darkMode ? '☀️' : '🌙'}
          </span>
          <span>{darkMode ? 'Light' : 'Dark'}</span>
        </button>
      </nav>

      <main className="relative flex flex-col lg:flex-row items-center justify-center px-6 gap-12 max-w-7xl mx-auto w-full py-20 z-10">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-2xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6 transition-colors">
            Employee<br />
            <span className="text-indigo-600 dark:text-indigo-400">Management</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mb-8 transition-colors">
            A dedicated employee management system to manage employee details with a single, intuitive interface.
          </p>
        </div>

        <div className="lg:w-1/2 w-full max-w-md">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl shadow-indigo-100/50 dark:shadow-none border border-white dark:border-slate-700 transition-all">
            <div className="flex gap-4 mb-8 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
              <button 
                type="button"
                onClick={() => setIsLogin(true)} 
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all cursor-pointer ${isLogin ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}
              >Login</button>
              <button 
                type="button"
                onClick={() => setIsLogin(false)} 
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all cursor-pointer ${!isLogin ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}
              >Sign Up</button>
            </div>

            <form className="space-y-4" onSubmit={handleAuth}>
              {!isLogin && (
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white outline-none focus:ring-2 ring-indigo-500/50 transition-all" 
                  required
                />
              )}
              <input 
                type="email" 
                placeholder="Admin Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white outline-none focus:ring-2 ring-indigo-500/50 transition-all" 
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white outline-none focus:ring-2 ring-indigo-500/50 transition-all" 
                required
              />
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-none transition-all active:scale-[0.98] cursor-pointer disabled:opacity-70"
              >
                {loading ? 'Processing...' : (isLogin ? 'Enter Dashboard' : 'Create Admin Account')}
              </button>
            </form>
          </div>
        </div>
      </main>

      <section className="relative max-w-7xl mx-auto w-full px-6 pb-20 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon="⚛️" 
            title="MERN Stack" 
            desc="Built with MongoDB, Express, React, and Node.js for a high-performance experience." 
            border="hover:border-indigo-500" 
            href="https://www.mongodb.com/mern-stack"
          />
          <FeatureCard 
            icon="🍃" 
            title="MongoDB Atlas" 
            desc="Cloud-hosted database ensuring high availability and secure team data storage." 
            border="hover:border-green-500" 
            href="https://www.mongodb.com/cloud/atlas"
          />
          <FeatureCard 
            icon="🚀" 
            title="Hostinger" 
            desc="Fast, reliable deployment with web hosting for cost-efficiency and stability." 
            border="hover:border-purple-500" 
            href="https://www.hostinger.com"
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc, border, href }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`block p-6 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 ${border} transition-all duration-300 group cursor-pointer shadow-sm hover:-translate-y-1`}
    >
      <div className="w-12 h-12 bg-white dark:bg-slate-700 shadow-sm rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
        {title}
        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
    </a>
  );
}
