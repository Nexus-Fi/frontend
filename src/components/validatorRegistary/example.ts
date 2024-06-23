const contractAddr = "cosmos1contractaddress";
import { addValidator } from "./interactwithContract";
// Example usage for add_validator
addValidator( "validator-address")
  .then(success => console.log("Success:", success))
  .catch(err => console.error("Error:", err));

// // Example usage for remove_validator
// removeValidator(contractAddr, "validator-address")
//   .then(success => console.log("Success:", success))
//   .catch(err => console.error("Error:", err));

// // Example usage for update_config
// updateConfig(contractAddr, "new-owner-address", "new-hub-contract-address")
//   .then(success => console.log("Success:", success))
//   .catch(err => console.error("Error:", err));
