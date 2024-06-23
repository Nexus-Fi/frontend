import { NibiruTxClient, NibiruQuerier, Testnet } from "@nibiruchain/nibijs";

import {CONTRACT_MESSAGES} from "./messages";
import { executeContract } from "@/interactwithContract";
import { UpdateConfigMessage } from "./messages";

export const dispatchRewards = async (contractAddr: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.dispatch_rewards();
    return executeContract(message, contractAddr);
  };
  
  export const updateConfig = async (contractAddr: string, message: UpdateConfigMessage): Promise<boolean> => {
    const formattedMessage = CONTRACT_MESSAGES.update_config(message);
    return executeContract(formattedMessage, contractAddr);
  };
  