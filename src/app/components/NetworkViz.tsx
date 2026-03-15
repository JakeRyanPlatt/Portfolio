import { useEffect, useRef } from 'react';

// ─── Accent ──────────────────────────────────────────────────────
const ACCENT = '#2dd4bf';

// ─── Logical canvas space ─────────────────────────────────────────
const LW = 820;
const LH = 295;

// ─── Types ───────────────────────────────────────────────────────
type NodeType = 'router' | 'switch' | 'server' | 'firewall' | 'mcu' | 'iot' | 'fpga';

interface NDef {
  id: string;
  lx: number;
  ly: number;
  label: string;
  sub: string;
  type: NodeType;
  r: number; // logical radius
}

interface Packet {
  ei: number;       // edge index
  t: number;        // 0..1 position along edge
  spd: number;      // speed per ms
  dir: 1 | -1;
}

interface Ping {
  lx: number;
  ly: number;
  born: number;
}

// ─── Network topology ────────────────────────────────────────────
const NODES: NDef[] = [
  { id: 'fw',   lx: 62,  ly: 148, label: 'FW-01',      sub: '10.0.0.1',   type: 'firewall', r: 22 },
  { id: 'rtr',  lx: 210, ly: 148, label: 'CORE-RTR',   sub: 'BGP / OSPF', type: 'router',   r: 26 },
  { id: 'sw1',  lx: 378, ly: 72,  label: 'SW-CORE-01', sub: 'VLAN 10/20', type: 'switch',   r: 20 },
  { id: 'sw2',  lx: 378, ly: 222, label: 'SW-CORE-02', sub: 'VLAN 30/40', type: 'switch',   r: 20 },
  { id: 'srv',  lx: 540, ly: 72,  label: 'SRV-01',     sub: '10.10.1.5',  type: 'server',   r: 20 },
  { id: 'mcu',  lx: 540, ly: 222, label: 'STM32F4',    sub: '0x40020000', type: 'mcu',      r: 20 },
  { id: 'esp',  lx: 692, ly: 148, label: 'ESP32-C3',   sub: 'SPI / UART', type: 'iot',      r: 18 },
  { id: 'fpga', lx: 778, ly: 238, label: 'FPGA',       sub: 'CLK 200MHz', type: 'fpga',     r: 18 },
];

const EDGES: [string, string][] = [
  ['fw',  'rtr'],
  ['rtr', 'sw1'],
  ['rtr', 'sw2'],
  ['sw1', 'srv'],
  ['sw2', 'mcu'],
  ['srv', 'esp'],
  ['mcu', 'esp'],
  ['mcu', 'fpga'],
];

// Pre-built lookup tables (module-level, computed once)
const NODE_MAP = new Map(NODES.map(n => [n.id, n]));
const ADJ = new Map<string, number[]>();
NODES.forEach(n => ADJ.set(n.id, []));
EDGES.forEach(([a, b], i) => {
  ADJ.get(a)!.push(i);
  ADJ.get(b)!.push(i);
});

