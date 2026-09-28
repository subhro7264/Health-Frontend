
// import React from 'react';
// import { useSelector } from 'react-redux';
// // import TodayView from './TodayView';
// import NewWeek from './ChangeView/NewWeek';
// import Month from './ChangeView/Month';
// import DailyProgress from '../HealthActivity/DailyProgress/DailyProgress';
// import SleepQuality from '../HealthActivity/SleepQuality/SleepQuality';
// import Activity from '../HealthActivity/Activity/Activity';
// import Hydration from '../HealthActivity/Hydration/Hydration';
// import TodaysAgenda from '../HealthActivity/Today/TodaysAgenda';
// import Mindfulness from '../HealthActivity/Mindfulness/Mindfulness';
// import DietSection from '../HealthActivity/Diet/DietSection';

// const DashboardContent = () => {
//     const currentView = useSelector((state) => state.changeView.value) || "Today";

//       switch (currentView) {
//             case "Week":
//                 return <NewWeek />;
//             case "Month":
//                 return <Month />;
//             case "Today":
//             default:
//                 return (
//                     <div className=" p-8 bg-[#0f1825] p-6 rounded-lg border border-slate-800 flex flex-col  lg:flex-row gap-6">

//                         {/* Left Column: Health Metric Cards */}
//                         <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             <DailyProgress />
//                             {/* <SleepQuality /> */}
//                             {/* <DietSection/> */}
//                             <Hydration />
//                             <Mindfulness />
//                         </div>


//                         {/* Right Column: Agenda */}
//                         <div className="w-full lg:w-[350px] shrink-0">
//                             <TodaysAgenda />
//                         </div>

//                     </div>
//                 );
//         }
// };

// export default DashboardContent;


// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useAuth } from '../../context/AuthContext'// Adjust path to your AuthContext
// import { fetchAgendas } from '../../store/agendaThunks';
// import { clearAgenda } from '../../store/agendaSlice';
// import { fetchUserDiet } from '../../store/dietThunks';
// import { clearDiet } from '../../store/dietSlice';

// import NewWeek from './ChangeView/NewWeek';
// import Month from './ChangeView/Month';
// import DailyProgress from '../HealthActivity/DailyProgress/DailyProgress';
// import Hydration from '../HealthActivity/Hydration/Hydration';
// import Mindfulness from '../HealthActivity/Mindfulness/Mindfulness';
// import DietSection from '../HealthActivity/Diet/DietSection';
// import TodaysAgenda from '../HealthActivity/Today/TodaysAgenda';

// const DashboardContent = () => {
//     const dispatch = useDispatch();
//     const { user } = useAuth();
//     const currentView = useSelector((state) => state.changeView.value) || "Today";

//     // Synchronize user-specific data on login / date load
//     useEffect(() => {
//         if (user) {
//             const today = new Date().toISOString().split('T')[0];
//             dispatch(fetchAgendas(today));
//             dispatch(fetchUserDiet());
//         } else {
//             dispatch(clearAgenda());
//             dispatch(clearDiet());
//         }
//     }, [user, dispatch]);

//     switch (currentView) {
//         case "Week":
//             return <NewWeek />;
//         case "Month":
//             return <Month />;
//         case "Today":
//         default:
//             return (
//                 <div className="p-6 bg-[#0f1825] rounded-2xl border border-slate-800/80 flex flex-col lg:flex-row gap-6">
//                     {/* Left Column: Health Metrics & Diet Section */}
//                     <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-min">
//                         {/* Top Metrics Row */}
//                         <DailyProgress />
//                         <Hydration />

//                         {/* Mindfulness Widget (Spans 1 column on mobile/desktop) */}
//                         <Mindfulness />

//                         {/* AI Diet Section: Spans full width across 2 columns for optimal layout */}
//                         <div className="sm:col-span-2">
//                             <DietSection />
//                         </div>
//                     </div>

//                     {/* Right Column: Sticky / Fixed-width Daily Agenda */}
//                     <div className="w-full lg:w-[360px] shrink-0">
//                         <TodaysAgenda />
//                     </div>
//                 </div>
//             );
//     }
// };

// export default DashboardContent;






























// import React, { useEffect ,useState} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useAuth } from '../../context/AuthContext'// Adjust path to your AuthContext
// import { fetchAgendas } from '../../store/agendaThunks';
// import { clearAgenda } from '../../store/agendaSlice';
// import { fetchUserDiet } from '../../store/dietThunks';
// import { clearDiet } from '../../store/dietSlice';

