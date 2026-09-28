// import React, { useState, useEffect } from 'react';
// import AgendaForm from './AgentdaForm';
// import { toggle } from '../../../store/toggle';
// import { useDispatch, useSelector } from "react-redux";

// import { fetchAgendas, deleteAgenda, toggleAgendaStatus } from '../../../store/agendaThunks';

// const TodaysAgenda = () => {
//     const dispatch = useDispatch();

//     const isToggle = useSelector((state) => state.toggle.value);
//     const reduxAgenda = useSelector((state) => state.agenda.value);
//     const { isLoading, error } = useSelector((state) => state.agenda);

//     useEffect(() => {
//         dispatch(fetchAgendas());
//     }, [dispatch]);

//     const handleToggle = () => {
//         dispatch(toggle());
//     };

//     const handleDelete = (id) => {
//         dispatch(deleteAgenda(id));
//     };



//     return (

//         <>

//             <div className="todays-agenda bg-gray-800 p-4 rounded-lg text-white">
//                 <div className='flex justify-between'>
//                     <h2 className="text-xl font-semibold mb-2">Today's Agenda</h2>

//                     <button onClick={handleToggle}
//                         className="rounded-full  bg-violet-800/40 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 
//                     focus:outline-none focus:ring-1 focus:ring-amber-900/20 focus:ring-offset-1">
//                         Add+
//                     </button>
//                 </div>

//                 {isToggle && <AgendaForm />}

//                 {isLoading && <p className="text-gray-400 text-sm">Loading tasks...</p>}
//                 {error && <p className="text-red-400 text-sm">{error}</p>}

//                 <ul className="text-gray-300 list-none space-y-2 mt-4">
//                     {reduxAgenda && reduxAgenda.map((item) => (
//                         <li
//                             key={item._id}
//                             className={`flex justify-between items-center p-3 rounded transition-all ${item.completed ? 'bg-gray-800/30 border border-gray-700/50' : 'bg-gray-700/50'
//                                 }`}
//                         >
//                             <div className="flex items-center space-x-3">
//                                 {/* Checkbox linked directly to Redux State and action thunk */}
//                                 <input
//                                     type="checkbox"
//                                     checked={item.completed || false}
//                                     onChange={() => dispatch(toggleAgendaStatus({ id: item._id, currentStatus: item.completed }))}
//                                     className="rounded accent-violet-500 h-4 w-4 cursor-pointer"
//                                 />

//                                 {/* DYNAMIC STYLING: Applies line-through when item.completed is true */}
//                                 <span className={`transition-all ${item.completed ? "line-through text-gray-500 italic" : "text-gray-100"}`}>
//                                     {item.task}
//                                 </span>
//                             </div>

//                             <button
//                                 onClick={() => dispatch(deleteAgenda(item._id))}
//                                 className="text-gray-400 hover:text-red-400 text-xs transition-colors"
//                             >
//                                 Delete
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>


//         </>

//     )



// }


// export default TodaysAgenda;








// import React, { useState, useEffect } from 'react';
// import AgendaForm from './AgentdaForm'
// import { toggle } from '../../../store/toggle';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAgendas, deleteAgenda, toggleAgendaStatus } from '../../../store/agendaThunks';

// const TodaysAgenda = () => {
//     const dispatch = useDispatch();

//     // Safely generates a localized YYYY-MM-DD string
//     const getLocalDateString = (dateObj) => {
//         const offset = dateObj.getTimezoneOffset();
//         const localizedDate = new Date(dateObj.getTime() - (offset * 60 * 1000));
//         return localizedDate.toISOString().split('T')[0];
//     };

//     const [currentDate, setCurrentDate] = useState(getLocalDateString(new Date()));
//     const isToggle = useSelector((state) => state.toggle.value);
//     const reduxAgenda = useSelector((state) => state.agenda.value);
//     const { isLoading } = useSelector((state) => state.agenda);

//     // Sync database items whenever the calendar view pointer changes
//     useEffect(() => {
//         dispatch(fetchAgendas(currentDate));
//     }, [dispatch, currentDate]);

//     const shiftDate = (amount) => {
//         const workingDate = new Date(currentDate);
//         workingDate.setDate(workingDate.getDate() + amount);
//         setCurrentDate(getLocalDateString(workingDate));
//     };

//     const dateHeaderLabel = new Date(currentDate).toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         weekday: 'short'
//     });

//     return (
//         <div className="w-full">
//             <div className="flex justify-between items-center mb-6">
//                 <div>
//                     <h3 className="text-lg font-bold tracking-tight text-white">Daily Agenda</h3>

