import React, { useState, useEffect } from 'react';

interface SplashIntroProps {
  onFinish?: () => void;
  forceShow?: boolean;
}

export const SplashIntro: React.FC<SplashIntroProps> = ({ onFinish, forceShow = false }) => {
  const [visible, setVisible] = useState(() => {
    if (forceShow) return true;
    try {
      // Check session storage so users see the intro on first visit
      const seen = sessionStorage.getItem('zenji_splash_played');
      if (seen === 'true') return false;
    } catch (e) {}
    return true;
  });

  useEffect(() => {
    if (!visible) return;

    // Synthesize blade unsheathe / boom on splash
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(60, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.46);
      }
    } catch (e) {}

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVisible(false);
      }
    };
    window.addEventListener('keydown', handleKey);

    // The animation takes ~2.85s to run its full sequence and fade out smoothly
    const timer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem('zenji_splash_played', 'true');
      } catch (e) {}
      if (onFinish) onFinish();
    }, 2850);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKey);
    };
  }, [visible, onFinish]);

  if (!visible) return null;

  return (
    <>
      {/* Black wipe panels */}
      <div
        className="zenji-wipe"
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          width: '100vw',
          background: '#000000',
          zIndex: 99998,
          transition: 'transform 800ms cubic-bezier(0.76, 0, 0.24, 1)',
          willChange: 'transform',
          pointerEvents: 'none',
          top: 0,
          transform: 'translateY(0)',
        }}
      />
      <div
        className="zenji-wipe"
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          width: '100vw',
          background: '#000000',
          zIndex: 99998,
          transition: 'transform 800ms cubic-bezier(0.76, 0, 0.24, 1)',
          willChange: 'transform',
          pointerEvents: 'none',
          bottom: 0,
          transform: 'translateY(0)',
        }}
      />

      {/* Main splash dialog */}
      <div
        className="zenji-splash"
        role="dialog"
        aria-modal="true"
        aria-label="ZENJI intro"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          background: '#060606',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div className="zstage">
          <div className="zbg" />
          <div className="zhalf" aria-hidden="true" />
          <div className="zkanji" aria-hidden="true">
            力
          </div>
          <div className="zlines" aria-hidden="true" />
          <div className="zwrap">
            <div className="zword" data-text="ZENJI">
              ZENJI
            </div>
          </div>
          <div className="zscan" aria-hidden="true" />
          <div className="zflash" aria-hidden="true" />
          <div className="zhud" style={{ left: '24px' }} aria-hidden="true">
            力 — Awakening
          </div>
          <div className="zhud" style={{ right: '24px' }} aria-hidden="true">
            System // ZENJI
          </div>
        </div>
      </div>
    </>
  );
};
