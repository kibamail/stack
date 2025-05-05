"use client";

import {
  ApplicationLayoutProvider,
  type SidebarState,
} from "@/components/layout/layout.context";
import { DraggableSidebarResizer } from "@/components/layout/sidebar/draggable-sidebar-resizer";
import { FloatingSidebar } from "@/components/layout/sidebar/floating-sidebar";
import {
  DEFAULT_SIDEBAR_WIDTH,
  LeftSidebar,
} from "@/components/layout/sidebar/left-sidebar";
import { Topbar } from "@/components/layout/sidebar/topbar";
import cn from "classnames";
import React from "react";

interface ApplicationLayoutProps extends React.PropsWithChildren {
  isMobile?: boolean;
}

export function ApplicationLayout({
  children,
  isMobile = false,
}: ApplicationLayoutProps) {
  const urlPathname = "";

  const [sidebarState, setSidebarState] = React.useState<SidebarState>(() => ({
    width: DEFAULT_SIDEBAR_WIDTH,
    floating: false,
    offscreen: isMobile,
  }));

  if (urlPathname.includes("composer")) {
    return <>{children}</>;
  }

  return (
    <ApplicationLayoutProvider
      device={{ isMobile }}
      sidebar={sidebarState}
      setSidebar={setSidebarState}
    >
      <Topbar />
      <div
        className={cn("w-full kb-background-secondary flex", {
          "h-screen": !sidebarState.offscreen,
          "h-[calc(100vh-4.25rem)] overflow-y-hidden": sidebarState.offscreen,
        })}
      >
        <LeftSidebar />
        <div
          className={cn("w-full py-2 pr-2 flex", {
            "pl-2": sidebarState.offscreen,
          })}
        >
          <DraggableSidebarResizer />
          <div
            className={cn(
              "w-full rounded-lg border kb-border-tertiary overflow-y-auto",
              {
                "h-[calc(100vh-1rem)]": !sidebarState.offscreen,
              }
            )}
          >
            {children}
          </div>
        </div>
      </div>
      <FloatingSidebar />
    </ApplicationLayoutProvider>
  );
}
