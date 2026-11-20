import type { PointerEvent } from 'react';

// Spread onto any element with class "magnetic": it leans toward the cursor and springs back (CSS in globals.css).
export const magnetic = {
  onPointerMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) * 0.3}px`);
    e.currentTarget.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) * 0.4}px`);
  },
  onPointerLeave(e: PointerEvent<HTMLElement>) {
    e.currentTarget.style.setProperty('--mx', '0px');
    e.currentTarget.style.setProperty('--my', '0px');
  },
};
