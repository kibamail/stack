import { SignoutForm } from '@/components/layout/signout-form'
import { CheckIcon } from '@/components/icons/check.svg'
import { NavArrowDownIcon } from '@/components/icons/nav-arrow-down.svg'
import { PlusIcon } from '@/components/icons/plus.svg'
import { SettingsIcon } from '@/components/icons/settings.svg'
import { UserPlusIcon } from '@/components/icons/user-plus.svg'
import { UserIcon } from '@/components/icons/user.svg'
import { Text } from '@kibamail/owly/text'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import cn from 'classnames'
import React from 'react'

interface WorkspacesDropdownMenuProps {
  rootId: string
}

export function WorkspacesDropdownMenu({ rootId }: WorkspacesDropdownMenuProps) {

    const allUserTeams: any[] = []
    
    const team = {
        id: 'kibamail',
        name: 'Kibamail'
    }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          id={`${rootId}-dropdown-menu-trigger`}
          data-testid={`${rootId}-dropdown-menu-trigger`}
          className="flex-grow flex items-center border transition ease-in-out border-transparent hover:bg-[var(--background-hover)] focus:outline-none focus-within:border-[var(--border-focus)] p-1 rounded-lg"
        >
          <span className="flex-grow flex items-center">
            <TeamAvatar name={team?.name} size="md" />

            <Text className="kb-content-primary truncate capitalize">{team?.name}</Text>
          </span>

          <NavArrowDownIcon
            aria-hidden
            className="ml-1 w-4 h-4 kb-content-tertiary-inverse"
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        sideOffset={8}
        align="start"
        id={`${rootId}-dropdown-menu-content`}
        className="border workspaces-dropdown-menu kb-border-tertiary absolute rounded-xl p-1 shadow-[0px_16px_24px_-8px_var(--black-10)] kb-background-primary w-[17.5rem] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 z-50"
      >
        <DropdownMenu.RadioGroup value={team?.id}>
          {allUserTeams?.map((team) => (
            <DropdownMenu.RadioItem key={team?.id} value={team?.id} asChild>
              <a
                data-testid={`${rootId}-switch-team-id-${team?.id}`}
                href={'/teams/switch/:id'}
                className="p-2 flex items-center hover:bg-[var(--background-secondary)] rounded-lg cursor-pointer"
              >
                <TeamAvatar name={team?.name} size="sm" />
                <Text className="kb-content-secondary capitalize">{team?.name}</Text>

                <DropdownMenu.ItemIndicator className="ml-auto">
                  <CheckIcon className="w-5 h-5 kb-content-secondary" />
                </DropdownMenu.ItemIndicator>
              </a>
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>

        <DropdownMenu.Item className="p-2 flex items-center hover:bg-[var(--background-secondary)] rounded-lg cursor-pointer">
          <PlusIcon className="mr-1.5 w-5 h-5 kb-content-tertiary" />
          <Text>New workspace</Text>
        </DropdownMenu.Item>

        <DropdownMenu.Separator className="my-1 h-px bg-[var(--black-5)]" />

        <DropdownMenu.Item className="p-2 flex items-center hover:bg-[var(--background-secondary)] rounded-lg cursor-pointer">
          <UserPlusIcon className="mr-1.5 w-5 h-5 kb-content-tertiary" />
          <Text>Invite member</Text>
        </DropdownMenu.Item>

        <DropdownMenu.Separator className="my-1 h-px bg-[var(--black-5)]" />

        <DropdownMenu.Item className="p-2 flex items-center hover:bg-[var(--background-secondary)] rounded-lg cursor-pointer">
          <SettingsIcon className="mr-1.5 w-5 h-5 kb-content-tertiary" />
          <Text>Team settings</Text>
        </DropdownMenu.Item>

        <DropdownMenu.Item className="p-2 flex items-center hover:bg-[var(--background-secondary)] rounded-lg cursor-pointer">
          <UserIcon className="mr-1.5 w-5 h-5 kb-content-tertiary" />
          <Text>Account settings</Text>
        </DropdownMenu.Item>

        <DropdownMenu.Separator className="my-1 h-px bg-[var(--black-5)]" />

        <SignoutForm />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

interface TeamAvatarProps {
  size: 'sm' | 'md'
  name?: string
}

function TeamAvatar({ size, name }: TeamAvatarProps) {
  return (
    <span
      className={cn(
        'mr-1.5 text-sm shadow-[0px_0px_0px_1px_rgba(0,0,0,0.10)_inset] kb-background-info rounded-lg flex items-center justify-center kb-content-primary-inverse uppercase',
        {
          'w-5 h-5': size === 'sm',
          'w-6 h-6': size === 'md',
        },
        getTeamAvatarBackgroundColor(name?.[0] ?? ''),
      )}
    >
      {name?.[0]}
    </span>
  )
}

function getTeamAvatarBackgroundColor(firstCharacter: string) {
  const colors = [
    'kb-background-info',
    'kb-background-positive',
    'kb-background-negative',
    'kb-background-warning',
    'kb-background-highlight',
  ]

  const asciiValue = firstCharacter.charCodeAt(0)
  const index = (asciiValue - 97) % colors.length

  return colors[index] ?? colors?.[0]
}
