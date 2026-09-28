import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeeklySleep, updateSleepHours } from '../../../store/sleepSlice';
import { ResponsiveContainer, ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const SleepQuality = () => {
  const dispatch = useDispatch();
  const [showCustom, setShowCustom] = useState(false);
  
  // 1. Grab global state from Redux
  const sleepHours = useSelector((state) => state.sleep?.hours) || {};

  // 2. Local state to manage smooth typing without network lag
  const [localHours, setLocalHours] = useState({ Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 });

  const CURRENT_WEEK_START = "2026-06-29"; 

  // Fetch initial data from DB on load
  useEffect(() => {
    dispatch(fetchWeeklySleep(CURRENT_WEEK_START));
  }, [dispatch]);

  // Sync local typing state whenever Redux successfully updates or finishes fetching
  useEffect(() => {
    if (sleepHours && Object.keys(sleepHours).length > 0) {
      setLocalHours(sleepHours);
    }
  }, [sleepHours]);

  const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // 3. Chart updates instantly in real-time as you type!
  const weeklySleepData = WEEK_DAYS.map((day) => ({
    day,
    sleep: Number(localHours[day]) || 0
  }));
 
  // Handles immediate fluid typing inside the text fields
  const handleInputChange = (day, value) => {
    setLocalHours((prev) => ({
      ...prev,
      [day]: value // Keeps the string format temporarily so decimals like "7." don't break
    }));
  };

  // Saves to Redux and MongoDB ONLY when the user moves to another field or clicks away
  const handleInputBlur = (day, value) => {
    dispatch(updateSleepHours({
      startOfWeek: CURRENT_WEEK_START,
      day,
      hours: Number(value) || 0
    }));
  };

  const chartConfig = {
    id: 'sleep-duration',
    title: 'Weekly Sleep Analytics',
    color: '#10b981',
    xAxisKey: 'day',
    dataKey: 'sleep',
    yDomain: [0, 12]
  };

  return (
    <div className="flex flex-col justify-center space-y-6 h-full p-6 bg-gray-900 rounded-2xl max-w-4xl mx-auto">
      
      {/* Header and Toggle Action Controller */}
      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-xl border border-gray-700 text-white">
        <div>
          <h4 className="text-md font-semibold text-gray-200">Sleep Tracking Controls</h4>
          <p className="text-xs text-gray-400 mt-0.5">Toggle to customize daily target logs manually</p>
        </div>
        <button 
          onClick={() => setShowCustom(!showCustom)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
            showCustom 
              ? 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-700' 
              : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {showCustom ? 'Hide Adjustments' : 'Customize Hours'}
        </button>
      </div>

      {/* Conditionally Rendered Custom Input Control Center */}
      {showCustom && (
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 text-white">
          <h4 className="text-sm font-medium mb-3 text-gray-400">Quick Adjust Hours</h4>
          <div className="flex flex-wrap gap-4">
            {WEEK_DAYS.map((day) => (
              <div key={day} className="flex flex-col gap-1 flex-1 min-w-[80px]">
                <label className="text-xs text-gray-400 font-medium">{day}</label>
                <input 
                  type="number" 
                  step="0.5"
                  min="0"
                  max="24"
                  value={localHours[day] ?? ''} // Bound to highly responsive local state
                  onChange={(e) => handleInputChange(day, e.target.value)} 
                  onBlur={(e) => handleInputBlur(day, e.target.value)} // Database write triggered here
                  className="bg-gray-700 border border-gray-600 rounded px-2 py-1.5 text-sm w-full focus:outline-none focus:border-emerald-500 text-center"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chart Layout Visual */}
      <div className="text-white p-6 rounded-xl border border-gray-700 bg-gray-800/50">
        <h3 className="text-lg font-semibold mb-5 text-gray-100">{chartConfig.title}</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={weeklySleepData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              
              <defs>
                <linearGradient id={`color-${chartConfig.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig.color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={chartConfig.color} stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
              <XAxis dataKey={chartConfig.xAxisKey} axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} />
              <YAxis domain={chartConfig.yDomain} axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} />
              
              <Tooltip 
                cursor={{ stroke: chartConfig.color, strokeWidth: 1, strokeDasharray: '4 4' }} 
                contentStyle={{ backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid #27272a', color: '#fff' }} 
              />

              <Area 
                type="monotone" 
                dataKey={chartConfig.dataKey} 
                stroke={chartConfig.color} 
                strokeWidth={3} 
                fillOpacity={1} 
                fill={`url(#color-${chartConfig.id})`} 
                activeDot={{ r: 6, fill: chartConfig.color, strokeWidth: 0 }}
              />

            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SleepQuality;