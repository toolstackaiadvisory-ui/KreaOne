'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { vendors } from '@/lib/data'
import { ScoreBar, StatusBadge, PageHeader, TierBadge, InsightBox, Card, KpiCard, SectionHeader } from '@/components/ui'

const C  = { border: '#E5E7EB', t1: '#111827', t2: '#6B7280', t3: '#9CA3AF' }
const G  = '#F3F4F6'
const TK = '#9CA3AF'
const CT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <div style={{ color: '#9CA3AF', marginBottom: '4px' }}>{label}</div>
      {payload.map((p: any) => <div key={p.name} style={{ color: '#111827', fontWeight: 600 }}>{p.name}: {p.value}</div>)}
    </div>
  )
}

export default function Vendors() {
  const perfData = vendors.map(v => ({ name: v.name.split(' ')[0], score: v.score, fraud: v.fraudRate }))

  return (
    <div>
      <PageHeader
        title="Vendor Management"
        sub={`${vendors.length} vendors · ${vendors.filter(v => v.status === 'active').length} active · ${vendors.filter(v => v.tier === 'gold').length} Gold tier`}
        action={<button style={{ background: '#FF6A00', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', boxShadow: '0 1px 3px rgba(255,106,0,0.3)' }}>+ Add Vendor</button>}
      />

      <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '14px', marginBottom: '24px' }}>
        {[
          { tier: 'Gold',   count: vendors.filter(v => v.tier === 'gold').length,   color: '#D97706', border: '#FDE68A', bg: '#FFFBEB', desc: 'Score 85+ · Fraud < 1.5%' },
          { tier: 'Silver', count: vendors.filter(v => v.tier === 'silver').length, color: '#6B7280', border: '#E5E7EB', bg: '#F9FAFB', desc: 'Score 65–84 · Acceptable' },
          { tier: 'Bronze', count: vendors.filter(v => v.tier === 'bronze').length, color: '#92400E', border: '#FDE68A', bg: '#FEF0E6', desc: 'Score < 65 · Under review' },
        ].map((t, i) => (
          <div key={t.tier} className="animate-fadeUp" style={{ animationDelay: `${i * 55}ms`, background: '#fff', border: `1px solid ${C.border}`, borderRadius: '16px', padding: '20px', borderTop: `3px solid ${t.color}`, boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: t.color, letterSpacing: '-0.5px', marginBottom: '4px' }}>{t.count}</div>
            <div style={{ fontWeight: 600, color: C.t1, marginBottom: '4px' }}>{t.tier} Tier</div>
            <div style={{ fontSize: '12px', color: C.t3 }}>{t.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#FFF7F0', border: '1px solid #FDBA74', borderLeft: '4px solid #FF6A00', borderRadius: '0 14px 14px 0', padding: '14px 20px', marginBottom: '22px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Vendor Intelligence</div>
        <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>
          <strong>HealthPanel.io</strong> fraud rate at 4.8% — exceeds 3% threshold. Recommend suspension.{' '}
          <strong>M3 Panel India</strong> leads with score 92 and 0.8% fraud across {vendors[0].completes.toLocaleString()} completes.
        </div>
      </div>

      <Card noPad style={{ marginBottom: '20px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '13px' }}>
            <thead>
              <tr>{['Vendor', 'Country', 'Tier', 'Specialty', 'Completes', 'CPI', 'Avg IR', 'Fraud Rate', 'Score', 'Status', ''].map(h => (
                <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: C.t3, textTransform: 'uppercase', letterSpacing: '0.6px', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap', background: '#FAFAFA' }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {vendors.map((v, i) => (
                <tr key={v.id} className="animate-fadeUp" style={{ animationDelay: `${i * 28}ms` }}
                  onMouseEnter={e => Array.from(e.currentTarget.cells).forEach(c => ((c as HTMLElement).style.background = '#FAFAFA'))}
                  onMouseLeave={e => Array.from(e.currentTarget.cells).forEach(c => ((c as HTMLElement).style.background = 'transparent'))}
                >
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB' }}><div style={{ fontWeight: 500, color: C.t1 }}>{v.name}</div></td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', color: C.t2, fontSize: '12px' }}>{v.country}</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB' }}><TierBadge tier={v.tier} /></td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', color: C.t2, fontSize: '12px' }}>{v.specialty}</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', fontWeight: 600, color: C.t1 }}>{v.completes.toLocaleString()}</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', color: C.t2 }}>${v.cpi}</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', fontWeight: 700, color: v.avgIR > 30 ? '#16A34A' : C.t1 }}>{v.avgIR}%</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', fontWeight: 700, color: v.fraudRate < 1.5 ? '#16A34A' : v.fraudRate < 3 ? '#D97706' : '#DC2626' }}>{v.fraudRate}%</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', minWidth: '130px' }}><ScoreBar score={v.score} /></td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB' }}><StatusBadge status={v.status} /></td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB' }}>
                    <button style={{ background: '#FFF0E6', color: '#FF6A00', border: '1px solid #FDBA74', padding: '5px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>Assign</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card>
          <SectionHeader title="Performance Score" />
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={perfData}>
              <CartesianGrid strokeDasharray="3 3" stroke={G} />
              <XAxis dataKey="name" tick={{ fill: TK, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: TK, fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CT />} />
              <Bar dataKey="score" name="Score" radius={[5,5,0,0]} fillOpacity={0.85}>
                {perfData.map((d, i) => <rect key={i} fill={d.score >= 80 ? '#16A34A' : d.score >= 65 ? '#D97706' : '#DC2626'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionHeader title="Fraud Rate Monitoring" />
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={perfData}>
              <CartesianGrid strokeDasharray="3 3" stroke={G} />
              <XAxis dataKey="name" tick={{ fill: TK, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: TK, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip content={<CT />} />
              <Bar dataKey="fraud" name="Fraud %" radius={[5,5,0,0]} fillOpacity={0.85}>
                {perfData.map((d, i) => <rect key={i} fill={d.fraud < 1.5 ? '#16A34A' : d.fraud < 3 ? '#D97706' : '#DC2626'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <InsightBox text="HealthPanel.io fraud at 4.8% — above 3% threshold. Suspend from active projects immediately." type="danger" />
        </Card>
      </div>
    </div>
  )
}
