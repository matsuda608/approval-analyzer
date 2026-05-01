import { notFound } from 'next/navigation';
import { personalityTypes } from '@/data/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DebugGalleryPage() {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  const typesArray = Object.values(personalityTypes);

  // ダミーのペイロードを生成する関数
  const generateDummyPayload = (tid: string) => {
    const payload = {
      tid,
      a: parseInt(tid[0]) ? 30 : 10,
      b: parseInt(tid[1]) ? 30 : 10,
      c: parseInt(tid[2]) ? 30 : 10,
      d: parseInt(tid[3]) ? 30 : 10,
      e: 20,
      dev: 65.5,
      top: 5.5
    };
    return Buffer.from(JSON.stringify(payload)).toString('base64');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="border-b border-zinc-800 pb-4">
          <h1 className="text-2xl font-bold text-[#d4af37] tracking-widest uppercase">Debug Gallery</h1>
          <p className="text-zinc-500 text-sm mt-2">開発環境専用: 全16タイプの結果プレビュー画面</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {typesArray.map((type) => {
            const d = generateDummyPayload(type.id);
            return (
              <div key={type.id} className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col items-center text-center space-y-4 shadow-xl">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-white border border-[#d4af37]/30">
                  <img src={type.imageUrl} alt={type.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                </div>
                
                <div>
                  <h2 className="text-lg font-serif text-white tracking-widest">{type.name.split(" ")[0]}</h2>
                  <p className="text-[10px] text-zinc-500 tracking-widest">{type.name.split(" ")[1]}</p>
                  <p className="text-[10px] text-[#d4af37] font-mono mt-1">ID: {type.id}</p>
                </div>

                <div className="w-full space-y-2 pt-4 border-t border-zinc-800">
                  <Link href={`/result?d=${d}`} target="_blank" className="block w-full">
                    <Button variant="outline" className="w-full text-xs tracking-widest border-zinc-700 hover:bg-zinc-800">
                      通常版プレビュー
                    </Button>
                  </Link>
                  <Link href={`/premium-result?session_id=debug&d=${d}`} target="_blank" className="block w-full">
                    <Button className="w-full text-xs tracking-widest bg-[#d4af37] hover:bg-[#b48f27] text-black font-bold">
                      プレミアム版プレビュー
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
