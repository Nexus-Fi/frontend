import { NibiruTxClient, NibiruQuerier, Testnet } from "@nibiruchain/nibijs";

import {bondForNibi} from "./messages";


const chain = Testnet(1);
export async function sendstakeNibitx() {
    const signer = window.keplr.getOfflineSigner(chain.chainId);
    // const signer = await window[walletEx].getOfflineSigner(chain.chainId);
const signingClient = await NibiruTxClient.connectWithSigner(
  chain.endptTm,
  signer
);
const contractAddr ="nibi1valvrt57mk90yl94jmqhj7z0fl24q87ztrkl5tlqgky4mcfg8kds9nrg7y"; 
const CONTRACT_MESSAGE = bondForNibi();
const accounts = await signer.getAccounts();
      const fromAddr = accounts[0].address;
const tx = await signingClient.wasmClient.execute(
    fromAddr,
    contractAddr,
    CONTRACT_MESSAGE,
    "auto"
  );
  console.log(tx.transactionHash);
}

