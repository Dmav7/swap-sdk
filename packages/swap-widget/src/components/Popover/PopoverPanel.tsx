import { useEffect, useRef } from 'react'
import { usePopover } from './PopoverContext'
import { useShadowedRootRef } from '@components/ShadowRoot'

type AnchorPosition = 'top' | 'bottom' | 'left' | 'right'

interface PopoverPanelProps {
  children: React.ReactNode
  className?: string
  anchor?: AnchorPosition
}

export function PopoverPanel({ children, className = '', anchor = 'bottom' }: PopoverPanelProps) {
  const { isOpen, setIsOpen } = usePopover()
  const panelRef = useRef<HTMLDivElement>(null)
  const shadowedRootRef = useShadowedRootRef()

  useEffect(() => {
    if (isOpen && shadowedRootRef?.current) {
      const handleShadowedClick = (event: MouseEvent) => {
        if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      shadowedRootRef.current.addEventListener('click', handleShadowedClick)
      return () => {
        shadowedRootRef.current?.removeEventListener('click', handleShadowedClick)
      }
    }
  }, [isOpen, setIsOpen])

  if (!isOpen) return null

  const anchorStyles = {
    bottom: 'top-full',
    top: 'bottom-full',
    left: 'right-full',
    right: 'left-full',
  }

  return (
    <div
      ref={panelRef}
      className={`
        absolute z-50
        ${anchorStyles[anchor]}
        transition-all duration-200 ease-out
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
