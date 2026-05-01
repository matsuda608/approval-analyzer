import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity, ShieldCheck, Cpu } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            多次元的承認欲求<br />傾向分析システム
          </h1>
          <p className="text-sm text-slate-500">
            Clinical-Grade Approval Motivation Analyzer
          </p>
        </div>

        <div className="space-y-4 text-left bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900 block">統計的信頼性</strong>
              40の設問と回答速度（TTR）から、L尺度（虚偽回答）を自動検知し、結果の信頼性を担保します。
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Cpu className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900 block">相殺アルゴリズム</strong>
              「内的基準」の強さを測定し、表面上の承認欲求スコアから厳格に相殺することで、真の欲求度を算出します。
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Link href="/analysis" className="w-full block">
            <Button className="w-full h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-md hover:shadow-lg">
              分析を開始する
            </Button>
          </Link>
          <p className="mt-3 text-xs text-slate-400 mb-8">
            所要時間：約3分 / 全40問
          </p>
          <div className="pt-4 pb-8 text-center">
            <Link href="/law" className="inline-block p-4 text-xs text-slate-400 hover:text-slate-600 transition-colors">
              特定商取引法に基づく表記
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
