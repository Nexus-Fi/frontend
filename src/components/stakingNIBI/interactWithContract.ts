import { NibiruTxClient, NibiruQuerier, Testnet } from "@nibiruchain/nibijs";

import {CONTRACT_MESSAGES,ExecuteMsg} from "./messages";
import { executeContract } from "@/interactwithContract";

const chain = Testnet(1);

const contractAddr ="nibi1valvrt57mk90yl94jmqhj7z0fl24q87ztrkl5tlqgky4mcfg8kds9nrg7y"; 


export const receiveCw20 = async ( msg: string): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.receive(msg);
  return executeContract(message, contractAddr);
};

export const bondForStnibi = async (contractAddr: string): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.bond_forstnibi();
  return executeContract(message, contractAddr);
};

export const bondRewards = async (contractAddr: string): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.bond_rewards();
  return executeContract(message, contractAddr);
};

export const restake = async (contractAddr: string): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.restake();
  return executeContract(message, contractAddr);
};

export const dispatchRewards = async (contractAddr: string): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.dispatch_rewards();
  return executeContract(message, contractAddr);
};

export const withdrawUnbonded = async (contractAddr: string): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.withdraw_unbonded();
  return executeContract(message, contractAddr);
};

export const checkSlashing = async (contractAddr: string): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.check_slashing();
  return executeContract(message, contractAddr);
};

export const updateParams = async ( epoch_period: number, unbonding_period: number): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.update_params(epoch_period, unbonding_period);
  return executeContract(message, contractAddr);
};

export const updateConfig = async (
  
  owner: string,
  rewards_dispatcher_contract: string,
  validators_registry_contract: string,
  stnibi_token_contract: string
): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.update_config(owner, rewards_dispatcher_contract, validators_registry_contract, stnibi_token_contract);
  return executeContract(message, contractAddr);
};

export const redelegateProxy = async ( src_validator: string, redelegations: string): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.redelegate_proxy(src_validator, redelegations);
  return executeContract(message, contractAddr);
};

export const pauseContracts = async (contractAddr: string): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.pause_contracts();
  return executeContract(message, contractAddr);
};

export const unpauseContracts = async (contractAddr: string): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.unpause_contracts();
  return executeContract(message, contractAddr);
};

export const addGuardians = async ( addresses: string[]): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.add_guardians(addresses);
  return executeContract(message, contractAddr);
};

export const removeGuardians = async ( addresses: string[]): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.remove_guardians(addresses);
  return executeContract(message, contractAddr);
};

export const depositLiquidity = async ( stnibi_amount: string, nusd_amount: string): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.deposit_liquidity(stnibi_amount, nusd_amount);
  return executeContract(message, contractAddr);
};

export const withdrawLiquidity = async ( lp_tokens: string): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.withdraw_liquidity(lp_tokens);
  return executeContract(message, contractAddr);
};

export const swapTokens = async ( from_token: string, to_token: string, amount: string): Promise<boolean> => {
  const message = CONTRACT_MESSAGES.swap(from_token, to_token, amount);
  return executeContract(message, contractAddr);
};
