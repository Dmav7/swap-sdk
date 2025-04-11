import { useEffect, useState, ReactNode, useCallback, useMemo } from 'react'
import clsx from 'clsx'

import ArrowUpDown from '@icons/Switch.svg?react'
import ArrowLeftRight from '@icons/SwitchX.svg?react'
import Settings from '@icons/Settings.svg?react'
import VVSLogo from '@icons/VVSLogo.svg?react'
import ChevronDownIcon from '@icons/ChevronDown.svg?react'
import Metamask from '@icons/Metamask.svg?react'
import Search from '@icons/Search.svg?react'
import SelectTokenModal from '@components/SelectTokenModal'
import WalletConnectModal from '@components/WalletConnectModal'
import SwapConfirmModal from '@components/SwapConfirmModal'
import TransactionStatusModal from '@components/TransactionStatusModal'
import SettingModal from '@components/SettingModal'
import { WalletAccountPopover } from '@components/WalletAccountPopover'
import Switch from '@components/Switch'
import useTokenUsdcPrice, { useAdapterNativeToken } from '@states/useTokenUsdcPrice'
import Toast from '@components/Toast'
import Tooltips from '@components/Tooltips'

import { useWidgetWallet, watchAsset } from '@states/wallet'
import { TokenConfig } from '@config/tokens'
import { TokenLogo } from '@components/TokenLogo'
import { BuiltInChainId, executeTrade, TradeType, utils, wrapNative, unwrapNative } from '@vvs-finance/swap-sdk'
import { useBestTrade } from '@states/useBestTrade'
import getWatchAssetParameters from '@utils/getWatchAssetParameters'
import computePriceImpact from '@utils/computePriceImpact'
import RoutePathModal from '@components/RoutePathModal'
import useSettings from '@states/useSettings'
import useTransactionDeadline from '@states/useTransactionDeadline'
import { useTokenBalance } from '@states/balance'
import { Fraction } from 'bi-fraction'
import { useErc20Approval } from '@states/useErc20Approval'
import { TransactionResponse } from 'ethers'

export interface SwapWidgetComponentProps {
  inputToken?: TokenConfig
  outputToken?: TokenConfig
  tokens?: TokenConfig[]
  getQuoteApiClientId: (chainId: number) => string
  onRequestWalletConnection?: () => void

  /**
  chain to use when widget's built-in web3 is connecting to wallet
  */
  selfConnectingChainId?: BuiltInChainId
}

