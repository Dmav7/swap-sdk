import { createContext, useContext, useState } from 'react'

type PopoverContextType = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined)

export const usePopover = () => {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('usePopover must be used within a PopoverProvider')
  }
  return context
}

export const PopoverProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  return <PopoverContext.Provider value={{ isOpen, setIsOpen }}>{children}</PopoverContext.Provider>
}
