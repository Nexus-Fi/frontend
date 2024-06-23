const contractAddr = "cosmos1contractaddress";
import { dispatchRewards } from "./interactWithContract";
// Example usage for dispatch_rewards
dispatchRewards(contractAddr)
  .then(success => console.log("Dispatch Rewards Success:", success))
  .catch(err => console.error("Dispatch Rewards Error:", err));

// Example usage for update_config
// const updateConfigMessage: UpdateConfigMessage = {
//   owner: "new-owner-address",
//   hub_contract: "new-hub-contract-address",
//   stnibi_reward_denom: "reward-denom",
//   nexus_fee_address: "nexus-fee-address",
//   nexus_fee_rate: "0.01", // example value as a string representation of a decimal
// };

// updateConfig(contractAddr, updateConfigMessage)
//   .then(success => console.log("Update Config Success:", success))
//   .catch(err => console.error("Update Config Error:", err));
