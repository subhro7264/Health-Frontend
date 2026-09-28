import React, { useState, useEffect, useRef } from 'react';

const PRESETS = [
  { label: '5m', seconds: 5 * 60 },
  { label: '10m', seconds: 10 * 60 },
  { label: '15m', seconds: 15 * 60 },
];

const Mindfulness = () => {
  const [initialTime, setInitialTime] = useState(15 * 60);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isActive, setIsActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale'); // Inhale, Hold, Exhale

  // SVG Radial Dimensions (Matches DailyProgress & Hydration)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progress = initialTime > 0 ? ((initialTime - timeLeft) / initialTime) * 100 : 0;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // 1. Session Countdown Timer
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // 2. Dynamic Breath Pacing Engine (4s Inhale -> 2s Hold -> 4s Exhale)
  useEffect(() => {
    if (!isActive) {
      setBreathPhase('Ready');
      return;
    }
    const cycle = () => {
      const elapsed = (initialTime - timeLeft) % 10;
      if (elapsed < 4) setBreathPhase('Inhale');
      else if (elapsed < 6) setBreathPhase('Hold');
      else setBreathPhase('Exhale');
    };
    cycle();
  }, [isActive, timeLeft, initialTime]);

  const toggleTimer = () => setIsActive((prev) => !prev);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
  };

  const selectPreset = (seconds) => {
    setIsActive(false);
    setInitialTime(seconds);
    setTimeLeft(seconds);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full bg-slate-950/60 backdrop-blur-xl p-5 rounded-2xl border border-slate-800/80 shadow-xl shadow-black/40 flex items-center justify-between gap-4 overflow-hidden group hover:border-amber-500/30 transition-all duration-300">
      {/* Ambient Zen Glow */}
      <div
        className={`absolute -right-8 -top-8 w-40 h-40 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-transparent rounded-full blur-2xl pointer-events-none transition-all duration-1000 ${
          isActive ? 'scale-125 opacity-100 from-amber-500/20' : 'opacity-30'
        }`}
      />

      {/* Left Column: Metrics & Transport Controls */}
      <div className="flex flex-col justify-between z-10 space-y-2">
        {/* Status Tag & Preset Switcher */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/25 shadow-sm">
            <span className={isActive ? 'animate-spin' : ''}>🧘</span> Mindful State
          </span>

          {/* Quick Presets */}
          <div className="flex items-center bg-slate-900/90 rounded-lg p-0.5 border border-slate-800">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => selectPreset(p.seconds)}
                className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all ${
                  initialTime === p.seconds
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Big Countdown & Breathing Cue */}
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
              {formatTime(timeLeft)}
            </span>
            <span
              className={`text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${
                isActive ? 'text-amber-400' : 'text-slate-500'
              }`}
            >
              {isActive ? `• ${breathPhase}` : '• Ready'}
            </span>
          </div>

          <p className="text-xs font-medium text-slate-400 mt-0.5">
            {timeLeft === 0
              ? 'Mindfulness session concluded. Well done!'
              : isActive
              ? 'Slow your heart rate. Follow the breathing ring.'
              : 'Take a brief pause to reset focus and clarity.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={toggleTimer}
            className={`h-8 px-4 rounded-xl font-bold flex items-center justify-center text-xs gap-1.5 active:scale-95 transition-all shadow-lg ${
              isActive
                ? 'bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 shadow-amber-500/5'
                : 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-amber-500/20'
            }`}
          >
            {isActive ? (
              <>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Begin
              </>
            )}
          </button>

          {timeLeft !== initialTime && (
            <button
              onClick={resetTimer}
              className="h-8 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 active:scale-95 transition-all text-xs font-semibold"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Right Column: Radial Breathing Ring (Matches DailyProgress & Hydration) */}
      <div className="relative flex items-center justify-center shrink-0 z-10">
        <svg className="w-24 h-24 sm:w-28 sm:h-28 transform -rotate-90">
          <defs>
            <linearGradient id="amberZenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#271d10"
            strokeWidth="7"
            fill="transparent"
          />

          {/* Dynamic Progress Stroke */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="url(#amberZenGradient)"
            strokeWidth="7"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
          />
        </svg>

        {/* Center Breathing Flower Pulse */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div
            className={`w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center transition-all duration-1000 ${
              isActive && breathPhase === 'Inhale'
                ? 'scale-125 bg-amber-400/30'
                : isActive && breathPhase === 'Exhale'
                ? 'scale-90 bg-amber-400/10'
                : 'scale-100'
            }`}
          >
            <span className="text-sm">🧘</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Mindfulness);