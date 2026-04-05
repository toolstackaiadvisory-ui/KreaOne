'use client'
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { interviewers } from '@/lib/data'
import { ScoreBar, InsightBox, PageHeader, Card, KpiCard, SectionHeader, Avatar } from '@/components/ui'

const C  = { border: '#E5E7EB', t1: '#111827', t2: '#6B7280', t3: '#9CA3AF', bg: '#F9FAFB' }
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

const STATUS_COLOR: Record<string, string> = { online: '#16A34A', break: '#D97706', offline: '#9CA3AF' }
const STATUS_BG:    Record<string, string> = { online: '#DCFCE7', break: '#FEF3C7', offline: '#F3F4F6' }
const STATUS_LABEL: Record<string, string> = { online: 'Online', break: 'Break', offline: 'Offline' }

export default function CatiDashboard() {
  const totalCalls = interviewers.reduce((a, i) => a + i.calls, 0)
  const totalDone  = interviewers.reduce((a, i) => a + i.completed, 0)
  const totalPend  = interviewers.reduce((a, i) => a + i.pending, 0)
  const totalCb    = interviewers.reduce((a, i) => a + i.callback, 0)
  const conv = Math.round((totalDone / totalCalls) * 100)

  const hourlyData = [
    { hour: '9am', calls: 18 }, { hour: '10am', calls: 32 }, { hour: '11am', calls: 45 },
    { hour: '12pm', calls: 38 }, { hour: '1pm', calls: 22 }, { hour: '2pm', calls: 41 },
    { hour: '3pm', calls: 52 }, { hour: '4pm', calls: 39 }, { hour: '5pm', calls: 28 },
  ]
  const barData = interviewers.map(i => ({ name: i.name.replace('.', ''), completed: i.completed, pending: i.pending, callback: i.callback }))

  return (
    <div>
      <PageHeader
        title="CATI Dashboard"
        sub="Live call centre · April 4, 2025"
        action={
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ background: '#fff', color: C.t2, border: `1px solid ${C.border}`, padding: '8px 16px', borderRadius: '9px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>Export Report</button>
            <button style={{ background: '#FF6A00', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', boxShadow: '0 1px 3px rgba(255,106,0,0.3)' }}>+ Add Interviewer</button>
          </div>
        }
      />

      <div style={{ background: '#FFF7F0', border: '1px solid #FDBA74', borderLeft: '4px solid #FF6A00', borderRadius: '0 14px 14px 0', padding: '14px 20px', marginBottom: '24px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Shift Intelligence — Today</div>
        <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>
          <strong>{conv}%</strong> conversion rate — 4pts above last week.{' '}
          <strong>Sneha B.</strong> leads with 96 quality score and 49 completions.{' '}
          <strong>Amir H.</strong> offline — reassign 3 pending callbacks. Peak volume at 3–4pm.
        </div>
      </div>

      <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: '14px', marginBottom: '24px' }}>
        <KpiCard label="Calls Today" value={String(totalCalls)} sub="18% above yesterday" accent="#FF6A00" delay={0} />
        <KpiCard label="Completed"   value={String(totalDone)}  sub={`${conv}% rate`}   accent="#16A34A" delay={50} />
        <KpiCard label="Pending"     value={String(totalPend)}  sub="In queue"           accent="#D97706" delay={100} />
        <KpiCard label="Callbacks"   value={String(totalCb)}    sub="Scheduled"          accent="#2563EB" delay={150} />
        <KpiCard label="Avg Duration" value="9:04"              sub="vs 10m target"      accent="#7C3AED" delay={200} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <Card>
          <SectionHeader title="Interviewer Performance" action={
            <div style={{ display: 'flex', gap: '10px', fontSize: '11px' }}>
              {[['#16A34A','Done'],['#D97706','Pending'],['#2563EB','Callback']].map(([c,l]) => (
                <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: C.t3 }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: c, display: 'inline-block' }} />{l}
                </span>
              ))}
            </div>
          } />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke={G} />
              <XAxis dataKey="name" tick={{ fill: TK, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: TK, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CT />} />
              <Bar dataKey="completed" name="Done"     stackId="a" fill="#16A34A" fillOpacity={0.85} />
              <Bar dataKey="pending"   name="Pending"  stackId="a" fill="#D97706" fillOpacity={0.75} />
              <Bar dataKey="callback"  name="Callback" stackId="a" fill="#2563EB" fillOpacity={0.75} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionHeader title="Hourly Call Volume" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={hourlyData}>
              <defs><linearGradient id="callG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563EB" stopOpacity={0.12}/><stop offset="95%" stopColor="#2563EB" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={G} />
              <XAxis dataKey="hour" tick={{ fill: TK, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: TK, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CT />} />
              <Area type="monotone" dataKey="calls" name="Calls" stroke="#2563EB" strokeWidth={2.5} fill="url(#callG)" dot={{ fill: '#2563EB', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card noPad>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FAFAFA', borderRadius: '16px 16px 0 0' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: C.t1 }}>Shift Status</span>
          <div style={{ display: 'flex', gap: '14px', fontSize: '12px' }}>
            {Object.entries(STATUS_LABEL).map(([k, l]) => (
              <span key={k} style={{ display: 'flex', alignItems: 'center', gap: '5px', color: C.t3 }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: STATUS_COLOR[k], display: 'inline-block' }} />{l}
              </span>
            ))}
          </div>
        </div>
        <div style={{ padding: '0 24px' }}>
          {interviewers.map((iv, i) => (
            <div key={iv.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0', borderBottom: i < interviewers.length - 1 ? `1px solid ${C.bg}` : 'none', transition: 'background 0.12s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <Avatar initials={iv.initials} index={iv.id - 1} size={38} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', background: STATUS_COLOR[iv.status], border: '2px solid #fff' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 500, color: C.t1 }}>{iv.name}</div>
                <div style={{ fontSize: '11px', color: C.t3, marginTop: '2px' }}>{iv.languages.join(' · ')} · Avg {iv.avgDur}</div>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '20px', background: STATUS_BG[iv.status], color: STATUS_COLOR[iv.status] }}>
                {STATUS_LABEL[iv.status]}
              </span>
              {[['done', iv.completed, '#16A34A'], ['pending', iv.pending, '#D97706'], ['callback', iv.callback, '#2563EB']].map(([l, v, c]) => (
                <div key={l as string} style={{ textAlign: 'center', minWidth: '46px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: c as string, letterSpacing: '-0.2px' }}>{v}</div>
                  <div style={{ fontSize: '10px', color: C.t3 }}>{l}</div>
                </div>
              ))}
              <div style={{ width: '140px' }}>
                <div style={{ fontSize: '11px', color: C.t3, marginBottom: '5px' }}>Quality</div>
                <ScoreBar score={iv.quality} />
              </div>
              <button style={{ background: '#FFF0E6', color: '#FF6A00', border: '1px solid #FDBA74', padding: '5px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>Assign</button>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ marginTop: '16px' }}>
        <InsightBox text={`${conv}% conversion rate today — 4pts above last week's average. Sneha B. leading the team.`} type="success" />
      </div>
    </div>
  )
}
