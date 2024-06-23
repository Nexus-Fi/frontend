

import { NibiruTxClient, NibiruQuerier, Testnet } from "@nibiruchain/nibijs";

import {CONTRACT_MESSAGES} from "./messages";
import { executeContract } from "@/interactwithContract";
const contractAddr ="";

export const addValidator = async ( validator: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.add_validator(validator);
    return executeContract(message, contractAddr);
  };
  
  export const removeValidator = async ( address: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.remove_validator(address);
    return executeContract(message, contractAddr);
  };
  
  export const updateConfig = async ( owner: string, hub_contract: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.update_config(owner, hub_contract);
    return executeContract(message, contractAddr);
  };
  


// const chain = Testnet(1);

// async function sendTx( CONTRACT_MESSAGE,
//     account,
//     walletEx,) {
//     const signer = await window[walletEx].getOfflineSigner(chain.chainId);
//     const signingClient = await NibiruTxClient.connectWithSigner(
//       chain.endptTm,
//       signer
//     );
//     const tx = await signingClient.wasmClient.execute(
//         account,
//         contractAddr,
//         CONTRACT_MESSAGE,
//         "auto"
//       );
//       console.log(tx.transactionHash);

// }
