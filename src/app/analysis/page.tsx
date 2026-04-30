"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/data/questions";
import { Answer, calculateScores } from "@/lib/scoring";
import { Activity } from "lucide-react";

export default function AnalysisPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isCalculating, setIsCalculating] = useState(false);

  // 初回マウント時および問題切り替え時にstartTimeを更新
  useEffect(() => {
    setStartTime(Date.now());
  }, [currentIndex]);

  const handleAnswer = (value: number) => {
    const timeToRespond = Date.now() - startTime;
    const currentQ = questions[currentIndex];
    
    const newAnswers = [...answers, { questionId: currentQ.id, value, timeToRespond }];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishAnalysis(newAnswers);
    }
  };

  const finishAnalysis = (finalAnswers: Answer[]) => {
    setIsCalculating(true);
    // スコア計算
    const result = calculateScores(finalAnswers);
    
    // 計算が終わったように見せるための演出（UX向上）
    setTimeout(() => {
      // 必要なデータをBase64化してURLに渡す
      const payload = {
        tid: result.type.id,
        dev: result.deviationScore,
        top: result.topPercentile,
        warn: result.reliabilityWarning ? 1 : 0,
        a: result.scores.A,
        b: result.scores.B,
        c: result.scores.C,
        d: result.scores.D,
        e: result.rawScores.E,
      };
      const encoded = encodeURIComponent(btoa(JSON.stringify(payload)));
      router.push(`/result?d=${encoded}`);
    }, 2000);
  };

  if (isCalculating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50">
        <Activity className="w-12 h-12 text-blue-600 animate-spin mb-6" />
        <h2 className="text-xl font-bold text-slate-800">データを解析中...</h2>
        <p className="text-sm text-slate-500 mt-2">アルゴリズムによる補正を適用しています</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="px-6 py-4 bg-white border-b border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-slate-500 tracking-wider">PROGRESS</span>
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 pb-20 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full max-w-sm mx-auto"
          >
            <div className="mb-10 min-h-[120px] flex items-center justify-center text-center">
              <h2 className="text-xl font-medium text-slate-900 leading-relaxed">
                {currentQ.text}
              </h2>
            </div>

            <div className="space-y-3">
              {[
                { label: "非常に当てはまる", value: 5, bg: "bg-blue-600 hover:bg-blue-700 text-white" },
                { label: "やや当てはまる", value: 4, bg: "bg-blue-100 hover:bg-blue-200 text-blue-900" },
                { label: "どちらともいえない", value: 3, bg: "bg-slate-100 hover:bg-slate-200 text-slate-700" },
                { label: "あまり当てはまらない", value: 2, bg: "bg-slate-100 hover:bg-slate-200 text-slate-700" },
                { label: "全く当てはまらない", value: 1, bg: "bg-slate-100 hover:bg-slate-200 text-slate-700" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full py-3.5 px-4 rounded-xl font-medium transition-all duration-200 ${option.bg} active:scale-[0.98]`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
