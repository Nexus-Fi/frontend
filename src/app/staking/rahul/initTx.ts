import { NibiruTxClient, NibiruQuerier, Testnet } from "@nibiruchain/nibijs";

import {bondForNibi} from "./message";


const chain = Testnet(1);
export async function sendstakeNibitx() {
    const signer = window.keplr.getOfflineSigner(chain.chainId);
    // const signer = await window[walletEx].getOfflineSigner(chain.chainId);
const signingClient = await NibiruTxClient.connectWithSigner(
  chain.endptTm,
  signer
);
const tokenToSend = [
    {
      amount: "3000000",
      denom: "unibi",
    },
  ];
const contractAddr ="nibi1valvrt57mk90yl94jmqhj7z0fl24q87ztrkl5tlqgky4mcfg8kds9nrg7y"; 
const CONTRACT_MESSAGE = {"bond_forstnibi": {}}
const accounts = await signer.getAccounts();
      const fromAddr = accounts[0].address;
const tx = await signingClient.wasmClient.execute(
    fromAddr,
    contractAddr,
    CONTRACT_MESSAGE,
    "auto",
    "",
    tokenToSend,
  );
  console.log(tx.transactionHash);
}



const MSG =  [
    {"bond_forstnibi": {}},
    {"bond_forstnibi": {}},
]