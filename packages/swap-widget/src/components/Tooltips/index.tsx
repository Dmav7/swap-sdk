import { ReactNode } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '../Popover'
import Question from '@icons/Question.svg?react'

export default function Tooltips({ tooltips }: { tooltips: ReactNode }) {
  return (
    <Popover>
      <PopoverButton className="flex items-center">
        <Question width={24} height={24} />
      </PopoverButton>

      <PopoverPanel anchor="top" className="min-w-80 mt-2 bg-gray-900 text-white rounded-lg py-2 px-2">
        {tooltips}
      </PopoverPanel>
    </Popover>
  )
}
