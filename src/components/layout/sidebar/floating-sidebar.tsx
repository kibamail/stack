import { useApplicationLayoutContext } from '@/components/layout/layout.context'
import { SidebarContent } from './sidebar-content'
import cn from 'classnames'
import React from 'react'

export function FloatingSidebar() {
  const menuRef = React.useRef<HTMLDivElement | null>(null)
  const slideInSidebarTriggerRef = React.useRef<HTMLDivElement | null>(null)

  const { sidebar, setSidebar, device: {isMobile} } = useApplicationLayoutContext('FloatingSidebar')

  function onMouseEnter() {
    setVisible(true)
  }

  function setVisible(visible: boolean) {
    setSidebar((current) => ({ ...current, floating: visible }))
  }

  function onMouseLeave(event: React.MouseEvent<HTMLDivElement>) {
    const workspacesDropdownMenuTrigger = document.querySelector(
      '#floating-sidebar-dropdown-menu-trigger',
    )

    const workspacesDropdownMenuContent = document.querySelector(
      '#floating-sidebar-dropdown-menu-content',
    )

    if (
      workspacesDropdownMenuTrigger?.contains(event.target as Node) ||
      workspacesDropdownMenuTrigger === event.target
    ) {
      return
    }

    if (
      workspacesDropdownMenuContent?.contains(event.target as Node) ||
      workspacesDropdownMenuContent === event.target
    ) {
      return
    }

    setVisible(false)

    return
  }

  function hideFloatingSidebar(event: React.MouseEvent) {
    setVisible(false)
  }

  const OverlayElement = isMobile ? 'div' : 'button'
  const OverlayInnerElement = isMobile ? 'button' : 'div'

  return (
    <>
      {sidebar.offscreen ? (
        <div
          onMouseMove={onMouseEnter}
          ref={slideInSidebarTriggerRef}
          className="absolute hidden lg:block h-[calc(100vh-6rem)] top-16 bg-transparent z-50 -left-2 w-6"
        />
      ) : null}
      <OverlayElement
        type="button"
        tabIndex={0}
        onClick={isMobile ? undefined : hideFloatingSidebar}
        onKeyDown={(e) =>
          e.key === 'Escape' && hideFloatingSidebar(e as unknown as React.MouseEvent)
        }
        className={cn(
          'w-full h-screen bg-[rgba(17,17,17,0.10)] transition-opacity ease-in-out duration-200 absolute top-0 pl-2 left-0 z-[5] py-6 flex items-center border-0',
          {
            'pointer-events-none opacity-0': !sidebar.floating,
            'pointer-events-auto opacity-100': sidebar.floating,
          },
        )}
      >
        <OverlayInnerElement
          type="button"
          onClick={hideFloatingSidebar}
          onKeyDown={(e) =>
            e.key === 'Escape' && hideFloatingSidebar(e as unknown as React.MouseEvent)
          }
          tabIndex={0}
          className="absolute lg:hidden w-[calc(100vw-256px)] right-0 h-screen bg-transparent border-0"
        />
      </OverlayElement>
      <div
        ref={menuRef}
        onMouseLeave={isMobile ? undefined : onMouseLeave}
        style={{
          transform: `translateX(${sidebar.floating ? '0px' : '-284px'})`,
        }}
        className="h-[calc(100vh-2rem)] mt-4 absolute left-4 top-0 z-20 transition-transform duration-300 kb-background-secondary w-64 p-2 flex flex-col rounded-2xl shadow-[0px_16px_24px_-8px_var(--black-10)]"
      >
        <SidebarContent rootId="floating-sidebar" />
      </div>
    </>
  )
}
