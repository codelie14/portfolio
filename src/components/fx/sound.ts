// Sons d'interface synthétisés (Web Audio), désactivés par défaut.
let ctx: AudioContext | null = null;
let enabled = false;
const listeners = new Set<(v: boolean) => void>();

try {
  enabled = localStorage.getItem('sfx') === '1';
} catch {
  /* ignore */
}

export const isSoundOn = () => enabled;

export function setSound(v: boolean) {
  enabled = v;
  try {
    localStorage.setItem('sfx', v ? '1' : '0');
  } catch {
    /* ignore */
  }
  if (v) sfx('ok');
  listeners.forEach((l) => l(v));
}

export function onSoundChange(l: (v: boolean) => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

type Kind = 'tick' | 'click' | 'send' | 'ok' | 'error' | 'key';

export function sfx(kind: Kind) {
  if (!enabled) return;
  try {
    ctx = ctx ?? new AudioContext();
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g).connect(ctx.destination);
    const p = {
      tick: { f: 2200, f2: 1800, d: 0.025, v: 0.025, type: 'square' },
      key: { f: 1400, f2: 900, d: 0.03, v: 0.03, type: 'square' },
      click: { f: 880, f2: 440, d: 0.07, v: 0.06, type: 'triangle' },
      send: { f: 520, f2: 1040, d: 0.12, v: 0.06, type: 'sine' },
      ok: { f: 660, f2: 1320, d: 0.16, v: 0.06, type: 'sine' },
      error: { f: 220, f2: 110, d: 0.2, v: 0.07, type: 'sawtooth' },
    }[kind];
    o.type = p.type as OscillatorType;
    o.frequency.setValueAtTime(p.f, t);
    o.frequency.exponentialRampToValueAtTime(p.f2, t + p.d);
    g.gain.setValueAtTime(p.v, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + p.d);
    o.start(t);
    o.stop(t + p.d + 0.02);
  } catch {
    /* audio indisponible */
  }
}

/** Branche les sons sur les clics et survols de tout le site. */
export function installGlobalSfx() {
  let last: Element | null = null;
  const over = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const t = (e.target as HTMLElement)?.closest?.('a,button');
    if (t && t !== last) sfx('tick');
    last = t;
  };
  const click = (e: MouseEvent) => {
    if ((e.target as HTMLElement)?.closest?.('a,button')) sfx('click');
  };
  window.addEventListener('pointerover', over);
  window.addEventListener('click', click, true);
  return () => {
    window.removeEventListener('pointerover', over);
    window.removeEventListener('click', click, true);
  };
}