//                     {/* Compact Dashboard Calendar Controls */}
//                     <div className="flex items-center space-x-2 mt-1 bg-slate-950/40 p-1 rounded-lg border border-slate-800">
//                         <button onClick={() => shiftDate(-1)} className="text-slate-400 hover:text-white px-2 py-0.5 text-xs transition-all">◀</button>
//                         <span className="text-[11px] font-bold text-emerald-400 min-w-[90px] text-center uppercase tracking-wider">{dateHeaderLabel}</span>
//                         <button onClick={() => shiftDate(1)} className="text-slate-400 hover:text-white px-2 py-0.5 text-xs transition-all">▶</button>
//                     </div>
//                 </div>

//                 <button 
//                     onClick={() => dispatch(toggle())}
//                     className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-950/50"
//                 >
//                     Add Task +
//                 </button>
//             </div>

//             {isToggle && <AgendaForm />}

//             {/* Rendered Tasks List */}
//             <ul className="space-y-2.5 mt-4 max-h-72 overflow-y-auto pr-1">
//                 {reduxAgenda.map((item) => (
//                     <li 
//                         key={item._id} 
//                         className={`flex justify-between items-center p-3 border rounded-xl transition-all duration-300 ${
//                             item.completed ? 'bg-slate-950/40 border-slate-900/60 opacity-60' : 'bg-slate-950/20 border-slate-800/60 shadow-sm'
//                         }`}
//                     >
//                         <div className="flex items-center space-x-3 flex-1 min-w-0">
//                             <input 
//                                 type="checkbox" 
//                                 checked={item.completed || false}
//                                 onChange={() => dispatch(toggleAgendaStatus({ id: item._id, currentStatus: item.completed }))}
//                                 className="rounded accent-emerald-500 h-4 w-4 cursor-pointer focus:ring-0" 
//                             />
//                             <span className={`text-sm truncate font-medium transition-all ${
//                                 item.completed ? "line-through text-slate-500 italic" : "text-slate-200"
//                             }`}>
//                                 {item.task}
//                             </span>
//                         </div>
//                         <button 
//                             onClick={() => dispatch(deleteAgenda(item._id))}
//                             className="text-slate-600 hover:text-red-400 text-xs transition-colors px-1"
//                         >
//                             ✕
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default TodaysAgenda;




import React, { useState, useEffect, useMemo } from 'react';
import AgendaForm from './AgentdaForm';
import { toggle } from '../../../store/toggle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgendas, deleteAgenda, toggleAgendaStatus } from '../../../store/agendaThunks';

