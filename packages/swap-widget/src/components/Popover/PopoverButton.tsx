import { usePopover } from './PopoverContext'

export function PopoverButton({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { isOpen, setIsOpen } = usePopover()

  return (
    <button type="button" onClick={() => setIsOpen(!isOpen)} className={className}>
      {children}
    </button>
  )
}
