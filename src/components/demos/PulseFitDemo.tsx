"use client";

import React, { useState } from "react";
import { Dumbbell, Flame, Utensils, CreditCard, Sparkles, Check, Activity, ShieldCheck, Zap } from "lucide-react";
import confetti from "canvas-confetti";

type FitnessGoal = "hypertrophy" | "fat_loss" | "endurance";
type DietType = "high_protein" | "plant_based" | "keto" | "balanced";

export function PulseFitDemo() {
  const [goal, setGoal] = useState<FitnessGoal>("hypertrophy");
  const [diet, setDiet] = useState<DietType>("high_protein");
  const [weightKg, setWeightKg] = useState<number>(75);
  const [workoutDays, setWorkoutDays] = useState<number>(5);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribedPlan, setSubscribedPlan] = useState<string | null>(null);

  // Dynamic calculations
  const calculateCalories = () => {
    let multiplier = 24;
    if (goal === "hypertrophy") multiplier = 28;
    if (goal === "fat_loss") multiplier = 22;
    if (goal === "endurance") multiplier = 26;

    const activityBonus = workoutDays * 60;
    return Math.round(weightKg * multiplier + activityBonus);
  };

  const calories = calculateCalories();
  const protein = Math.round(weightKg * (goal === "hypertrophy" ? 2.2 : goal === "fat_loss" ? 2.4 : 1.8));
  const fats = Math.round((calories * 0.25) / 9);
  const carbs = Math.max(50, Math.round((calories - (protein * 4 + fats * 9)) / 4));

  const splits: Record<FitnessGoal, { name: string; days: string[] }> = {
    hypertrophy: {
      name: "Upper / Lower / Push / Pull / Legs Hypertrophy Specialization",
      days: [
        "Mon: Heavy Chest & Triceps (Incline Press, Dips)",
        "Tue: Back Thickness & Biceps (Barbell Rows, Pullups)",
        "Wed: Lower Body Quadriceps & Core Focus (Squats, Lunges)",
        "Thu: Active Recovery & Mobility Routine",
        "Fri: Shoulders & Upper Back Volume (Overhead Press)",
      ],
    },
    fat_loss: {
      name: "Metabolic Resistance & High-Frequency Conditioning",
      days: [
        "Mon: Full Body Compound Circuit + 20m Zone 2 Cardio",
        "Tue: High-Intensity Interval Training (HIIT) & Core",
        "Wed: Posterior Chain & Back Specialization",
        "Thu: Incline Walking & Recovery Stretch Protocol",
        "Fri: Explosive Functional Strength Complex",
      ],
    },
    endurance: {
      name: "Hybrid Aerobic Capacity & Muscular Stamina",
      days: [
        "Mon: Tempo Run 8km + Core Stability",
        "Tue: Full Body Calisthenics & Kettlebell Circuits",
        "Wed: VO2 Max Interval Intervals & Cycling",
        "Thu: Rest & Dynamic Fascial Mobility",
        "Fri: Long Steady Distance (LSD) Endurance Session",
      ],
    },
  };

  const handleSimulateCheckout = (planName: string) => {
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setSubscribedPlan(planName);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 900);
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-slate-950/60 px-5 py-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 p-[1px] shadow-lg shadow-amber-500/20">
            <div className="h-full w-full rounded-xl bg-slate-950 flex items-center justify-center">
              <Dumbbell className="h-4 w-4 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">PulseFit AI Studio</h3>
              <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[11px] font-semibold text-rose-400 border border-rose-500/20">
                Wegile Production Module
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive AI workout generation, real-time macro math & Stripe checkout workflow
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 hidden sm:inline-flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-indigo-400" />
            5,000+ Active Users • 99.9% SLA
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {/* Configuration Controls */}
        <div className="lg:col-span-5 p-5 space-y-5 bg-slate-950/30">
          {/* Goal selection */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              1. Training Goal
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "hypertrophy", label: "Hypertrophy", icon: Dumbbell },
                { id: "fat_loss", label: "Fat Loss", icon: Flame },
                { id: "endurance", label: "Endurance", icon: Activity },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setGoal(item.id as FitnessGoal)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      goal === item.id
                        ? "border-rose-500/60 bg-rose-500/10 text-white shadow-md shadow-rose-500/10"
                        : "border-white/5 bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    <Icon className="h-4 w-4 mb-1" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bodyweight & days slider */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                <span>Body Weight</span>
                <span className="font-mono text-cyan-400 font-bold">{weightKg} kg ({Math.round(weightKg * 2.204)} lbs)</span>
              </div>
              <input
                type="range"
                min="50"
                max="120"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-rose-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                <span>Weekly Training Frequency</span>
                <span className="font-mono text-rose-400 font-bold">{workoutDays} Days / Week</span>
              </div>
              <input
                type="range"
                min="3"
                max="6"
                value={workoutDays}
                onChange={(e) => setWorkoutDays(Number(e.target.value))}
                className="w-full accent-rose-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />
            </div>
          </div>

          {/* Dietary approach */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Dietary Protocol
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: "high_protein", label: "High Protein Omnivore" },
                { id: "balanced", label: "Mediterranean Balanced" },
                { id: "plant_based", label: "Plant-Based Athlete" },
                { id: "keto", label: "Ketogenic / Low-Carb" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDiet(item.id as DietType)}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    diet === item.id
                      ? "border-amber-500/50 bg-amber-500/10 text-white font-semibold"
                      : "border-white/5 bg-slate-900/30 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stripe Subscription Simulator */}
          <div className="pt-2 border-t border-white/5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between mb-2">
              <span>Stripe Billing Workflow Simulator</span>
              <span className="text-[11px] text-emerald-400">Webhook Sync Ready</span>
            </label>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <CreditCard className="h-3.5 w-3.5 text-indigo-400" />
                  PulseFit Pro Tier ($19/mo)
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  14-Day Free Trial • Instant Redis Session Token
                </div>
              </div>

              <button
                onClick={() => handleSimulateCheckout("Pro Monthly")}
                disabled={isSubscribing || subscribedPlan === "Pro Monthly"}
                className="rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 active:scale-95 transition-all disabled:opacity-50"
              >
                {isSubscribing ? (
                  "Processing..."
                ) : subscribedPlan === "Pro Monthly" ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Check className="h-3 w-3" /> Active
                  </span>
                ) : (
                  "Simulate Pay"
                )}
              </button>
            </div>
            {subscribedPlan && (
              <p className="mt-2 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                Stripe webhook `invoice.payment_succeeded` verified! Access granted in Redis session store.
              </p>
            )}
          </div>
        </div>

        {/* Right Output: Real-time Macro Math & AI Plan */}
        <div className="lg:col-span-7 p-5 space-y-5 bg-slate-950/50 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Top calculated metric cards */}
            <div className="grid grid-cols-4 gap-2.5">
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-center">
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Calories</div>
                <div className="text-lg font-black text-rose-400 font-mono mt-0.5">{calories}</div>
                <div className="text-[10px] text-slate-500">kcal/day</div>
              </div>
              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3 text-center">
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Protein</div>
                <div className="text-lg font-black text-cyan-400 font-mono mt-0.5">{protein}g</div>
                <div className="text-[10px] text-slate-500">{Math.round((protein * 4 * 100) / calories)}% energy</div>
              </div>
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-center">
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Carbs</div>
                <div className="text-lg font-black text-amber-400 font-mono mt-0.5">{carbs}g</div>
                <div className="text-[10px] text-slate-500">{Math.round((carbs * 4 * 100) / calories)}% energy</div>
              </div>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center">
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Fats</div>
                <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">{fats}g</div>
                <div className="text-[10px] text-slate-500">{Math.round((fats * 9 * 100) / calories)}% energy</div>
              </div>
            </div>

            {/* Macro Ratio Progress Bar */}
            <div className="space-y-1">
              <div className="h-2 w-full rounded-full bg-slate-800 flex overflow-hidden">
                <div
                  className="bg-cyan-400 transition-all duration-300"
                  style={{ width: `${(protein * 4 * 100) / calories}%` }}
                />
                <div
                  className="bg-amber-400 transition-all duration-300"
                  style={{ width: `${(carbs * 4 * 100) / calories}%` }}
                />
                <div
                  className="bg-emerald-400 transition-all duration-300"
                  style={{ width: `${(fats * 9 * 100) / calories}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 px-1">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Protein
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Carbohydrates
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Healthy Fats
                </span>
              </div>
            </div>

            {/* Generated Program Split */}
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-rose-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    AI-Generated Training Protocol
                  </span>
                </div>
                <span className="text-[11px] text-indigo-400 font-medium font-mono">
                  Cached in Redis (32% speedup)
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-200">{splits[goal].name}</div>

              <div className="space-y-1.5">
                {splits[goal].days.slice(0, workoutDays).map((dayStr, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-lg bg-slate-950/60 p-2 text-xs text-slate-300 border border-white/5 font-mono"
                  >
                    <span className="h-5 w-5 rounded bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate">{dayStr}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Production highlight */}
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3 text-[11px] text-slate-300">
            <span className="font-semibold text-cyan-300">Architectural Note:</span> At Wegile, Akhil optimized this
            flow using Next.js App Router Server-Side Rendering (SSR), cutting initial bundle size by 38% and keeping
            LCP under 1.4 seconds for 5,000+ active mobile subscribers.
          </div>
        </div>
      </div>
    </div>
  );
}
