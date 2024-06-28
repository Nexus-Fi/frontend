import { CHAIN_NAME } from "@/lib/utils";
import { useChain, useWalletClient } from "@cosmos-kit/react";
import { NibiruQuerier, NibiruTxClient, Testnet } from "@nibiruchain/nibijs";

const chain = Testnet(1);

const useTransaction = () => {
  const { address, wallet } = useChain(CHAIN_NAME);
  const { client } = useWalletClient(wallet?.name);

  const sendTransaction = async (contractAddress, message, tokenToSend) => {
    if (!client) {
      throw new Error("Wallet client is not initialized");
    }
    const signer = await client.getOfflineSigner(chain.chainId);

    const signingClient = await NibiruTxClient.connectWithSigner(
      chain.endptTm,
      signer
    );

    let tx;
    if (tokenToSend) {
      tx = await signingClient.wasmClient.execute(
        address,
        contractAddress,
        message,
        "auto",
        "nexusfi",
        tokenToSend
      );
    } else {
      tx = await signingClient.wasmClient.execute(
        address,
        contractAddress,
        message,
        "auto"
      );
    }

    console.log(tx.transactionHash);
    // Display the transaction hash
    toast(
      `Transaction Hash: \n\n https://explorer.nibiru.fi/nibiru-testnet-1/tx/${tx.transactionHash}`,
      {
        duration: 8000,
      }
    );
  };

  const fetchQuery = async (contractAddress, message) => {
    const querier = await NibiruQuerier.connect(chain.endptTm);
    const res = await querier.nibiruExtensions.wasm.queryContractSmart(
      contractAddress,
      message
    );
    return res;
  };

  return { sendTransaction, fetchQuery };
};

export default useTransaction;
