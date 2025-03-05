import { PopoverProvider } from './PopoverContext'

export function Popover({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <PopoverProvider>
      <div className={`relative ${className}`}>{children}</div>
    </PopoverProvider>
  )
}