export const SwapWidgetComponent: React.FC<SwapWidgetComponentProps> = ({
  inputToken: inputTokenFromProps,
  outputToken: outputTokenFromProps,
  tokens: tokensFromProps,
  getQuoteApiClientId,
  onRequestWalletConnection,
  selfConnectingChainId,
}) => {
  const { account, supportedChainId, signer } = useWidgetWallet()

  const [otherWallet, setOtherWallet] = useState<Undefined<string>>(undefined)
  const [isValidAddress, setIsValidAddress] = useState(true)
  const [enabled, setEnabled] = useState(false)
  const [isReservePrice, setReversePrice] = useState(false)

  const [inputToken, setInputToken] = useState<Undefined<TokenConfig>>(inputTokenFromProps)
  const [outputToken, setOutputToken] = useState<Undefined<TokenConfig>>(outputTokenFromProps)

  const [inputAmount, setInputAmount] = useState('')
  const [outputAmount, setOutputAmount] = useState('')
  const [tradeType, setTradeType] = useState(TradeType.EXACT_INPUT)

  const { slippageTolerance, txSpeed, maxHops, maxSplits, poolTypes } = useSettings()

  const deadline = useTransactionDeadline()

  const isWrappedNativeToken = useMemo(
    () =>
      inputToken?.address === utils.getNativeTokenInfo(supportedChainId).address &&
      outputToken?.address === utils.getWrappedNativeTokenInfo(supportedChainId).address,
    [inputToken, outputToken, supportedChainId],
  )

  const isUnWrappedNativeToken = useMemo(
    () =>
      inputToken?.address === utils.getWrappedNativeTokenInfo(supportedChainId).address &&
      outputToken?.address === utils.getNativeTokenInfo(supportedChainId).address,
    [inputToken, outputToken, supportedChainId],
  )

  const isWrappedOrUnWrappedNativeToken = useMemo(
    () => isWrappedNativeToken || isUnWrappedNativeToken,
    [isWrappedNativeToken, isUnWrappedNativeToken],
  )

  const bestTrade = useBestTrade(
    tradeType === TradeType.EXACT_INPUT ? inputAmount : outputAmount,
    {
      chainId: supportedChainId,
      inputTokenAddress: inputToken?.address,
      outputTokenAddress: outputToken?.address,
      getQuoteApiClientId,
    },
    {
      tradeType,
      slippageTolerance: slippageTolerance / 100,
      maxHops,
      maxSplits,
      poolTypes,
    },
  )

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isInputSelectTokenModalOpen, setIsInputSelectTokenModalOpen] = useState(false)
  const [isOutputSelectTokenModalOpen, setIsOutputSelectTokenModalOpen] = useState(false)
  const [isOpenSettingModal, setOpenSettingModal] = useState(false)
  const [isOpenRoutePathModal, setIsOpenRoutePathModal] = useState(false)
  const [toast, setToast] =
    useState<Undefined<{ status: 'success' | 'fail'; text: string; txHash?: string }>>(undefined)
  const [tradeTxStatus, setTradeTxStatus] = useState<Undefined<{ text: string; txHash?: string }>>(undefined)

  useEffect(() => {
    setInputToken(inputTokenFromProps)
  }, [supportedChainId, inputTokenFromProps])
  useEffect(() => {
    setOutputToken(outputTokenFromProps)
  }, [supportedChainId, outputTokenFromProps])

  useEffect(() => {
    const trade = bestTrade.data
    if (trade && !isWrappedOrUnWrappedNativeToken) {
      if (trade.type === TradeType.EXACT_INPUT) {
        setOutputAmount(trade.amountOut.amount.toFixed(2))
      } else {
        setInputAmount(trade.amountIn.amount.toFixed(2))
      }
    } else if (trade && isWrappedOrUnWrappedNativeToken) {
      if (trade.type === TradeType.EXACT_INPUT) {
        setOutputAmount(trade.amountIn.amount.toFixed(2))
      } else {
        setInputAmount(trade.amountOut.amount.toFixed(2))
      }
    }
  }, [bestTrade.data, isWrappedOrUnWrappedNativeToken])

  const exchangeInputAndOutputToken = () => {
    setInputToken(outputToken)
    setOutputToken(inputToken)
    if (tradeType === TradeType.EXACT_INPUT) {
      setOutputAmount(inputAmount)
      setTradeType(TradeType.EXACT_OUTPUT)
    } else {
      setInputAmount(outputAmount)
      setTradeType(TradeType.EXACT_INPUT)
    }
  }

  const inputTokenAddress = useAdapterNativeToken(inputToken?.address ?? '')
  const outputTokenAddress = useAdapterNativeToken(outputToken?.address ?? '')

  const { data, mutate: refetch } = useTokenUsdcPrice([inputTokenAddress, outputTokenAddress])

  const priceImpact = computePriceImpact(bestTrade.data, data ?? [])

  const inputTokenBalance = useTokenBalance(inputToken)
  const outputTokenBalance = useTokenBalance(outputToken)

  const getMinReceivedOrMaxSold = useMemo(() => {
    if (bestTrade.data?.slippage.type === 'minimumReceived') {
      return bestTrade.data.slippage.minimumReceived
    } else if (bestTrade.data?.slippage.type === 'maximumSold') {
      return bestTrade.data.slippage.maximumSold
    }
  }, [bestTrade])

  const tradeTypeLabel = useMemo(
    () => (tradeType === TradeType.EXACT_INPUT ? 'Minimum Received' : 'Maximum Sold'),
    [tradeType],
  )

  const getPairPrice = useCallback(
    () =>
      !isReservePrice
        ? new Fraction(data?.[0] ?? 0).div(data?.[1] ?? 1)
        : new Fraction(data?.[1] ?? 0).div(data?.[0] ?? 1),
    [data, isReservePrice],
  )

  const { isApprovalNeeded, isApprovalLoading, approve, isApproving } = useErc20Approval(bestTrade.data)

  const tryTxActionWithToast = async (action: () => Promise<void | [tx: TransactionResponse, msg: string]>) => {
    try {
      const txMsg = await action()
      if (txMsg) {
        const [tx, msg] = txMsg
        await tx.wait()
        setToast({ status: 'success', text: msg, txHash: tx.hash })
      }
    } catch (error) {
      console.error(error)
      setToast({
        status: 'fail',
        text: typeof error === 'string' ? error : error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  const tradeMsg = (verb: string) =>
    `${verb} ${inputAmount} ${inputToken?.symbol} to ${outputAmount} ${outputToken?.symbol}`

  const [actionBtnLabel, handleActionBtnClick] = ((): [string] | [string, () => void] => {
    if (!account || !signer)
      return [
        'Connect Wallet',
        () => {
          if (onRequestWalletConnection) {
            return onRequestWalletConnection()
          } else {
            setIsWalletModalOpen(true)
          }
        },
      ]

    if (!inputToken || !outputToken) return ['Select Token']
    if (!inputAmount || !outputAmount) return ['Input Amount']

    if (!bestTrade.data || isApprovalLoading) return ['Loading...']
    const bestTradeData = bestTrade.data

    const isInsufficientBalance =
      tradeType === TradeType.EXACT_INPUT
        ? new Fraction(inputAmount).gt(inputTokenBalance?.data ?? 0)
        : new Fraction(outputAmount).gt(outputTokenBalance?.data ?? 0)
    if (isInsufficientBalance) return ['Insufficient Balance']

    if (isWrappedNativeToken)
      return [
        'Wrap',
        () => {
          tryTxActionWithToast(async () => {
            setTradeTxStatus({ text: tradeMsg('Wrapping') })
            const tx = await wrapNative(
              supportedChainId,
              BigInt(
                bestTradeData.amountIn.amount
                  .shl(utils.getNativeTokenInfo(supportedChainId)?.decimals ?? 18)
                  .toPrecision(),
              ),
              signer,
              { gasPrice: txSpeed },
            )
            setTradeTxStatus((status) => ({ ...status!, txHash: tx.hash }))
            return [tx, tradeMsg('Wrapped')]
          })
        },
      ]
    if (isUnWrappedNativeToken)
      return [
        'Unwrap',
        () => {
          tryTxActionWithToast(async () => {
            setTradeTxStatus({ text: tradeMsg('Unwrapping') })
            const tx = await unwrapNative(
              supportedChainId,
              bestTradeData.amountIn.amount
                .shl(utils.getWrappedNativeTokenInfo(supportedChainId)?.decimals ?? 18)
                .toPrecision(),
              signer,
              { gasPrice: txSpeed },
            )
            setTradeTxStatus((status) => ({ ...status!, txHash: tx.hash }))
            return [tx, tradeMsg('Unwrapped')]
          })
        },
      ]

    if (isApproving) return ['Approving']

    if (isApprovalNeeded)
      return [
        'Approve',
        () => {
          tryTxActionWithToast(async () => {
            const tx = await approve()
            if (tx) {
              return [tx, `Approved ${inputAmount} ${inputToken?.symbol}`]
            }
          })
        },
      ]

    return [
      'Swap',
      () => {
        setIsOpenConfirmModal(true)
      },
    ]
  })()

  const handleConfirmSwap = async () => {
    if (!bestTrade.data || !signer) return
    const bestTradeData = bestTrade.data

    setIsOpenConfirmModal(false)
    setTradeTxStatus({ text: tradeMsg('Swapping') })

    tryTxActionWithToast(async () => {
      const tx = await executeTrade(supportedChainId, bestTradeData, signer, {
        recipient: otherWallet ? otherWallet : account,
        deadlineOrPreviousBlockhash: deadline,
        gasPrice: txSpeed,
      })
      setTradeTxStatus((status) => ({ ...status!, txHash: tx.hash }))
      return [tx, tradeMsg('Swapped')]
    }).finally(() => {
      inputTokenBalance?.mutate()
      outputTokenBalance?.mutate()
    })
  }

  return (
    <div className="min-w-96 mx-auto p-6 bg-light rounded-lg shadow-md text-black">
      <div className="flex justify-between items-center mb-2">
        <h1 className="flex-1 text-black text-[28px] font-normal">Swap</h1>

        <div className="flex items-center gap-2">
          <WalletAccountPopover />

          <Settings className="cursor-pointer" onClick={() => setOpenSettingModal(true)} />
        </div>
      </div>
      <div className="mb-5 p-4 rounded-xl bg-white">
        <label className="block text-black text-sm font-medium mb-2">You Pay</label>
        <div className="flex items-center bg-white rounded-lg">
          <input
            type="number"
            value={inputAmount}
            onChange={(e) => {
              setInputAmount(e.target.value)
              setTradeType(TradeType.EXACT_INPUT)
            }}
            className="flex-1 bg-transparent focus:outline-none no-spinner"
            placeholder="Input here"
          />

          {inputAmount && data?.[0] && (
            <span className="text-darkGray text-sm font-medium">
              ~$
              {new Fraction(data[0]).mul(inputAmount).toFormat({
                trailingZeros: false,
                decimalPlaces: 2,
              })}
            </span>
          )}

          <div
            className={clsx('flex items-center gap-2 ml-2', !inputTokenFromProps && 'cursor-pointer')}
            onClick={!inputTokenFromProps ? () => setIsInputSelectTokenModalOpen(true) : undefined}
          >
            {inputToken ? (
              <>
                <TokenLogo tokenConfig={inputToken} size={20} />
                <span>{inputToken.symbol}</span>
              </>
            ) : (
              <>
                <span>Select Token</span>
              </>
            )}
            {!inputTokenFromProps && <ChevronDownIcon />}
          </div>
        </div>
        <div className="mt-2 flex gap-4 text-blue-500">
          {SELECT_AMOUNT_PERCENTAGE.map(({ label, value }) => (
            <div
              onClick={() =>
                inputTokenBalance?.data && setInputAmount(inputTokenBalance.data.mul(value).toPrecision(6))
              }
              className="text-primary cursor-pointer font-bold"
              key={label}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        {!inputTokenFromProps && !outputTokenFromProps && (
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-3/4 shadow-lg p-2 rounded-xl cursor-pointer bg-primary hover:bg-primary-800"
            onClick={exchangeInputAndOutputToken}
          >
            <ArrowUpDown width={24} height={24} />
          </div>
        )}
      </div>
      <div className="mb-5 p-4 rounded-xl bg-white">
        <label className="block text-black text-sm font-medium mb-2">You Receive (estimated)</label>
        <div className="flex items-center bg-white rounded-lg">
          <input
            type="number"
            value={outputAmount}
            onChange={(e) => {
              setOutputAmount(e.target.value)
              setTradeType(TradeType.EXACT_OUTPUT)
            }}
            className="flex-1 bg-transparent focus:outline-none no-spinner"
            placeholder="Input here"
          />

          {outputAmount && data?.[1] && (
            <span className="text-darkGray text-sm font-medium">
              ~$
              {new Fraction(data[1]).mul(outputAmount).toFormat({
                trailingZeros: false,
                decimalPlaces: 2,
              })}
            </span>
          )}

          <div
            className={clsx('flex items-center gap-2 ml-2', !outputTokenFromProps && 'cursor-pointer')}
            onClick={!outputTokenFromProps ? () => setIsOutputSelectTokenModalOpen(true) : undefined}
          >
            {outputToken ? (
              <>
                <TokenLogo tokenConfig={outputToken} size={20} />
                <span>{outputToken.symbol}</span>
              </>
            ) : (
              <>
                <span>Select Token</span>
              </>
            )}
            {!outputTokenFromProps && <ChevronDownIcon />}
          </div>
        </div>
      </div>

      {account && getPairPrice().gt(0) && inputToken && outputToken && (
        <div className="flex justify-between items-center my-[-8px]">
          <span className="text-darkGray">Price</span>

          <div className="flex items-center gap-[6px]">
            <span>
              1 {!isReservePrice ? inputToken?.symbol : outputToken?.symbol} ={' '}
              {getPairPrice().toFormat({
                trailingZeros: false,
                decimalPlaces: 4,
              })}{' '}
              {!isReservePrice ? outputToken?.symbol : inputToken?.symbol}
            </span>
            <ArrowLeftRight
              className="cursor-pointer"
              width={16}
              height={16}
              onClick={() => setReversePrice(!isReservePrice)}
            />{' '}
            |{' '}
            <span className="text-primary cursor-pointer" onClick={() => refetch()}>
              Refresh
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-center my-4">
        <button
          onClick={handleActionBtnClick}
          className={clsx(
            'w-full px-6 py-3.5 text-base font-medium text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center',
            {
              'cursor-not-allowed bg-primary-500 hover:bg-primary-500': !handleActionBtnClick,
            },
          )}
        >
          {actionBtnLabel}
        </button>
      </div>

      {!isWrappedOrUnWrappedNativeToken && bestTrade?.data && (
        <div className="flex flex-col gap-2">
          <SwapInfoItem
            label={tradeTypeLabel}
            tooltips="Your transaction will revert if there is a large, unfavorable price movement before it is confirmed."
          >
            {getMinReceivedOrMaxSold?.amount.toFixed(6, {
              trailingZeros: false,
            })}{' '}
            {getMinReceivedOrMaxSold?.symbol}
          </SwapInfoItem>

          <SwapInfoItem
            label="Price Impact"
            tooltips={
              <div className="flex flex-col gap-2">
                <span>AMM: The difference between the market price and estimated price due to trade size.</span>
                <span>MM: No slippage against quote from market maker</span>
              </div>
            }
          >
            {priceImpact.lt(0.01) ? '<0.01%' : `${priceImpact.toFixed(2)}%`}
          </SwapInfoItem>

          <SwapInfoItem
            label="Trading Fee"
            tooltips="Trading fee varies depending on the pool fee tier. You can check the fee tier by clicking the magnifier icon under the “Route“ section."
          >
            {bestTrade.data.lpFee?.amount.toFixed(6, {
              trailingZeros: false,
            })}{' '}
            {bestTrade.data.lpFee?.symbol}
          </SwapInfoItem>
          <SwapInfoItem label={`Add ${bestTrade.data.amountOut.symbol} to MetaMask`}>
            <div
              className="cursor-pointer"
              onClick={() => {
                watchAsset(
                  getWatchAssetParameters(
                    bestTrade.data?.amountOut.address ?? '',
                    bestTrade.data?.amountOut.symbol ?? '',
                    bestTrade.data?.amountOut.decimals ?? 18,
                  ),
                )
              }}
            >
              <Metamask width={20} height={20} />
            </div>
          </SwapInfoItem>
          <SwapInfoItem
            label="Route"
            tooltips="Route is automatically calculated based on your routing preference to achieve the best price for your trade."
          >
            <div className="flex items-center gap-[6px] cursor-pointer" onClick={() => setIsOpenRoutePathModal(true)}>
              <div>{bestTrade.data.routes.length} Separate Routes</div>
              <Search width={17} height={17} />
            </div>
          </SwapInfoItem>
          <SwapInfoItem label="Send to Another Wallet">
            <Switch enabled={enabled} setEnabled={setEnabled} />
          </SwapInfoItem>
          {enabled && (
            <div className="w-full p-[18px] rounded-xl bg-white">
              <div className="text-sm font-medium">Recipient</div>
              <div className="flex justify-between items-center gap-1 mt-[6px]">
                <input
                  value={otherWallet ?? ''}
                  onChange={(e) => {
                    const address = e.target.value

                    setIsValidAddress(/^0x[a-fA-F0-9]{40}$/.test(address))
                    setOtherWallet(address)
                  }}
                  type="text"
                  placeholder="Wallet Address"
                  className={clsx('w-full h-8 outline-none bg-white', {
                    'border border-red': !isValidAddress,
                  })}
                />
                <span className="font-bold text-primary cursor-pointer" onClick={() => setOtherWallet(undefined)}>
                  Remove
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex justify-center mt-2 items-center gap-2">
        <div className="font-medium">Powered by</div>
        <VVSLogo />
      </div>
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        selfConnectingChainId={selfConnectingChainId}
      />
      <SwapConfirmModal
        inputToken={inputToken}
        outputToken={outputToken}
        inputAmount={inputAmount}
        outputAmount={outputAmount}
        tradeData={bestTrade.data}
        priceImpact={priceImpact}
        tradeTypeLabel={tradeTypeLabel}
        getMinReceivedOrMaxSold={getMinReceivedOrMaxSold}
        isOpen={isOpenConfirmModal}
        onClose={() => setIsOpenConfirmModal(false)}
        handleConfirmSwap={handleConfirmSwap}
      />
      <TransactionStatusModal
        isOpen={!!tradeTxStatus}
        pendingText={tradeTxStatus?.text}
        txHash={tradeTxStatus?.txHash}
        onClose={() => {
          setTradeTxStatus(undefined)
        }}
      />
      <SelectTokenModal
        isOpen={isInputSelectTokenModalOpen}
        tokens={tokensFromProps}
        onClose={() => setIsInputSelectTokenModalOpen(false)}
        onTokenSelect={(tokenConfig) => {
          if (!outputToken || !utils.isSameAddr(tokenConfig.address, outputToken?.address)) {
            setInputToken(tokenConfig)
          } else {
            exchangeInputAndOutputToken()
          }
        }}
      />
      <SelectTokenModal
        isOpen={isOutputSelectTokenModalOpen}
        tokens={tokensFromProps}
        onClose={() => setIsOutputSelectTokenModalOpen(false)}
        onTokenSelect={(tokenConfig) => {
          if (!inputToken || !utils.isSameAddr(tokenConfig.address, inputToken?.address)) {
            setOutputToken(tokenConfig)
          } else {
            exchangeInputAndOutputToken()
          }
        }}
      />
      <SettingModal isOpen={isOpenSettingModal} onClose={() => setOpenSettingModal(false)} />
      <Toast isOpen={!!toast} status={toast?.status} text={toast?.text} onClose={() => setToast(undefined)} />
      <RoutePathModal
        routes={bestTrade.data?.routes ?? []}
        isOpen={isOpenRoutePathModal}
        onClose={() => setIsOpenRoutePathModal(false)}
      />
    </div>
  )
}

const SwapInfoItem = ({ label, children, tooltips }: { label: string; children: ReactNode; tooltips?: ReactNode }) => (
  <div className="flex justify-between items-center">
    <div className="flex gap-[6px] items-center text-sm font-medium text-darkGray">
      <span>{label}</span>
      {tooltips && <Tooltips tooltips={tooltips} />}
    </div>

    <div className="text-sm font-medium text-primaryBlack">{children}</div>
  </div>
)

const SELECT_AMOUNT_PERCENTAGE: { label: string; value: number }[] = [
  {
    label: '25%',
    value: 0.25,
  },
  {
    label: '50%',
    value: 0.5,
  },
  {
    label: '75%',
    value: 0.75,
  },
  {
    label: 'Max',
    value: 1,
  },
]
