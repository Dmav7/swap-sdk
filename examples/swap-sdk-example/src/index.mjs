import { print } from './utils.mjs'

import { runFetchBestTrade } from './fetchBestTrade.mjs'
import { runEtherExecuteTrade } from './executeTrade.mjs'
import { runPrepareTradeTxRequestAndSendWithViem } from './prepareTradeTxRequest.mjs'

print('Hello, this is a simple demo of @vvs-finance/swap-sdk')

const replContext = {}
function addAction(fn) {
  if (typeof document === 'object') {
    const btn = document.createElement('button')
    btn.textContent = fn.name
    btn.addEventListener('click', async () => {
      try {
        await fn()
      } catch (err) {
        print('Err:')
        print(err.message ?? err)
      }
    })
    document.getElementById('app').appendChild(btn)
  } else {
    replContext[fn.name] = fn
    console.log(`:: > ${fn.name}()`)
  }
}

addAction(runFetchBestTrade)
addAction(runEtherExecuteTrade)
addAction(runPrepareTradeTxRequestAndSendWithViem)

if (typeof process === 'object') {
  import('node:repl').then((repl) => {
    const replInstance = repl.start('> ')
    Object.assign(replInstance.context, replContext)
  })
}
