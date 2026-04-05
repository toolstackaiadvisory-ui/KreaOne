'use client'
import React from 'react'

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────
const C = {
  card:      '#FFFFFF',
  bg:        '#F9FAFB',
  border:    '#E5E7EB',
  borderMd:  '#D1D5DB',
  orange:    '#FF6A00',
  orangeDim: 'rgba(255,106,0,0.08)',
  orangeGlow:'rgba(255,106,0,0.15)',
  t1:  '#111827',
  t2:  '#6B7280',
  t3:  '#9CA3AF',
  shadowMd:  '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
  shadowLg:  '0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)',
}

const AVATAR_COLORS = ['#FF6A00','#2563EB','#7C3AED','#0D9488','#16A34A','#D97706','#DB2777','#0891B2']

// ─── STATUS BADGE ─────────────────────────────────────────────────────────
const BADGE_MAP: Record<string, { bg: string; color: string; border: string }> = {
  live:       { bg: '#DCFCE7', color: '#15803D', border: '#BBF7D0' },
  qc:         { bg: '#DBEAFE', color: '#1D4ED8', border: '#BFDBFE' },
  completed:  { bg: '#EDE9FE', color: '#6D28D9', border: '#DDD6FE' },
  paused:     { bg: '#F3F4F6', color: '#6B7280', border: '#E5E7EB' },
  active:     { bg: '#DCFCE7', color: '#15803D', border: '#BBF7D0' },
  review:     { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' },
  suspended:  { bg: '#FEE2E2', color: '#B91C1C', border: '#FECACA' },
  inactive:   { bg: '#F3F4F6', color: '#6B7280', border: '#E5E7EB' },
  online:     { bg: '#DCFCE7', color: '#15803D', border: '#BBF7D0' },
  break:      { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' },
  offline:    { bg: '#F3F4F6', color: '#9CA3AF', border: '#E5E7EB' },
  ontrack:    { bg: '#DCFCE7', color: '#15803D', border: '#BBF7D0' },
  atrisk:     { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' },
  delayed:    { bg: '#FEE2E2', color: '#B91C1C', border: '#FECACA' },
  gold:       { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' },
  silver:     { bg: '#F3F4F6', color: '#6B7280', border: '#E5E7EB' },
  bronze:     { bg: '#FEF0E6', color: '#92400E', border: '#FEDDC7' },
}

const STATUS_LABELS: Record<string, string> = {
  live: 'Live', qc: 'QC', completed: 'Done', paused: 'Paused',
  active: 'Active', review: 'Review', suspended: 'Suspended', inactive: 'Inactive',
  online: 'Online', break: 'Break', offline: 'Offline',
  ontrack: 'On Track', atrisk: 'At Risk', delayed: 'Delayed',
  gold: 'Gold', silver: 'Silver', bronze: 'Bronze',
}

export function Badge({ status, label, dot = true }: { status: string; label?: string; dot?: boolean }) {
  const s = BADGE_MAP[status] || { bg: '#F3F4F6', color: '#6B7280', border: '#E5E7EB' }
  const text = label || STATUS_LABELS[status] || status
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: s.bg, color: s.color, border: `1px solid ${s.border}`, whiteSpace: 'nowrap', letterSpacing: '0.1px' }}>
      {dot && <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />}
      {text}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) { return <Badge status={status} /> }
export function RiskBadge({ risk }: { risk: string }) {
  const icons: Record<string, string> = { ontrack: '↑', atrisk: '!', delayed: '↓' }
  const s = BADGE_MAP[risk] || { bg: '#F3F4F6', color: '#6B7280', border: '#E5E7EB' }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      <span style={{ fontSize: '10px', fontWeight: 700 }}>{icons[risk]}</span>
      {STATUS_LABELS[risk] || risk}
    </span>
  )
}

export function MethodBadge({ method }: { method: string }) {
  const m: Record<string, { bg: string; color: string; border: string }> = {
    Online: { bg: '#DBEAFE', color: '#1D4ED8', border: '#BFDBFE' },
    CATI:   { bg: '#EDE9FE', color: '#6D28D9', border: '#DDD6FE' },
    Hybrid: { bg: '#CCFBF1', color: '#0F766E', border: '#99F6E4' },
  }
  const s = m[method] || { bg: '#F3F4F6', color: '#6B7280', border: '#E5E7EB' }
  return <Badge status={method} label={method} dot={false} />
}

export function SupplyBadge({ supplyType }: { supplyType: string }) {
  const m: Record<string, { bg: string; color: string; border: string }> = {
    'Panel Supply':  { bg: '#FEF0E6', color: '#C2410C', border: '#FDBA74' },
    'Vendor Supply': { bg: '#F0FDF4', color: '#15803D', border: '#86EFAC' },
    'Both':          { bg: '#F5F3FF', color: '#6D28D9', border: '#C4B5FD' },
  }
  const s = m[supplyType] || { bg: '#F3F4F6', color: '#6B7280', border: '#E5E7EB' }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: s.bg, color: s.color, border: `1px solid ${s.border}`, whiteSpace: 'nowrap' }}>
      {supplyType}
    </span>
  )
}

