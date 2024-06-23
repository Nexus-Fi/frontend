const contractAddr = "cosmos1contractaddress";
import { transfer } from "./interactWithContract";
// Example usage for transfer
transfer( "recipient-address", "100")
  .then(success => console.log("Success:", success))
  .catch(err => console.error("Error:", err));

// // Example usage for burn
// burn(contractAddr, "50")
//   .then(success => console.log("Success:", success))
//   .catch(err => console.error("Error:", err));

// // Example usage for send
// send(contractAddr, "destination-contract", "50", "Message")
//   .then(success => console.log("Success:", success))
//   .catch(err => console.error("Error:", err));

// // Example usage for mint
// mint(contractAddr, "recipient-address", "100")
//   .then(success => console.log("Success:", success))
//   .catch(err => console.error("Error:", err));

// // Example usage for increase_allowance
// increaseAllowance(contractAddr, "spender-address", "100", "1000")
//   .then(success => console.log("Success:", success))
//   .catch(err => console.error("Error:", err));

// // Example usage for decrease_allowance
// decreaseAllowance(contractAddr, "spender-address", "50", "500")
//   .then(success => console.log("Success:", success))
//   .catch(err => console.error("Error:", err));

// // Example usage for transfer_from
// transferFrom(contractAddr, "owner-address", "recipient-address", "50")
//   .then(success => console.log("Success:", success))
//   .catch(err => console.error("Error:", err));

// // Example usage for burn_from
// burnFrom(contractAddr, "owner-address", "25")
//   .then(success => console.log("Success:", success))
//   .catch(err => console.error("Error:", err));

// // Example usage for send_from
// sendFrom(contractAddr, "owner-address", "destination-contract", "50", "Message")
//   .then(success => console.log("Success:", success))
//   .catch(err => console.error("Error:", err));

// // Example usage for update_marketing
// updateMarketing(contractAddr, "Project Name", "Description", "Marketing Info")
//   .then(success => console.log("Success:", success))
//   .catch(err => console.error("Error:", err));

// // Example usage for upload_logo
// uploadLogo(contractAddr, "base64-encoded-logo")
//   .then(success => console.log("Success:", success))
//   .catch(err => console.error("Error:", err));

// // Example usage for update_minter
// updateMinter(contractAddr, "new-minter-address")
//   .then(success => console.log("Success:", success))
//   .catch(err => console.error("Error:", err));
