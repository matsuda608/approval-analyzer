"use client";

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";

interface Props {
  data: {
    A: number;
    B: number;
    C: number;
    D: number;
    E?: number;
  };
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    // 生スコア(0-40)から擬似的な個別偏差値を計算して表示（演出用）
    const getDev = (val: number) => Math.min(80, Math.max(20, Math.round(30 + (val / 40) * 40)));
    
    return (
      <div className="bg-black/90 backdrop-blur-md border border-[#d4af37]/30 shadow-xl shadow-[#d4af37]/10 rounded-none p-3 text-sm">
        <p className="font-bold text-gray-300 mb-1 tracking-widest">{data.subject}</p>
        <p className="text-[#d4af37] font-semibold tracking-wide">
          STATUS: {getDev(data.score)}
        </p>
      </div>
    );
  }
  return null;
};

export function RadarChartComp({ data }: Props) {
  const chartData = [
    { subject: '警戒心', score: data.A, fullMark: 40 },
    { subject: '捕食欲', score: data.B, fullMark: 40 },
    { subject: '擬態力', score: data.C, fullMark: 40 },
    { subject: '独立性', score: data.D, fullMark: 40 },
    { subject: '純血度', score: data.E || 40, fullMark: 40 },
  ];

  return (
    <div className="w-full h-80 relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
          <PolarGrid 
            stroke="#333" 
            strokeDasharray="1 3" 
            strokeWidth={1}
            polarRadius={[10, 20, 30, 40]}
          />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#888', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em' }} 
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 40]} 
            tick={false} 
            axisLine={false} 
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
          <Radar 
            name="Score" 
            dataKey="score" 
            stroke="#d4af37" 
            strokeWidth={1.5}
            fill="url(#goldGradient)" 
            fillOpacity={0.2} 
          />
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d4af37" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#fef08a" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
