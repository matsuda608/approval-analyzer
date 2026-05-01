import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function LawPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-md mx-auto px-2 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 p-2 text-slate-500 hover:text-slate-900 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">トップへ戻る</span>
          </Link>
          <div className="text-sm font-bold tracking-widest text-slate-900 pr-4">
            特定商取引法に基づく表記
          </div>
          <div className="w-8" /> {/* Spacer */}
        </div>
      </header>

      <div className="max-w-md mx-auto p-6 space-y-8">
        <section className="space-y-4">
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr className="border-b border-slate-200">
                <th className="py-4 text-left font-bold text-slate-700 w-1/3 align-top">販売業者</th>
                <td className="py-4 text-slate-600">松田 尚樹</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="py-4 text-left font-bold text-slate-700 align-top">所在地</th>
                <td className="py-4 text-slate-600">
                  東京都府中市八幡町28-5<br />
                  ハーモニーレジデンス府中の杜403
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="py-4 text-left font-bold text-slate-700 align-top">電話番号</th>
                <td className="py-4 text-slate-600">080-9742-2282</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="py-4 text-left font-bold text-slate-700 align-top">メールアドレス</th>
                <td className="py-4 text-slate-600">matsupon1207@gmail.com</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="py-4 text-left font-bold text-slate-700 align-top">運営責任者</th>
                <td className="py-4 text-slate-600">松田 尚樹</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="py-4 text-left font-bold text-slate-700 align-top">追加手数料</th>
                <td className="py-4 text-slate-600">なし（販売価格以外に発生する手数料はありません）</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="py-4 text-left font-bold text-slate-700 align-top">交換および返品</th>
                <td className="py-4 text-slate-600">デジタルコンテンツの特性上、返品・返金には応じられません</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="py-4 text-left font-bold text-slate-700 align-top">引渡時期</th>
                <td className="py-4 text-slate-600">支払い完了後、直ちに画面上に表示します</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="py-4 text-left font-bold text-slate-700 align-top">決済手段</th>
                <td className="py-4 text-slate-600">クレジットカード決済</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="py-4 text-left font-bold text-slate-700 align-top">決済期間</th>
                <td className="py-4 text-slate-600">ただちに処理されます</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="py-4 text-left font-bold text-slate-700 align-top">販売価格</th>
                <td className="py-4 text-slate-600">各商品ページに記載（例：500円）</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="space-y-4 pt-6 border-t border-slate-200">
          <h2 className="text-sm font-bold tracking-widest text-slate-900 border-l-4 border-slate-900 pl-3 py-1">
            プライバシーポリシー（個人情報の取り扱い）
          </h2>
          <div className="text-xs text-slate-600 leading-relaxed space-y-3">
            <p>
              当サイト（承認欲求傾向分析）は、診断のためにユーザーが入力した回答データをサーバー上に永続的に保存・蓄積することはありません。診断結果はお客様のブラウザ上および一時的なセッションとしてのみ処理されます。
            </p>
            <p>
              また、有料レポートのご購入に際して入力される氏名、クレジットカード番号、メールアドレスなどの個人情報・決済情報は、すべて安全な外部決済サービス（Stripe）によって暗号化されて直接管理・処理されます。当サイトの運営者がお客様のクレジットカード情報を取得・保持することは一切ありません。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
