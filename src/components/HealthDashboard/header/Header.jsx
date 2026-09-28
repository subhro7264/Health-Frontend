// import React, { useState, useEffect } from "react";
// import { useAuth } from '../../../context/AuthContext';
// import { useDispatch, useSelector } from 'react-redux';
// import { changeView } from '../../../store/utilsSlice';
// import LiveClock from './LiveClock';
// import { useNavigate } from 'react-router-dom';


// const Header = () => {
    
//     const { user, logout } = useAuth();
//     const dispatch = useDispatch();
//     const [showEditStats, setShowEditStats] = useState(false);
//     const currentView = useSelector((state) => state.changeView.value) || "Today";
//     const views = ["Today", "Week", ];
//     const hour = new Date().getHours();
//     const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";


//     console.log("Current view from Redux:", currentView);

//     const viewhandler = (e) => {
//         const selectedValue = e.target.value;
//         console.log("Selected view:", selectedValue);
//         dispatch(changeView(selectedValue));
//     };
//     const handleLogout = async () => {
//         await logout();
//         navigate('/login');
//     };

//     return (
//         <>
//             <div className="flex flex-wrap justify-between ms:justify-start  mb-6 max-w-8xl mx-auto">

//                 <div className="mb-4 ms:mb-0">
//                     <div className="flex items-center gap-2 mb-1">
//                         <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00e5a0" }} />
//                         <span className="text-xs text-green-400 tracking-wider font-mono">
//                             HEALTH OS · LIVE
//                         </span>
//                         <LiveClock />
//                     </div>
//                     <h1 className="text-3xl font-bold" style={{ color: "#f0f0f0" }}>
//                         {greeting}, {user?.name || "there"} 👋
//                     </h1>
//                 </div>



//                 <div className="flex  items-center gap-6">
//                     <button className="px-4 py-2 rounded-xl text-sm font-semibold border-[1px] border-white text-[#00bfff] hover:bg-[#e63946] hover:text-[#f0f0f0] transition-all " onClick={handleLogout}>
//                         Sign out
//                     </button>
               

//                     <div className="flex gap-1 p-1 rounded-xl bg-[#0f1825] border-[1px] border-white">
//                         <select value={currentView} onChange={viewhandler}
//                             className="w-full  rounded-xl border-[1px] border-white bg-[#0f1825] p-2 text-sm font-semibold text-[#00bfff] outline-none transition-colors hover:border-[#5a6680] focus:border-[#00bfff]">
//                             {views.map((v) => (
//                                 <option key={v} value={v} className=" rounded-xl bg-[#0f1825] text-[#00bfff]">
//                                     {v}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//             </div>



//         </>

//     )

// }
// export default React.memo(Header);






import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeView } from '../../../store/utilsSlice';
import { useAuth } from '../../../context/AuthContext';
import { Clock, Bell, LogOut, Calendar } from 'lucide-react';

// Isolated Live Clock to prevent re-rendering the parent Header
const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="tabular-nums font-mono text-xs text-slate-300">
      {time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })}
    </span>
  );
};

const Header = () => {
  const { user, logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentView = useSelector((state) => state.changeView?.value) || 'Today';
  const views = ['Today', 'Week'];

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const userName = user?.name || 'there';
  const userInitial = userName.charAt(0).toUpperCase();

  const handleViewChange = (view) => {
    dispatch(changeView(view));
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header className="relative w-full rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-xl shadow-2xl shadow-cyan-950/20 mb-6 transition-all">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
        {/* Left Side: Live Badge, Clock & User Greeting */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Live System Signal */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </span>
              <span className="text-[10px] font-bold tracking-wider text-emerald-400 font-mono">
                HEALTH OS · LIVE
              </span>
            </div>

            <span className="text-slate-700 text-xs">•</span>

            {/* Date & Live Clock */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-300 font-medium">{formattedDate}</span>
              </div>
              <span className="text-slate-700 text-xs">•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <LiveClock />
              </div>
            </div>
          </div>

          {/* User Heading with Monogram */}
          <div className="flex items-center gap-2.5 pt-0.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs shadow-inner">
              {userInitial}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>{greeting}, {userName}</span>
              <span className="inline-block hover:rotate-12 transition-transform cursor-default">👋</span>
            </h1>
          </div>
        </div>

        {/* Right Side: Segmented Controls, Alerts & Logout */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Segmented View Pills (Today / Week) */}
          <div className="flex p-1 rounded-xl bg-slate-950/70 border border-white/10 shadow-inner">
            {views.map((view) => {
              const active = currentView === view;
              return (
                <button
                  key={view}
                  onClick={() => handleViewChange(view)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {view}
                </button>
              );
            })}
          </div>

          {/* Quick Notification Bell */}
          <button
            type="button"
            className="relative p-2 rounded-xl bg-slate-950/70 border border-white/10 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
          </button>

          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border border-rose-500/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500 hover:text-white transition-all duration-200 cursor-pointer active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Sign out</span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default React.memo(Header);