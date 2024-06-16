import { NibiruTxClient, NibiruQuerier, Testnet } from "@nibiruchain/nibijs";
import { CONTRACT_MESSAGES } from "./messages";
import {executeContract} from "../../src/interactwithContract";

async function sendContractMessage(contractAddress: string, message: any) {

executeContract("",message,contractAddress)
}
 


export async function sendstakeNibitx() {
const contractAddress ="nibi1valvrt57mk90yl94jmqhj7z0fl24q87ztrkl5tlqgky4mcfg8kds9nrg7y"; 

    // Example of adding a validator
    const addValidatorMessage = CONTRACT_MESSAGES.add_validator;
    addValidatorMessage.add_validator.validator.address = "validator-address-2";
    addValidatorMessage.add_validator.validator.total_delegated = "500000";

    await sendContractMessage(contractAddress, addValidatorMessage);

    // Example of removing a validator
    const removeValidatorMessage = CONTRACT_MESSAGES.remove_validator;
    removeValidatorMessage.remove_validator.address = "validator-address-2";

    await sendContractMessage(contractAddress, removeValidatorMessage);

    // Example of updating config
    const updateConfigMessage = CONTRACT_MESSAGES.update_config;
    updateConfigMessage.update_config.owner = "new-owner-address";
    updateConfigMessage.update_config.hub_contract = "new-hub-contract-address";

    await sendContractMessage(contractAddress, updateConfigMessage);

}



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
