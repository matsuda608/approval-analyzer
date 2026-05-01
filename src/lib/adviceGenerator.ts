export function generateDeepAdvice(payload: any): string {
  if (!payload || typeof payload !== 'object') {
    return "【エラー】データがぶっ壊れています。ただちにやり直してください。";
  }

  const { a = 0, b = 0, c = 0, d = 0 } = payload;
  
  // 生スコア(約40点満点)をパーセンテージに換算
  const pA = Math.min(100, Math.round((a / 40) * 100));
  const pB = Math.min(100, Math.round((b / 40) * 100));
  const pC = Math.min(100, Math.round((c / 40) * 100));
  const pD = Math.min(100, Math.round((d / 40) * 100));

  // A: 警戒心, B: 捕食欲, C: 擬態力, D: 独立性
  const scores = [
    { key: 'A', value: a, pct: pA, name: '警戒心（ビビり度）' },
    { key: 'B', value: b, pct: pB, name: '捕食欲（かまってちゃん度）' },
    { key: 'C', value: c, pct: pC, name: '擬態力（八方美人度）' },
    { key: 'D', value: d, pct: pD, name: '独立性（マイワールド度）' }
  ];

  // Highest and lowest
  scores.sort((x, y) => y.value - x.value);
  const highest = scores[0];
  const lowest = scores[scores.length - 1];

  let diagnosis = "";
  let prescription = "";

  // 診断ロジック：最も高いスコアに基づくシニカルな分析
  switch (highest.key) {
    case 'A':
      diagnosis = `あなたの脳内セキュリティにおける最大のバグは、「${highest.name}」の異常な高さ（強度：${highest.pct}%）です。過去に食らったちょっとしたミスや拒絶を、「致死量のダメージ」として脳が誤認識し続けています。LINEの既読スルーや上司のちょっとしたタメ息を「自分への攻撃」と自動翻訳するその過敏すぎるアラート機能、要するにただの自意識過剰による被害妄想です。`;
      break;
    case 'B':
      diagnosis = `あなたの脳は完全に「${highest.name}」という麻薬にハイジャックされています（強度：${highest.pct}%）。他人に「いいね」や「すごい」と言われないと自分の存在を保てない、重度の承認依存症です。スマホのバッテリーみたいに、他人の評価という充電ケーブルが刺さっていないと急激に電池切れ（自己否定と虚無感）を起こす、超燃費の悪いポンコツモデルに仕上がっています。`;
      break;
    case 'C':
      diagnosis = `あなたの脳のCPUは「${highest.name}」の計算（強度：${highest.pct}%）にリソースの9割を割いています。息を吐くように相手の顔色を読み、その場に最適化された「偽りのキャラ」を自動生成する技術はもはや芸術的ですが、代償として「本来の自分」のセーブデータがどこにあるか分からなくなっています。誰にも嫌われない代わりに、誰の記憶にも残らない「透明人間」へと着実に進化中です。`;
      break;
    case 'D':
      diagnosis = `あなたの自己評価システムは「${highest.name}」（強度：${highest.pct}%）に極端に偏っています。「大衆の評価なんてくだらない」と切り捨てる強固な防壁は一見カッコいいですが、実は「誰にも理解されない孤独な自分」という中二病の設定に酔っているだけの高度な防衛機能です。他人の意見をすべて「ノイズ」として遮断する無菌室に引きこもっていては、社会というサバイバルゲームで確実に詰みます。`;
      break;
  }

  // 処方箋ロジック：最も低いスコアに基づく荒療治
  switch (lowest.key) {
    case 'A':
      prescription = `【処方箋】 あなたに欠落しているのは「適切なビビり（現在値：${lowest.pct}%）」です。無防備に他人を信じすぎるそのノーガード戦法は、いずれ悪い大人に格ゲーのハメ技のように搾取されます。たまには他人の裏の顔を疑う「健全な人間不信」をインストールしてください。`;
      break;
    case 'B':
      prescription = `【処方箋】 あなたのエンジンには「泥臭い欲求（現在値：${lowest.pct}%）」が足りません。他人に評価されたいという本能を「みっともない」とカッコつけて抑圧するのはやめましょう。たまには「私を褒めて！」と犬のように尻尾を振るダサさを学習してください。`;
      break;
    case 'C':
      prescription = `【処方箋】 あなたの社会適応力（現在値：${lowest.pct}%）は絶望的です。「嘘をついて人に合わせるのは悪だ」という単細胞な考えを捨て、「戦略的にキャラを被る」訓練を始めてください。まずは、どうでもいい他人の世間話に0.5秒で愛想笑いを返すという基礎コンボから練習しましょう。`;
      break;
    case 'D':
      prescription = `【処方箋】 あなたには「自分自身の羅針盤（現在値：${lowest.pct}%）」が完全に欠落しています。他人の意見に振り回されるだけの人生に終止符を打つため、まずは他人のSNSアカウントを物理的にミュートし、「誰にも見られない状態で自分が何をしたいのか」を考え直すリハビリを今すぐ開始してください。`;
      break;
  }

  return `${diagnosis}\n\n${prescription}`;
}
