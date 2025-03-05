import Tick from '@icons/Tick.svg?react'
import clsx from 'clsx'

export interface CheckboxProps {
  enabled: boolean
  onClick: (enabled: boolean) => void
}

function Checkbox({ enabled, onClick }: CheckboxProps) {
  return (
    <div
      className={clsx(
        'w-[24px] h-[24px] rounded-[4px] border-[1px] cursor-pointer',
        enabled ? 'flex justify-center items-center bg-primary' : 'bg-beige',
      )}
      onClick={() => onClick(!enabled)}
    >
      {enabled ? <Tick width={10} height={10} /> : null}
    </div>
  )
}

export default Checkbox