// import NewWeek from './ChangeView/NewWeek';

// import DailyProgress from '../HealthActivity/DailyProgress/DailyProgress';
// import Hydration from '../HealthActivity/Hydration/Hydration';
// import Mindfulness from '../HealthActivity/Mindfulness/Mindfulness';
// import DietSection from '../HealthActivity/Diet/DietSection';
// import TodaysAgenda from '../HealthActivity/Today/TodaysAgenda';


// const DashboardContent = () => {
//   const dispatch = useDispatch();
//   const { user } = useAuth();
//   const currentView = useSelector((state) => state.changeView.value) || "Today";
//   const { plan } = useSelector((state) => state.diet || {});

//   // State to toggle the AI Diet Planner section on click
//   const [isDietOpen, setIsDietOpen] = useState(false);

//   // Synchronize user-specific data on login / date load
//   useEffect(() => {
//     if (user) {
//       const today = new Date().toISOString().split('T')[0];
//       dispatch(fetchAgendas(today));
//       dispatch(fetchUserDiet());
//     } else {
//       dispatch(clearAgenda());
//       dispatch(clearDiet());
//     }
//   }, [user, dispatch]);

//   switch (currentView) {
//     case "Week":
//       return <NewWeek />;
//     case "Today":
//     default:
//       return (
//         <div className="p-6 bg-gradient-to-br from-[#0c121e] via-[#0d1726] to-[#080d16] rounded-3xl border border-slate-800/80 shadow-2xl shadow-indigo-950/20 flex flex-col lg:flex-row gap-6 transition-all duration-300">

//           {/* Left Column: Health Metrics & Interactive AI Diet */}
//           <div className="flex-1 flex flex-col gap-4">

//             {/* 2-Column Metrics Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <DailyProgress />
//               <Hydration />
//             </div>

//             {/* Mindfulness Row */}
//             <div className="w-full">
//               <Mindfulness />
//             </div>

//             {/* Interactive Collapsible AI Diet Section */}
//             <div className="w-full rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/25 via-teal-950/20 to-cyan-950/20 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-emerald-500/40 shadow-lg shadow-emerald-950/20">

//               {/* Clickable Header Banner */}
//               <button
//                 type="button"
//                 onClick={() => setIsDietOpen((prev) => !prev)}
//                 className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer group transition-colors hover:bg-emerald-500/5 focus:outline-none"
//               >
//                 <div className="flex items-center gap-3.5">
//                   {/* Glowing Icon Badge */}
//                   <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform">
//                     <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
//                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"/>
//                     </svg>
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-2">
//                       <h4 className="text-base font-bold text-white tracking-wide group-hover:text-emerald-300 transition-colors">
//                         AI Nutrition & Meal Planner
//                       </h4>
//                       <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
//                         Gemini AI
//                       </span>
//                     </div>
//                     <p className="text-xs text-slate-400 mt-0.5">
//                       {isDietOpen ? 'Click to collapse meal planner' : 'Click to customize & view today’s diet plan'}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Right Status Badge & Arrow */}
//                 <div className="flex items-center gap-3">
//                   {plan && !isDietOpen && (
//                     <div className="hidden md:flex items-center gap-2">
//                       <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-900/80 text-emerald-400 border border-slate-700/60 shadow-inner">
//                         🔥 {plan.totalCalories} kcal
//                       </span>
//                       {plan.macros?.protein && (
//                         <span className="text-xs font-medium px-2 py-1 rounded-lg bg-slate-900/80 text-teal-300 border border-slate-700/60">
//                           {plan.macros.protein} Prot
//                         </span>
//                       )}
//                     </div>
//                   )}

//                   {/* Animated Chevron */}
//                   <div className={`p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-400 group-hover:text-white transition-all transform ${isDietOpen ? 'rotate-180 bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : ''}`}>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>
//               </button>

//               {/* Collapsible Diet Section Content */}
//               {isDietOpen && (
//                 <div className="p-4 sm:p-5 pt-0 border-t border-slate-800/80 bg-slate-950/40 animate-fadeIn">
//                   <DietSection />
//                 </div>
//               )}
//             </div>

//           </div>

//           {/* Right Column: Daily Agenda */}
//           <div className="w-full lg:w-[360px] shrink-0">
//             <div className="sticky top-6">
//               <TodaysAgenda />
//             </div>
//           </div>

//         </div>
//       );
//   }
// };

// export default DashboardContent;













