import { Switch as SwitchHeandlessui } from '@headlessui/react'
import clsx from 'clsx'

interface SwitchProps {
  enabled: boolean
  disabled?: boolean
  setEnabled?: (enabled: boolean) => void
}

const Switch = ({ enabled, setEnabled, disabled }: SwitchProps) => {
  return (
    <SwitchHeandlessui
      checked={enabled}
      onChange={setEnabled}
      className={clsx(
        'group relative flex h-6 w-11 cursor-pointer rounded-full bg-gray-200 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-primary',
        {
          'cursor-not-allowed bg-gray': disabled,
        },
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
      />
    </SwitchHeandlessui>
  )
}

export default Switch
