'use client'
import { useEffect, useState } from 'react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { projects, kpiHistory, alerts } from '@/lib/data'
import { KpiCard, Card, ProgressBar, StatusBadge, RiskBadge, InsightBox, SectionHeader } from '@/components/ui'
import type { Page } from '@/components/layout/AppShell'

const TIP = { backgroundColor: '#fff', borderColor: '#E5E7EB', borderWidth: 1, titleColor: '#6B7280', bodyColor: '#111827', bodyFont: { weight: '600' as any, size: 13 }, padding: 12, cornerRadius: 10, displayColors: false, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }
const GRID = '#F3F4F6'
const TICK = '#9CA3AF'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <div style={{ color: '#9CA3AF', marginBottom: '4px' }}>{label}</div>
      {payload.map((p: any) => <div key={p.name} style={{ color: p.color || '#111827', fontWeight: 600 }}>{p.name}: {p.value}</div>)}
    </div>
  )
}

export default function Dashboard({ onNavigate }: { onNavigate: (page: Page, id?: number, name?: string) => void }) {
  const [ready, setReady] = useState(false)
  useEffect(() => { setTimeout(() => setReady(true), 80) }, [])

  const live     = projects.filter(p => p.status === 'live')
  const totalRev = projects.reduce((a, p) => a + p.revenue, 0)
  const totalCost= projects.reduce((a, p) => a + p.vendorCost, 0)
  const totalN   = projects.reduce((a, p) => a + p.n, 0)
  const totalDone= projects.reduce((a, p) => a + p.complete, 0)
  const margin   = totalRev - totalCost
  const mPct     = Math.round((margin / totalRev) * 100)
  const delayed  = projects.filter(p => p.risk === 'delayed').length
  const atRisk   = projects.filter(p => p.risk === 'atrisk').length

  const irData      = kpiHistory.irDays.map((day, i) => ({ day, ir: kpiHistory.irTrend[i] }))
  const revenueData = kpiHistory.months.map((month, i) => ({ month, revenue: kpiHistory.revenue[i], cost: kpiHistory.cost[i] }))
  const vendorData  = [
    { name: 'M3 Panel India', value: 38, color: '#FF6A00' },
    { name: 'Sermo Network',  value: 24, color: '#2563EB' },
    { name: 'PanelXchange',   value: 16, color: '#7C3AED' },
    { name: 'Others',         value: 22, color: '#E5E7EB' },
  ]

  return (
    <div style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.4s ease' }}>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', letterSpacing: '-0.3px' }}>Good morning, Uma</h1>
          <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>
            <span style={{ color: delayed > 0 ? '#DC2626' : '#6B7280', fontWeight: 600 }}>{delayed} delayed</span>
            {' '}and{' '}
            <span style={{ color: atRisk > 0 ? '#D97706' : '#6B7280', fontWeight: 600 }}>{atRisk} at risk</span>
            {' '}— review required today
          </p>
        </div>
        <button onClick={() => onNavigate('projects')} style={{ background: '#FF6A00', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', boxShadow: '0 1px 3px rgba(255,106,0,0.3)', transition: 'background 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#FF8C38')}
          onMouseLeave={e => (e.currentTarget.style.background = '#FF6A00')}
        >View All Projects</button>
      </div>

      {/* Alert banners */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { type: 'danger', text: <>Diabetes Management study IR at 18% — 10pts below target. Add backup vendor.</> },
          { type: 'warn',   text: <>Oncology Patient Journey — female HCP quota at 38% fill rate. Action needed.</> },
        ].map((a, i) => (
          <div key={i} style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 16px', borderRadius: '12px', background: a.type === 'danger' ? '#FEF2F2' : '#FFFBEB', border: `1px solid ${a.type === 'danger' ? '#FECACA' : '#FDE68A'}` }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: a.type === 'danger' ? '#DC2626' : '#D97706', display: 'inline-block', flexShrink: 0, marginTop: '4px' }}></span>
            <span style={{ fontSize: '12.5px', color: a.type === 'danger' ? '#B91C1C' : '#92400E', fontWeight: 500 }}>{a.text}</span>
          </div>
        ))}
      </div>

      {/* KPI cards */}
      <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '16px', marginBottom: '24px' }}>
        <KpiCard label="Total Projects"  value={String(projects.length)} sub="Across all clients"    trend="3 new this month" trendDir="up"  accent="#FF6A00" delay={0}   />
        <KpiCard label="Live in Field"   value={String(live.length)}     sub="Currently collecting"  trend="1 launched today" trendDir="up"  accent="#16A34A" delay={60}  />
        <KpiCard label="MTD Revenue"     value={`Rs ${(totalRev / 100000).toFixed(1)}L`} sub={`Margin: ${mPct}%`} trend="12.4% vs last month" trendDir="up" accent="#2563EB" delay={120} />
        <KpiCard label="Gross Margin"    value={`Rs ${(margin / 100000).toFixed(1)}L`}   sub={`${mPct}% margin`}   trend="Best in 6 months"    trendDir="up"  accent="#7C3AED" delay={180} />
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <Card>
          <SectionHeader title="IR Trend — Last 8 Days" action={<span style={{ fontSize: '12px', color: '#9CA3AF' }}>Avg <strong style={{ color: '#FF6A00' }}>30.6%</strong></span>} />
          <ResponsiveContainer width="100%" height={185}>
            <AreaChart data={irData}>
              <defs>
                <linearGradient id="irG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#FF6A00" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#FF6A00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis dataKey="day" tick={{ fill: TICK, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: TICK, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[22, 40]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="ir" name="IR" stroke="#FF6A00" strokeWidth={2.5} fill="url(#irG)" dot={{ fill: '#FF6A00', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
          <InsightBox text="IR dipped mid-week but recovered Thursday. Trend is stable — no vendor changes required." type="success" />
        </Card>

        <Card>
          <SectionHeader title="Revenue vs Cost (6 Months)" action={
            <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
              {[['#16A34A','Revenue'],['#DC2626','Cost']].map(([c,l]) => (
                <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: c, display: 'inline-block' }} />{l}
                </span>
              ))}
            </div>
          } />
          <ResponsiveContainer width="100%" height={185}>
            <BarChart data={revenueData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis dataKey="month" tick={{ fill: TICK, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: TICK, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `Rs ${v}L`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" name="Revenue" fill="#16A34A" radius={[5,5,0,0]} fillOpacity={0.85} />
              <Bar dataKey="cost"    name="Cost"    fill="#DC2626" radius={[5,5,0,0]} fillOpacity={0.75} />
            </BarChart>
          </ResponsiveContainer>
          <InsightBox text={`April margin at ${mPct}% — best in 6 months. Cost controls are working effectively.`} type="success" />
        </Card>
      </div>

      {/* Projects + side panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '20px' }}>
        <Card>
          <SectionHeader title="Live Project Progress" action={<span onClick={() => onNavigate('projects')} style={{ fontSize: '12px', color: '#FF6A00', cursor: 'pointer', fontWeight: 500 }}>View all</span>} />
          <div className="stagger">
            {projects.filter(p => p.status !== 'completed').map(p => (
              <div key={p.id} className="animate-fadeUp" style={{ marginBottom: '18px', cursor: 'pointer', padding: '12px', borderRadius: '10px', border: '1px solid #F3F4F6', transition: 'border-color 0.15s' }}
                onClick={() => onNavigate('project-detail', p.id, p.name)}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#E5E7EB')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#F3F4F6')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827', marginBottom: '2px' }}>{p.name.length > 36 ? p.name.slice(0, 34) + '…' : p.name}</div>
                    <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{p.client} · {p.pm}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                    <StatusBadge status={p.status} />
                    <RiskBadge risk={p.risk} />
                  </div>
                </div>
                <ProgressBar value={p.complete} max={p.n} />
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Vendor mix */}
          <Card>
            <SectionHeader title="Vendor Supply Mix" />
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <PieChart width={100} height={100}>
                <Pie data={vendorData} cx={46} cy={46} innerRadius={30} outerRadius={46} dataKey="value" strokeWidth={0}>
                  {vendorData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
              <div style={{ flex: 1 }}>
                {vendorData.map(d => (
                  <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid #F9FAFB' }}>
                    <span style={{ fontSize: '11.5px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: d.color, display: 'inline-block' }} />{d.name}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Activity feed */}
          <Card style={{ flex: 1 }}>
            <SectionHeader title="Activity Feed" />
            {alerts.map(a => (
              <div key={a.id} style={{ display: 'flex', gap: '11px', padding: '10px 0', borderBottom: '1px solid #F9FAFB' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0, marginTop: '4px', background: a.type === 'danger' ? '#DC2626' : a.type === 'warning' ? '#D97706' : a.type === 'success' ? '#16A34A' : '#2563EB' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: a.type === 'danger' ? '#B91C1C' : a.type === 'warning' ? '#B45309' : a.type === 'success' ? '#15803D' : '#1D4ED8' }}>{a.title}</div>
                  <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '2px' }}>{a.message}</div>
                </div>
                <div style={{ fontSize: '10.5px', color: '#9CA3AF', flexShrink: 0 }}>{a.time}</div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
