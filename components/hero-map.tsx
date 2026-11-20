'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Logo } from './logo';

// SVG canvas. Labels are HTML placed in % of this box, so they stay aligned at any size.
const W = 520;
const H = 460;
const HUB = { x: 70, y: 230 };
const END_X = 300; // leaves the right ~40% for labels

const nodes = [
  { y: 58, name: 'GPSERP', note: 'WhatsApp automation & ERP', href: '/projects/gpserp' },
  { y: 144, name: 'Mail by GPSERP', note: 'AI cold email', href: '/projects/mail-by-gpserp' },
  { y: 230, name: 'National Franchise Investment Summit', note: 'Franchise ecosystem platform', href: '/projects/national-franchise-investment-summit' },
  { y: 316, name: 'Raffu', note: 'Clothing alterations marketplace', href: '/projects/raffu' },
  { y: 402, name: 'Your product?', note: 'Let’s talk', href: '/#contact', open: true },
];

const R = 38; // hub radius

// Circuit trace: leave the hub from its own point on the rim, run flat, bend at 45°, run flat into the node.
// Outer lines bend first so parallel diagonals stay ~30px apart instead of doubling up.
function trace(i: number, y: number) {
  const dy = (i - 2) * 14;
  const sx = HUB.x + Math.sqrt(R * R - dy * dy);
  const sy = HUB.y + dy;
  const x0 = [124, 158, sx, 158, 124][i];
  const x1 = x0 + Math.abs(y - sy);
  return `M ${sx.toFixed(1)} ${sy} H ${x0.toFixed(1)} L ${x1.toFixed(1)} ${y} H ${END_X}`;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroMap() {
  const reduce = useReducedMotion();

  return (
    <div className="hub-map" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="hub-svg" aria-hidden="true">
        {/* faint dotted grid, like a circuit board */}
        <defs>
          <pattern id="hub-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--line)" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#hub-grid)" opacity="0.7" />

        {nodes.map((n, i) => {
          const d = trace(i, n.y);
          const delay = 0.9 + i * 0.14;
          return (
            <g key={n.name}>
              {n.open ? (
                // pathLength would override the dashes, so this one fades in and its dashes march toward the node
                <motion.path
                  d={d}
                  className="hub-line-open"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: delay + 0.4 }}
                />
              ) : (
                <>
                  <path d={d} className="hub-track" />
                  <motion.path
                    id={`hub-trace-${i}`}
                    d={d}
                    className="hub-line"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, delay, ease }}
                  />
                </>
              )}
              {/* node ring pops in when its line arrives */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: delay + 0.9, ease }}
                style={{ transformOrigin: `${END_X}px ${n.y}px` }}
              >
                <circle cx={END_X} cy={n.y} r="9" className={n.open ? 'hub-ring hub-ring-open' : 'hub-ring'} />
                {!n.open && <circle cx={END_X} cy={n.y} r="3.5" fill="var(--teal)" />}
              </motion.g>
              {/* a data packet that keeps travelling along each finished line */}
              {!reduce && !n.open && (
                <circle r="2.6" fill="var(--teal)" opacity="0">
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" begin={`${delay + 1.4 + i * 0.5}s`} repeatCount="indefinite" />
                  <animateMotion dur="2.8s" begin={`${delay + 1.4 + i * 0.5}s`} repeatCount="indefinite">
                    <mpath href={`#hub-trace-${i}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          );
        })}

        {/* hub */}
        <motion.g
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
        >
          {!reduce && <circle cx={HUB.x} cy={HUB.y} r={R} className="hub-pulse" />}
          <circle cx={HUB.x} cy={HUB.y} r={R} fill="var(--card)" stroke="var(--ink)" strokeWidth="1.5" />
          <circle cx={HUB.x} cy={HUB.y} r={R - 6} fill="none" stroke="var(--line)" />
        </motion.g>
      </svg>

      <motion.div
        className="hub-logo"
        style={{ left: `${(HUB.x / W) * 100}%`, top: `${(HUB.y / H) * 100}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Logo showWordmark={false} showSubtitle={false} iconSize={38} />
      </motion.div>
      <motion.span
        className="hub-caption"
        style={{ left: `${(HUB.x / W) * 100}%`, top: `${((HUB.y + R + 14) / H) * 100}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        Sitarahub · Mumbai
      </motion.span>

      {nodes.map((n, i) => (
        <motion.div
          key={n.name}
          className={n.open ? 'hub-label hub-label-open' : 'hub-label'}
          style={{ left: `${((END_X + 18) / W) * 100}%`, top: `${(n.y / H) * 100}%` }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9 + i * 0.14 + 1, ease }}
        >
          <Link href={n.href}>
            <strong>{n.name}</strong>
            <span>{n.note}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
