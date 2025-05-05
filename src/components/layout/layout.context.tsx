import {createContext} from '@radix-ui/react-context'

export type SidebarState = {
  width: number
  floating: boolean
  offscreen: boolean
}

export type DeviceState = {
  isMobile: boolean
}

export const [ApplicationLayoutProvider, useApplicationLayoutContext] =
  createContext<{
    sidebar: SidebarState
    setSidebar: React.Dispatch<React.SetStateAction<SidebarState>>
    device: DeviceState
  }>('ApplicationLayout')
