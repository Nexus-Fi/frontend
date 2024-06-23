const contractAddr = "cosmos1contractaddress";
import { bondForStnibi } from "./interactWithContract";
// Example usage for bond_for_stnibi
bondForStnibi(contractAddr)
  .then(success => console.log("Success:", success))
  .catch(err => console.error("Error:", err));

// Example usage for deposit_liquidity
depositLiquidity(contractAddr, "1000", "2000")
  .then(success => console.log("Success:", success))
  .catch(err => console.error("Error:", err));

// Example usage for update_config
updateConfig(
  contractAddr,
  "new-owner-address",
  "new-rewards-dispatcher-contract-address",
  "new-validators-registry-contract-address",
  "new-stnibi-token-contract-address"
)
  .then(success => console.log("Success:", success))
  .catch(err => console.error("Error:", err));

// Example usage for swap
swapTokens(contractAddr, "tokenA", "tokenB", "500")
  .then(success => console.log("Success:", success))
  .catch(err => console.error("Error:", err));

// Example usage for add_guardians
addGuardians(contractAddr, ["address1", "address2"])
  .then(success => console.log("Success:", success))
  .catch(err => console.error("Error:", err));

// Example usage for remove_guardians
removeGuardians(contractAddr, ["address1", "address2"])
  .then(success => console.log("Success:", success))
  .catch(err => console.error("Error:", err));
