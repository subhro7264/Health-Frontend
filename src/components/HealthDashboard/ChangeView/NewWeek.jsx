import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {fetchFitnessData}from '../../../store/fitnessActions';

import { ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Activity, Flame, HeartPulse, Footprints, Route } from 'lucide-react';
import SkeletonUI from '../../../UI/SkeletonUI';



const NewDash = () => {


const WEEK_SLEEP = [6.5, 7.2, 6.8, 8.1, 7.2, 0, 0];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Map static sleep data for the chart
const weeklySleepData = WEEK_DAYS.map((day, index) => ({
  day,
  sleep: WEEK_SLEEP[index]
}));


  const { data: fitnessData, loading, error } = useSelector((state) => state.fitness);

  console.log('This is Redux data:', fitnessData);

  // --- Dynamic Calculations ---
  const totalSepts = fitnessData.reduce((sum, day) => sum + (day.steps), 0)
  const totalCalories = fitnessData.reduce((sum, day) => sum + (day.calories || 0), 0);
  const daysWithHeartRate = fitnessData.filter(day => day.heartRate > 0);
  const totalHeartRate = daysWithHeartRate.reduce((sum, day) => sum + day.heartRate, 0);
  const avgHeartRate = daysWithHeartRate.length ? Math.round(totalHeartRate / daysWithHeartRate.length) : 0;
  const totalDistanceMeters = fitnessData.reduce((sum, day) => sum + (day.distanceMeters || 0), 0);
  const totalDistanceKm = (totalDistanceMeters / 1000).toFixed(1);
  const activeDaysCount = fitnessData.filter(day => day.steps > 0).length;

  // --- Summary Cards Definition ---:
  const SUMMARY_CARDS = [
    { label: "WEEKLY STEPS", value: totalSepts.toString(), unit: 'steps', color: "#71f08d", icon: <Footprints size={24} color="#e90505" /> },
    { label: "AVG HEART RATE", value: avgHeartRate.toString(), unit: "bpm", color: "#f87171", icon: <HeartPulse size={24} color="#f87171" /> },
    { label: "TOTAL CALORIES", value: totalCalories.toLocaleString(), unit: "kcal", color: "#fb923c", icon: <Flame size={24} color="#fb923c" /> },
    { label: "DISTANCE TRAVELED", value: totalDistanceKm, unit: "km", color: "#818cf8", icon: <Route size={24} color="#818cf8" /> },
    { label: "ACTIVE DAYS", value: activeDaysCount.toString(), unit: "/ 7", color: "#00e5a0", icon: <Footprints size={24} color="#00e5a0" /> },
  ];

  // --- CHART CONFIGURATION ARRAY ---

  const CHART_CONFIGS = [
    {
      id: "steps",
      title: "🏃 Daily Steps",
      data: fitnessData,
      show: fitnessData.length > 0,
      chartType: "bar",
      dataKey: "steps",
      xAxisKey: "displayDate",
      yDomain: [0, 'auto'],
      color: "#00e5a0",
      
    },
    {
      id: "calories",
      title: "🔥 Calories Burned",
      data: fitnessData,
      show: fitnessData.length > 0,
      chartType: "area",
      dataKey: "calories",
      xAxisKey: "displayDate",
      yDomain: [0, 'auto'],
      color: "#fb923c",
     

    },
    {
      id: "heartRate",
      title: "❤️ Average Heart Rate (bpm)",
      data: fitnessData,
      show: fitnessData.length > 0,
      chartType: "line",
      dataKey: "heartRate",
      xAxisKey: "displayDate",
      yDomain: ['dataMin - 10', 'dataMax + 10'],
      color: "#f87171"
    },
    {
      id: "sleep",
      title: "🌙 Sleep Duration (Hours)",
      data: weeklySleepData,
      show: true, // Always show static sleep data
      chartType: "area",
      dataKey: "sleep",
      xAxisKey: "day",
      yDomain: [0, 10],
      color: "#818cf8"
    }
  ];

  // --- Skeleton Loading UI ---
  if (loading) return <SkeletonUI />;

  // --- Error UI ---
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] font-sans">
        <div className="text-xl text-red-500 mb-4 bg-red-50 p-4 rounded-xl border border-red-100">
          {error}
        </div>
        <p className="text-gray-500 max-w-md text-center">
          Make sure you checked all the necessary permission boxes on the Google Consent screen!
        </p>
      </div>
    );
  }

  // --- Main Dashboard UI ---

  return (

    <div className="w-full mx-auto p-4 px-5 font-sans text-gray-900">

      <header className=" text-white mb-8">
        <h1 className="text-3xl font-semibold mb-1">Health Overview</h1>
        <p className="text-base text-gray-500">Last 7 Days</p>
      </header>

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        {SUMMARY_CARDS.map((card, index) => (
          <div key={index} className="p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{card.label}</h3>
              <div aria-label={card.label}>{card.icon}</div>
            </div>
            <p className="text-4xl font-bold" style={{ color: card.color }}>
              {card.value} <span className="text-base font-medium text-gray-400 ml-1">{card.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* MAPPED CHARTS SECTION */}
      <div className="flex flex-col flex-warap gap-10">

        {CHART_CONFIGS.map((chart) => {

          if (!chart.show) return null;

          return (

            <div key={chart.id} className="text-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
                {chart.title} 
              </h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>

                    {/* Setup Gradients dynamically if it's an Area chart */}
                    {chart.chartType === 'area' &&  (
                      <defs>
                        <linearGradient id={`color-${chart.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chart.color} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={chart.color} stopOpacity={0.3} />
                        </linearGradient>
                      </defs>
                    )}

                    {/* Universal Chart Settings */}

                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#31647b" />
                    <XAxis dataKey={chart.xAxisKey} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis domain={chart.yDomain} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: '1px solid #a84141', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />

                    {/* Conditionally render the correct chart visual based on type */}
                    {chart.chartType === 'bar' && (
                      <Bar dataKey={chart.dataKey} fill={chart.color}  radius={[4, 4, 0, 0]} barSize={32} />
                    )}

                    {chart.chartType === 'area' && (
                      <Area type="monotone" dataKey={chart.dataKey} stroke={chart.color} strokeWidth={3} fillOpacity={1} fill={`url(#color-${chart.id})`} />
                    )}

                    {chart.chartType === 'line' && (
                      <Line type="monotone" dataKey={chart.dataKey} stroke={chart.color} strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                    )}

                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default NewDash;


















