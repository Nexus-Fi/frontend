import { CHAIN_NAME } from '@/lib/utils';
import { useChain, useWalletClient } from '@cosmos-kit/react';
import { NibiruTxClient, Testnet, NibiruQuerier} from '@nibiruchain/nibijs';

const chain = Testnet(1);

export type JsonObject = any;
export interface TokenToSend {
    denom: string;
    amount: string;
  }
  export interface Log {
    readonly msg_index: number;
    readonly log: string;
    readonly events: readonly Event[];
}
  export interface ExecuteResult {
    /** @deprecated Not filled in Cosmos SDK >= 0.50. Use events instead. */
    readonly logs: readonly Log[];
    /** Block height in which the transaction is included */
    readonly height: number;
    /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
    readonly transactionHash: string;
    readonly events: readonly Event[];
    readonly gasWanted: bigint;
    readonly gasUsed: bigint;
}

const useTransaction = () => {
  const { address , wallet} = useChain(CHAIN_NAME);
  const { client } = useWalletClient(wallet?.name);

  const sendTransaction = async (contractAddress: string, message : JsonObject, tokenToSend?: TokenToSend[]) => {
    if (!client) {
      throw new Error('Wallet client is not initialized');
    }

    const signer = await client?.getOfflineSigner(chain.chainId);
    
    const signingClient = await NibiruTxClient.connectWithSigner(
      chain.endptTm,
      signer!
    );
  let tx;
  if (tokenToSend) {
         tx = await signingClient.wasmClient.execute(
            address!,
          contractAddress,
          message,
          "auto",
          "nexusfi",
          tokenToSend
        );
      } else {
         tx = await signingClient.wasmClient.execute(
            address!,
          contractAddress,
          message,
          "auto"
        );
      }
  
  console.log(tx.transactionHash);
  }

  return { sendTransaction };
}

export default useTransaction;