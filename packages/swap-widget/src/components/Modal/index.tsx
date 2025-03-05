import { ReactNode, useEffect, useRef } from 'react'
import Close from '@icons/Close.svg?react'

export interface ModalProps {
  title?: string
  isOpen: boolean
  onClose: VoidFunction
  children: ReactNode
}

function Modal({ title, children, isOpen, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="relative z-10 focus:outline-none w-screen h-screen p-4 bg-transparent backdrop:bg-black/25 text-black"
      onClick={handleBackdropClick}
    >
      <div className="flex min-h-full items-center justify-center">
        <div className="w-full max-w-[343px] rounded-xl bg-white shadow-md p-5 backdrop-blur-2xl">
          <div className="w-full flex justify-end items-center">
            <div className="w-full text-center text-[28px] font-normal text-black">{title}</div>
            <Close className="cursor-pointer" onClick={onClose} />
          </div>

          <div>{children}</div>
        </div>
      </div>
    </dialog>
  )
}

export default Modal
