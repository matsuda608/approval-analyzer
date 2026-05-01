"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RadarChartComp } from "@/components/RadarChartComp";
import { PersonalityType } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Share2, Download, ChevronRight, BookOpen, HeartHandshake, Swords, Lock } from "lucide-react";
import Link from "next/link";

interface Props {
  payload: any;
  type: PersonalityType;
  bestMatch: PersonalityType;
  worstMatch: PersonalityType;
  d: string;
}

export function ResultClientPage({ payload, type, bestMatch, worstMatch, d }: Props) {
  const [shareUrl, setShareUrl] = useState("https://example.com");
  const [isLoading, setIsLoading] = useState(false);

  const handlePremiumClick = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ d }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Checkout failed');
      }
    } catch (err) {
      console.error(err);
      alert('決済画面への遷移に失敗しました。');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.origin);
    }
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-[#0a0a0a] text-slate-300 overflow-hidden selection:bg-[#d4af37]/30">
      
      {/* Background Generative Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-zinc-800">
          <motion.path
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
            initial={{ d: "M0,50 Q25,25 50,50 T100,50" }}
            animate={{ d: [
              "M0,50 Q25,25 50,50 T100,50",
              "M0,50 Q25,75 50,50 T100,50",
              "M0,50 Q25,25 50,50 T100,50"
            ]}}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="z-10 w-full max-w-md mx-auto p-6 pb-24 space-y-12">
        
        {/* THE IDENTITY */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center pt-8"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-48 h-48 rounded-full overflow-hidden border border-[#d4af37]/30 shadow-[0_0_40px_rgba(212,175,55,0.1)] bg-white">
              {/* Scientific Line Art Image */}
              <img src={type.imageUrl} alt={type.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
            </div>
          </motion.div>

          <p className="text-[10px] font-bold text-[#d4af37] tracking-[0.3em] mb-4 uppercase">
            Biological Archetype
          </p>
          <h1 className="text-3xl font-serif text-white tracking-widest leading-tight">
            {type.name.split(" ")[0]}
          </h1>
          <h2 className="text-sm font-light text-zinc-400 mt-3 tracking-[0.2em]">
            {type.name.split(" ")[1]}
          </h2>
        </motion.section>

        {/* THE ANATOMY */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 shadow-2xl rounded-none p-6"
        >
          <div className="mb-4 text-center">
            <h3 className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase">承認欲求偏差値</h3>
            <div className="mt-2">
              <span className="text-4xl font-serif text-[#d4af37]">{payload.dev}</span>
            </div>
            <p className="text-xs font-medium text-zinc-500 mt-1 tracking-widest">上位 {payload.top}％ の特異個体</p>
          </div>
          
          <RadarChartComp data={{ A: payload.a, B: payload.b, C: payload.c, D: payload.d, E: payload.e }} />
        </motion.section>

        {/* DEEP INSIGHT */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="space-y-4"
        >
          <h3 className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase text-center mb-8">Ecological Insight</h3>
          
          <div className="bg-zinc-900/30 backdrop-blur-sm p-8 border-t border-zinc-800 relative shadow-xl">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#d4af37]/50" />
            <div className="flex items-center gap-3 mb-6 justify-center opacity-50">
              <BookOpen className="w-6 h-6 text-[#d4af37]" />
            </div>
            <p className="text-sm text-zinc-300 leading-loose text-justify font-serif tracking-wide indent-4">
              {type.insight}
            </p>
          </div>
        </motion.section>

        {/* COMPATIBLE TYPE */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="space-y-4"
        >
          <h3 className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase text-center mb-6">Compatibility</h3>
          
          <div className="flex flex-col gap-3">
            {/* Best Match */}
            <div className="flex items-start p-5 bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm shadow-md">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white shrink-0 border border-[#d4af37]/30 mt-1">
                <img src={bestMatch.imageUrl} alt={bestMatch.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
              </div>
              <div className="ml-5 flex-grow">
                <p className="text-[10px] text-[#d4af37] tracking-widest mb-1 flex items-center gap-1.5 font-bold">
                  <HeartHandshake className="w-3.5 h-3.5" /> ズッ友関係 (Best Match)
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-lg font-serif text-white tracking-widest">{bestMatch.name.split(" ")[0]}</p>
                  <p className="text-[10px] text-zinc-500 tracking-widest">{bestMatch.name.split(" ")[1]}</p>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{type.matchReason.best}</p>
              </div>
            </div>

            {/* Worst Match */}
            <div className="flex items-start p-5 bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm shadow-md">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white shrink-0 border border-zinc-700/50 mt-1 grayscale">
                <img src={worstMatch.imageUrl} alt={worstMatch.name} className="w-full h-full object-cover mix-blend-multiply opacity-70" />
              </div>
              <div className="ml-5 flex-grow">
                <p className="text-[10px] text-zinc-400 tracking-widest mb-1 flex items-center gap-1.5 font-bold">
                  <Swords className="w-3.5 h-3.5" /> 天敵関係 (Worst Match)
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-lg font-serif text-white tracking-widest">{worstMatch.name.split(" ")[0]}</p>
                  <p className="text-[10px] text-zinc-500 tracking-widest">{worstMatch.name.split(" ")[1]}</p>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{type.matchReason.worst}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* PREMIUM TEASER (BLURRED) */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative pt-4 overflow-hidden"
        >
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-[3px] border border-zinc-800 p-4">
            <Lock className="w-8 h-8 text-zinc-500 mb-3" />
            <p className="text-sm font-bold text-zinc-300 tracking-widest text-center">プレミアム版で全データ解禁</p>
            <p className="text-[10px] text-zinc-500 mt-2 tracking-widest text-center">
              ・社会での生き残り戦略（あなたの食い扶持）<br />
              ・人生の詰みパターン（やらかし警報）<br />
              ・人間関係サバイバルマップと地雷の避け方<br />
              ・数千パターンの「あなた専用こじらせ処方箋」
            </p>
          </div>

          <div className="space-y-4 opacity-30 select-none pointer-events-none">
            <div className="flex items-center justify-center gap-3 mb-2">
              <h3 className="text-xs font-bold text-zinc-400 tracking-[0.3em] uppercase">社会での生き残り戦略</h3>
            </div>
            <div className="h-20 bg-zinc-900 border border-zinc-800 w-full" />
            <div className="h-24 bg-zinc-900 border border-zinc-800 w-full mt-4" />
          </div>
        </motion.section>

        {/* PREMIUM REPORT */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="space-y-4 pt-4"
        >
          <Button 
            onClick={handlePremiumClick}
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-[#d4af37] to-[#b48f27] hover:from-[#e4bf47] hover:to-[#c49f37] text-black font-bold rounded-none flex items-center justify-center gap-3 tracking-widest text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
          >
            {isLoading ? "決済画面へ移行中..." : "さらに深く自分を解剖する（有料レポート）"}
          </Button>
        </motion.section>

        {/* SNS EXPORT */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="space-y-4 pt-8 border-t border-zinc-800"
        >
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${shareUrl}/result?d=${d}`)}&text=${encodeURIComponent(`私の承認欲求の正体は【${type.name}】。こじらせ偏差値は【${payload.dev}】でした。\n#承認欲求傾向分析`)}`} target="_blank" rel="noopener noreferrer" className="block">
            <Button className="w-full h-14 bg-white hover:bg-zinc-200 text-black rounded-none flex items-center justify-center gap-3 text-sm tracking-widest font-bold">
              <Share2 className="w-4 h-4" />
              X (Twitter) で観測結果を共有
            </Button>
          </a>
          
          <Link href={`/api/og?d=${d}`} target="_blank" className="block">
            <Button variant="outline" className="w-full h-14 rounded-none flex items-center justify-center gap-3 text-zinc-400 border-zinc-800 hover:bg-zinc-900 hover:text-white tracking-widest text-sm">
              <Download className="w-4 h-4" />
              記録用画像を保存
            </Button>
          </Link>
          
          <Link href="/" className="block pt-8 text-center pb-4">
            <span className="inline-flex items-center justify-center gap-1 p-4 text-[10px] font-semibold text-zinc-500 hover:text-[#d4af37] tracking-widest transition-colors uppercase">
              もう一度測定する <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

          <div className="pb-8 text-center">
            <Link href="/law" className="inline-block p-4 text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors">
              特定商取引法に基づく表記
            </Link>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
