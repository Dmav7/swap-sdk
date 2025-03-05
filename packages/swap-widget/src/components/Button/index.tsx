import { Button as HeadlessButton } from '@headlessui/react'

import s from './button.module.css'

export function Button({
  className,
  children,
  onClick,
}: {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <HeadlessButton className={className ?? s.button} onClick={onClick}>
      {children}
    </HeadlessButton>
  )
}
