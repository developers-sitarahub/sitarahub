'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let cursorScale = 1;
    let ringScale = 1;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (!cursor || !ring) return;
      cursorScale = 2.5;
      ringScale = 1.5;
      ring.style.opacity = '0.5';
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
    };

    const onLeaveLink = () => {
      if (!cursor || !ring) return;
      cursorScale = 1;
      ringScale = 1;
      ring.style.opacity = '1';
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
    };

    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    window.addEventListener('mousemove', onMove);
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}
      />
    </>
  );
}