// 1. Foolproof local YYYY-MM-DD string conversion
const getLocalDateString = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const TodaysAgenda = () => {
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState(() => getLocalDateString(new Date()));

  // Granular Redux Selectors (Prevents re-renders when unrelated state changes)
  const isToggle = useSelector((state) => state.toggle?.value);
  const reduxAgenda = useSelector((state) => state.agenda?.value) || [];
  const isLoading = useSelector((state) => state.agenda?.isLoading);
  const error = useSelector((state) => state.agenda?.error);

  // Fetch only when the selected date changes
  useEffect(() => {
    dispatch(fetchAgendas(currentDate));
  }, [dispatch, currentDate]);

  // Memoize Timeline Days so they don't recompute on every render
  const timelineDays = useMemo(() => {
    const days = [];
    const [year, month, day] = currentDate.split('-').map(Number);
    const todayStr = getLocalDateString(new Date());

    for (let i = -2; i <= 2; i++) {
      const d = new Date(year, month - 1, day);
      d.setDate(d.getDate() + i);

      const dateStr = getLocalDateString(d);
      const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.toLocaleDateString('en-US', { day: 'numeric' });
      const isTodayMarker = dateStr === todayStr;

      days.push({ dateStr, weekday, dayNum, isTodayMarker });
    }
    return days;
  }, [currentDate]);

  // Memoize Month-Year Label
  const dynamicMonthYearLabel = useMemo(() => {
    const [y, m, d] = currentDate.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }, [currentDate]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-white">Daily Agenda</h3>
          <p className="text-[11px] font-bold text-violet-400 uppercase tracking-widest mt-0.5">
            {dynamicMonthYearLabel}
          </p>
        </div>

        <button
          onClick={() => dispatch(toggle())}
          className="rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400 hover:bg-violet-500/20 px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer"
        >
          New Task +
        </button>
      </div>

      {/* Horizontal Timeline System Wrapper */}
      <div className="flex justify-between items-center gap-2 my-5 bg-slate-950/40 p-2 rounded-2xl border border-slate-800/60 shadow-inner">
        {timelineDays.map((day) => {
          const isActive = day.dateStr === currentDate;

          return (
            <button
              key={day.dateStr}
              type="button"
              onClick={() => setCurrentDate(day.dateStr)}
              className={`flex flex-col items-center justify-center flex-1 py-2.5 px-1 rounded-xl transition-all duration-300 transform relative cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-b from-violet-600 to-indigo-600 border border-violet-500/50 text-white shadow-lg shadow-violet-500/10 scale-105 font-semibold'
                  : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <span className={`text-[10px] uppercase tracking-wider font-bold ${isActive ? 'text-violet-100' : 'text-slate-500'}`}>
                {day.weekday}
              </span>

              <span className="text-base font-bold mt-0.5 tracking-tight">
                {day.dayNum}
              </span>

              {day.isTodayMarker && (
                <span
                  className={`absolute bottom-1 w-1 h-1 rounded-full ${
                    isActive ? 'bg-white' : 'bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.6)]'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {isToggle && <AgendaForm />}

      {error && (
        <p className="text-red-400 text-xs my-2 text-center bg-red-500/10 p-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Main Checklist Element List Output */}
      <ul className="space-y-2.5 mt-4 max-h-60 overflow-y-auto pr-1">
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2 py-6 text-slate-500 text-xs">
            <div className="w-3.5 h-3.5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Updating checklist...</span>
          </div>
        ) : reduxAgenda.length === 0 ? (
          <p className="text-xs text-slate-500 italic text-center py-6 border border-dashed border-slate-800/60 rounded-xl bg-slate-950/10">
            No task logs saved for this date.
          </p>
        ) : (
          reduxAgenda.map((item) => (
            <li
              key={item._id}
              className={`flex justify-between items-center p-3 border rounded-xl transition-all duration-300 ${
                item.completed
                  ? 'bg-slate-950/40 border-slate-900/60 opacity-60'
                  : 'bg-slate-950/20 border-slate-800/60 shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={item.completed || false}
                  onChange={() =>
                    dispatch(
                      toggleAgendaStatus({
                        id: item._id,
                        currentStatus: item.completed,
                      })
                    )
                  }
                  className="rounded accent-violet-500 h-4 w-4 cursor-pointer focus:ring-0"
                />
                <span
                  className={`text-sm truncate font-medium transition-all duration-300 ${
                    item.completed ? 'line-through text-green-500 italic' : 'text-slate-200'
                  }`}
                >
                  {item.task}
                </span>
              </div>
              <button
                type="button"
                onClick={() => dispatch(deleteAgenda(item._id))}
                className="text-slate-600 hover:text-red-400 text-xs transition-colors px-1 cursor-pointer"
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default React.memo(TodaysAgenda);

































// import React, { useEffect } from 'react';
// import AgendaModal from './AgendaModal';
// import { toggle } from '../../../store/toggle';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAgendas, deleteAgenda } from '../../../store/agendaThunks';

// const TodaysAgenda = () => {
//     const dispatch = useDispatch();

//     const isToggle = useSelector((state) => state.toggle.value);
//     const reduxAgenda = useSelector((state) => state.agenda.value);
//     const { isLoading, error } = useSelector((state) => state.agenda);

//     useEffect(() => {
//         dispatch(fetchAgendas());
//     }, [dispatch]);

//     const handleToggle = () => {
//         dispatch(toggle());
//     };

//     return (
//         <div className="todays-agenda bg-gray-800 p-4 rounded-lg text-white max-w-md mx-auto mt-6">
//             <div className='flex justify-between items-center mb-4'>
//                 <h2 className="text-xl font-semibold">Today's Agenda</h2>
//                 <button
//                     onClick={handleToggle}
//                     className="rounded-full bg-violet-800/40 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none"
//                 >
//                     Add +
//                 </button>
//             </div>

//             {isToggle && <AgendaModal />}

//             {isLoading && <p className="text-gray-400 text-sm">Loading...</p>}
//             {error && <p className="text-red-400 text-sm">{error}</p>}

//             <ul className="text-gray-300 list-none space-y-2 mt-4">
//                 {reduxAgenda && reduxAgenda.map((item, index) => (
//                     <li
//                         key={item._id || index}
//                         className='flex justify-between items-center bg-gray-700/50 p-3 rounded'
//                     >
//                         <div className="flex items-center space-x-3">
//                             <input type="checkbox" className="rounded accent-violet-500 cursor-pointer" />
//                             <span>{item.task}</span>
//                         </div>
//                         <button
//                             onClick={() => dispatch(deleteAgenda(item._id))}
//                             className="text-gray-400 hover:text-red-400 text-xs transition-colors"
//                         >
//                             Delete
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default TodaysAgenda;