import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext'
import { fetchAgendas } from '../../store/agendaThunks';
import { clearAgenda } from '../../store/agendaSlice';
import { fetchUserDiet } from '../../store/dietThunks';
import { clearDiet } from '../../store/dietSlice';

// import NewWeek from './ChangeView/NewWeek';

// import DailyProgress from '../HealthActivity/DailyProgress/DailyProgress';
// import Hydration from '../HealthActivity/Hydration/Hydration';
// import Mindfulness from '../HealthActivity/Mindfulness/Mindfulness';
// import DietSection from '../HealthActivity/Diet/DietSection';
// import TodaysAgenda from '../HealthActivity/Today/TodaysAgenda';




const NewWeek = lazy(() => import('./ChangeView/NewWeek'));
const DailyProgress = lazy(() => import('../HealthActivity/DailyProgress/DailyProgress'));
const Hydration = lazy(() => import('../HealthActivity/Hydration/Hydration'));
const Mindfulness = lazy(() => import('../HealthActivity/Mindfulness/Mindfulness'));
const DietSection = lazy(() => import('../HealthActivity/Diet/DietSection'));
const TodaysAgenda = lazy(() => import('../HealthActivity/Today/TodaysAgenda'));




const DashboardContent = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const currentView = useSelector((state) => state.changeView.value) || "Today";
  const { plan } = useSelector((state) => state.diet || {});

  // State to toggle the AI Diet Planner section on click
  const [isDietOpen, setIsDietOpen] = useState(false);

  // Synchronize user-specific data on login / date load
  useEffect(() => {
    if (user) {
      const today = new Date().toISOString().split('T')[0];
      dispatch(fetchAgendas(today));
      dispatch(fetchUserDiet());
    } else {
      dispatch(clearAgenda());
      dispatch(clearDiet());
    }
  }, [user, dispatch]);

  switch (currentView) {
    case "Week":
      return <NewWeek />;
    case "Today":
    default:
      return (
        <Suspense fallback={<div>Loading Dashboard...</div>}>
          <div className="p-6 bg-gradient-to-br from-[#0c121e] via-[#0d1726] to-[#080d16] rounded-3xl border border-slate-800/80 shadow-2xl shadow-indigo-950/20 flex flex-col lg:flex-row gap-6 transition-all duration-300">

            {/* Left Column: Health Metrics & Interactive AI Diet */}
            <div className="flex-1 flex flex-col gap-4">

              {/* 2-Column Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DailyProgress />
                <Hydration />
              </div>

              {/* Mindfulness Row */}
              <div className="w-full">
                <Mindfulness />
              </div>

              {/* Interactive Collapsible AI Diet Section */}
              <div className="w-full rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/25 via-teal-950/20 to-cyan-950/20 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-emerald-500/40 shadow-lg shadow-emerald-950/20">

                {/* Clickable Header Banner */}
                <button
                  type="button"
                  onClick={() => setIsDietOpen((prev) => !prev)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer group transition-colors hover:bg-emerald-500/5 focus:outline-none"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Glowing Icon Badge */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" />
                      </svg>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white tracking-wide group-hover:text-emerald-300 transition-colors">
                          AI Nutrition & Meal Planner
                        </h4>
                        <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Gemini AI
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {isDietOpen ? 'Click to collapse meal planner' : 'Click to customize & view today’s diet plan'}
                      </p>
                    </div>
                  </div>

                  {/* Right Status Badge & Arrow */}
                  <div className="flex items-center gap-3">
                    {plan && !isDietOpen && (
                      <div className="hidden md:flex items-center gap-2">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-900/80 text-emerald-400 border border-slate-700/60 shadow-inner">
                          🔥 {plan.totalCalories} kcal
                        </span>
                        {plan.macros?.protein && (
                          <span className="text-xs font-medium px-2 py-1 rounded-lg bg-slate-900/80 text-teal-300 border border-slate-700/60">
                            {plan.macros.protein} Prot
                          </span>
                        )}
                      </div>
                    )}

                    {/* Animated Chevron */}
                    <div className={`p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-400 group-hover:text-white transition-all transform ${isDietOpen ? 'rotate-180 bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : ''}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Collapsible Diet Section Content */}
                {isDietOpen && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-800/80 bg-slate-950/40 animate-fadeIn">
                    <DietSection />
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Daily Agenda */}
            <div className="w-full lg:w-[360px] shrink-0">
              <div className="sticky top-6">
                <TodaysAgenda />
              </div>
            </div>

          </div>
        </Suspense>
      );
  }
};

export default DashboardContent;