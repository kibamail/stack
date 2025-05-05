import React from 'react'
import { useApplicationLayoutContext } from '@/components/layout/layout.context'
import { FooterMenuItems } from '@/components/layout/sidebar/footer-menu-items'
import { SearchBoxTrigger } from './search-box-trigger'
import { WorkspacesDropdownMenu } from '@/components/layout/workspace-menu-dropdown'
import { SidebarExpandIcon } from '@/components/icons/sidebar-expand.svg'

export function Topbar() {
  const { sidebar, setSidebar, device: {isMobile} } = useApplicationLayoutContext('Topbar')
  const [topbarVisible, setTopbarVisible] = React.useState(() => isMobile)

  function setSidebarOnScreen() {
    if (isMobile) {
      setSidebar((current) => ({ ...current, floating: true }))

      return
    }

    setSidebar((current) => ({ ...current, offscreen: false }))
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTopbarVisible(sidebar.offscreen)
    }, 200)

    return () => clearTimeout(timer)
  }, [sidebar.offscreen])

  return (
    <nav
      className="w-full lg:h-16 box-border px-2 py-4 flex items-center relative"
      style={{
        transition: 'margin-top 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        marginTop: topbarVisible ? '0px' : '-64px',
      }}
    >
      <button
        type="button"
        aria-label="Expand sidebar"
        className="kb-reset"
        onClick={setSidebarOnScreen}
      >
        <SidebarExpandIcon className="kb-content-tertiary-inverse" />
      </button>

      <div className="ml-2 max-w-[8.25rem]">
        <WorkspacesDropdownMenu rootId="topbar-workspaces" />
      </div>

      <div className="max-w-md hidden lg:flex w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center">
        <SearchBoxTrigger />
      </div>

      <div className="ml-auto hidden lg:flex items-center gap-x-4">
        <FooterMenuItems />
      </div>
    </nav>
  )
}
