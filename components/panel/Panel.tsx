'use client'
import { useState } from 'react'
import { panelists, PANELIST_TYPES } from '@/lib/data'
import { ScoreBar, StatusBadge, PageHeader, InsightBox, Card, KpiCard, Avatar, SectionHeader, PanelistTypeBadge, selectStyle } from '@/components/ui'

const C = { border: '#E5E7EB', t1: '#111827', t2: '#6B7280', t3: '#9CA3AF' }

export default function Panel() {
  const [typeFilter, setTypeFilter]   = useState('all')
  const [geoFilter, setGeoFilter]     = useState('all')
  const [qualityFilter, setQualityFilter] = useState('all')

  const avgQ    = Math.round(panelists.reduce((a, p) => a + p.quality, 0) / panelists.length)
  const flagged = panelists.filter(p => p.flagged)
  const geos    = ['all', ...Array.from(new Set(panelists.map(p => p.geo)))]

  const filtered = panelists.filter(p => {
    const tOk = typeFilter    === 'all' || p.type === typeFilter
    const gOk = geoFilter     === 'all' || p.geo  === geoFilter
    const qOk = qualityFilter === 'all' ||
      (qualityFilter === 'high' && p.quality >= 85) ||
      (qualityFilter === 'med'  && p.quality >= 70 && p.quality < 85) ||
      (qualityFilter === 'low'  && p.quality < 70)
    return tOk && gOk && qOk
  })

  // type summary
  const typeCounts = PANELIST_TYPES.map(t => ({ label: t, count: panelists.filter(p => p.type === t).length }))

  return (
    <div>
      <PageHeader
        title="Panel Management"
        sub={`${panelists.length} panelists · Avg quality: ${avgQ} · ${flagged.length} flagged`}
        action={<button style={{ background: '#FF6A00', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', boxShadow: '0 1px 3px rgba(255,106,0,0.3)' }}>+ Add Panelist</button>}
      />

      {/* Summary KPIs */}
      <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '14px', marginBottom: '24px' }}>
        <KpiCard label="Total Panelists" value={String(panelists.length)} accent="#FF6A00" delay={0} />
        <KpiCard label="Active"          value={String(panelists.filter(p => p.status === 'active').length)} accent="#16A34A" delay={50} />
        <KpiCard label="Avg Quality"     value={String(avgQ)}              accent="#2563EB" delay={100} />
        <KpiCard label="Flagged"         value={String(flagged.length)}    accent="#DC2626" delay={150} />
      </div>

      {/* Type breakdown */}
      <Card style={{ marginBottom: '24px' }}>
        <SectionHeader title="Panelist Type Breakdown" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {typeCounts.map(tc => {
            const colors: Record<string, string> = { 'HCPs': '#2563EB', 'Patients': '#16A34A', 'Healthcare Consumers': '#7C3AED', 'Industry Experts': '#D97706' }
            const bgColors: Record<string, string> = { 'HCPs': '#DBEAFE', 'Patients': '#DCFCE7', 'Healthcare Consumers': '#EDE9FE', 'Industry Experts': '#FEF3C7' }
            const c = colors[tc.label] || '#6B7280'
            const bg = bgColors[tc.label] || '#F9FAFB'
            return (
              <div key={tc.label} style={{ background: bg, borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '26px', fontWeight: 700, color: c, letterSpacing: '-0.5px' }}>{tc.count}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: c, marginTop: '4px' }}>{tc.label}</div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: `1px solid ${C.border}`, borderRadius: '9px', padding: '7px 13px', flex: 1, maxWidth: '260px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="#9CA3AF"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.5"/></svg>
          <input placeholder="Search panelists…" style={{ background: 'none', border: 'none', outline: 'none', color: C.t1, fontSize: '13px', fontFamily: 'Inter, sans-serif', width: '100%' }} />
        </div>
        <select style={selectStyle} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          {PANELIST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select style={selectStyle} value={geoFilter} onChange={e => setGeoFilter(e.target.value)}>
          {geos.map(g => <option key={g} value={g}>{g === 'all' ? 'All Geographies' : g}</option>)}
        </select>
        <select style={selectStyle} value={qualityFilter} onChange={e => setQualityFilter(e.target.value)}>
          <option value="all">All Quality</option>
          <option value="high">High (85+)</option>
          <option value="med">Medium (70–84)</option>
          <option value="low">Low (&lt;70)</option>
        </select>
        <span style={{ fontSize: '12px', color: C.t3, marginLeft: 'auto' }}>{filtered.length} of {panelists.length}</span>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {filtered.map((pan, i) => (
          <div key={pan.id} className="animate-fadeUp" style={{ animationDelay: `${i * 35}ms`, background: '#fff', border: `1px solid ${pan.flagged ? '#FECACA' : C.border}`, borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)', transition: 'all 0.2s ease', cursor: 'default' }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)'; el.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)'; el.style.transform = 'translateY(0)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <Avatar initials={pan.initials} index={pan.id} size={40} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: C.t1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {pan.name}
                  {pan.flagged && <span style={{ fontSize: '10px', color: '#DC2626', marginLeft: '6px', fontWeight: 700, background: '#FEE2E2', padding: '1px 5px', borderRadius: '4px' }}>Flagged</span>}
                </div>
                <div style={{ fontSize: '12px', color: C.t3, marginTop: '2px' }}>{pan.geo} · Age {pan.age}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
              <PanelistTypeBadge type={pan.type} />
              <StatusBadge status={pan.status} />
            </div>

            <div style={{ fontSize: '12px', color: C.t2, marginBottom: '6px' }}>{pan.specialty}</div>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: C.t3, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quality Score</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: pan.quality >= 85 ? '#16A34A' : pan.quality >= 70 ? '#D97706' : '#DC2626' }}>{pan.quality}/100</span>
              </div>
              <ScoreBar score={pan.quality} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: C.t3, paddingTop: '12px', borderTop: '1px solid #F9FAFB' }}>
              <span>{pan.surveys} surveys</span>
              <span>Since {pan.joinDate}</span>
            </div>
          </div>
        ))}
      </div>

      {flagged.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <InsightBox text={`${flagged.length} panelist(s) flagged for quality issues. Review response patterns before assigning to new projects.`} type="warn" />
        </div>
      )}
    </div>
  )
}
