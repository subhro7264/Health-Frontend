import React from 'react';
import { useSelector } from 'react-redux';

/**
 * Apple Activity Rings Daily Progress Component
 * Displays concentric dual activity rings, streak badge, and habit telemetry.
 */
const DailyProgress = ({ streakDays = 6 }) => {
  // Redux Agenda state
  const reduxAgenda = useSelector((state) => state.agenda?.value) || [];

  const total = reduxAgenda.length;
  const completed = reduxAgenda.filter((item) => item.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const remaining = Math.max(0, total - completed);

  // Concentric Ring Calculations
  // Ring 1 (Outer - Habit Completion Ring)
  const outerRadius = 38;
  const outerCircumference = 2 * Math.PI * outerRadius;
  const outerStrokeDashoffset =
    outerCircumference - (percentage / 100) * outerCircumference;

  // Ring 2 (Inner - Consistency / Pace Ring)
  const innerRadius = 26;
  const innerCircumference = 2 * Math.PI * innerRadius;
  // Inner ring closes slightly ahead as a pacing incentive
  const innerPercentage = total > 0 ? Math.min(100, Math.round(percentage * 1.1)) : 0;
  const innerStrokeDashoffset =
    innerCircumference - (innerPercentage / 100) * innerCircumference;

  const isComplete = total > 0 && completed === total;

  return (
    <div className="relative w-full bg-slate-950/60 backdrop-blur-xl p-5 rounded-2xl border border-slate-800/80 shadow-xl shadow-black/40 flex items-center justify-between gap-4 overflow-hidden group hover:border-rose-500/30 transition-all duration-300">
      {/* Ambient Apple Glow in background */}
      <div className="absolute -right-8 -top-8 w-36 h-36 bg-gradient-to-br from-rose-500/10 via-emerald-500/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-rose-500/15 group-hover:via-emerald-500/15 transition-all duration-500" />

      {/* Left Column: Metric Details & Streak */}
      <div className="flex flex-col justify-between z-10 space-y-2">
        {/* Streak & Status Tag */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/25 shadow-sm">
            <span>🔥</span> {streakDays}-Day Streak
          </span>
          {isComplete && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">
              Closed
            </span>
          )}
        </div>

        {/* Big Counter */}
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
              {completed}
            </span>
            <span className="text-sm font-semibold text-slate-400">
              / {total} completed
            </span>
          </div>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            {total === 0
              ? 'No habits scheduled today'
              : remaining === 0
              ? 'All activity rings closed! 🎉'
              : `${remaining} habit${remaining > 1 ? 's' : ''} left to close today`}
          </p>
        </div>

        {/* Activity Ring Legends */}
        <div className="flex items-center gap-3 pt-1 text-[11px] font-semibold">
          <div className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2 h-2 rounded-full bg-[#fa114f] shadow-[0_0_6px_#fa114f]" />
            <span>Habits</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-[#00f5a0] shadow-[0_0_6px_#00f5a0]" />
            <span>Pacing</span>
          </div>
        </div>
      </div>

      {/* Right Column: Apple Concentric Activity Rings */}
      <div className="relative flex items-center justify-center shrink-0 z-10">
        <svg className="w-24 h-24 sm:w-28 sm:h-28 transform -rotate-90">
          <defs>
            {/* Outer Ring Gradient (Apple Coral / Rose) */}
            <linearGradient id="appleRoseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fa114f" />
              <stop offset="100%" stopColor="#ff5277" />
            </linearGradient>

            {/* Inner Ring Gradient (Apple Neon Mint / Emerald) */}
            <linearGradient id="appleMintGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5a0" />
              <stop offset="100%" stopColor="#00d9f5" />
            </linearGradient>
          </defs>

          {/* --- Outer Ring: Track & Fill --- */}
          <circle
            cx="48"
            cy="48"
            r={outerRadius}
            stroke="#2d121c"
            strokeWidth="7"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r={outerRadius}
            stroke="url(#appleRoseGradient)"
            strokeWidth="7"
            fill="transparent"
            strokeDasharray={outerCircumference}
            strokeDashoffset={outerStrokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(250,17,79,0.5)]"
          />

          {/* --- Inner Ring: Track & Fill --- */}
          <circle
            cx="48"
            cy="48"
            r={innerRadius}
            stroke="#0b2923"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r={innerRadius}
            stroke="url(#appleMintGradient)"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={innerCircumference}
            strokeDashoffset={innerStrokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(0,245,160,0.5)]"
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs sm:text-sm font-black text-white font-mono tracking-tight">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DailyProgress);