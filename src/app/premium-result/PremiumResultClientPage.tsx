"use client";

import { motion } from "framer-motion";
import { PersonalityType } from "@/data/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ShieldCheck, Dna, Activity, BrainCircuit, HeartHandshake, Swords, Stethoscope, Briefcase, Skull } from "lucide-react";
import Link from "next/link";
import { generateDeepAdvice } from "@/lib/adviceGenerator";

interface Props {
  payload: any;
  type: PersonalityType;
  bestMatch: PersonalityType;
  worstMatch: PersonalityType;
  d: string;
}

export function PremiumResultClientPage({ payload, type, bestMatch, worstMatch, d }: Props) {
  const premiumInsight = type.premiumInsight;
  const advice = generateDeepAdvice(payload);

  return (
    <div className="relative flex flex-col min-h-screen bg-[#050505] text-slate-300 overflow-hidden selection:bg-[#d4af37]/30">
      
      {/* Premium Background Generative Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-[#d4af37]/10">
          <motion.path
            fill="none"
            stroke="currentColor"
            strokeWidth="0.15"
            initial={{ d: "M0,20 Q50,80 100,20 T0,80" }}
            animate={{ d: [
              "M0,20 Q50,80 100,20 T0,80",
              "M0,80 Q50,20 100,80 T0,20",
              "M0,20 Q50,80 100,20 T0,80"
            ]}}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="z-10 w-full max-w-md mx-auto p-6 pb-24 space-y-12">
        
        {/* PURCHASE BADGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center pt-8"
        >
          <div className="flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/40 px-4 py-2 rounded-full backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs font-bold text-[#d4af37] tracking-[0.2em] uppercase">Premium Access Granted</span>
          </div>
        </motion.div>

        {/* THE IDENTITY - PREMIUM */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-4xl font-serif text-white tracking-widest leading-tight mb-2">
            {type.name.split(" ")[0]}
          </h1>
          <h2 className="text-sm font-light text-[#d4af37] tracking-[0.3em]">
            CLASSIFIED BIOLOGICAL DATA
          </h2>
        </motion.section>

        {/* DEEP SCIENTIFIC INSIGHT */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-3">
            <Dna className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-xs font-bold text-zinc-400 tracking-[0.3em] uppercase">深層生体・脳科学的解析</h3>
            <BrainCircuit className="w-5 h-5 text-[#d4af37]" />
          </div>
          
          <div className="bg-gradient-to-b from-zinc-900/80 to-[#0a0a0a] backdrop-blur-md p-8 border border-[#d4af37]/20 relative shadow-[0_0_30px_rgba(212,175,55,0.05)]">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#d4af37]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#d4af37]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#d4af37]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#d4af37]" />
            
            <p className="text-sm text-zinc-300 leading-loose text-justify font-serif tracking-wide indent-4 selection:bg-[#d4af37]/30">
              {premiumInsight}
            </p>

            <div className="mt-8 pt-6 border-t border-zinc-800/50 flex flex-col gap-4">
               <div className="flex justify-between items-center text-xs text-zinc-500 font-mono">
                 <span className="flex items-center gap-2"><Activity className="w-3 h-3 text-red-400/70" /> STRESS VULNERABILITY</span>
                 <span>HIGH</span>
               </div>
               <div className="flex justify-between items-center text-xs text-zinc-500 font-mono">
                 <span className="flex items-center gap-2"><BrainCircuit className="w-3 h-3 text-blue-400/70" /> NEUROPLASTICITY</span>
                 <span>CRITICAL</span>
               </div>
            </div>
          </div>
        </motion.section>

        {/* ECOLOGICAL CAREER & EXTINCTION RISK */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="space-y-6 pt-6"
        >
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-xs font-bold text-zinc-400 tracking-[0.3em] uppercase">社会での生き残り戦略（あなたの食い扶持）</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-[#101520] border border-blue-900/30 p-6 shadow-[0_0_15px_rgba(0,100,255,0.03)]">
              <p className="text-[10px] text-blue-400 tracking-widest flex items-center gap-1.5 font-bold mb-3">
                <Briefcase className="w-4 h-4" /> 適合生態系（適職・生息地）
              </p>
              <p className="text-xs text-zinc-300 leading-relaxed font-serif text-justify">
                {type.premiumCareer?.ecosystem}
              </p>
            </div>

            <div className="bg-[#201010] border border-red-900/30 p-6 shadow-[0_0_15px_rgba(255,0,0,0.03)]">
              <p className="text-[10px] text-red-400 tracking-widest flex items-center gap-1.5 font-bold mb-3">
                <Skull className="w-4 h-4" /> 人生の詰みパターン（やらかし警報）
              </p>
              <p className="text-xs text-zinc-300 leading-relaxed font-serif text-justify">
                {type.premiumCareer?.extinctionRisk}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ECOLOGICAL COMPATIBILITY */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-xs font-bold text-zinc-400 tracking-[0.3em] uppercase">人間関係サバイバルマップ</h3>
          </div>

          <div className="flex flex-col gap-4">
            {/* Best Match */}
            <div className="flex flex-col p-6 bg-gradient-to-br from-zinc-900/80 to-[#101510] border border-green-900/30 backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,0,0.02)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white shrink-0 border border-green-500/30">
                  <img src={bestMatch.imageUrl} alt={bestMatch.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                </div>
                <div>
                  <p className="text-[10px] text-green-400 tracking-widest flex items-center gap-1.5 font-bold mb-1">
                    <HeartHandshake className="w-3 h-3" /> ズッ友関係 (Best Match)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-lg font-serif text-white tracking-widest">{bestMatch.name.split(" ")[0]}</p>
                    <p className="text-[10px] text-zinc-500 tracking-widest">{bestMatch.name.split(" ")[1]}</p>
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-300 leading-relaxed font-serif text-justify border-t border-green-900/30 pt-4 space-y-3">
                <p>{type.premiumMatchReason?.best}</p>
                <div className="bg-green-950/20 p-3 border border-green-900/20 rounded-sm">
                  <p className="text-[10px] text-green-500 font-bold mb-1">【共生プロトコル】</p>
                  <p>{type.premiumMatchReason?.bestHowTo}</p>
                </div>
              </div>
            </div>

            {/* Worst Match */}
            <div className="flex flex-col p-6 bg-gradient-to-br from-zinc-900/80 to-[#151010] border border-red-900/30 backdrop-blur-sm shadow-[0_0_20px_rgba(255,0,0,0.02)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white shrink-0 border border-red-500/30 grayscale">
                  <img src={worstMatch.imageUrl} alt={worstMatch.name} className="w-full h-full object-cover mix-blend-multiply opacity-70" />
                </div>
                <div>
                  <p className="text-[10px] text-red-400 tracking-widest flex items-center gap-1.5 font-bold mb-1">
                    <Swords className="w-3 h-3" /> 天敵関係 (Worst Match)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-lg font-serif text-white tracking-widest">{worstMatch.name.split(" ")[0]}</p>
                    <p className="text-[10px] text-zinc-500 tracking-widest">{worstMatch.name.split(" ")[1]}</p>
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-300 leading-relaxed font-serif text-justify border-t border-red-900/30 pt-4 space-y-3">
                <p>{type.premiumMatchReason?.worst}</p>
                <div className="bg-red-950/20 p-3 border border-red-900/20 rounded-sm">
                  <p className="text-[10px] text-red-500 font-bold mb-1">【回避プロトコル】</p>
                  <p>{type.premiumMatchReason?.worstHowTo}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* PERSONAL PRESCRIPTION */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="space-y-6 pt-8"
        >
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-xs font-bold text-zinc-400 tracking-[0.3em] uppercase">あなた専用の『こじらせ』処方箋</h3>
          </div>

          <div className="bg-zinc-900 border border-[#d4af37]/30 p-8 relative">
            <div className="absolute top-0 right-0 p-4">
              <Stethoscope className="w-6 h-6 text-[#d4af37]/20" />
            </div>
            <h4 className="text-[#d4af37] text-sm font-bold tracking-widest mb-4">【解析結果に基づく警告と提案】</h4>
            <div className="space-y-4 text-xs text-zinc-300 leading-loose text-justify font-serif tracking-wide whitespace-pre-wrap">
              {advice}
            </div>
          </div>
        </motion.section>

        {/* RETURN BUTTON */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="pt-8"
        >
          <Link href={`/result?d=${encodeURIComponent(d)}`} className="block">
            <Button variant="ghost" className="w-full h-14 text-zinc-500 hover:text-white hover:bg-zinc-900 flex items-center justify-center gap-3 text-xs tracking-widest font-bold uppercase transition-colors">
              <ChevronLeft className="w-4 h-4" />
              通常観測データへ戻る
            </Button>
          </Link>
        </motion.section>

      </div>
    </div>
  );
}
