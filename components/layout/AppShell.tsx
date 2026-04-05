'use client'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Dashboard from '@/components/dashboard/Dashboard'
import Projects from '@/components/projects/Projects'
import ProjectDetail from '@/components/projects/ProjectDetail'
import Vendors from '@/components/vendors/Vendors'
import Panel from '@/components/panel/Panel'
import CatiDashboard from '@/components/cati/CatiDashboard'
import Finance from '@/components/finance/Finance'

export type Page = 'dashboard' | 'projects' | 'project-detail' | 'vendors' | 'panel' | 'cati' | 'finance'

const PAGE_TITLES: Record<Page, string> = {
  dashboard: 'Dashboard', projects: 'Projects', 'project-detail': 'Projects',
  vendors: 'Vendor Management', panel: 'Panel Management', cati: 'CATI Dashboard', finance: 'Finance',
}

export default function AppShell() {
  const [page, setPage]         = useState<Page>('dashboard')
  const [projectId, setProjectId] = useState<number>(1)
  const [projectName, setProjectName] = useState('')

  const navigate = (p: Page, id?: number, name?: string) => {
    if (id   !== undefined) setProjectId(id)
    if (name !== undefined) setProjectName(name)
    setPage(p)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F9FAFB' }}>
      <Sidebar current={page === 'project-detail' ? 'projects' : page as any} onNav={(p) => navigate(p)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* ── TOPBAR ─────────────────────────────────────────────────────── */}
        <header style={{ height: '58px', minHeight: '58px', background: '#fff', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>

          {/* Breadcrumb */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>{PAGE_TITLES[page]}</span>
            {page === 'project-detail' && projectName && (
              <>
                <span style={{ color: '#D1D5DB', fontSize: '14px' }}>›</span>
                <span style={{ fontSize: '13px', color: '#6B7280', maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{projectName}</span>
              </>
            )}
          </div>

          {/* Live pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '20px', background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            <span className="live-dot"></span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#15803D' }}>4 Live</span>
          </div>

          {/* Date */}
          <span style={{ fontSize: '12px', color: '#9CA3AF', padding: '5px 12px', borderRadius: '8px', background: '#F9FAFB', border: '1px solid #E5E7EB' }}>Apr 4, 2025</span>

          {/* Search */}
          <button style={{ width: '36px', height: '36px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#F9FAFB', border: '1px solid #E5E7EB', color: '#9CA3AF', transition: 'all 0.14s' }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = '#F3F4F6'; el.style.color = '#6B7280' }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = '#F9FAFB'; el.style.color = '#9CA3AF' }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><path d="M6.5 1a5.5 5.5 0 100 11A5.5 5.5 0 006.5 1zM0 6.5a6.5 6.5 0 1111.74 3.83l2.96 2.96-.7.71-2.97-2.97A6.5 6.5 0 010 6.5z"/></svg>
          </button>

          {/* Notifications */}
          <button style={{ width: '36px', height: '36px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#FFF0F0', border: '1px solid #FECACA', color: '#DC2626', transition: 'all 0.14s', position: 'relative' }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><path d="M7.5 0a1 1 0 011 1 4.5 4.5 0 013.5 4.4V8.5l1.3 2H1.7L3 8.5V5.4A4.5 4.5 0 016.5 1a1 1 0 011-1zM6 12.5h3a1.5 1.5 0 01-3 0z"/></svg>
            <span style={{ position: 'absolute', top: '7px', right: '7px', width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626', border: '1.5px solid #fff' }}></span>
          </button>

          <div style={{ width: '1px', height: '24px', background: '#E5E7EB' }} />

          {/* User avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#FF6A00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: '#fff', boxShadow: '0 0 0 2px rgba(255,106,0,0.2)' }}>US</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>Uma Shankar</span>
              <span style={{ fontSize: '10px', color: '#9CA3AF' }}>Operations Lead</span>
            </div>
          </div>
        </header>

        {/* ── CONTENT ─────────────────────────────────────────────────────── */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px', background: '#F9FAFB' }}>
          {page === 'dashboard'      && <Dashboard onNavigate={navigate} />}
          {page === 'projects'       && <Projects onNavigate={navigate} />}
          {page === 'project-detail' && <ProjectDetail projectId={projectId} onBack={() => navigate('projects')} />}
          {page === 'vendors'        && <Vendors />}
          {page === 'panel'          && <Panel />}
          {page === 'cati'           && <CatiDashboard />}
          {page === 'finance'        && <Finance />}
        </main>
      </div>
    </div>
  )
}
