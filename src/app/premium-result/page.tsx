import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { personalityTypes } from '@/data/types';
import { PremiumResultClientPage } from './PremiumResultClientPage';
import { Metadata } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20' as any,
});

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "Premium Report | 承認欲求傾向分析",
  description: "購入者限定の生体記録詳細データ",
};

export default async function PremiumResultPage(props: Props) {
  const searchParams = await props.searchParams;
  const session_id = searchParams.session_id as string | undefined;
  const d = searchParams.d as string | undefined;

  if (!session_id || !d) {
    redirect('/');
  }

  try {
    // デバッグ環境用バイパス
    if (process.env.NODE_ENV === 'development' && session_id === 'debug') {
      // バイパス許可
    } else {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (session.payment_status !== 'paid') {
        redirect(`/result?d=${encodeURIComponent(d)}`);
      }
    }
  } catch (error) {
    console.error('Stripe session retrieval failed:', error);
    redirect(`/result?d=${encodeURIComponent(d)}`);
  }

  let payload: any;
  try {
    payload = JSON.parse(Buffer.from(d, 'base64').toString('utf-8'));
  } catch (e) {
    return <div className="p-6 bg-[#0a0a0a] text-slate-300 min-h-screen flex items-center justify-center">データが破損しています。</div>;
  }

  const type = personalityTypes[payload.tid] || personalityTypes["0000"];
  const bestMatch = personalityTypes[type.bestMatch];
  const worstMatch = personalityTypes[type.worstMatch];

  return <PremiumResultClientPage payload={payload} type={type} bestMatch={bestMatch} worstMatch={worstMatch} d={d} />;
}
