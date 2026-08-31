import React, { useEffect, useRef, useState } from 'react';

interface SlashArc {
  x: number;
  y: number;
  angle: number;
  length: number;
  age: number;
  maxAge: number;
  color: string;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  size: number;
  color: string;
}

export const KatanaCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSlashing, setIsSlashing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [velocity, setVelocity] = useState({ vx: 0, vy: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevMouseRef = useRef({ x: 0, y: 0, time: Date.now() });
  const slashesRef = useRef<SlashArc[]>([]);
  const sparksRef = useRef<Spark[]>([]);

  // Sound synthesis for real metallic katana slice
  const playRealisticKatanaSlash = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;

      // 1. High frequency blade whoosh (air displacement)
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(3200, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(600, now + 0.12);
      noiseFilter.Q.setValueAtTime(4.0, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.09, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start(now);

      // 2. Metallic ring & resonance
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1480, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.18);

      oscGain.gain.setValueAtTime(0.04, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.19);
    } catch (e) {}
  };

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const now = Date.now();
      const dt = Math.max(1, now - prevMouseRef.current.time);
      const dx = x - prevMouseRef.current.x;
      const dy = y - prevMouseRef.current.y;

      const vx = (dx / dt) * 16;
      const vy = (dy / dt) * 16;
      setVelocity({ vx, vy });

      setMousePos({ x, y });
      setIsVisible(true);

      const speed = Math.sqrt(dx * dx + dy * dy);

      // Spawn blade trail sparks when moving fast
      if (speed > 12 && Math.random() > 0.4) {
        sparksRef.current.push({
          x: x - dx * 0.4,
          y: y - dy * 0.4,
          vx: (Math.random() - 0.5) * 2 - vx * 0.1,
          vy: (Math.random() - 0.5) * 2 - vy * 0.1,
          age: 0,
          maxAge: 12 + Math.random() * 8,
          size: 1 + Math.random() * 2,
          color: isHovered ? '#BC0100' : '#FFFFFF',
        });
      }

      prevMouseRef.current = { x, y, time: now };

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer, .card-hover, .group, [tabindex="0"]');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsSlashing(true);
      playRealisticKatanaSlash();

      // Trigger dynamic blade slice arc on canvas
      const angle = Math.atan2(velocity.vy || 1, velocity.vx || 1);
      slashesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        angle: angle - Math.PI / 4,
        length: 70 + Math.random() * 30,
        age: 0,
        maxAge: 14,
        color: isHovered ? '#BC0100' : '#FFFFFF',
      });

      // Burst of steel sparks on cut
      for (let i = 0; i < 10; i++) {
        const pAngle = Math.random() * Math.PI * 2;
        const pSpeed = 2 + Math.random() * 4;
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(pAngle) * pSpeed,
          vy: Math.sin(pAngle) * pSpeed,
          age: 0,
          maxAge: 16 + Math.random() * 10,
          size: 1.5 + Math.random() * 2,
          color: Math.random() > 0.3 ? '#FFFFFF' : '#BC0100',
        });
      }

      setTimeout(() => setIsSlashing(false), 240);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Canvas animation loop for realistic slashes and glowing embers
    let animId: number;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const handleResize = () => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
        }
      };
      window.addEventListener('resize', handleResize);

      const render = () => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // 1. Draw Katana Slice Arcs
          for (let i = slashesRef.current.length - 1; i >= 0; i--) {
            const slash = slashesRef.current[i];
            slash.age += 1;
            const progress = slash.age / slash.maxAge;
            const alpha = 1 - progress;

            if (alpha <= 0) {
              slashesRef.current.splice(i, 1);
              continue;
            }

            ctx.save();
            ctx.translate(slash.x, slash.y);
            ctx.rotate(slash.angle);

            // Curved Katana Blade Slash Arc
            ctx.beginPath();
            ctx.moveTo(-slash.length * 0.7, -slash.length * 0.3);
            ctx.quadraticCurveTo(0, 0, slash.length * 0.8, slash.length * 0.6);

            // Outer Crimson Glow
            ctx.strokeStyle = `rgba(188, 1, 0, ${alpha * 0.7})`;
            ctx.lineWidth = 6 * (1 - progress * 0.6);
            ctx.lineCap = 'round';
            ctx.stroke();

            // Inner Razor White Core
            ctx.beginPath();
            ctx.moveTo(-slash.length * 0.7, -slash.length * 0.3);
            ctx.quadraticCurveTo(0, 0, slash.length * 0.8, slash.length * 0.6);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
            ctx.lineWidth = 2.5 * (1 - progress * 0.5);
            ctx.stroke();

            ctx.restore();
          }

          // 2. Draw Sparks / Embers
          for (let i = sparksRef.current.length - 1; i >= 0; i--) {
            const spark = sparksRef.current[i];
            spark.age += 1;
            spark.x += spark.vx;
            spark.y += spark.vy;
            spark.vy += 0.08; // subtle gravity

            const alpha = 1 - spark.age / spark.maxAge;
            if (alpha <= 0) {
              sparksRef.current.splice(i, 1);
              continue;
            }

            ctx.beginPath();
            ctx.arc(spark.x, spark.y, spark.size * alpha, 0, Math.PI * 2);
            ctx.fillStyle = spark.color === '#FFFFFF'
              ? `rgba(255, 255, 255, ${alpha * 0.9})`
              : `rgba(188, 1, 0, ${alpha * 0.9})`;
            ctx.shadowColor = spark.color;
            ctx.shadowBlur = 4;
            ctx.fill();
          }
        }
        animId = requestAnimationFrame(render);
      };
      animId = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
      };
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isHovered, velocity]);

  if (!isVisible) return null;

  // Real katana dynamic tilt
  const tilt = Math.max(-20, Math.min(20, (velocity.vx || 0) * 0.8));

  return (
    <>
      {/* Canvas for Blade Slices & Sparks */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[999997]"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Realistic 3D Katana Sword Cursor */}
      <div
        className="pointer-events-none fixed z-[999998] will-change-transform"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: `translate(-3px, -3px) rotate(${
            isSlashing ? '-45deg' : isHovered ? '-10deg' : -26 + tilt
          }) scale(${isHovered ? 1.18 : isSlashing ? 1.25 : 1})`,
          transformOrigin: '3px 3px',
          transition: 'transform 0.08s cubic-bezier(0.2, 0.8, 0.2, 1)',
          filter: isHovered
            ? 'drop-shadow(0 0 12px rgba(188, 1, 0, 0.95)) drop-shadow(0 0 3px #FFFFFF)'
            : isSlashing
            ? 'drop-shadow(0 0 16px rgba(255, 255, 255, 1)) drop-shadow(0 0 8px #BC0100)'
            : 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 2px rgba(255, 255, 255, 0.25))',
        }}
      >
        {/* Photorealistic Japanese Katana SVG */}
        <svg
          width="54"
          height="54"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Real Tamahagane Steel Gradient */}
            <linearGradient id="realBladeSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="75%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Razor Edge Polish Gradient */}
            <linearGradient id="edgeGleam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor={isHovered ? '#FF3333' : '#F8FAFC'} />
              <stop offset="100%" stopColor={isHovered ? '#BC0100' : '#E2E8F0'} />
            </linearGradient>

            {/* Gold Habaki Collar Gradient */}
            <linearGradient id="goldHabaki" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="45%" stopColor="#EAB308" />
              <stop offset="85%" stopColor="#CA8A04" />
              <stop offset="100%" stopColor="#854D0E" />
            </linearGradient>

            {/* Black Iron Tsuba Guard Gradient */}
            <radialGradient id="ironTsuba" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#262626" />
              <stop offset="70%" stopColor="#0F0F0F" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            {/* Tsuka Silk Wrap Gradient */}
            <linearGradient id="tsukaWrap" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1C1917" />
              <stop offset="50%" stopColor="#0C0A09" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>

            {/* Blade Shine Animation Gradient */}
            <linearGradient id="bladeShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.85)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* 1. BLADE (Kissaki tip at 3,3 to Shinogi ridge) */}
          <path
            d="M3 3 C16 11 36 27 50 39 L47 43 C33 30 14 15 3 3 Z"
            fill="url(#realBladeSteel)"
            stroke="#1E293B"
            strokeWidth="0.4"
          />

          {/* 2. REAL HAMON LINE (Wavy Temper Line along Cutting Edge) */}
          <path
            d="M3 3 Q 8 6 12 10 T 20 17 T 28 24 T 36 30 T 44 36 L 47 43 C 33 30 14 15 3 3 Z"
            fill="url(#edgeGleam)"
            opacity={isHovered ? 0.95 : 0.8}
          />

          {/* 3. RAZOR CUTTING EDGE (Ha) with Metallic Glow */}
          <path
            d="M3 3 C15 12 34 28 48 41"
            stroke={isHovered || isSlashing ? '#FF2222' : '#FFFFFF'}
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* 4. BLOOD GROOVE (Hi / Bo-Hi Fuller) */}
          <path
            d="M8 7 C18 15 32 27 43 36"
            stroke="#0F172A"
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* 5. GOLD HABAKI (Blade Collar) */}
          <polygon
            points="46,36 51,40 48,44 43,40"
            fill="url(#goldHabaki)"
            stroke="#713F12"
            strokeWidth="0.5"
          />

          {/* 6. TSUBA (Guard - Blackened Iron with Gold Rim) */}
          <ellipse
            cx="48"
            cy="42"
            rx="6.5"
            ry="4.5"
            transform="rotate(-40 48 42)"
            fill="url(#ironTsuba)"
            stroke="#BC0100"
            strokeWidth="0.8"
          />
          <ellipse
            cx="48"
            cy="42"
            rx="4.5"
            ry="2.8"
            transform="rotate(-40 48 42)"
            fill="#171717"
            stroke="#EAB308"
            strokeWidth="0.4"
          />

          {/* 7. TSUKA (Handle - Samegawa Ray Skin with Silk Wrap) */}
          {/* White Ray Skin Background */}
          <polygon
            points="49,43 65,59 62,62 46,46"
            fill="#F5F5F4"
            stroke="#1C1917"
            strokeWidth="0.5"
          />

          {/* Black Diamond Silk Wrap (Ito) */}
          <polygon points="49,44 53,46 51,49 47,47" fill="url(#tsukaWrap)" />
          <polygon points="53,48 57,50 55,53 51,51" fill="url(#tsukaWrap)" />
          <polygon points="57,52 61,54 59,57 55,55" fill="url(#tsukaWrap)" />
          <polygon points="61,56 65,58 63,61 59,59" fill="url(#tsukaWrap)" />

          {/* Gold Menuki Ornament in Handle */}
          <circle cx="55" cy="51" r="1.2" fill="#EAB308" stroke="#713F12" strokeWidth="0.3" />

          {/* 8. KASHIRA (Gold Pommel End Cap) */}
          <rect
            x="63"
            y="60"
            width="4"
            height="4"
            transform="rotate(45 63 60)"
            fill="url(#goldHabaki)"
            stroke="#713F12"
            strokeWidth="0.4"
          />

          {/* 9. TIP RETICLE & SPARK ON SLASH */}
          {isSlashing && (
            <circle
              cx="3"
              cy="3"
              r="5"
              fill="#FFFFFF"
              className="animate-ping"
            />
          )}
        </svg>

        {/* Needle-Sharp Katana Tip Indicator for 100% target accuracy */}
        <div
          className={`absolute top-[3px] left-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all ${
            isHovered
              ? 'w-2.5 h-2.5 bg-[#BC0100] ring-2 ring-white shadow-[0_0_10px_#BC0100]'
              : 'w-1.5 h-1.5 bg-white shadow-[0_0_4px_#FFFFFF]'
          }`}
        />
      </div>
    </>
  );
};
