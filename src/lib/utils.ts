import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { chains } from 'chain-registry';
import { Asset, Chain } from '@chain-registry/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLogo(from: Asset | Chain) {
  return from.logo_URIs?.svg || from.logo_URIs?.png || from.logo_URIs?.jpeg;
}

export function getChainLogo(name: string) {
  const chain = chains.find(chain => chain.chain_name === name)
  return chain ? getLogo(chain) : null;
}

export const CHAIN_NAME = 'nibiru';