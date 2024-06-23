// const CONTRACT_MESSAGES = {
//     "dispatch_rewards": {
//         "dispatch_rewards": {}
//     },
//     "update_config": {
//         "update_config": {
//             "owner": "new-owner-address",
//             "hub_contract": "new-hub-contract-address",
//             "stnibi_reward_denom": "reward-denom",
//             "nexus_fee_address": "nexus-fee-address",
//             "nexus_fee_rate": "nexus-fee-rate"  // as a string representation of a decimal (e.g., "0.01" for 1%)
//         }
//     }
// };


export interface UpdateConfigMessage {
    owner: string;
    hub_contract: string;
    stnibi_reward_denom: string;
    nexus_fee_address: string;
    nexus_fee_rate: string;
  }
  
  export const CONTRACT_MESSAGES = {
    dispatch_rewards: () => ({
      dispatch_rewards: {},
    }),
    update_config: (message: UpdateConfigMessage) => ({
      update_config: {
        owner: message.owner,
        hub_contract: message.hub_contract,
        stnibi_reward_denom: message.stnibi_reward_denom,
        nexus_fee_address: message.nexus_fee_address,
        nexus_fee_rate: message.nexus_fee_rate,
      },
    }),
  };
  
  