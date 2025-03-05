import { useCallback } from 'react'
import Modal from '@components/Modal'
import { TradeRoute } from '@vvs-finance/swap-sdk'
import { BUILT_IN_TOKENS } from '@config/tokens'
import { useWidgetWallet } from '@states/wallet'
import { TokenLogo } from '@components/TokenLogo'

export interface RoutePathModalProps {
  isOpen: boolean
  onClose: VoidFunction
  routes: TradeRoute[]
}

const RoutePathModal = ({ routes, isOpen, onClose }: RoutePathModalProps) => {
  const { supportedChainId } = useWidgetWallet()

  const getLogo = useCallback(
    (address: string) =>
      BUILT_IN_TOKENS[supportedChainId].find(
        (token) => token.address.toLowerCase() === address.toLowerCase(),
        [supportedChainId],
      ),
    [supportedChainId],
  )

  return (
    <Modal title="Route" isOpen={isOpen} onClose={onClose}>
      {routes.map((route, index) => (
        <div key={index} className="flex flex-col justify-between mt-4">
          <div className="relative">
            <div className="w-full border-dashed border-t-[3px] absolute top-1/3 left-0 z-[-1]" />

            <div className="flex justify-between">
              <div className="flex flex-col">
                <div className="bg-white">
                  <TokenLogo tokenConfig={getLogo(route.path[0].address)} />
                </div>
                <div className="font-bold text-base">
                  {route.percentage.mul(100).toFixed(2, {
                    trailingZeros: false,
                  })}
                  %
                </div>
              </div>

              {route.pool?.map((pool) => {
                const token0Config = getLogo(pool.token0.address)
                const token1Config = getLogo(pool.token1.address)

                return (
                  <div key={pool.address} className="flex flex-col items-center justify-around">
                    <div className="flex justify-between items-center mt-1">
                      <TokenLogo tokenConfig={token0Config} /> <TokenLogo tokenConfig={token1Config} />
                    </div>

                    <div>{pool.version.split('_')?.[0]}</div>
                  </div>
                )
              })}

              <div className="bg-white">{<TokenLogo tokenConfig={getLogo(route.path[1].address)} />}</div>
            </div>
          </div>
        </div>
      ))}
    </Modal>
  )
}

export default RoutePathModal
