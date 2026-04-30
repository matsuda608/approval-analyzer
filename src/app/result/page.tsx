import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { personalityTypes } from "@/data/types";
import { Button } from "@/components/ui/button";
import { ResultClientPage } from "./ResultClientPage";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const d = searchParams.d as string | undefined;
  if (!d) return { title: "分析エラー" };

  try {
    const payload = JSON.parse(Buffer.from(d, 'base64').toString('utf-8'));
    const type = personalityTypes[payload.tid];
    const topPercentile = payload.top;

    return {
      title: `${type?.name} | 多次元的承認欲求傾向分析`,
      description: `私の承認欲求傾向は「${type?.name}」でした。全受検者の上位${topPercentile}％に位置しています。`,
      openGraph: {
        images: [`/api/og?d=${d}`],
      },
      twitter: {
        card: "summary_large_image",
        images: [`/api/og?d=${d}`],
      },
    };
  } catch (e) {
    return { title: "分析結果" };
  }
}

export default async function ResultPage(props: Props) {
  const searchParams = await props.searchParams;
  const d = searchParams.d as string | undefined;
  if (!d) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50">
        <p className="text-slate-600">データが見つかりません。もう一度最初からお試しください。</p>
        <Link href="/">
          <Button className="mt-4">トップへ戻る</Button>
        </Link>
      </div>
    );
  }

  let payload: any;
  try {
    payload = JSON.parse(Buffer.from(d, 'base64').toString('utf-8'));
  } catch (e) {
    return <div className="p-6 bg-slate-50 min-h-screen flex items-center justify-center">データが破損しています。</div>;
  }

  const type = personalityTypes[payload.tid] || personalityTypes["0000"];
  const bestMatch = personalityTypes[type.bestMatch];
  const worstMatch = personalityTypes[type.worstMatch];

  return <ResultClientPage payload={payload} type={type} bestMatch={bestMatch} worstMatch={worstMatch} d={d} />;
}
