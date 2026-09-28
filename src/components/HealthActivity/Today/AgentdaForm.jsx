// import React, { useState } from "react";

// const AgendaForm = () => {
//     const [agenda, setAgenda] = useState("");

//     const agendaHandler = (e) => {
//         setAgenda(e.target.value);
//     }

//     const submitHandler = (e) => {
//         e.preventDefault();
//         console.log('This is the agenda data:', agenda);

//         // Optional: Clear the input after submitting
//         setAgenda(""); 
//     }

//     return (
//         <>
//         <form onSubmit={submitHandler} >
//             <label htmlFor="agendaInput">Add your Agenda: </label>
//             <input 
//                 id="agendaInput"
//                 type="text" 
//                 value={agenda} 
//                 onChange={agendaHandler} 
//                 placeholder="Type agenda here..."
//             />
//             <button type="submit">Submit</button>
//         </form>
//         </>
//     );
// }

// export default AgendaForm;


import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAgenda } from '../../../store/agendaThunks';
import Modal from '../../../UI/Modal';
import { toggle } from '../../../store/toggle';
import { Sparkles, CalendarPlus, X, Clock, Plus } from 'lucide-react';

const QUICK_HABITS = [
  '🏃 30m Zone 2 Cardio',
  '🧘 10m Mindful Breathwork',
  '🥗 Log Balanced Lunch',
  '💧 Drink 500ml Water',
  '🏋️ Strength Protocol',
  '😴 Evening Wind-Down',
];

export default function AgendaForm() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [agenda, setAgenda] = useState('');
  const [selectedTag, setSelectedTag] = useState('Today');
  const isOpen = useSelector((state) => state.toggle.value);

  // Auto-focus input field on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(toggle());
    setAgenda('');
  };

  const handleQuickAdd = (habit) => {
    setAgenda(habit);
    inputRef.current?.focus();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!agenda.trim()) return;

    dispatch(addAgenda({ 
      task: agenda.trim(),
      category: selectedTag,
    }));

    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Modal close={isOpen}>
      {/* Fullscreen Fixed Center Overlay */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-all duration-300"
        onClick={(e) => {
          // Close when clicking backdrop
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        {/* Dead-Center Card */}
        <div 
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950/95 p-5 sm:p-6 backdrop-blur-2xl shadow-2xl shadow-black/80"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Glow Accent */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent blur-2xl" />

          {/* Modal Header */}
          <div className="relative z-10 mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/30 bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                <CalendarPlus className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-white">
                  Log New Health Task
                </h3>
                <p className="text-xs text-slate-400">
                  Add an activity to today's scheduled protocol
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 transition-colors hover:border-slate-700 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Task Form */}
          <form onSubmit={submitHandler} className="relative z-10 space-y-4">
            
            {/* Main Input Field */}
            <div>
              <label htmlFor="agenda" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                Protocol / Habit Objective
              </label>
              <input
                ref={inputRef}
                id="agenda"
                type="text"
                value={agenda}
                onChange={(e) => setAgenda(e.target.value)}
                placeholder="e.g., 45-minute incline treadmill walk..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 shadow-inner outline-none transition-all focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/50"
                required
              />
            </div>

            {/* Quick-Preset Habit Chips */}
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <Sparkles className="h-3 w-3 text-cyan-400" />
                <span>Quick Presets</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_HABITS.map((habit) => (
                  <button
                    key={habit}
                    type="button"
                    onClick={() => handleQuickAdd(habit)}
                    className="rounded-lg border border-slate-800/90 bg-slate-900/60 px-2.5 py-1 text-xs font-medium text-slate-300 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300 active:scale-95"
                  >
                    {habit}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe / Tag Selector */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-xs font-semibold text-slate-400">Target:</span>
                {['Morning', 'Today', 'Evening'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-md px-2 py-0.5 text-[11px] font-bold transition-all ${
                      selectedTag === tag
                        ? 'border border-cyan-500/40 bg-cyan-500/20 text-cyan-300 shadow-sm'
                        : 'border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-800 hover:text-white active:scale-95"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!agenda.trim()}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Protocol</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}