export function TierBadge({ tier }: { tier: string }) {
  const icons: Record<string, string> = { gold: 'Gold', silver: 'Silver', bronze: 'Bronze' }
  return <Badge status={tier} label={icons[tier] || tier} />
}

export function PanelistTypeBadge({ type }: { type: string }) {
  const m: Record<string, { bg: string; color: string; border: string }> = {
    'HCPs':                  { bg: '#DBEAFE', color: '#1D4ED8', border: '#BFDBFE' },
    'Patients':              { bg: '#DCFCE7', color: '#15803D', border: '#BBF7D0' },
    'Healthcare Consumers':  { bg: '#EDE9FE', color: '#6D28D9', border: '#DDD6FE' },
    'Industry Experts':      { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' },
  }
  const s = m[type] || { bg: '#F3F4F6', color: '#6B7280', border: '#E5E7EB' }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: s.bg, color: s.color, border: `1px solid ${s.border}`, whiteSpace: 'nowrap' }}>
      {type}
    </span>
  )
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────
export function ProgressBar({ value, max }: { value: number; max: number }) {
  const p = Math.round((value / max) * 100)
  const c = p >= 75 ? '#16A34A' : p >= 40 ? '#D97706' : '#DC2626'
  const bg = p >= 75 ? '#DCFCE7' : p >= 40 ? '#FEF3C7' : '#FEE2E2'
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{ fontSize: '12px', color: C.t2, fontWeight: 500 }}>{value.toLocaleString()} / {max.toLocaleString()}</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color: c }}>{p}%</span>
      </div>
      <div style={{ background: '#F3F4F6', borderRadius: '6px', height: '7px', overflow: 'hidden' }}>
        <div style={{ width: `${p}%`, height: '100%', borderRadius: '6px', background: c, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>
    </div>
  )
}

// ─── SCORE BAR ────────────────────────────────────────────────────────────
export function ScoreBar({ score }: { score: number }) {
  const c = score >= 80 ? '#16A34A' : score >= 65 ? '#D97706' : '#DC2626'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '13px', fontWeight: 700, color: c, minWidth: '26px' }}>{score}</span>
      <div style={{ flex: 1, background: '#F3F4F6', borderRadius: '6px', height: '5px', overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', borderRadius: '6px', background: c }} />
      </div>
    </div>
  )
}

// ─── CARD ─────────────────────────────────────────────────────────────────
export function Card({ children, style, noPad }: { children: React.ReactNode; style?: React.CSSProperties; noPad?: boolean }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '16px', padding: noPad ? 0 : '24px', boxShadow: C.shadowMd, overflow: noPad ? 'hidden' : undefined, transition: 'box-shadow 0.2s ease, border-color 0.2s ease', ...style }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = C.shadowLg; el.style.borderColor = C.borderMd }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = C.shadowMd; el.style.borderColor = C.border }}
    >
      {children}
    </div>
  )
}

// ─── KPI CARD ─────────────────────────────────────────────────────────────
export function KpiCard({ label, value, sub, trend, trendDir, accent = '#FF6A00', delay = 0 }: {
  label: string; value: string; sub?: string; trend?: string; trendDir?: 'up' | 'down' | 'neu'; accent?: string; delay?: number
}) {
  const trendMap = {
    up:  { bg: '#DCFCE7', color: '#15803D', icon: '+' },
    down:{ bg: '#FEE2E2', color: '#B91C1C', icon: '-' },
    neu: { bg: '#FEF3C7', color: '#B45309', icon: '' },
  }
  const tc = trendDir ? trendMap[trendDir] : null
  return (
    <div className="animate-fadeUp" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '24px 24px 20px', boxShadow: C.shadowMd, position: 'relative', overflow: 'hidden', transition: 'all 0.2s ease', animationDelay: `${delay}ms`, cursor: 'default', borderTop: `3px solid ${accent}` }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = C.shadowLg; el.style.transform = 'translateY(-1px)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = C.shadowMd; el.style.transform = 'translateY(0)' }}
    >
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '80px', height: '80px', borderRadius: '50%', background: accent, opacity: 0.06, pointerEvents: 'none' }} />
      <div style={{ fontSize: '11px', fontWeight: 600, color: C.t2, textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '12px' }}>{label}</div>
      <div className="animate-countUp" style={{ fontSize: '30px', fontWeight: 700, color: C.t1, letterSpacing: '-0.5px', lineHeight: 1, animationDelay: `${delay + 100}ms` }}>{value}</div>
      {sub && <div style={{ fontSize: '12px', color: C.t3, marginTop: '8px' }}>{sub}</div>}
      {trend && tc && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '20px', marginTop: '10px', background: tc.bg, color: tc.color }}>
          {tc.icon} {trend}
        </div>
      )}
    </div>
  )
}

