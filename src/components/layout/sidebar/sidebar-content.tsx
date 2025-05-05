import { useApplicationLayoutContext } from '@/components/layout/layout.context'
import { FooterMenuItems } from './footer-menu-items'
import { SearchBoxTrigger } from '@/components/layout/sidebar/search-box-trigger'
import { SubmenuItemLink } from '@/components/layout/submenu-item-link'
import { WorkspacesDropdownMenu } from '@/components/layout/workspace-menu-dropdown'
import { BookStackIcon } from '@/components/icons/book-stack.svg'
import { ChatBubbleEmptyIcon } from '@/components/icons/chat-bubble-empty.svg'
import { HelpCircleIcon } from '@/components/icons/help-circle.svg'
import { HomeAltSlimHorizIcon } from '@/components/icons/home-alt-slim-horiz'
import { EngageIcon } from '@/components/icons/products/engage.svg'
import { InsightsIcon } from '@/components/icons/products/insights.svg'
import { OptimiseIcon } from '@/components/icons/products/optimise.svg'
import { SendIcon } from '@/components/icons/products/send.svg'
import { SidebarCollapseIcon } from '@/components/icons/sidebar-collapse.svg'
import { Button } from '@kibamail/owly/button'
import { Progress, type ProgressProps } from '@kibamail/owly/progress'
import { Text } from '@kibamail/owly/text'

interface SidebarContentProps {
  rootId: string
}

export function getProgressBarVariant(percentageSpent: number): ProgressProps['variant'] {
  if (percentageSpent > 80) {
    return 'error'
  }

  if (percentageSpent > 50) {
    return 'warning'
  }

  return 'info'
}

export function SidebarContent({ rootId }: SidebarContentProps) {
    const team = {
        id: 'kibamail',
        name: 'kibamail'
    }
  const { setSidebar, device: {isMobile} } = useApplicationLayoutContext('Sidebar')

  function setSidebarOffscreen() {
    if (isMobile) {
      setSidebar((current) => ({ ...current, floating: false }))

      return
    }

    setSidebar((current) => ({ ...current, offscreen: true }))
  }

  return (
    <>
      <div id={`${rootId}-content`} className="flex-grow w-full">
        <div className="py-2 px-1 flex items-center gap-x-2">
          <WorkspacesDropdownMenu rootId={rootId} />

          <button
            aria-label="Collapse sidebar"
            className="kb-reset"
            type="button"
            onClick={setSidebarOffscreen}
          >
            <SidebarCollapseIcon className="kb-content-tertiary-inverse" />
          </button>
        </div>

        <div className="my-3">
          <SearchBoxTrigger />
        </div>

        <div className="flex flex-col">
          <SubmenuItemLink href={'/'}>
            <BookStackIcon className="w-5 h-5" />
            <Text className="kb-content-secondary font-medium">Get Started</Text>
          </SubmenuItemLink>

          <SubmenuItemLink href={'/dashboard'}>
            <HomeAltSlimHorizIcon className="w-5 h-5" />
            <Text className="kb-content-secondary font-medium">Dashboard</Text>
          </SubmenuItemLink>
        </div>

        <div className="mt-4 mb-2.5">
          <span className="px-2 py-1.5">
            <Text size="sm" className="kb-content-secondary uppercase">
              CONTENT
            </Text>
          </span>
        </div>

        <div className="flex flex-col">
          {/* RENDER SIDEBAR CONTENT HERE */}
        </div>
      </div>

      <div className="justify-end px-2 py-2 flex flex-col gap-y-2">
        <svg
          width={228}
          height={1}
          viewBox="0 0 228 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-4"
          role="img"
          aria-label="divider"
        >
          <line y1="0.5" x2={228} y2="0.5" stroke="#E0DCD9" strokeDasharray="4 4" />
        </svg>

        <div className="flex items-center justify-between">
          <FooterMenuItems />
        </div>
      </div>
    </>
  )
}
