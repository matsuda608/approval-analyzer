import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20' as any, // Using latest valid types
});

export async function POST(request: Request) {
  try {
    const { d } = await request.json();

    if (!d) {
      return NextResponse.json({ error: 'Missing parameter "d"' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: '承認欲求傾向分析 - 有料詳細レポート',
              description: 'あなたの深層心理と承認欲求の根源に迫る、完全版の生体記録データです。',
            },
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/premium-result?session_id={CHECKOUT_SESSION_ID}&d=${encodeURIComponent(d)}`,
      cancel_url: `${baseUrl}/result?d=${encodeURIComponent(d)}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Checkout Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