// ─── INSIGHT BOX ──────────────────────────────────────────────────────────
export function InsightBox({ text, type = 'info' }: { text: string; type?: 'info' | 'warn' | 'danger' | 'success' }) {
  const styles = {
    info:    { bg: '#FFF7F0', border: '#FDBA74', color: '#C2410C',  icon: 'Note' },
    warn:    { bg: '#FFFBEB', border: '#FDE68A', color: '#B45309',  icon: 'Warning' },
    danger:  { bg: '#FEF2F2', border: '#FECACA', color: '#B91C1C',  icon: 'Alert' },
    success: { bg: '#F0FDF4', border: '#BBF7D0', color: '#15803D',  icon: 'Done' },
  }
  const s = styles[type]
  return (
    <div style={{ borderRadius: '12px', padding: '13px 16px', display: 'flex', alignItems: 'flex-start', gap: '11px', marginTop: '14px', background: s.bg, border: `1px solid ${s.border}` }}>
      <span style={{ fontSize: '11px', fontWeight: 700, color: s.color, background: s.border, padding: '2px 6px', borderRadius: '6px', flexShrink: 0, marginTop: '1px', letterSpacing: '0.2px' }}>{s.icon}</span>
      <span style={{ fontSize: '13px', lineHeight: 1.55, fontWeight: 500, color: s.color }}>{text}</span>
    </div>
  )
}

// ─── CALLOUT ──────────────────────────────────────────────────────────────
export function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#FFF7F0', border: '1px solid #FDBA74', borderLeft: '4px solid #FF6A00', borderRadius: '0 14px 14px 0', padding: '14px 20px', marginBottom: '24px' }}>
      <div style={{ fontSize: '10px', fontWeight: 700, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>{children}</div>
    </div>
  )
}

// ─── PAGE HEADER ──────────────────────────────────────────────────────────
export function PageHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: C.t1, letterSpacing: '-0.3px' }}>{title}</h1>
        {sub && <p style={{ fontSize: '13px', color: C.t2, marginTop: '4px' }}>{sub}</p>}
      </div>
      {action}
    </div>
  )
}

// ─── BUTTON ───────────────────────────────────────────────────────────────
export function Button({ children, onClick, variant = 'primary', size = 'md' }: {
  children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'ghost'; size?: 'sm' | 'md'
}) {
  const variants = {
    primary:   { background: '#FF6A00', color: '#fff', border: 'none', boxShadow: '0 1px 3px rgba(255,106,0,0.3)' } as React.CSSProperties,
    secondary: { background: '#fff', color: C.t2, border: `1px solid ${C.border}`, boxShadow: C.shadowMd } as React.CSSProperties,
    ghost:     { background: '#FFF0E6', color: '#FF6A00', border: '1px solid #FDBA74' } as React.CSSProperties,
  }
  const sizes: Record<string, React.CSSProperties> = { sm: { padding: '6px 12px', fontSize: '12px' }, md: { padding: '9px 18px', fontSize: '13px' } }
  return (
    <button onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', borderRadius: '10px', fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s ease', ...variants[variant], ...sizes[size] }}>
      {children}
    </button>
  )
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────
export function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: C.t1 }}>{title}</span>
      {action}
    </div>
  )
}

// ─── AVATAR ───────────────────────────────────────────────────────────────
export function Avatar({ initials, index = 0, size = 36 }: { initials: string; index?: number; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: AVATAR_COLORS[index % 8], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: Math.round(size * 0.32), fontWeight: 600, color: '#fff', flexShrink: 0 }}>
      {initials}
    </div>
  )
}

// ─── TABLE HELPERS ─────────────────────────────────────────────────────────
export const Th = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <th style={{ padding: '11px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: C.t2, textTransform: 'uppercase', letterSpacing: '0.7px', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap', background: '#FAFAFA', ...style }}>
    {children}
  </th>
)

export const Td = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <td style={{ padding: '14px 16px', borderBottom: `1px solid ${C.border}`, verticalAlign: 'middle', color: C.t1, fontSize: '13px', ...style }}>
    {children}
  </td>
)

// ─── SELECT ───────────────────────────────────────────────────────────────
export const selectStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #E5E7EB',
  borderRadius: '10px',
  padding: '8px 14px',
  color: '#374151',
  fontSize: '13px',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  cursor: 'pointer',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
}
