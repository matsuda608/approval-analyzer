export type ScaleType = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Question {
  id: number;
  text: string;
  scale: ScaleType;
  // 識別力（Item Discrimination）のダミー係数: 1.0が標準
  weight: number;
  // 逆転項目かどうか（リッカート尺度の反転）
  reversed: boolean;
}

export const questions: Question[] = [
  // A: 評価懸念 (Fear of Negative Evaluation)
  { id: 1, text: "他者の視線を感じると、自己の行動が不適切ではないかと強い不安を覚える。", scale: 'A', weight: 1.1, reversed: false },
  { id: 2, text: "集団内で発言する際、否定的な評価を下されることを過剰に恐れる傾向がある。", scale: 'A', weight: 1.2, reversed: false },
  { id: 3, text: "自らの失敗が他者に認知された場合、長期間にわたり心理的苦痛を感じる。", scale: 'A', weight: 1.0, reversed: false },
  { id: 4, text: "初対面の人物と接する際、「不愉快な人物だと思われないか」と常に警戒している。", scale: 'A', weight: 0.9, reversed: false },
  { id: 5, text: "自分がいない場所で、他者が自分の批判をしているのではないかという疑念を抱くことがある。", scale: 'A', weight: 1.1, reversed: false },
  { id: 6, text: "権威ある人物からの評価が下がることを恐れ、自己の正当な意見を保留することが多い。", scale: 'A', weight: 1.0, reversed: false },
  { id: 7, text: "過去に受けた些細な批判がフラッシュバックし、現在の行動を制限される感覚がある。", scale: 'A', weight: 1.3, reversed: false },
  { id: 8, text: "他者から少しでも冷たい態度をとられると、自分が重大な過失を犯したと解釈しがちだ。", scale: 'A', weight: 1.2, reversed: false },

  // B: 賞賛獲得 (Desire for Admiration)
  { id: 9, text: "自らの成果に対して、周囲からの明確な称賛がない場合、その価値自体を疑う傾向がある。", scale: 'B', weight: 1.1, reversed: false },
  { id: 10, text: "SNS等で自己の活動を報告する際、どれだけの反響（いいねやコメント）が得られるかを強く意識する。", scale: 'B', weight: 1.2, reversed: false },
  { id: 11, text: "他者から「特別である」「有能である」と評価されることは、生きる上で不可欠な要素だと感じる。", scale: 'B', weight: 1.3, reversed: false },
  { id: 12, text: "自分の能力や業績が正当に評価されていないと感じた時、強いフラストレーションを覚える。", scale: 'B', weight: 1.0, reversed: false },
  { id: 13, text: "会話の中で、意識的あるいは無意識的に自分の成功体験を話題に誘導することがある。", scale: 'B', weight: 1.1, reversed: false },
  { id: 14, text: "他者が称賛されている場面に遭遇すると、自己の優位性を証明したいという強い衝動に駆られる。", scale: 'B', weight: 1.2, reversed: false },
  { id: 15, text: "集団の注目を一身に集めている瞬間に、最も強い自己肯定感と快感を得る。", scale: 'B', weight: 1.1, reversed: false },
  { id: 16, text: "外見や所有物に対して、他者から羨望の眼差しを向けられることを好む。", scale: 'B', weight: 0.9, reversed: false },

  // C: 自己呈示 (Self-Presentation)
  { id: 17, text: "社会的に望ましいと判断される人物像を、意図的に演じて見せることが多い。", scale: 'C', weight: 1.1, reversed: false },
  { id: 18, text: "他者の期待を推測し、その期待に合致するように自身の態度や意見を容易に変更できる。", scale: 'C', weight: 1.0, reversed: false },
  { id: 19, text: "自分の弱点や欠点が露呈しそうな状況では、巧みに話題を逸らすか、物理的にその場を離れる。", scale: 'C', weight: 1.2, reversed: false },
  { id: 20, text: "属するコミュニティによって、全く異なるパーソナリティを使い分けることに抵抗がない。", scale: 'C', weight: 1.1, reversed: false },
  { id: 21, text: "オンライン上のプロフィールは、実際の自分よりも意図的に魅力的に構築されている。", scale: 'C', weight: 1.0, reversed: false },
  { id: 22, text: "他者に対して「理想的な自分」として記憶されるためなら、多少の事実の誇張は許容されると考える。", scale: 'C', weight: 1.3, reversed: false },
  { id: 23, text: "自分が発した言葉が周囲にどのような印象を与えるかを、常に俯瞰的な視点から計算している。", scale: 'C', weight: 1.2, reversed: false },
  { id: 24, text: "他者の前では、感情の起伏を抑制し、常に余裕のある態度を保とうと努めている。", scale: 'C', weight: 1.0, reversed: false },

  // D: 内的基準 (Internal Standards - 逆転的に扱う。高いと承認欲求スコアを相殺)
  { id: 25, text: "自分の信念に基づく決定であれば、他者の反対や非難を受けても行動が揺らぐことはない。", scale: 'D', weight: 1.2, reversed: false },
  { id: 26, text: "物事の価値や成否は、他者の評価ではなく、自分自身の基準によってのみ判断されるべきだ。", scale: 'D', weight: 1.1, reversed: false },
  { id: 27, text: "周囲の人間が全て異なる意見を持っていたとしても、自分一人が正しいと確信できればそれで十分だ。", scale: 'D', weight: 1.3, reversed: false },
  { id: 28, text: "流行や世間の評価には関心がなく、自分が真に価値を感じるものだけを追求している。", scale: 'D', weight: 1.0, reversed: false },
  { id: 29, text: "自分の内面的な成長が実感できれば、外部からの賞賛が全く得られなくても満足できる。", scale: 'D', weight: 1.2, reversed: false },
  { id: 30, text: "他者から誤解されたままであっても、あえて弁明せず放置することに苦痛を感じない。", scale: 'D', weight: 1.1, reversed: false },
  { id: 31, text: "社会的なステータスや肩書きよりも、自分自身の納得感と哲学に従って生きることを優先する。", scale: 'D', weight: 1.2, reversed: false },
  { id: 32, text: "他者にどう思われるかという基準で、自らの選択を変更した経験は過去に一度もない。", scale: 'D', weight: 0.9, reversed: false },

  // E: 信頼性(L尺度) (Lie Scale)
  { id: 33, text: "これまでの人生において、ただの一度も他人に嘘をついたことはない。", scale: 'E', weight: 1.0, reversed: false },
  { id: 34, text: "誰に対しても、またどんな状況下であっても、常に100%の親切心を持って接している。", scale: 'E', weight: 1.0, reversed: false },
  { id: 35, text: "他者の過ちに対して、心の底から怒りや苛立ちを感じた経験は皆無である。", scale: 'E', weight: 1.0, reversed: false },
  { id: 36, text: "これまで、自分の利益のために他者をわずかでも出し抜こうと考えたことは一切ない。", scale: 'E', weight: 1.0, reversed: false },
  { id: 37, text: "法律や規則、いかなる小さなマナー違反であっても、これまで一度も破ったことがない。", scale: 'E', weight: 1.0, reversed: false },
  { id: 38, text: "自分の知っている事柄について、少しでも見栄を張って知識を誇張したことはない。", scale: 'E', weight: 1.0, reversed: false },
  { id: 39, text: "どんなに理不尽な要求をされても、不平不満を心に抱いたことはただの一度もない。", scale: 'E', weight: 1.0, reversed: false },
  { id: 40, text: "他人が成功し、自分が失敗した時でも、嫉妬心を1ミリも抱いたことがない。", scale: 'E', weight: 1.0, reversed: false },
];
