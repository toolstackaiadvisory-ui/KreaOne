'use client'
import { useState } from 'react'
import { projects, ACCOUNT_OWNERS, PROJECT_MANAGERS, SUPPLY_TYPES } from '@/lib/data'
import { StatusBadge, RiskBadge, ProgressBar, MethodBadge, SupplyBadge, PageHeader, Card, KpiCard, selectStyle } from '@/components/ui'
import type { Page } from '@/components/layout/AppShell'

const C = { border: '#E5E7EB', t1: '#111827', t2: '#6B7280', t3: '#9CA3AF', orange: '#FF6A00' }

export default function Projects({ onNavigate }: { onNavigate: (page: Page, id?: number, name?: string) => void }) {
  const [showModal, setShowModal]       = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [ownerFilter, setOwnerFilter]   = useState('all')

  const filtered = projects.filter(p => {
    const sOk = statusFilter === 'all' || p.status === statusFilter
    const mOk = methodFilter === 'all' || p.method === methodFilter
    const oOk = ownerFilter  === 'all' || p.accountOwner === ownerFilter
    return sOk && mOk && oOk
  })

  const totalRev = projects.reduce((a, p) => a + p.revenue, 0)
  const liveIR   = Math.round(projects.filter(p => p.status === 'live').reduce((a, p) => a + p.ir, 0) / projects.filter(p => p.status === 'live').length)

  const inputStyle: React.CSSProperties = { width: '100%', background: '#F9FAFB', border: `1px solid ${C.border}`, borderRadius: '9px', padding: '9px 13px', color: C.t1, fontSize: '13px', fontFamily: 'Inter, sans-serif', outline: 'none' }

  return (
    <div>
      <PageHeader
        title="Projects"
        sub={`${projects.length} projects · ${projects.filter(p => p.status === 'live').length} live · Rs ${(totalRev / 100000).toFixed(1)}L pipeline`}
        action={
          <button onClick={() => setShowModal(true)} style={{ background: C.orange, color: '#fff', border: 'none', padding: '9px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', boxShadow: '0 1px 3px rgba(255,106,0,0.3)' }}>
            + New Project
          </button>
        }
      />

      {/* Summary cards */}
      <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '14px', marginBottom: '24px' }}>
        <KpiCard label="All Projects" value={String(projects.length)} accent="#FF6A00" delay={0} />
        <KpiCard label="Live" value={String(projects.filter(p => p.status === 'live').length)} accent="#16A34A" delay={50} />
        <KpiCard label="In QC" value={String(projects.filter(p => p.status === 'qc').length)} accent="#2563EB" delay={100} />
        <KpiCard label="Completed" value={String(projects.filter(p => p.status === 'completed').length)} accent="#7C3AED" delay={150} />
      </div>

      {/* Callout */}
      <div style={{ background: '#FFF7F0', border: '1px solid #FDBA74', borderLeft: '4px solid #FF6A00', borderRadius: '0 14px 14px 0', padding: '14px 20px', marginBottom: '22px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Portfolio Overview</div>
        <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>
          <strong>{Math.round(projects.reduce((a, p) => a + p.complete, 0) / projects.reduce((a, p) => a + p.n, 0) * 100)}%</strong> overall completion.{' '}
          <strong style={{ color: '#DC2626' }}>{projects.filter(p => p.risk === 'delayed').length} delayed</strong> ·{' '}
          <strong style={{ color: '#D97706' }}>{projects.filter(p => p.risk === 'atrisk').length} at risk</strong> ·{' '}
          Avg live IR <strong>{liveIR}%</strong>
        </div>
      </div>

      {/* Table */}
      <Card noPad>
        {/* Filters */}
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', background: '#FAFAFA', borderRadius: '16px 16px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: `1px solid ${C.border}`, borderRadius: '9px', padding: '7px 13px', flex: 1, maxWidth: '260px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="#9CA3AF"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.5"/></svg>
            <input placeholder="Search projects…" style={{ background: 'none', border: 'none', outline: 'none', color: C.t1, fontSize: '13px', fontFamily: 'Inter, sans-serif', width: '100%' }} />
          </div>
          <select style={selectStyle} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="live">Live</option>
            <option value="qc">QC</option>
            <option value="completed">Completed</option>
          </select>
          <select style={selectStyle} value={methodFilter} onChange={e => setMethodFilter(e.target.value)}>
            <option value="all">All Methods</option>
            <option value="Online">Online</option>
            <option value="CATI">CATI</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <select style={selectStyle} value={ownerFilter} onChange={e => setOwnerFilter(e.target.value)}>
            <option value="all">All Owners</option>
            {ACCOUNT_OWNERS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <span style={{ fontSize: '12px', color: C.t3, marginLeft: 'auto' }}>{filtered.length} of {projects.length}</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '13px' }}>
            <thead>
              <tr>
                {['Project', 'Client', 'Method', 'Supply Type', 'Account Owner', 'PM', 'Status', 'Progress', 'IR', 'Risk', ''].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: C.t3, textTransform: 'uppercase', letterSpacing: '0.6px', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap', background: '#FAFAFA' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} className="animate-fadeUp" style={{ animationDelay: `${i * 28}ms`, cursor: 'pointer' }}
                  onClick={() => onNavigate('project-detail', p.id, p.name)}
                  onMouseEnter={e => Array.from(e.currentTarget.cells).forEach(c => ((c as HTMLElement).style.background = '#FAFAFA'))}
                  onMouseLeave={e => Array.from(e.currentTarget.cells).forEach(c => ((c as HTMLElement).style.background = 'transparent'))}
                >
                  <td style={{ padding: '13px 16px', borderBottom: `1px solid #F9FAFB` }}>
                    <div style={{ fontWeight: 500, color: C.t1, marginBottom: '2px', maxWidth: '200px' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: C.t3 }}>{p.geo} · {p.endDate}</div>
                  </td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', color: C.t2, fontWeight: 500 }}>{p.client}</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB' }}><MethodBadge method={p.method} /></td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB' }}><SupplyBadge supplyType={p.supplyType} /></td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', fontWeight: 500, color: C.t1 }}>{p.accountOwner}</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', color: C.t2 }}>{p.pm}</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB' }}><StatusBadge status={p.status} /></td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', minWidth: '160px' }}><ProgressBar value={p.complete} max={p.n} /></td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB', fontWeight: 700, color: p.ir < 20 ? '#DC2626' : p.ir > 40 ? '#16A34A' : C.t1 }}>{p.ir}%</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB' }}><RiskBadge risk={p.risk} /></td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid #F9FAFB' }}>
                    <button onClick={e => { e.stopPropagation(); onNavigate('project-detail', p.id, p.name) }} style={{ background: '#FFF0E6', color: '#FF6A00', border: '1px solid #FDBA74', padding: '5px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(17,24,39,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }} onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}>
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: '20px', padding: '28px', width: '520px', maxWidth: '94%', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
              <div>
                <div style={{ fontSize: '17px', fontWeight: 700, color: C.t1, letterSpacing: '-0.2px' }}>Create New Project</div>
                <div style={{ fontSize: '13px', color: C.t2, marginTop: '3px' }}>Configure your research study</div>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: '#F3F4F6', border: 'none', color: C.t2, width: '30px', height: '30px', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>

            {/* Full-width fields */}
            {[
              { label: 'Project Name', placeholder: 'e.g. GLP-1 Adoption Study – India', type: 'text' },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: C.t3, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{f.label}</label>
                <input placeholder={f.placeholder} style={inputStyle} />
              </div>
            ))}

            {/* 2-col rows */}
            {[
              [{ label: 'Client', placeholder: 'e.g. IQVIA', type: 'text' }, { label: 'Methodology', type: 'select', options: ['Online', 'CATI', 'Hybrid'] }],
              [{ label: 'Supply Type', type: 'select', options: ['Panel Supply', 'Vendor Supply', 'Both'] }, { label: 'Account Owner', type: 'select', options: ACCOUNT_OWNERS }],
              [{ label: 'Project Manager', type: 'select', options: PROJECT_MANAGERS }, { label: 'Geography', placeholder: 'e.g. India', type: 'text' }],
              [{ label: 'Sample Size (N)', placeholder: '500', type: 'number' }, { label: 'LOI (minutes)', placeholder: '12', type: 'number' }],
              [{ label: 'Target IR (%)', placeholder: '25', type: 'number' }, { label: 'CPI (Rs)', placeholder: '450', type: 'number' }],
            ].map((row, ri) => (
              <div key={ri} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                {row.map((f: any) => (
                  <div key={f.label}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: C.t3, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{f.label}</label>
                    {f.type === 'select' ? (
                      <select style={{ ...inputStyle, cursor: 'pointer' }}>
                        {f.options.map((o: string) => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={f.type} placeholder={f.placeholder} style={inputStyle} />
                    )}
                  </div>
                ))}
              </div>
            ))}

            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, background: '#FF6A00', color: '#fff', border: 'none', padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 3px rgba(255,106,0,0.3)' }}>Create Project</button>
              <button onClick={() => setShowModal(false)} style={{ background: '#F3F4F6', color: C.t2, border: 'none', padding: '10px 18px', borderRadius: '10px', fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
