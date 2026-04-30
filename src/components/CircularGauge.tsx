"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  value: number; // 0 to 100
  label: string;
}

export function CircularGauge({ value, label }: Props) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const stepTime = Math.abs(Math.floor(duration / steps));
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrentValue(Math.min(value, Math.round(easeProgress * value * 10) / 10));

      if (currentStep >= steps) {
        clearInterval(timer);
        setCurrentValue(value);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentValue / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative w-32 h-32">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          className="text-zinc-800"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeLinecap="round"
          className="text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-serif font-bold text-white tracking-tighter">
          {currentValue.toFixed(1)}<span className="text-xs text-zinc-500">%</span>
        </span>
        <span className="text-[8px] font-semibold text-[#d4af37] tracking-widest mt-1 uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}
