
import { NibiruTxClient, NibiruQuerier, Testnet } from "@nibiruchain/nibijs";

const chain = Testnet(1);
export interface TokenToSend {
    denom: string;
    amount: string;
  }

export const executeContract = async (
    CONTRACT_MESSAGE: any,
    contractAddr:string ,
    tokenToSend?: TokenToSend[],
  ): Promise<boolean> => {
    try {
      console.log("Transaction is pending...");
  
     const signer = window.keplr.getOfflineSigner(chain.chainId);
      const signingClient = await NibiruTxClient.connectWithSigner(chain.endptTm, signer);
      const accounts = await signer.getAccounts();
      const fromAddr = accounts[0].address;
      if (tokenToSend) {
        const tx = await signingClient.wasmClient.execute(
            fromAddr,
          contractAddr,
          CONTRACT_MESSAGE,
          "auto",
          "nexusfi",
          tokenToSend
        );
      } else {
        const tx = await signingClient.wasmClient.execute(
            fromAddr,
          contractAddr,
          CONTRACT_MESSAGE,
          "auto"
        );
        console.log(tx.transactionHash);
      }
  
     
      console.log("Transaction is confirmed!");
     
      return true;
    } catch (error) {
      console.error(error);
     
      return false;
    }
  };
  
  export const queryContract = async (contractAddr:string,CONTRACT_MESSAGE: any): Promise<any> => {
    const querier = await NibiruQuerier.connect(chain.endptTm);
    const res = await querier.nibiruExtensions.wasm.queryContractSmart(
      contractAddr,
      CONTRACT_MESSAGE
    );
    return res;
  };