'use client';

import { useEffect, useState } from 'react';
import { Logo } from './logo';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Animate progress 0 → 100 over ~2s using a stepped schedule
    const steps: [number, number][] = [
      [18, 250],
      [37, 300],
      [55, 350],
      [72, 280],
      [88, 320],
      [100, 300],
    ];

    let i = 0;
    let elapsed = 0;

    const run = () => {
      if (i >= steps.length) return;
      const [target, delay] = steps[i];
      i++;
      elapsed += delay;
      setTimeout(() => {
        setProgress(target);
        run();
      }, elapsed === delay ? delay : delay);
    };

    // Small initial delay so the screen paints first
    const startId = setTimeout(run, 80);

    return () => clearTimeout(startId);
  }, []);

  // When progress hits 100, wait then exit
  useEffect(() => {
    if (progress < 100) return;
    const t1 = setTimeout(() => setExiting(true), 450);
    const t2 = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 450 + 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [progress, onComplete]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'translateY(-5%)' : 'translateY(0)',
        transition: exiting
          ? 'opacity 0.7s cubic-bezier(0.76,0,0.24,1), transform 0.7s cubic-bezier(0.76,0,0.24,1)'
          : 'none',
        pointerEvents: exiting ? 'none' : 'all',
      }}
    >
      {/* Subtle radial bloom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(255,106,55,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Fine grid texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      {/* Main card */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3rem',
          width: '100%',
          maxWidth: 380,
          padding: '0 2rem',
        }}
      >
        {/* Brand text logo */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both',
          }}
        >
          <Logo
            iconSize={64}
            fontSize="1.8rem"
            direction="row"
            showSubtitle={false}
          />
        </div>

        {/* Progress block */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            animation: 'fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both',
          }}
        >
          {/* Percent + label row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span
              style={{
                fontSize: '0.5rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,233,0.2)',
                fontFamily: 'monospace',
              }}
            >
              {progress >= 100 ? 'Ready' : 'Loading'}
            </span>
            <span
              style={{
                fontSize: '1.75rem',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                color: '#f5f0e9',
                lineHeight: 1,
                fontFamily: 'Inter, sans-serif',
                transition: 'color 0.3s ease',
              }}
            >
              {progress}
              <span style={{ fontSize: '1rem', color: '#ff6a37', marginLeft: 1, fontWeight: 700 }}>%</span>
            </span>
          </div>

          {/* Progress track */}
          <div
            style={{
              width: '100%',
              height: '1px',
              background: 'rgba(255,255,255,0.06)',
              position: 'relative',
              borderRadius: 1,
            }}
          >
            {/* Filled portion */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(to right, #ff6a37, #ffb085)',
                borderRadius: 1,
                transition: 'width 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
              }}
            />
            {/* Glowing dot at tip */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: `${progress}%`,
                transform: 'translate(-50%, -50%)',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#ff9e70',
                boxShadow: '0 0 10px 4px rgba(255,106,55,0.55)',
                transition: 'left 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
