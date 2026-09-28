

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (user) navigate('/dashboard');
    const err = searchParams.get('error');
    if (err) setError('Google sign-in failed. Please try again.');
  }, [user, navigate, searchParams]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await login(form.email, form.password);
      if (data.success) navigate('/dashboard');
      else setError(data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
   
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-5 bg-[#14213d] text-[#e0e0e0] font-sora">
      {/* Background Glow Effects */}
      <div className="fixed rounded-full blur-[80px] opacity-15 pointer-events-none z-0 w-[500px] h-[500px] bg-indigo-500 -top-[100px] -left-[100px]" />
      <div className="fixed rounded-full blur-[80px] opacity-15 pointer-events-none z-0 w-[400px] h-[400px] bg-purple-500 -bottom-[80px] -right-[80px]" />

      <div className="bg-white/5 border border-white/10 rounded-[24px] py-12 px-10 w-full max-w-[420px] relative z-10 backdrop-blur-[20px] animate-fadeUp">
        <div className="text-center mb-8">
          <div className="text-[2.5rem] text-indigo-400 mb-4 block animate-[pulse_2s_ease_infinite]">⬡</div>
          <h1 className="text-[1.6rem] font-bold text-[#f0f0f0] tracking-[-0.03em]">Welcome back</h1>
          <p className="text-[0.875rem] text-[#666] mt-1.5">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/25 rounded-[10px] py-3 px-4 text-[0.85rem] text-red-400 mb-5">
            {error}
          </div>
        )}

        <button 
          className="w-full flex items-center justify-center gap-2.5 py-[13px] px-5 bg-white/5 border border-white/10 rounded-xl text-[#e0e0e0] font-medium text-[0.9rem] cursor-pointer transition-all duration-200 ease-in hover:bg-white/10 hover:border-white/20 hover:-translate-y-[1px] active:translate-y-0"
          onClick={loginWithGoogle} 
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {/* Custom Divider implemented with Flexbox */}
        {/* <div className="flex items-center gap-3 my-6 text-[#444] text-[0.8rem]">
          <div className="flex-1 h-px bg-white/10" />
          <span>or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.8rem] font-medium text-[#888] tracking-[0.03em]" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="py-3 px-4 bg-white/5 border border-white/10 rounded-[10px] text-[#e0e0e0] text-[0.9rem] outline-none transition-all duration-200 ease-in focus:border-indigo-500 focus:bg-indigo-500/10 focus:ring-[3px] focus:ring-indigo-500/15 placeholder-[#444]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[0.8rem] font-medium text-[#888] tracking-[0.03em]" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="py-3 px-4 bg-white/5 border border-white/10 rounded-[10px] text-[#e0e0e0] text-[0.9rem] outline-none transition-all duration-200 ease-in focus:border-indigo-500 focus:bg-indigo-500/10 focus:ring-[3px] focus:ring-indigo-500/15 placeholder-[#444]"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="p-[13px] bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white font-semibold text-[0.9rem] transition-all duration-200 mt-1 flex items-center justify-center min-h-[46px] hover:-translate-y-[1px] hover:shadow-[0_8px_25px_rgba(99,102,241,0.4)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {loading ? <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-[spin_0.7s_linear_infinite] inline-block" /> : 'Sign in'}
          </button>
        </form>

        <p className="text-center mt-6 text-[0.85rem] text-[#555]">
          Don't have an account? <Link className="text-indigo-400 font-medium no-underline hover:text-indigo-500" to="/register">Create one</Link>
        </p> */}
      </div>
    </div>
     </>
  );
};

export default Login;