// ─── Component ───────────────────────────────────────────────────
export function NetworkViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ lx: -9999, ly: -9999 });
  const pktsRef   = useRef<Packet[]>([]);
  const pingsRef  = useRef<Ping[]>([]);
  const prevT     = useRef(0);
  const rafId     = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Init packets (2 per edge in opposite directions) ──
    pktsRef.current = EDGES.flatMap((_, i) => [
      { ei: i, t: Math.random(), spd: 0.00022 + Math.random() * 0.00018, dir:  1 },
      { ei: i, t: Math.random(), spd: 0.00018 + Math.random() * 0.00022, dir: -1 },
    ]);

    // ── Helpers ──────────────────────────────────────────
    const metrics = () => {
      const r  = canvas.getBoundingClientRect();
      const sc = Math.min(r.width / LW, r.height / LH);
      const ox = (r.width  - LW * sc) / 2;
      const oy = (r.height - LH * sc) / 2;
      return { w: r.width, h: r.height, sc, ox, oy };
    };

    const toC = (lx: number, ly: number, m: ReturnType<typeof metrics>) => ({
      x: lx * m.sc + m.ox,
      y: ly * m.sc + m.oy,
    });

    const toLogi = (cx: number, cy: number, m: ReturnType<typeof metrics>) => ({
      lx: (cx - m.ox) / m.sc,
      ly: (cy - m.oy) / m.sc,
    });

    // ── Event listeners ───────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const m = metrics();
      const l = toLogi(e.clientX - rect.left, e.clientY - rect.top, m);
      mouseRef.current = l;
    };
    const onLeave = () => { mouseRef.current = { lx: -9999, ly: -9999 }; };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const m = metrics();
      const { lx, ly } = toLogi(e.clientX - rect.left, e.clientY - rect.top, m);
      let hit: NDef | null = null;
      let minD = 65;
      for (const n of NODES) {
        const d = Math.hypot(n.lx - lx, n.ly - ly);
        if (d < minD) { minD = d; hit = n; }
      }
      if (hit) {
        pingsRef.current.push({ lx: hit.lx, ly: hit.ly, born: performance.now() });
        // spawn burst packets on adjacent edges
        ADJ.get(hit.id)!.forEach(ei => {
          const [aId] = EDGES[ei];
          pktsRef.current.push({
            ei,
            t: aId === hit!.id ? 0 : 1,
            spd: 0.0018,
            dir: aId === hit!.id ? 1 : -1,
          });
        });
      }
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('click', onClick);

    // ── Icon drawing ──────────────────────────────────────
    const icon = (type: NodeType, x: number, y: number, r: number, hl: boolean) => {
      const col = hl ? ACCENT : '#2e2e2e';
      ctx.strokeStyle = col;
      ctx.fillStyle   = col;
      ctx.lineWidth   = hl ? 1.5 : 1;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      switch (type) {
        case 'firewall': {
          ctx.beginPath();
          ctx.moveTo(x, y - r * 0.52);
          ctx.lineTo(x + r * 0.42, y - r * 0.22);
          ctx.lineTo(x + r * 0.42, y + r * 0.12);
          ctx.bezierCurveTo(x + r * 0.42, y + r * 0.52, x, y + r * 0.58, x, y + r * 0.58);
          ctx.bezierCurveTo(x, y + r * 0.58, x - r * 0.42, y + r * 0.52, x - r * 0.42, y + r * 0.12);
          ctx.lineTo(x - r * 0.42, y - r * 0.22);
          ctx.closePath();
          ctx.stroke();
          break;
        }
        case 'router': {
          // hexagon outline
          ctx.beginPath();
          for (let a = 0; a < 6; a++) {
            const ang = (a / 6) * Math.PI * 2 - Math.PI / 2;
            const nx = x + Math.cos(ang) * r * 0.5;
            const ny = y + Math.sin(ang) * r * 0.5;
            a === 0 ? ctx.moveTo(nx, ny) : ctx.lineTo(nx, ny);
          }
          ctx.closePath();
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        case 'switch': {
          // horizontal bus + vertical ports
          ctx.beginPath();
          ctx.moveTo(x - r * 0.45, y);
          ctx.lineTo(x + r * 0.45, y);
          ctx.stroke();
          for (let p = 0; p < 4; p++) {
            const px = x - r * 0.45 + p * r * 0.3;
            ctx.beginPath();
            ctx.moveTo(px, y);
            ctx.lineTo(px, y - r * 0.32);
            ctx.stroke();
          }
          break;
        }
        case 'server': {
          // stacked rack bars
          for (let s = -1; s <= 1; s++) {
            ctx.beginPath();
            ctx.rect(x - r * 0.44, y + s * r * 0.3 - r * 0.09, r * 0.88, r * 0.18);
            ctx.stroke();
          }
          break;
        }
        case 'mcu': {
          const hw = r * 0.42, hh = r * 0.32;
          ctx.beginPath();
          ctx.rect(x - hw, y - hh, hw * 2, hh * 2);
          ctx.stroke();
          for (let p = 0; p < 3; p++) {
            const px = x - hw + (p + 0.5) * (hw * 2 / 3);
            ctx.beginPath();
            ctx.moveTo(px, y - hh);
            ctx.lineTo(px, y - hh - r * 0.28);
            ctx.moveTo(px, y + hh);
            ctx.lineTo(px, y + hh + r * 0.28);
            ctx.stroke();
          }
          break;
        }
        case 'iot': {
          // wifi arcs
          for (let a = 1; a <= 2; a++) {
            ctx.beginPath();
            ctx.arc(x, y + r * 0.18, a * r * 0.3, Math.PI * 1.18, Math.PI * 1.82);
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.arc(x, y + r * 0.18, 2.5, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        case 'fpga': {
          // 3×3 dot grid
          for (let gx = -1; gx <= 1; gx++) {
            for (let gy = -1; gy <= 1; gy++) {
              ctx.beginPath();
              ctx.arc(x + gx * r * 0.28, y + gy * r * 0.28, 1.8, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          break;
        }
      }
    };

    // ── Draw loop ─────────────────────────────────────────
    const draw = (time: number) => {
      const dt = Math.min(time - prevT.current, 50);
      prevT.current = time;

      const m   = metrics();
      const dpr = window.devicePixelRatio || 1;

      // Resize backing store if needed
      const needW = Math.round(m.w * dpr);
      const needH = Math.round(m.h * dpr);
      if (canvas.width !== needW || canvas.height !== needH) {
        canvas.width  = needW;
        canvas.height = needH;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, m.w, m.h);

      const mouse = mouseRef.current;

      // Closest hovered node
      let hovId: string | null = null;
      let minD = 80;
      for (const n of NODES) {
        const d = Math.hypot(n.lx - mouse.lx, n.ly - mouse.ly);
        if (d < minD) { minD = d; hovId = n.id; }
      }
      const hotEdges = new Set<number>(hovId ? ADJ.get(hovId) : []);

      // Update packet positions
      for (const p of pktsRef.current) {
        p.t += p.spd * dt * p.dir;
        if (p.t > 1) p.t -= 1;
        if (p.t < 0) p.t += 1;
      }
      // Cap total packets (burst packets can accumulate)
      if (pktsRef.current.length > 48) {
        pktsRef.current = [
          ...pktsRef.current.slice(0, 16),           // keep base packets
          ...pktsRef.current.slice(-8),              // keep most recent burst
        ];
      }

      // ── Draw edges ────────────────────────────────────
      for (let i = 0; i < EDGES.length; i++) {
        const [aId, bId] = EDGES[i];
        const a = NODE_MAP.get(aId)!;
        const b = NODE_MAP.get(bId)!;
        const pa = toC(a.lx, a.ly, m);
        const pb = toC(b.lx, b.ly, m);
        const hot = hotEdges.has(i);

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = hot ? 'rgba(45,212,191,0.28)' : '#151515';
        ctx.lineWidth   = hot ? 1.5 : 1;
        ctx.stroke();
      }

      // ── Draw packets ──────────────────────────────────
      for (const p of pktsRef.current) {
        const [aId, bId] = EDGES[p.ei];
        const a    = NODE_MAP.get(aId)!;
        const b    = NODE_MAP.get(bId)!;
        const frac = p.dir === 1 ? p.t : 1 - p.t;
        const lx   = a.lx + (b.lx - a.lx) * frac;
        const ly   = a.ly + (b.ly - a.ly) * frac;
        const pos  = toC(lx, ly, m);
        const hot  = hotEdges.has(p.ei);
        const isBurst = p.spd > 0.001;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, hot || isBurst ? 3.5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = hot || isBurst ? ACCENT : 'rgba(45,212,191,0.25)';
        ctx.fill();

        if (hot || isBurst) {
          const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 12);
          g.addColorStop(0, 'rgba(45,212,191,0.3)');
          g.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
      }

      // ── Draw ping rings ───────────────────────────────
      pingsRef.current = pingsRef.current.filter(p => time - p.born < 1400);
      for (const ping of pingsRef.current) {
        const age  = (time - ping.born) / 1400;
        const pos  = toC(ping.lx, ping.ly, m);
        const maxR = 70 * m.sc;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, age * maxR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(45,212,191,${(1 - age) * 0.65})`;
        ctx.lineWidth   = 1.5;
        ctx.stroke();

        // second ring, slightly delayed
        if (age > 0.15) {
          const age2 = age - 0.15;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, age2 * maxR * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(45,212,191,${(1 - age2) * 0.3})`;
          ctx.lineWidth   = 1;
          ctx.stroke();
        }
      }

      // ── Draw nodes ────────────────────────────────────
      for (const node of NODES) {
        const pos  = toC(node.lx, node.ly, m);
        const r    = node.r * m.sc;
        const hl   = node.id === hovId;
        const pulse = hl ? 1 + Math.sin(time * 0.004) * 0.07 : 1;
        const dr   = r * pulse;

        // Glow halo
        if (hl) {
          const g = ctx.createRadialGradient(pos.x, pos.y, dr * 0.5, pos.x, pos.y, dr * 3.2);
          g.addColorStop(0, 'rgba(45,212,191,0.14)');
          g.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, dr * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        // Node body
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, dr, 0, Math.PI * 2);
        ctx.fillStyle   = '#080808';
        ctx.fill();
        ctx.strokeStyle = hl ? ACCENT : '#1e1e1e';
        ctx.lineWidth   = hl ? 1.5 : 1;
        ctx.stroke();

        // Icon inside
        icon(node.type, pos.x, pos.y, r, hl);

        // Labels below node
        const lsz = Math.max(8.5, m.sc * 10);
        const ssz = Math.max(7.5, m.sc * 8.5);
        const labelY = pos.y + dr + lsz + 4;
        const subY   = labelY + ssz + 3;

        ctx.textAlign   = 'center';
        ctx.textBaseline = 'alphabetic';

        ctx.font      = `500 ${lsz}px "JetBrains Mono", monospace`;
        ctx.fillStyle = hl ? '#cccccc' : '#2e2e2e';
        ctx.fillText(node.label, pos.x, labelY);

        ctx.font      = `400 ${ssz}px "JetBrains Mono", monospace`;
        ctx.fillStyle = hl ? ACCENT : '#1e1e1e';
        ctx.fillText(node.sub, pos.x, subY);
      }

      rafId.current = requestAnimationFrame(draw);
    };

    rafId.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId.current);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', cursor: 'crosshair' }}
      />
      {/* Corner hint label */}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.58rem',
          color: '#1e1e1e',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        hover / click nodes
      </span>
    </div>
  );
}
