# `@vvs-finance/swap-sdk` example

```bash
git clone https://github.com/vvs-finance/swap-sdk.git
cd swap-sdk/examples/swap-sdk-example

npm install

cp src/config.example.mjs src/config.mjs
cp .env.example .env
# edit src/config.mjs & .env

# run on nodejs, require walletPrivateKey in src/config.mjs
npm run repl

# run on http://localhost:1234, requrie windows.ethereum
npm start
```

Please see [here](https://github.com/vvs-finance/swap-sdk?tab=readme-ov-file#prepare-quote-api-client-id) for `SWAP_SDK_QUOTE_API_CLIENT_ID_${chainId}`.
