//  import React, { useState } from 'react';


// const Hydration = () => {


//     const [current, setCurrent] = useState(0);
//     const [customTarget, setCustomTarget] = useState(2.5);
//     const maxCapacity = 3.7;
    
//     const percentage = customTarget > 0 ? Math.min(Math.round((current / customTarget) * 100), 100) : 0;

//     const addWater = () => {
//         setCurrent(prev => Math.min(parseFloat((prev + 0.25).toFixed(2)), customTarget));
//     };

//     const removeWater = () => {
//         setCurrent(prev => Math.max(parseFloat((prev - 0.25).toFixed(2)), 0));
//     };

//     const waterHandler = () => {
//         setCustomTarget(prev => Math.min(parseFloat((prev + 1.2).toFixed(2)), maxCapacity));
//     };


// const feedbackMessage = 
//         percentage === 100 ? "Target reached! Excellent job! 🎉" :
//         percentage >= 75  ? "Almost at your goal!" :
//         percentage >= 35  ? "You're doing great! Mid-way there." :
//         percentage > 0    ? "Off to a good start, keep going!" : 
//                             "Time to start hydrating!";

//     return (

//         <div className="w-full bg-slate-950/40 p-5 rounded-2xl border border-slate-800/60 flex flex-col justify-between min-h-[180px] relative overflow-hidden transition-all duration-300 hover:border-sky-500/30 group">
            
//             {/* Interactive Dynamic Wave Background Effect */}
//             <div 
//                 className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sky-600/10 to-transparent transition-all duration-700 ease-out pointer-events-none"
//                 style={{ height: `${percentage}%` }}
//             />

//             <div className="relative z-10">
//                 <div className="flex justify-between items-center">
//                     <div>
//                         <h3 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
//                             Water Intake
//                         </h3>
//                         <p className="text-[11px] text-slate-500 mt-0.5 transition-all duration-300 group-hover:text-sky-400/80">
//                             {feedbackMessage}
//                         </p>
//                     </div>

//                     {/* Animated Water Droplet Indicator */}
//                     <div className="flex space-x-1 text-base text-sky-400">
//                         <span className="animate-bounce" style={{ animationDuration: '2s' }}>💧</span>
//                         <span className={`transition-all duration-500 ${percentage >= 100 ? "opacity-100 scale-110 drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]" : "opacity-30"}`}>
//                             💧
//                         </span>
//                     </div>
//                 </div>
                
//                 <div className="flex items-center justify-between mt-4 mb-4">
//                     <div className="text-sm tracking-tight text-slate-400 font-medium flex items-center gap-2">
//                         <div>
//                             <span className="text-3xl font-extrabold text-white tracking-tight tabular-nums transition-all">
//                                 {current}L
//                             </span>
//                             <span className="text-slate-500 text-xs ml-1">/ {customTarget}L</span>
//                         </div>
//                         {customTarget < maxCapacity && (
//                             <button 
//                                 onClick={waterHandler}
//                                 className="text-[10px] uppercase font-bold tracking-wider bg-slate-800/80 hover:bg-sky-500 hover:text-white px-2 py-1 rounded-md border border-slate-700/60 active:scale-90 transition-all duration-200"
//                             >
//                                 +max
//                             </button>
//                         )}
//                     </div>
                    
//                     {/* High-fidelity Log Buttons */}
//                     <div className="flex items-center space-x-2">
//                         <button 
//                             onClick={removeWater}
//                             disabled={current === 0}
//                             className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-bold flex items-center justify-center border border-slate-800 transition-all active:scale-90 disabled:opacity-20 disabled:pointer-events-none"
//                             title="Remove 250ml"
//                         >
//                             —
//                         </button>
//                         <button 
//                             onClick={addWater}
//                             disabled={current >= customTarget}
//                             className="h-9 px-4 rounded-xl bg-sky-500 text-white font-semibold flex items-center justify-center shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 hover:bg-sky-400 active:scale-95 transition-all duration-150 text-xs gap-1.5 disabled:bg-slate-900 disabled:text-slate-600 disabled:border-slate-800 disabled:border disabled:shadow-none disabled:pointer-events-none"
//                         >
//                             <span className="text-sm">+</span> 250ml
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Custom Glowing Liquid Progress Bar */}
//             <div className="w-full h-2.5 bg-slate-950/80 rounded-full overflow-hidden border border-slate-900 relative z-10 p-0.5">
//                 <div 
//                     className="h-full bg-gradient-to-r from-sky-500 via-sky-400 to-blue-500 rounded-full shadow-[0_0_12px_rgba(14,165,233,0.8)] transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
//                     style={{ width: `${percentage}%` }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Hydration;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const API_BASE_URL = "http://localhost:5000/api/hydration";

