
import { NibiruTxClient, NibiruQuerier, Testnet } from "@nibiruchain/nibijs";

import {CONTRACT_MESSAGES} from "./messages";
import { executeContract } from "@/interactwithContract";
const contractAddr =""

 export const transfer = async ( recipient: string, amount: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.transfer(recipient, amount);
    return executeContract(message, contractAddr);
  };
  
  export const burn = async ( amount: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.burn(amount);
    return executeContract(message, contractAddr);
  };
  
  export const send = async ( contract: string, amount: string, msg: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.send(contract, amount, msg);
    return executeContract(message, contractAddr);
  };
  
  export const mint = async ( recipient: string, amount: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.mint(recipient, amount);
    return executeContract(message, contractAddr);
  };
  
  export const increaseAllowance = async ( spender: string, amount: string, expires: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.increase_allowance(spender, amount, expires);
    return executeContract(message, contractAddr);
  };
  
  export const decreaseAllowance = async ( spender: string, amount: string, expires: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.decrease_allowance(spender, amount, expires);
    return executeContract(message, contractAddr);
  };
  
  export const transferFrom = async ( owner: string, recipient: string, amount: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.transfer_from(owner, recipient, amount);
    return executeContract(message, contractAddr);
  };
  
  export const burnFrom = async ( owner: string, amount: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.burn_from(owner, amount);
    return executeContract(message, contractAddr);
  };
  
  export const sendFrom = async ( owner: string, contract: string, amount: string, msg: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.send_from(owner, contract, amount, msg);
    return executeContract(message, contractAddr);
  };
  
  export const updateMarketing = async ( project: string, description: string, marketing: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.update_marketing(project, description, marketing);
    return executeContract(message, contractAddr);
  };
  
  export const uploadLogo = async ( logo: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.upload_logo(logo);
    return executeContract(message, contractAddr);
  };
  
  export const updateMinter = async ( new_minter: string): Promise<boolean> => {
    const message = CONTRACT_MESSAGES.update_minter(new_minter);
    return executeContract(message, contractAddr);
  };
  