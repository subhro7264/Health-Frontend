import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateDiet } from '../../../store/dietThunks';

const QUICK_SUGGESTIONS = [
  '⚡ 15-min prep only',
  '🥩 180g+ protein target',
  '🥑 Low carb dinner',
  '🥛 Dairy-free alternatives',
  '🏋️ Pre/post workout fuel',
];

const MEAL_ICONS = {
  breakfast: '🍳',
  lunch: '🥗',
  dinner: '🥩',
  snack: '🍎',
  snacks: '🍎',
  default: '🍽️',
};

const DietSection = () => {
  const dispatch = useDispatch();
  const { plan, isLoading, error } = useSelector((state) => state.diet || {});

  const [formData, setFormData] = useState({
    calories: 2200,
    dietType: 'High Protein',
    goal: 'Muscle Gain',
    restrictions: '',
    prompt: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(generateDiet(formData));
  };

  const handleQuickChip = (chipText) => {
    setFormData((prev) => {
      const clean = chipText.replace(/^[^\s]+\s/, ''); // Remove emoji prefix
      const current = prev.prompt.trim();
      const updated = current ? `${current}, ${clean}` : clean;
      return { ...prev, prompt: updated };
    });
  };

  // Helper to extract numbers from macro strings like "160g" or 160
  const parseGrams = (val) => {
    if (!val) return 0;
    const num = parseInt(val.toString().replace(/\D/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };

  const proteinGrams = parseGrams(plan?.macros?.protein);
  const carbsGrams = parseGrams(plan?.macros?.carbs);
  const fatsGrams = parseGrams(plan?.macros?.fats);

  // Approximate calorie calculations (4 cal/g protein & carbs, 9 cal/g fat)
  const proteinCals = proteinGrams * 4;
  const carbsCals = carbsGrams * 4;
  const fatsCals = fatsGrams * 9;
  const totalMacroCals = proteinCals + carbsCals + fatsCals || 1;

  const proteinPct = Math.round((proteinCals / totalMacroCals) * 100);
  const carbsPct = Math.round((carbsCals / totalMacroCals) * 100);
  const fatsPct = Math.round((fatsCals / totalMacroCals) * 100);

  const getMealIcon = (mealName = '') => {
    const key = mealName.toLowerCase().trim();
    return MEAL_ICONS[key] || MEAL_ICONS.default;
  };

  return (
    <div className="relative w-full bg-slate-950/60 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-slate-800/80 shadow-xl shadow-black/40 overflow-hidden transition-all duration-300 group hover:border-emerald-500/30">
      {/* Ambient AI Teal Backlight */}
      <div className="absolute -right-16 -top-16 w-56 h-56 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold tracking-tight text-white">
                AI Nutrition & Meal Architecture
              </h3>
              <span className="text-[10px] uppercase font-mono font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Gemini 2.5 Flash
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Precision macro balancing calibrated to your daily physical output
            </p>
          </div>
        </div>

        {plan && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm flex items-center gap-1.5">
              <span>🔥</span> {plan.totalCalories} kcal
            </span>
          </div>
        )}
      </div>

      {/* Form Controls Grid */}
      <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Calories Input */}
          <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800/80 focus-within:border-emerald-500/50 transition-colors">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Target Energy
              </label>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {formData.calories} kcal
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: Number(e.target.value) })}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-white font-mono focus:outline-none focus:border-emerald-500/60"
                min="1000"
                max="5000"
                step="50"
              />
            </div>
          </div>

          {/* Diet Style */}
          <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800/80 focus-within:border-emerald-500/50 transition-colors">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Dietary Paradigm
            </label>
            <select
              value={formData.dietType}
              onChange={(e) => setFormData({ ...formData, dietType: e.target.value })}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-200 focus:outline-none focus:border-emerald-500/60 cursor-pointer"
            >
              <option value="High Protein">High Protein Protocol</option>
              <option value="Balanced">Balanced Maintenance</option>
              <option value="Keto">Ketogenic / Low-Carb</option>
              <option value="Vegetarian">Vegetarian Whole Food</option>
              <option value="Vegan">Vegan Plant Power</option>
            </select>
          </div>

          {/* Primary Goal */}
          <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800/80 focus-within:border-emerald-500/50 transition-colors">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Biometric Objective
            </label>
            <select
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-200 focus:outline-none focus:border-emerald-500/60 cursor-pointer"
            >
              <option value="Muscle Gain">Muscle Hypertrophy</option>
              <option value="Weight Loss">Fat Loss & Leaning</option>
              <option value="Maintenance">Metabolic Maintenance</option>
            </select>
          </div>
        </div>

        {/* Custom Prompt & Instructions */}
        <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>✨</span> Custom Preferences & Restrictions
            </label>
            <span className="text-[10px] font-mono text-slate-500">Optional context</span>
          </div>

          <textarea
            rows={2}
            value={formData.prompt}
            onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
            placeholder="e.g., No dairy, prioritize 15-minute quick prep, include a high-protein post-workout shake..."
            className="w-full bg-slate-950/80 border border-slate-800/90 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 resize-none transition-all"
          />

          {/* Quick-tap suggestion chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-[10px] font-medium text-slate-500 mr-1">Quick Add:</span>
            {QUICK_SUGGESTIONS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleQuickChip(chip)}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 hover:bg-emerald-500/15 hover:text-emerald-300 text-slate-400 border border-slate-700/60 transition-all cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="relative w-full group overflow-hidden py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-emerald-500/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Synthesizing Gemini Diet Model...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span>Generate AI Meal Protocol</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          )}
        </button>
      </form>

      {/* Error Output */}
      {error && (
        <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Output Section */}
      {plan && (
        <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-5 relative z-10 animate-fadeIn">
          {/* Macro Breakdown Header with Stacked Segment Bar */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Nutrient Partitioning
              </span>
              <div className="flex items-center gap-4 text-xs font-mono font-semibold">
                <div className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_6px_#fb7185]" />
                  <span>Protein: {plan.macros?.protein || '0g'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
                  <span>Carbs: {plan.macros?.carbs || '0g'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sky-400">
                  <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
                  <span>Fats: {plan.macros?.fats || '0g'}</span>
                </div>
              </div>
            </div>

            {/* Apple-style Multi-segment Macro Bar */}
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
              <div
                style={{ width: `${proteinPct}%` }}
                className="h-full bg-rose-500 rounded-l-full transition-all duration-700 shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                title={`Protein: ${proteinPct}%`}
              />
              <div
                style={{ width: `${carbsPct}%` }}
                className="h-full bg-amber-400 transition-all duration-700 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                title={`Carbs: ${carbsPct}%`}
              />
              <div
                style={{ width: `${fatsPct}%` }}
                className="h-full bg-sky-400 rounded-r-full transition-all duration-700 shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                title={`Fats: ${fatsPct}%`}
              />
            </div>
          </div>

          {/* Meals Timeline List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Scheduled Meals & Recipes
            </h4>

            <div className="grid grid-cols-1 gap-2.5">
              {plan.meals?.map((m, idx) => (
                <div
                  key={idx}
                  className="group/meal bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/30 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-base shrink-0 group-hover/meal:scale-105 transition-transform">
                      {getMealIcon(m.meal)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider text-emerald-400">
                          {m.meal}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-slate-100 mt-0.5">
                        {m.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                        {m.description}
                      </div>
                    </div>
                  </div>

                  {/* Calories Pill */}
                  <div className="flex items-center justify-end sm:justify-center shrink-0">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-950/80 text-emerald-400 border border-slate-800 group-hover/meal:border-emerald-500/30 transition-colors">
                      {m.calories} kcal
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition AI Insights Callout */}
          {plan.nutritionTip && (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 text-xs text-slate-300 flex items-start gap-2.5">
              <span className="text-base shrink-0">💡</span>
              <div>
                <strong className="text-emerald-400 font-bold">Protocol Advisory: </strong>
                <span className="text-slate-300">{plan.nutritionTip}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(DietSection);