const Hydration = () => {
  const { user } = useAuth();
  const userId = user?._id || user?.id || user?.uid || user?.user?._id;

  const [current, setCurrent] = useState(0);
  const [customTarget, setCustomTarget] = useState(2.5);
  const [loading, setLoading] = useState(true);

  const maxCapacity = 3.7;
  const percentage = customTarget > 0 ? Math.min(Math.round((current / customTarget) * 100), 100) : 0;

  useEffect(() => {
    const fetchOrInitializeHydration = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${userId}`);
        if (response.data) {
          setCurrent(response.data.current ?? 0);
          setCustomTarget(response.data.customTarget ?? 2.5);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          try {
            const initResponse = await axios.post(API_BASE_URL, { userId });
            setCurrent(initResponse.data.current ?? 0);
            setCustomTarget(initResponse.data.customTarget ?? 2.5);
          } catch (postError) {
            console.error("Hydration POST init failed:", postError);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchOrInitializeHydration();
  }, [userId]);

  const syncWithDatabase = useCallback(async (nextCurrent, nextTarget) => {
    if (!userId) return;
    try {
      await axios.put(`${API_BASE_URL}/${userId}`, {
        current: nextCurrent,
        customTarget: nextTarget,
      });
    } catch (error) {
      console.error("Hydration sync error:", error);
    }
  }, [userId]);

  const updateWater = (delta) => {
    const nextValue = Math.min(
      Math.max(parseFloat((current + delta).toFixed(2)), 0),
      customTarget
    );
    setCurrent(nextValue);
    syncWithDatabase(nextValue, customTarget);
  };

  if (loading) {
    return (
      <div className="w-full h-full min-h-[190px] bg-slate-950/60 rounded-2xl border border-slate-800/80 flex items-center justify-center animate-pulse">
        <span className="text-xs font-mono text-cyan-400">Loading Vitals...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-slate-950/60 backdrop-blur-xl p-5 rounded-2xl border border-slate-800/80 shadow-xl shadow-black/40 flex items-center justify-between gap-5 group hover:border-cyan-500/30 transition-all duration-300">
      {/* Content Side */}
      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Hydration Telemetry
          </span>
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
            {percentage}%
          </span>
        </div>

        <div>
          <div className="text-3xl font-black text-white font-mono tracking-tight">
            {current.toFixed(2)}
            <span className="text-sm font-semibold text-slate-400 ml-1">/ {customTarget}L</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {percentage >= 100 ? "Hydration capacity satisfied" : `${(customTarget - current).toFixed(2)}L to target`}
          </p>
        </div>

        {/* Stepper Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateWater(-0.25)}
            disabled={current <= 0}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center active:scale-95 transition-all disabled:opacity-20 text-xs"
          >
            —
          </button>
          <button
            onClick={() => updateWater(0.25)}
            disabled={current >= customTarget}
            className="flex-1 h-9 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all disabled:opacity-30"
          >
            +250ml
          </button>
        </div>
      </div>

      {/* Visual Side: Vertical Glass Capsule */}
      <div className="relative w-12 h-28 bg-slate-900/80 rounded-full border border-cyan-500/20 p-1 flex flex-col justify-end overflow-hidden shrink-0 shadow-inner">
        {/* Animated Fluid Level */}
        <div
          className="w-full rounded-full bg-gradient-to-t from-blue-600 via-cyan-400 to-cyan-300 transition-all duration-700 ease-out shadow-[0_0_12px_rgba(6,182,212,0.8)]"
          style={{ height: `${percentage}%` }}
        />
        {/* Measurement Marks */}
        <div className="absolute inset-0 flex flex-col justify-between py-3 px-1.5 pointer-events-none opacity-40">
          <div className="w-full border-t border-white/40" />
          <div className="w-full border-t border-white/40" />
          <div className="w-full border-t border-white/40" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Hydration);