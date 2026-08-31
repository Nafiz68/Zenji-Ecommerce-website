import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const message = "NEW DROP: BLUE FLAME TEE NOW AVAILABLE • LIMITED STOCK • THE_ORIGIN_DROP COLLECTION LIVE • FREE SHIPPING AUSTRALIA-WIDE ON ORDERS OVER A$150 • ";

  return (
    <div className="relative h-10 overflow-hidden bg-[#BC0100] border-b border-white/10 z-40 select-none">
      <div className="flex h-full w-max items-center whitespace-nowrap animate-marquee">
        <span className="font-jetbrains px-4 text-[10px] uppercase tracking-widest text-white md:text-[11px] font-medium">
          {message}
        </span>
        <span className="font-jetbrains px-4 text-[10px] uppercase tracking-widest text-white md:text-[11px] font-medium" aria-hidden="true">
          {message}
        </span>
        <span className="font-jetbrains px-4 text-[10px] uppercase tracking-widest text-white md:text-[11px] font-medium" aria-hidden="true">
          {message}
        </span>
        <span className="font-jetbrains px-4 text-[10px] uppercase tracking-widest text-white md:text-[11px] font-medium" aria-hidden="true">
          {message}
        </span>
      </div>
    </div>
  );
};
