import React, { useEffect, useRef, useCallback } from 'react';
import './ScrollStack.css';

export interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 30,
  itemScale = 0.025,
  itemStackDistance = 36,
  stackPosition = '14%',
  baseScale = 0.94,
  rotationAmount = 0,
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);
  const sectionTopRef = useRef<number>(0);
  const endElementTopRef = useRef<number>(0);
  const isUpdatingRef = useRef<boolean>(false);
  const lastTransformsRef = useRef<Map<number, { translateY: number; scale: number; rotation: number; blur: number }>>(new Map());

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return typeof value === 'number' ? value : parseFloat(value);
  }, []);

  // Measure and cache all layout offsets once (or on resize) to avoid layout thrashing during scroll
  const measureOffsets = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;

    const scrollerRect = scroller.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    sectionTopRef.current = scrollerRect.top + currentScrollY;

    // Measure each card's natural position relative to document top
    cardOffsetsRef.current = cards.map((card) => {
      // Temporarily clear inline transform to get accurate offsetTop
      const currentTransform = card.style.transform;
      card.style.transform = 'none';
      const rect = card.getBoundingClientRect();
      const top = rect.top + currentScrollY;
      card.style.transform = currentTransform;
      return top;
    });

    const endEl = scroller.querySelector('.scroll-stack-end') as HTMLElement | null;
    if (endEl) {
      const endRect = endEl.getBoundingClientRect();
      endElementTopRef.current = endRect.top + currentScrollY;
    }
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length) return;

    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const endElementTop = endElementTopRef.current || (sectionTopRef.current + cardsRef.current.length * 650);

    // Pinned cards release when the end spacer is reached
    const pinEnd = endElementTop - containerHeight;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardOffsetsRef.current[i] || (sectionTopRef.current + i * 400);
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;

      // Scale calculation based on approach to stack position
      const scaleStart = cardTop - stackPositionPx - itemStackDistance * i;
      const scaleEnd = scaleStart + 350;
      let scaleProgress = 0;
      if (scrollTop > scaleStart) {
        scaleProgress = Math.min(1, (scrollTop - scaleStart) / (scaleEnd - scaleStart));
      }

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Calculate smooth pin translation
      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 10) / 10,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 10) / 10,
        blur: 0,
      };

      const last = lastTransformsRef.current.get(i);
      if (
        !last ||
        Math.abs(last.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(last.scale - newTransform.scale) > 0.001
      ) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})`;
        lastTransformsRef.current.set(i, newTransform);
      }
    });
  }, [baseScale, itemScale, itemStackDistance, parsePercentage, stackPosition, rotationAmount]);

  useEffect(() => {
    measureOffsets();

    // Initial transform update
    updateCardTransforms();

    const handleScroll = () => {
      if (!isUpdatingRef.current) {
        isUpdatingRef.current = true;
        requestAnimationFrame(() => {
          updateCardTransforms();
          isUpdatingRef.current = false;
        });
      }
    };

    const handleResize = () => {
      measureOffsets();
      updateCardTransforms();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Initial delayed re-measure after fonts/images settle
    const t1 = setTimeout(handleResize, 150);
    const t2 = setTimeout(handleResize, 600);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
      cardsRef.current = [];
      cardOffsetsRef.current = [];
      lastTransformsRef.current.clear();
    };
  }, [measureOffsets, updateCardTransforms]);

  // Set card styles
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.zIndex = `${i + 1}`;
    });
  }, [itemDistance]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" style={{ height: '40px' }} />
      </div>
    </div>
  );
};

export default ScrollStack;
