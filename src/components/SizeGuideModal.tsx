import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { SIZE_CHART } from '../data/products';
import { X, Ruler } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useCart();
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  if (!isSizeGuideOpen) return null;

  const chartData = unit === 'cm' ? SIZE_CHART.cm : SIZE_CHART.inches;

  return (
    <div className="fixed inset-0 z-[99994] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        onClick={() => setIsSizeGuideOpen(false)}
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#0D0D0D] border border-white/15 shadow-2xl p-6 md:p-8 z-10 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <Ruler className="w-6 h-6 text-accent" />
            <div>
              <span className="text-[10px] font-sans tracking-widest text-accent uppercase block">
                Fit
              </span>
              <h3 className="text-2xl font-display uppercase tracking-wider text-white">
                Size guide
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-2 text-white/60 hover:text-white border border-white/10 hover:border-white transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-sans text-white/50 uppercase tracking-wider">
            Garment measured laid flat
          </span>
          <div className="inline-flex border border-white/20 bg-black">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1.5 text-xs font-sans uppercase font-bold transition-colors ${
                unit === 'cm' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              cm
            </button>
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1.5 text-xs font-sans uppercase font-bold transition-colors ${
                unit === 'inches' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              in
            </button>
          </div>
        </div>

        {/* Measurements Table */}
        <div className="overflow-x-auto border border-white/10">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-white/50 uppercase tracking-wider">
                <th className="p-3">Size</th>
                <th className="p-3">Chest width</th>
                <th className="p-3">Body length</th>
                <th className="p-3">Shoulder</th>
                <th className="p-3">Sleeve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {chartData.map((row) => (
                <tr key={row.size} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-display text-sm font-bold text-white text-accent">
                    {row.size}
                  </td>
                  <td className="p-3 text-white/80">{row.chest} {unit}</td>
                  <td className="p-3 text-white/80">{row.length} {unit}</td>
                  <td className="p-3 text-white/80">{row.shoulder} {unit}</td>
                  <td className="p-3 text-white/80">{row.sleeve} {unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Guidelines */}
        <div className="mt-6 p-4 bg-black border border-white/10 space-y-2">
          <h4 className="font-sans text-[11px] font-bold uppercase tracking-widest text-accent">
            How it fits
          </h4>
          <p className="font-sans text-xs text-white/70 leading-relaxed">
            Our tees have a <strong>relaxed fit with dropped shoulders</strong>.
          </p>
          <ul className="list-disc list-inside font-sans text-xs text-white/60 space-y-1">
            <li>Take your <strong>usual size</strong> for a relaxed fit.</li>
            <li>Size <strong>down one</strong> for a closer fit.</li>
            <li>Compare with a tee you already own, measured laid flat.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
