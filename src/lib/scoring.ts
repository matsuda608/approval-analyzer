import { questions, ScaleType } from '../data/questions';
import { personalityTypes, PersonalityType } from '../data/types';

export interface Answer {
  questionId: number;
  value: number; // 1 to 5
  timeToRespond: number; // in milliseconds
}

export interface ScoringResult {
  type: PersonalityType;
  scores: Record<ScaleType, number>;
  rawScores: Record<ScaleType, number>;
  deviationScore: number; // 偏差値 (上位%)
  topPercentile: number;
  reliabilityWarning: boolean;
}

export function calculateScores(answers: Answer[]): ScoringResult {
  const rawScores: Record<ScaleType, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const responseTimes: number[] = [];

  // 1. 各項目の生スコア計算
  answers.forEach((ans) => {
    const q = questions.find((item) => item.id === ans.questionId);
    if (!q) return;

    responseTimes.push(ans.timeToRespond);
    const scoreVal = q.reversed ? (6 - ans.value) : ans.value;
    rawScores[q.scale] += scoreVal * q.weight;
  });

  // 2. 応答時間（TTR）による信頼性（L尺度：E）の減点処理
  const sumTime = responseTimes.reduce((a, b) => a + b, 0);
  const mu = sumTime / responseTimes.length;
  const variance = responseTimes.reduce((a, b) => a + Math.pow(b - mu, 2), 0) / responseTimes.length;
  const sigma = Math.sqrt(variance);

  let reliabilityWarning = false;
  // 平均が1000ms未満、または標準偏差が300ms未満（機械的な連打）の場合は警告
  if (mu < 1000 || sigma < 300) {
    rawScores['E'] -= 10;
    reliabilityWarning = true;
  }

  // 3. D（内的基準）によるA, B, Cの相殺（マイナス）処理
  // Dの最高スコアは約40。その影響力を加味してA, B, Cから減算。
  // ただしマイナスにはならないよう0を担保。
  const dFactor = rawScores.D * 0.4; // 任意の設定：Dの40%分を引く
  const finalScores = {
    A: Math.max(0, rawScores.A - dFactor),
    B: Math.max(0, rawScores.B - dFactor),
    C: Math.max(0, rawScores.C - dFactor),
    D: rawScores.D,
    E: rawScores.E,
  };

  // 4. 16タイプの判定
  // 生スコアの最大値は 8問 * 5点 * weight(約1.0) = 40。中間値は24。
  // 相殺後のA, B, Cは閾値を少し下げる。
  const thresholdABC = 15;
  const thresholdD = 24;

  const bitA = finalScores.A >= thresholdABC ? '1' : '0';
  const bitB = finalScores.B >= thresholdABC ? '1' : '0';
  const bitC = finalScores.C >= thresholdABC ? '1' : '0';
  const bitD = finalScores.D >= thresholdD ? '1' : '0';

  const typeId = `${bitA}${bitB}${bitC}${bitD}`;
  const type = personalityTypes[typeId] || personalityTypes["0000"];

  // 5. 総合偏差値（T-score）の擬似計算
  // 承認欲求の総合力 = A + B + C - D
  const totalApprovalScore = finalScores.A + finalScores.B + finalScores.C;
  // 基準値（適当な母集団の平均を45、標準偏差を15と仮定）
  const popMean = 45;
  const popSd = 15;
  let deviationScore = 50 + ((totalApprovalScore - popMean) / popSd) * 10;
  
  // 偏差値を20〜80の間にクリップ
  deviationScore = Math.max(20, Math.min(80, deviationScore));

  // 偏差値から上位パーセンタイルを近似計算（正規分布を仮定）
  // Z値
  const z = (deviationScore - 50) / 10;
  // 近似CDF
  const percentile = (1 - (0.5 * (1 + erf(z / Math.sqrt(2))))) * 100;
  // 小数点第1位までに丸める
  const topPercentile = Math.max(0.1, Math.min(99.9, Math.round(percentile * 10) / 10));

  return {
    type,
    scores: finalScores,
    rawScores,
    deviationScore: Math.round(deviationScore * 10) / 10,
    topPercentile,
    reliabilityWarning
  };
}

// 誤差関数 (Error Function) の近似実装
function erf(x: number): number {
  const sign = (x >= 0) ? 1 : -1;
  x = Math.abs(x);
  
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}
