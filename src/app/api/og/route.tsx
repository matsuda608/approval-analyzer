import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { personalityTypes } from '@/data/types';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const d = searchParams.get('d');

    if (!d) {
      return new ImageResponse(<div style={{ display: 'flex', fontSize: 40, color: 'white', background: '#0a0a0a', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>NO DATA</div>, { width: 1200, height: 630 });
    }

    const payload = JSON.parse(Buffer.from(d, 'base64').toString('utf-8'));
    const type = personalityTypes[payload.tid] || personalityTypes["0000"];
    
    const cx = 200;
    const cy = 200;
    const maxR = 120;
    // Normalized scores (0-40) -> (0-1)
    const scores = [
      Math.min(1, payload.a / 40),
      Math.min(1, payload.b / 40),
      Math.min(1, payload.c / 40),
      Math.min(1, payload.d / 40),
      Math.min(1, (payload.e || 40) / 40)
    ];

    const angles = [-90, -18, 54, 126, 198].map(deg => (deg * Math.PI) / 180);
    
    // Grid Polygons
    const getGridPoints = (ratio: number) => {
      return angles.map(rad => {
        const x = cx + maxR * ratio * Math.cos(rad);
        const y = cy + maxR * ratio * Math.sin(rad);
        return `${x},${y}`;
      }).join(' ');
    };

    // Data Polygon
    const dataPoints = angles.map((rad, i) => {
      const x = cx + maxR * scores[i] * Math.cos(rad);
      const y = cy + maxR * scores[i] * Math.sin(rad);
      return `${x},${y}`;
    }).join(' ');

    const labels = ["警戒心", "捕食欲", "擬態力", "独立性", "純血度"];
    const labelPos = angles.map(rad => {
      const offset = 30;
      return {
        x: cx + (maxR + offset) * Math.cos(rad),
        y: cy + (maxR + offset) * Math.sin(rad)
      };
    });

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#0a0a0a',
            color: '#f8fafc',
            fontFamily: '"Inter", "Noto Serif JP", serif',
            position: 'relative',
            overflow: 'hidden',
            border: '20px solid #171717'
          }}
        >
          {/* Subtle Gold Accents */}
          <div style={{ position: 'absolute', top: 0, left: '20%', width: '1px', height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent)' }} />
          <div style={{ position: 'absolute', top: '30%', left: 0, width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.1), transparent)' }} />

          {/* Left Column: Data & Graph */}
          <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '80px', width: '45%' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 20, color: '#52525b', letterSpacing: '0.3em', fontWeight: 600 }}>BIOLOGICAL ANALYSIS</span>
              <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '20px' }}>
                <span style={{ fontSize: 80, color: '#d4af37', fontWeight: 900, fontFamily: 'serif' }}>{payload.dev}</span>
                <span style={{ fontSize: 24, color: '#52525b', marginLeft: '10px', letterSpacing: '0.1em' }}>偏差値</span>
              </div>
              <span style={{ fontSize: 24, color: '#a1a1aa', marginTop: '5px' }}>上位 {payload.top}％ の特異個体</span>
            </div>

            {/* Radar Chart SVG (5 Axes) */}
            <div style={{ display: 'flex', marginTop: '40px' }}>
              <svg width="400" height="400" viewBox="0 0 400 400">
                {/* Grids */}
                <polygon points={getGridPoints(1.0)} fill="none" stroke="#27272a" strokeWidth="1" />
                <polygon points={getGridPoints(0.75)} fill="none" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
                <polygon points={getGridPoints(0.5)} fill="none" stroke="#27272a" strokeWidth="1" />
                <polygon points={getGridPoints(0.25)} fill="none" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
                
                {/* Axis lines */}
                {angles.map((rad, i) => (
                  <line key={i} x1={cx} y1={cy} x2={cx + maxR * Math.cos(rad)} y2={cy + maxR * Math.sin(rad)} stroke="#27272a" strokeWidth="1" />
                ))}
                
                {/* Labels */}
                {labels.map((label, i) => (
                  <text key={i} x={labelPos[i].x} y={labelPos[i].y + 5} fill="#71717a" fontSize="16" textAnchor="middle" fontWeight="bold">
                    {label}
                  </text>
                ))}

                {/* Data Polygon */}
                <polygon points={dataPoints} fill="rgba(212, 175, 55, 0.15)" stroke="#d4af37" strokeWidth="3" />
              </svg>
            </div>
          </div>

          {/* Right Column: Identity */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '55%', paddingRight: '80px', alignItems: 'flex-start', justifyContent: 'center', height: '100%' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
               <span style={{ fontSize: 32, color: '#d4af37', fontWeight: 300, letterSpacing: '0.1em', marginBottom: '20px' }}>THE ARCHETYPE</span>
               <span style={{ fontSize: 80, color: 'white', fontWeight: 900, lineHeight: 1.1, fontFamily: 'serif' }}>{type.name.split(" ")[0]}</span>
               <span style={{ fontSize: 40, color: '#71717a', fontStyle: 'italic', marginTop: '10px', fontFamily: 'serif' }}>{type.name.split(" ")[1]}</span>
            </div>

            <div style={{ display: 'flex', marginTop: '60px', width: '100%', borderTop: '1px solid #27272a', paddingTop: '30px' }}>
              <p style={{ fontSize: 24, color: '#a1a1aa', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {type.insight}
              </p>
            </div>
            
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
