'use client'
import { useState } from 'react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { projects, vendors, panelists, interviewers } from '@/lib/data'
import { StatusBadge, RiskBadge, ProgressBar, ScoreBar, MethodBadge, SupplyBadge, InsightBox, Card, Avatar, SectionHeader, KpiCard, PanelistTypeBadge } from '@/components/ui'

const C = { border: '#E5E7EB', t1: '#111827', t2: '#6B7280', t3: '#9CA3AF', bg: '#F9FAFB' }
const G = '#F3F4F6'
const TK = '#9CA3AF'
const TIP = { backgroundColor: '#fff', borderColor: '#E5E7EB', borderWidth: 1, titleColor: '#9CA3AF', bodyColor: '#111827', bodyFont: { weight: '600' as any, size: 13 }, padding: 12, cornerRadius: 10, displayColors: false }

const CT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <div style={{ color: '#9CA3AF', marginBottom: '4px' }}>{label}</div>
      {payload.map((p: any) => <div key={p.name} style={{ color: '#111827', fontWeight: 600 }}>{p.name}: {p.value}</div>)}
    </div>
  )
}

const TABS = ['overview', 'vendors', 'panel', 'cati'] as const

export default function ProjectDetail({ projectId, onBack }: { projectId: number; onBack: () => void }) {
  const [tab, setTab] = useState<typeof TABS[number]>('overview')
  const p = projects.find(x => x.id === projectId) || projects[0]
  const pct = Math.round((p.complete / p.n) * 100)
  const margin = p.revenue - p.vendorCost
  const insType = p.risk === 'delayed' ? 'danger' : p.risk === 'atrisk' ? 'warn' : 'success'

  const irData = p.irTrend.map((v, i) => ({ day: `D${i + 1}`, ir: v }))
  const dailyData = p.dailyCompletes.filter(v => v > 0).map((v, i) => ({ day: `Apr ${i + 1}`, completes: v }))
  const quotas = [
    { s: 'HCPs – Specialist', f: 85 }, { s: 'HCPs – GP/GP', f: 62 },
    { s: 'Patients – Urban', f: 91 }, { s: 'Patients – Rural', f: 78 },
    { s: 'Healthcare Consumers', f: 44 },
  ]
  const splitData = [{ name: 'M3 Panel India', value: 55, color: '#FF6A00' }, { name: 'Sermo Network', value: 28, color: '#2563EB' }, { name: 'PanelXchange', value: 17, color: '#7C3AED' }]

  return (
    <div>
      <button onClick={onBack} style={{ background: '#fff', border: `1px solid ${C.border}`, color: C.t2, padding: '7px 15px', borderRadius: '9px', fontSize: '12px', cursor: 'pointer', marginBottom: '18px', fontFamily: 'Inter, sans-serif', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        Back to Projects
      </button>

      {/* Project header card */}
      <Card style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <MethodBadge method={p.method} />
              <SupplyBadge supplyType={p.supplyType} />
              <span style={{ fontSize: '11px', color: C.t3, fontFamily: 'monospace' }}>KO-2025-00{p.id}</span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: C.t1, letterSpacing: '-0.3px', marginBottom: '5px' }}>{p.name}</h2>
            <p style={{ fontSize: '13px', color: C.t2 }}>{p.client} · {p.geo}</p>
          </div>
          <div style={{ display: 'flex', gap: '7px', flexShrink: 0 }}>
            <StatusBadge status={p.status} />
            <RiskBadge risk={p.risk} />
          </div>
        </div>

        <InsightBox
          text={
            p.risk === 'delayed'
              ? "Project is delayed due to vendor underperformance in Tier 2 cities. Immediate vendor diversification recommended."
              : p.risk === 'atrisk'
                ? "Panel supply lagging in key segments. Recommend activating hybrid supply (panel + vendor) to maintain timelines."
                : "Study is on track. Panel supply performing efficiently with strong IR and completion rates."
          }
          type={insType}
        />

        {/* Key fields grid */}
        <Card style={{ marginTop: '16px' }}>
          <SectionHeader title="Supply Strategy" />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>Supply Type</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{p.supplyType}</div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>Panel Contribution</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>65%</div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>Vendor Contribution</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>35%</div>
            </div>
          </div>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '18px', padding: '16px', background: C.bg, borderRadius: '12px' }}>
          {[
            { label: 'Account Owner', value: p.accountOwner },
            { label: 'Project Manager', value: p.pm },
            { label: 'Start Date', value: p.startDate },
            { label: 'End Date', value: p.endDate },
          ].map(k => (
            <div key={k.label}>
              <div style={{ fontSize: '10px', fontWeight: 600, color: C.t3, textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '3px' }}>{k.label}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: C.t1 }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* KPI strip */}
        <Card style={{ marginTop: '16px' }}>
          <SectionHeader title="Study Progress" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Target Sample</div>
              <div style={{ fontSize: '16px', fontWeight: 700 }}>{p.n}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Completed</div>
              <div style={{ fontSize: '16px', fontWeight: 700 }}>{p.complete}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Remaining</div>
              <div style={{ fontSize: '16px', fontWeight: 700 }}>{p.n - p.complete}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Completion %</div>
              <div style={{ fontSize: '16px', fontWeight: 700 }}>{pct}%</div>
            </div>
          </div>

          <ProgressBar value={pct} max={100} />
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0,1fr))', borderTop: `1px solid ${C.border}`, paddingTop: '18px', marginTop: '18px' }}>
          {[['N=' + p.n, 'Sample'], [p.complete + '/' + p.n, 'Completes'], [p.loi + ' min', 'LOI'], [p.ir + '%', 'IR'], ['$' + p.cpi, 'CPI'], ['Rs ' + (margin / 1000).toFixed(0) + 'K', 'Margin']].map(([val, lbl], i) => (
            <div key={lbl} style={{ textAlign: 'center', borderRight: i < 5 ? `1px solid ${C.border}` : 'none', padding: '0 12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: C.t1, letterSpacing: '-0.2px' }}>{val}</div>
              <div style={{ fontSize: '11px', color: C.t3, marginTop: '3px' }}>{lbl}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '2px', background: '#F3F4F6', padding: '4px', borderRadius: '12px', border: `1px solid ${C.border}`, marginBottom: '22px' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '8px 14px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', borderRadius: '9px', transition: 'all 0.14s ease', textAlign: 'center', fontFamily: 'Inter, sans-serif', border: tab === t ? `1px solid ${C.border}` : '1px solid transparent', background: tab === t ? '#fff' : 'transparent', color: tab === t ? C.t1 : C.t3, boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.06)' : 'none' }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <Card>
              <SectionHeader title="IR Daily Trend" />
              <ResponsiveContainer width="100%" height={185}>
                <AreaChart data={irData}>
                  <defs><linearGradient id="irG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#FF6A00" stopOpacity={0.15} /><stop offset="95%" stopColor="#FF6A00" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={G} />
                  <XAxis dataKey="day" tick={{ fill: TK, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: TK, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <Tooltip content={<CT />} />
                  <Area type="monotone" dataKey="ir" name="IR" stroke="#FF6A00" strokeWidth={2.5} fill="url(#irG)" dot={{ fill: '#FF6A00', r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <SectionHeader title="Daily Completes" />
              <ResponsiveContainer width="100%" height={185}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={G} />
                  <XAxis dataKey="day" tick={{ fill: TK, fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: TK, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CT />} />
                  <Bar dataKey="completes" name="Completes" fill="#16A34A" radius={[5, 5, 0, 0]} fillOpacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
          <Card>
            <SectionHeader title="Quota Fill by Segment" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {quotas.map(q => {
                const c = q.f < 50 ? '#DC2626' : q.f < 75 ? '#D97706' : '#16A34A'
                return (
                  <div key={q.s}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: C.t2 }}>{q.s}</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: c }}>{q.f}%</span>
                    </div>
                    <div style={{ background: '#F3F4F6', borderRadius: '6px', height: '7px' }}>
                      <div style={{ width: `${q.f}%`, height: '100%', borderRadius: '6px', background: c, transition: 'width 1.2s' }} />
                    </div>
                  </div>
                )
              })}
            </div>
            {p.risk === 'atrisk' && <InsightBox text="HCP specialist and healthcare consumer segments critically underfilled. Boost panel supply allocation immediately." type="warn" />}
          </Card>
        </div>
      )}

      {/* Vendors */}
      {tab === 'vendors' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
          <Card noPad>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FAFAFA', borderRadius: '16px 16px 0 0' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: C.t1 }}>Assigned Vendors</span>
              <button style={{ background: '#FFF0E6', color: '#FF6A00', border: '1px solid #FDBA74', padding: '5px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>+ Add</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '13px' }}>
              <thead><tr>{['Vendor', 'Completes', 'CPI', 'Score', 'Status'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: C.t3, textTransform: 'uppercase', letterSpacing: '0.6px', borderBottom: `1px solid ${C.border}`, background: '#FAFAFA' }}>{h}</th>)}</tr></thead>
              <tbody>
                {vendors.slice(0, 3).map(v => (
                  <tr key={v.id} onMouseEnter={e => Array.from(e.currentTarget.cells).forEach(c => ((c as HTMLElement).style.background = '#FAFAFA'))} onMouseLeave={e => Array.from(e.currentTarget.cells).forEach(c => ((c as HTMLElement).style.background = 'transparent'))}>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB' }}><div style={{ fontWeight: 500, color: C.t1 }}>{v.name}</div><div style={{ fontSize: '11px', color: C.t3 }}>{v.country}</div></td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB', fontWeight: 600 }}>{Math.round(p.complete * 0.3 + v.id * 15)}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB', color: C.t2 }}>${v.cpi}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB', minWidth: '120px' }}><ScoreBar score={v.score} /></td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB' }}><StatusBadge status="active" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Card>
              <SectionHeader title="Supply Split" />
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <PieChart width={100} height={100}><Pie data={splitData} cx={46} cy={46} innerRadius={30} outerRadius={46} dataKey="value" strokeWidth={0}>{splitData.map((d, i) => <Cell key={i} fill={d.color} />)}</Pie></PieChart>
                <div style={{ flex: 1 }}>
                  {splitData.map(d => (<div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #F9FAFB' }}><span style={{ fontSize: '11.5px', color: C.t2, display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '2px', background: d.color, display: 'inline-block' }} />{d.name}</span><span style={{ fontWeight: 600, fontSize: '12px' }}>{d.value}%</span></div>))}
                </div>
              </div>
              <InsightBox text="Single vendor at 55% — diversify supply to reduce delivery risk." type="warn" />
            </Card>
          </div>
        </div>
      )}

      {/* Panel */}
      {tab === 'panel' && (
        <Card noPad>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FAFAFA', borderRadius: '16px 16px 0 0' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: C.t1 }}>Assigned Panelists</span>
            <button style={{ background: '#FFF0E6', color: '#FF6A00', border: '1px solid #FDBA74', padding: '5px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>+ Assign</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '13px' }}>
            <thead><tr>{['Panelist', 'Type', 'Specialty', 'Geography', 'Quality', 'Surveys', 'Status'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: C.t3, textTransform: 'uppercase', letterSpacing: '0.6px', borderBottom: `1px solid ${C.border}`, background: '#FAFAFA' }}>{h}</th>)}</tr></thead>
            <tbody>
              {panelists.slice(0, 6).map(pan => (
                <tr key={pan.id} onMouseEnter={e => Array.from(e.currentTarget.cells).forEach(c => ((c as HTMLElement).style.background = '#FAFAFA'))} onMouseLeave={e => Array.from(e.currentTarget.cells).forEach(c => ((c as HTMLElement).style.background = 'transparent'))}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <Avatar initials={pan.initials} index={pan.id} size={30} />
                      <span style={{ fontWeight: 500, color: C.t1 }}>{pan.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB' }}><PanelistTypeBadge type={pan.type} /></td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB', color: C.t2 }}>{pan.specialty}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB', color: C.t2 }}>{pan.geo}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB', minWidth: '130px' }}><ScoreBar score={pan.quality} /></td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB', color: C.t2 }}>{pan.surveys}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB' }}><StatusBadge status={pan.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* CATI */}
      {tab === 'cati' && (
        <div>
          <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '14px', marginBottom: '22px' }}>
            {[['Completed', Math.round(p.complete * 0.7), '#FF6A00', 0], ['Pending', Math.round(p.n * 0.15), '#D97706', 50], ['Callbacks', Math.round(p.n * 0.08), '#2563EB', 100], ['Refusals', Math.round(p.n * 0.05), '#DC2626', 150]].map(([l, v, c, d]) => (
              <KpiCard key={l as string} label={l as string} value={String(v)} accent={c as string} delay={d as number} />
            ))}
          </div>
          <Card noPad>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, background: '#FAFAFA', borderRadius: '16px 16px 0 0' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: C.t1 }}>Interview Log</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '13px' }}>
              <thead><tr>{['Respondent ID', 'Interviewer', 'Duration', 'Status', 'Date/Time'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: C.t3, textTransform: 'uppercase', letterSpacing: '0.6px', borderBottom: `1px solid ${C.border}`, background: '#FAFAFA' }}>{h}</th>)}</tr></thead>
              <tbody>
                {Array.from({ length: 8 }, (_, i) => {
                  const ss = ['completed', 'completed', 'pending', 'completed', 'callback', 'completed', 'completed', 'pending']
                  const ivs = interviewers.slice(0, 4)
                  const s = ss[i]
                  const sc = s === 'completed' ? { bg: '#DCFCE7', color: '#15803D' } : s === 'pending' ? { bg: '#FEF3C7', color: '#B45309' } : { bg: '#DBEAFE', color: '#1D4ED8' }
                  return (
                    <tr key={i}>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB', fontFamily: 'monospace', fontSize: '12px', color: C.t3 }}>RES-{1001 + i}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB', color: C.t2 }}>{ivs[i % 4].name}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB' }}>{7 + i % 4}:{String((i * 7 + 12) % 60).padStart(2, '0')}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB' }}><span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: sc.bg, color: sc.color }}>{s}</span></td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB', fontSize: '12px', color: C.t3 }}>Apr {i + 1}, 2025 10:{String(i * 7 + 5).padStart(2, '0')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  )
}
