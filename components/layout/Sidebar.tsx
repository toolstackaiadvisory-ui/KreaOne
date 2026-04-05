'use client'

type Page = 'dashboard' | 'projects' | 'vendors' | 'panel' | 'cati' | 'finance' | 'project-detail'

const NAV_GROUPS = [
  { section: 'Core', items: [
    { id: 'dashboard', label: 'Dashboard',
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></svg>,
      badge: null },
    { id: 'projects', label: 'Projects',
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="5" height="5" rx="1"/><rect x="7" y="1" width="9" height="1.4" rx=".7"/><rect x="7" y="3.5" width="6" height="1.4" rx=".7"/><rect x="0" y="7" width="5" height="5" rx="1"/><rect x="7" y="8" width="9" height="1.4" rx=".7"/><rect x="7" y="10.5" width="6" height="1.4" rx=".7"/></svg>,
      badge: '8' },
  ]},
  { section: 'Supply', items: [
    { id: 'vendors', label: 'Vendors',
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6H2z"/></svg>,
      badge: null },
    { id: 'panel', label: 'Panel',
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="5.5" cy="5" r="2.5"/><circle cx="10.5" cy="5" r="2.5"/><path d=".5 13c0-2.8 2.2-5 5-5s5 2.2 5 5H.5z"/><path d="M8 13c0-2 1-3.7 2.5-4.7A5 5 0 0110.5 8c2.8 0 5 2.2 5 5H8z" opacity=".7"/></svg>,
      badge: null },
  ]},
  { section: 'Fieldwork', items: [
    { id: 'cati', label: 'CATI',
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M3 1.5A1.5 1.5 0 001.5 3v2C1.5 11 5.5 15 11.5 15h2A1.5 1.5 0 0015 13.5v-2A1.5 1.5 0 0013.5 10h-2a1.5 1.5 0 00-1.5 1.5 5 5 0 01-5-5A1.5 1.5 0 006.5 5v-2A1.5 1.5 0 005 1.5H3z"/></svg>,
      badge: null },
  ]},
  { section: 'Finance', items: [
    { id: 'finance', label: 'Finance',
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.5 10.5h-1v-1H6V9h2c.28 0 .5-.22.5-.5S8.28 8 8 8H7A1.5 1.5 0 015.5 6.5 1.5 1.5 0 017 5V4.5h1V5h1.5v1.5H7c-.28 0-.5.22-.5.5s.22.5.5.5h1A1.5 1.5 0 019.5 9a1.5 1.5 0 01-1.5 1.5v.5z"/></svg>,
      badge: null },
  ]},
]

export default function Sidebar({ current, onNav }: { current: Page; onNav: (p: Page) => void }) {
  const active = current === 'project-detail' ? 'projects' : current

  return (
    <aside style={{ width: '224px', minWidth: '224px', background: '#fff', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#FF6A00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(255,106,0,0.3)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" opacity="0.85"/>
              <path d="M9 4L14 9L9 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827', letterSpacing: '-0.3px' }}>
              Krea<span style={{ color: '#FF6A00' }}>One</span>
            </div>
            <div style={{ fontSize: '10px', color: '#9CA3AF', letterSpacing: '0.5px', marginTop: '1px' }}>Research Ops</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
        {NAV_GROUPS.map(group => (
          <div key={group.section}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px', padding: '14px 10px 5px' }}>
              {group.section}
            </div>
            {group.items.map(item => {
              const isActive = active === item.id
              return (
                <button key={item.id} onClick={() => onNav(item.id as Page)} style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '8px 10px', borderRadius: '9px', cursor: 'pointer', border: `1px solid ${isActive ? 'rgba(255,106,0,0.18)' : 'transparent'}`, background: isActive ? 'rgba(255,106,0,0.07)' : 'transparent', color: isActive ? '#FF6A00' : '#6B7280', fontSize: '13px', fontWeight: 500, width: '100%', textAlign: 'left', transition: 'all 0.14s ease', marginBottom: '1px', fontFamily: 'Inter, sans-serif' }}
                  onMouseEnter={e => { if (!isActive) { const el = e.currentTarget; el.style.color = '#374151'; el.style.background = '#F9FAFB' }}}
                  onMouseLeave={e => { if (!isActive) { const el = e.currentTarget; el.style.color = '#6B7280'; el.style.background = 'transparent' }}}
                >
                  <span style={{ width: '16px', height: '16px', flexShrink: 0, opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: '20px', background: isActive ? 'rgba(255,106,0,0.15)' : '#F3F4F6', color: isActive ? '#FF6A00' : '#9CA3AF' }}>{item.badge}</span>}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Alert pill */}
      <div style={{ margin: '4px 10px 8px', padding: '11px 14px', borderRadius: '12px', background: '#FEF2F2', border: '1px solid #FECACA' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#DC2626', display: 'inline-block', flexShrink: 0 }}></span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#B91C1C' }}>2 Active Alerts</span>
        </div>
        <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px', lineHeight: 1.4 }}>IR drop · Quota gap</div>
      </div>

      {/* User */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid #F3F4F6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.14s' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FF6A00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: '#fff', flexShrink: 0 }}>US</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Uma Shankar</div>
            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Operations Lead</div>
          </div>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16A34A', flexShrink: 0 }} />
        </div>
      </div>
    </aside>
  )
}
