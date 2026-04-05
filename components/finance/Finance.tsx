'use client'
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { projects, kpiHistory } from '@/lib/data'
import { StatusBadge, InsightBox, PageHeader, Card, KpiCard, SectionHeader, MethodBadge } from '@/components/ui'

const C  = { border: '#E5E7EB', t1: '#111827', t2: '#6B7280', t3: '#9CA3AF', bg: '#F9FAFB' }
const G  = '#F3F4F6'
const TK = '#9CA3AF'

const CT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <div style={{ color: '#9CA3AF', marginBottom: '4px' }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: '#111827', fontWeight: 600 }}>
          {p.name}: {typeof p.value === 'number' ? `Rs ${p.value}L` : p.value}
        </div>
      ))}
    </div>
  )
}

export default function Finance() {
  const totalRev  = projects.reduce((a, p) => a + p.revenue,    0)
  const totalCost = projects.reduce((a, p) => a + p.vendorCost, 0)
  const margin    = totalRev - totalCost
  const marginPct = Math.round((margin / totalRev) * 100)
  const outstanding = Math.round(totalRev * 0.28)

  const revenueData = kpiHistory.months.map((m, i) => ({
    month: m,
    revenue: kpiHistory.revenue[i],
    cost:    kpiHistory.cost[i],
    margin:  +(kpiHistory.revenue[i] - kpiHistory.cost[i]).toFixed(1),
  }))

  const mixData = [
    { name: 'Online (75%)', value: 75, color: '#FF6A00' },
    { name: 'CATI (25%)',   value: 25, color: '#2563EB' },
  ]

  // deterministic per-project P&L
  const seeds = [0.62, 0.58, 0.65, 0.71, 0.60, 0.55, 0.64, 0.68]
  const projectPL = projects.map((p, i) => {
    const c   = Math.round(p.revenue * seeds[i])
    const m   = p.revenue - c
    const mp  = Math.round((m / p.revenue) * 100)
    return { ...p, calCost: c, mgn: m, mgnPct: mp }
  })

  // owner-wise revenue summary
  const ownerRevenue = ['Uma', 'Yoshith', 'Gokul', 'Pradeepa'].map(owner => ({
    owner,
    revenue: projects.filter(p => p.accountOwner === owner).reduce((a, p) => a + p.revenue, 0),
    projects: projects.filter(p => p.accountOwner === owner).length,
  }))

  return (
    <div>
      <PageHeader
        title="Finance Dashboard"
        sub="April 2025 · MTD Performance"
        action={
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ background: '#fff', color: C.t2, border: `1px solid ${C.border}`, padding: '8px 16px', borderRadius: '9px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
              Export P&L
            </button>
            <button style={{ background: '#FF6A00', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', boxShadow: '0 1px 3px rgba(255,106,0,0.3)' }}>
              Generate Invoice
            </button>
          </div>
        }
      />

      {/* Callout */}
      <div style={{ background: '#FFF7F0', border: '1px solid #FDBA74', borderLeft: '4px solid #FF6A00', borderRadius: '0 14px 14px 0', padding: '14px 20px', marginBottom: '24px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Financial Intelligence</div>
        <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>
          MTD margin at <strong style={{ color: '#16A34A' }}>{marginPct}%</strong> — best in 6 months, driven by GLP-1 Adoption delivery (45% margin) and CATI cost discipline.{' '}
          Outstanding <strong>Rs {(outstanding / 100000).toFixed(1)}L</strong> across 3 invoices needs follow-up.
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '16px', marginBottom: '24px' }}>
        <KpiCard label="Total Revenue"  value={`Rs ${(totalRev  / 100000).toFixed(1)}L`} sub="All active projects"         trend="12.4% MoM" trendDir="up"  accent="#16A34A" delay={0}   />
        <KpiCard label="Vendor Cost"    value={`Rs ${(totalCost / 100000).toFixed(1)}L`} sub={`${Math.round((totalCost / totalRev) * 100)}% of revenue`} accent="#DC2626" delay={55}  />
        <KpiCard label="Gross Margin"   value={`Rs ${(margin    / 100000).toFixed(1)}L`} sub={`${marginPct}% margin rate`}  trend="Best in 6 months"  trendDir="up"  accent="#FF6A00" delay={110} />
        <KpiCard label="Outstanding"    value={`Rs ${(outstanding / 100000).toFixed(1)}L`} sub="3 invoices pending"          accent="#D97706" delay={165} />
      </div>

      {/* Charts row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '20px' }}>

        {/* Revenue vs Cost bar chart */}
        <Card>
          <SectionHeader
            title="Revenue vs Cost (6 Months)"
            action={
              <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
                {[['#16A34A', 'Revenue'], ['#DC2626', 'Cost']].map(([c, l]) => (
                  <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: C.t3 }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: c, display: 'inline-block' }} />
                    {l}
                  </span>
                ))}
              </div>
            }
          />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={G} />
              <XAxis dataKey="month" tick={{ fill: TK, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: TK, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `Rs ${v}L`} />
              <Tooltip content={<CT />} />
              <Bar dataKey="revenue" name="Revenue" fill="#16A34A" radius={[5, 5, 0, 0]} fillOpacity={0.85} />
              <Bar dataKey="cost"    name="Cost"    fill="#DC2626" radius={[5, 5, 0, 0]} fillOpacity={0.7}  />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue mix + margin trend stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card style={{ flex: '0 0 auto' }}>
            <SectionHeader title="Revenue by Methodology" />
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <PieChart width={90} height={90}>
                <Pie data={mixData} cx={41} cy={41} innerRadius={26} outerRadius={41} dataKey="value" strokeWidth={0}>
                  {mixData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
              <div style={{ flex: 1 }}>
                {mixData.map(d => (
                  <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #F9FAFB' }}>
                    <span style={{ fontSize: '12px', color: C.t2, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: d.color, display: 'inline-block' }} />
                      {d.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card style={{ flex: 1 }}>
            <SectionHeader
              title="Margin Trend"
              action={<span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>Best in 6 months</span>}
            />
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="mgGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#16A34A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: TK, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: TK, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `Rs ${v}L`} />
                <Tooltip content={<CT />} />
                <Area type="monotone" dataKey="margin" name="Margin" stroke="#16A34A" strokeWidth={2} fill="url(#mgGrad)" dot={{ fill: '#16A34A', r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      {/* Account owner revenue */}
      <Card style={{ marginBottom: '20px' }}>
        <SectionHeader title="Revenue by Account Owner" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '12px' }}>
          {ownerRevenue.map(o => {
            const pct = Math.round((o.revenue / totalRev) * 100)
            const COLORS: Record<string, string> = { Uma: '#FF6A00', Yoshith: '#2563EB', Gokul: '#16A34A', Pradeepa: '#7C3AED' }
            const BG:     Record<string, string> = { Uma: '#FFF0E6', Yoshith: '#DBEAFE', Gokul: '#DCFCE7', Pradeepa: '#EDE9FE' }
            const c  = COLORS[o.owner] || '#6B7280'
            const bg = BG[o.owner]     || '#F9FAFB'
            return (
              <div key={o.owner} style={{ background: bg, borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: '#fff' }}>
                    {o.owner.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: C.t1 }}>{o.owner}</div>
                    <div style={{ fontSize: '11px', color: C.t3 }}>{o.projects} projects</div>
                  </div>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: c, letterSpacing: '-0.3px' }}>
                  Rs {(o.revenue / 100000).toFixed(1)}L
                </div>
                <div style={{ fontSize: '11px', color: C.t3, marginTop: '4px' }}>{pct}% of portfolio</div>
                <div style={{ marginTop: '8px', background: 'rgba(255,255,255,0.6)', borderRadius: '4px', height: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', borderRadius: '4px', background: c }} />
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Project P&L table */}
      <Card noPad>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, background: '#FAFAFA', borderRadius: '16px 16px 0 0' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: C.t1 }}>Project P&L</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '13px' }}>
            <thead>
              <tr>
                {['Project', 'Client', 'Method', 'Account Owner', 'PM', 'Revenue', 'Vendor Cost', 'Gross Margin', 'Margin %', 'Status'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: C.t3, textTransform: 'uppercase', letterSpacing: '0.6px', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap', background: '#FAFAFA' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projectPL.map((p, i) => (
                <tr
                  key={p.id}
                  onMouseEnter={e => Array.from(e.currentTarget.cells).forEach(c => ((c as HTMLElement).style.background = '#FAFAFA'))}
                  onMouseLeave={e => Array.from(e.currentTarget.cells).forEach(c => ((c as HTMLElement).style.background = 'transparent'))}
                >
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB' }}>
                    <div style={{ fontWeight: 500, color: C.t1, maxWidth: '180px' }}>
                      {p.name.length > 28 ? p.name.slice(0, 26) + '…' : p.name}
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', color: C.t2 }}>{p.client}</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB' }}><MethodBadge method={p.method} /></td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', fontWeight: 500, color: C.t1 }}>{p.accountOwner}</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', color: C.t2 }}>{p.pm}</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', fontWeight: 600, color: '#16A34A' }}>
                    Rs {(p.revenue / 1000).toFixed(0)}K
                  </td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', color: '#DC2626' }}>
                    Rs {(p.calCost / 1000).toFixed(0)}K
                  </td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', fontWeight: 600, color: C.t1 }}>
                    Rs {(p.mgn / 1000).toFixed(0)}K
                  </td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.2px', color: p.mgnPct >= 38 ? '#16A34A' : p.mgnPct >= 28 ? '#D97706' : '#DC2626' }}>
                      {p.mgnPct}%
                    </span>
                  </td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB' }}>
                    <StatusBadge status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div style={{ marginTop: '16px' }}>
        <InsightBox
          text={`April margin at ${marginPct}% — driven by GLP-1 Adoption delivery at 45% and CATI cost control. Outstanding Rs ${(outstanding / 100000).toFixed(1)}L across 3 invoices requires follow-up this week.`}
          type="info"
        />
      </div>
    </div>
  )
}
