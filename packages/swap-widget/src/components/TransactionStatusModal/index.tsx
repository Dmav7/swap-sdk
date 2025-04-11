import Modal from '@components/Modal'
import TransactionPending from './TransactionPending'
import TransactionConfirmed from './TransactionConfirmed'

export interface TransactionStatusModalProps {
  isOpen: boolean
  onClose: VoidFunction
  pendingText?: string
  txHash?: string
}

export default function TransactionStatusModal({ txHash, pendingText, isOpen, onClose }: TransactionStatusModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {txHash ? <TransactionConfirmed txHash={txHash} /> : <TransactionPending text={pendingText} />}
    </Modal>
  )
}
