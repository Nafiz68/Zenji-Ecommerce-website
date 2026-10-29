import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const message = "NEW SEASON TEES OUT NOW • SMALL-BATCH PRINT RUNS • FREE SHIPPING AUSTRALIA-WIDE ON ORDERS OVER A$150 • ";

  return (
    <div className="relative h-9 overflow-hidden bg-accent z-40 select-none">
      <div className="flex h-full w-max items-center whitespace-nowrap animate-marquee">
        <span className="font-sans px-4 text-[11px] uppercase tracking-wider text-white font-medium">
          {message}
        </span>
        <span className="font-sans px-4 text-[11px] uppercase tracking-wider text-white font-medium" aria-hidden="true">
          {message}
        </span>
        <span className="font-sans px-4 text-[11px] uppercase tracking-wider text-white font-medium" aria-hidden="true">
          {message}
        </span>
        <span className="font-sans px-4 text-[11px] uppercase tracking-wider text-white font-medium" aria-hidden="true">
          {message}
        </span>
      </div>
    </div>
  );
};
