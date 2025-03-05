import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const ShadowedRootRefContext = createContext<React.RefObject<HTMLDivElement> | null>(null)

export function useShadowedRootRef() {
  return useContext(ShadowedRootRefContext)
}

export function ShadowRoot({ children, mode = 'open' }: { children: React.ReactNode; mode: ShadowRootMode }) {
  const [shadowRootReady, setShadowRootReady] = useState(false)

  const hostRef = useRef<HTMLDivElement>(null)
  const shadowRootRef = useRef<ShadowRoot>()
  const shadowedRootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hostRef.current && !shadowRootRef.current) {
      const shadowRoot = hostRef.current.attachShadow({ mode })
      shadowRootRef.current = shadowRoot
      setShadowRootReady(true)
    }
  }, [])

  return (
    <div ref={hostRef}>
      <ShadowedRootRefContext.Provider value={shadowedRootRef}>
        {shadowRootReady &&
          shadowRootRef.current &&
          createPortal(<div ref={shadowedRootRef}>{children}</div>, shadowRootRef.current)}
      </ShadowedRootRefContext.Provider>
    </div>
  )
}
