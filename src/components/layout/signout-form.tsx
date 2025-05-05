import { LogoutIcon } from '@/components/icons/logout.svg'
import { Text } from '@kibamail/owly/text'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export function SignoutForm() {
  return (
      <DropdownMenu.Item className="rounded-lg">
        <button
          type="submit"
          className="p-2 flex w-full items-center hover:bg-[var(--background-secondary)] rounded-lg cursor-pointer"
        >
          <LogoutIcon className="mr-1.5 w-5 h-5 kb-content-tertiary" />
          <Text>Sign out</Text>
        </button>
      </DropdownMenu.Item>
  )
}
