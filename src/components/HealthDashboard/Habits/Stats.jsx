import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFitnessData } from '../../../store/fitnessActions';
import { Footprints, Heart, Flame, MapPin, Zap } from 'lucide-react';

// Standard baseline targets for daily telemetry progress
const DAILY_TARGETS = {
  steps: 10000,
  calories: 600,
  distanceKm: 5.0,
  activeMinutes: 45,
};

const Stats = () => {
  const dispatch = useDispatch();
  const { data: fitnessData, loading } = useSelector((state) => state.fitness || {});

  // Fetch fitness records on initial component mount
  useEffect(() => {
    if (dispatch && fetchFitnessData) {
      dispatch(fetchFitnessData());
    }
  }, [dispatch]);

  const todayData = fitnessData && fitnessData.length > 0
    ? fitnessData[fitnessData.length - 1]
    : {
        steps: 0,
        heartRate: 0,
        calories: 0,
        distanceMeters: 0,
        activeMinutes: 0,
      };

  const distanceKm = parseFloat((todayData.distanceMeters / 1000).toFixed(1));

  // Stat definitions with target progress percentages and thematic accents
  const statCards = [
    {
      id: 'steps',
      label: 'Steps',
      value: todayData.steps.toLocaleString(),
      rawVal: todayData.steps,
      target: DAILY_TARGETS.steps,
      unit: '',
      icon: Footprints,
      color: 'text-purple-400',
      borderColor: 'hover:border-purple-500/40',
      bgGlow: 'from-purple-500/10 via-fuchsia-500/5 to-transparent',
      barColor: 'bg-gradient-to-r from-purple-500 to-fuchsia-400',
      progress: Math.min(100, Math.round((todayData.steps / DAILY_TARGETS.steps) * 100)),
    },
    {
      id: 'heartRate',
      label: 'Heart Rate',
      value: todayData.heartRate || '--',
      rawVal: todayData.heartRate,
      target: null,
      unit: 'bpm',
      icon: Heart,
      color: 'text-rose-400',
      borderColor: 'hover:border-rose-500/40',
      bgGlow: 'from-rose-500/10 via-red-500/5 to-transparent',
      barColor: null, // Heart rate uses a live pulse badge instead of a progress bar
      progress: null,
    },
    {
      id: 'calories',
      label: 'Active Burn',
      value: todayData.calories.toLocaleString(),
      rawVal: todayData.calories,
      target: DAILY_TARGETS.calories,
      unit: 'kcal',
      icon: Flame,
      color: 'text-amber-400',
      borderColor: 'hover:border-amber-500/40',
      bgGlow: 'from-amber-500/10 via-orange-500/5 to-transparent',
      barColor: 'bg-gradient-to-r from-amber-500 to-orange-400',
      progress: Math.min(100, Math.round((todayData.calories / DAILY_TARGETS.calories) * 100)),
    },
    {
      id: 'distance',
      label: 'Distance',
      value: distanceKm,
      rawVal: distanceKm,
      target: DAILY_TARGETS.distanceKm,
      unit: 'km',
      icon: MapPin,
      color: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/40',
      bgGlow: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      barColor: 'bg-gradient-to-r from-emerald-500 to-teal-400',
      progress: Math.min(100, Math.round((distanceKm / DAILY_TARGETS.distanceKm) * 100)),
    },
    {
      id: 'activeMinutes',
      label: 'Active Time',
      value: todayData.activeMinutes,
      rawVal: todayData.activeMinutes,
      target: DAILY_TARGETS.activeMinutes,
      unit: 'min',
      icon: Zap,
      color: 'text-cyan-400',
      borderColor: 'hover:border-cyan-500/40',
      bgGlow: 'from-cyan-500/10 via-blue-500/5 to-transparent',
      barColor: 'bg-gradient-to-r from-cyan-500 to-blue-400',
      progress: Math.min(100, Math.round((todayData.activeMinutes / DAILY_TARGETS.activeMinutes) * 100)),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6 max-w-7xl mx-auto">
      {statCards.map((stat) => {
        const IconComponent = stat.icon;

        if (loading) {
          return (
            <div
              key={stat.id}
              className="h-[110px] rounded-2xl p-4 bg-slate-950/60 border border-slate-800/80 backdrop-blur-xl animate-pulse flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-slate-800/60" />
                <div className="w-10 h-3 rounded bg-slate-800/60" />
              </div>
              <div className="w-20 h-5 rounded bg-slate-800/80" />
              <div className="w-full h-1.5 rounded bg-slate-800/40" />
            </div>
          );
        }

        return (
          <div
            key={stat.id}
            className={`group relative overflow-hidden rounded-2xl p-4 bg-slate-950/60 backdrop-blur-xl border border-slate-800/80 shadow-xl shadow-black/30 transition-all duration-300 ${stat.borderColor} hover:-translate-y-0.5`}
          >
            {/* Ambient Background Radial Glow */}
            <div
              className={`absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br ${stat.bgGlow} rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
            />

            <div className="relative z-10 flex flex-col justify-between h-full space-y-2.5">
              {/* Top Row: Icon Badge & Target Pill */}
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <IconComponent className={`w-4 h-4 ${stat.color} ${stat.id === 'heartRate' && todayData.heartRate > 0 ? 'animate-pulse' : ''}`} />
                </div>

                {stat.progress !== null ? (
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800">
                    {stat.progress}%
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    LIVE
                  </span>
                )}
              </div>

              {/* Middle Row: Value & Unit */}
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-0.5">
                  {stat.label}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-xl sm:text-2xl font-black font-mono tracking-tight ${stat.color}`}>
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      {stat.unit}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Row: Micro-Progress Bar or Activity Beat */}
              {stat.progress !== null ? (
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/60">
                  <div
                    className={`h-full ${stat.barColor} transition-all duration-700 ease-out shadow-sm`}
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              ) : (
                <div className="w-full h-1.5 flex items-center gap-1 opacity-60">
                  <span className="h-0.5 w-3 bg-rose-500/60 rounded-full" />
                  <span className="h-1.5 w-1.5 bg-rose-500 rounded-full animate-ping" />
                  <span className="h-0.5 flex-1 bg-slate-800 rounded-full" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Stats);