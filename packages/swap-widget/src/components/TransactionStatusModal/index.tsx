import Modal from '@components/Modal'
import TransactionPending from './TransactionPending'
import TransactionConfirmed from './TransactionConfirmed'

export interface TransactionStatusModalProps {
  isOpen: boolean
  onClose: VoidFunction
  swapText: string
  txHash?: string
}

export default function TransactionStatusModal({ txHash, swapText, isOpen, onClose }: TransactionStatusModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {txHash ? <TransactionConfirmed txHash={txHash} /> : <TransactionPending swapText={swapText} />}
    </Modal>
  )
}
