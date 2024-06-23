import { NibiruTxClient, NibiruQuerier, Testnet } from "@nibiruchain/nibijs";

import {CONTRACT_MESSAGES,ExecuteMsg} from "../../src/lib/messages";


const chain = Testnet(1);
// export async function sendstakeNibitx() {
//     const signer = window.keplr.getOfflineSigner(chain.chainId);
//     // const signer = await window[walletEx].getOfflineSigner(chain.chainId);
// const signingClient = await NibiruTxClient.connectWithSigner(
//   chain.endptTm,
//   signer
// );
// const contractAddr ="nibi1valvrt57mk90yl94jmqhj7z0fl24q87ztrkl5tlqgky4mcfg8kds9nrg7y"; 
// const CONTRACT_MESSAGE = bondForNibi();
// const accounts = await signer.getAccounts();
//       const fromAddr = accounts[0].address;
// const tx = await signingClient.wasmClient.execute(
//     fromAddr,
//     contractAddr,
//     CONTRACT_MESSAGE,
//     "auto"
//   );
//   console.log(tx.transactionHash);
// }

async function sendContractMessage(contractAddress: string, message: ExecuteMsg) {
  const signer = window.keplr.getOfflineSigner(chain.chainId);
  // const signer = await window[walletEx].getOfflineSigner(chain.chainId);
const signingClient = await NibiruTxClient.connectWithSigner(
chain.endptTm,
signer
);
const contractAddr ="nibi1valvrt57mk90yl94jmqhj7z0fl24q87ztrkl5tlqgky4mcfg8kds9nrg7y"; 
const accounts = await signer.getAccounts();
    const fromAddr = accounts[0].address;
const tx = await signingClient.wasmClient.execute(
  fromAddr,
  contractAddr,
  message,
  "auto"
);
console.log(tx.transactionHash);
}

export async function stakenibi() {
  // Replace with your contract address after instantiation
  const contractAddress = "nibi1valvrt57mk90yl94jmqhj7z0fl24q87ztrkl5tlqgky4mcfg8kds9nrg7y";

  // Example of bonding for stnibi
  const bondForstnibiMessage = CONTRACT_MESSAGES.bond_forstnibi;
  await sendContractMessage(contractAddress, bondForstnibiMessage);

  // Example of updating config
  const updateConfigMessage = CONTRACT_MESSAGES.update_config;
  updateConfigMessage.update_config!.owner = "new-owner-address";
  updateConfigMessage.update_config!.rewards_dispatcher_contract = "new-rewards-dispatcher-contract-address";
  updateConfigMessage.update_config!.validators_registry_contract = "new-validators-registry-contract-address";
  updateConfigMessage.update_config!.stnibi_token_contract = "new-stnibi-token-contract-address";

  await sendContractMessage(contractAddress, updateConfigMessage);

  // Example of receiving cw20 tokens
  const receiveCw20Message = CONTRACT_MESSAGES.receive_cw20;
  receiveCw20Message.receive!.sender = "sender-address";
  receiveCw20Message.receive!.amount = "1000";
  receiveCw20Message.receive!.msg = "base64-encoded-message";
  
  await sendContractMessage(contractAddress, receiveCw20Message);
  
}