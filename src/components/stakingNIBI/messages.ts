
interface Cw20ReceiveMsg {
    sender: string;
    amount: string;  // Uint128 as a string
    msg: string;  // Binary as a base64 string
}

interface Validator {
    address: string;
    total_delegated: string;
}

interface Redelegation {
    dst_validator: string;
    amount: string;
}

export interface ExecuteMsg {
    receive?: Cw20ReceiveMsg;
    bond_forstnibi?: {};
    bond_rewards?: {};
    dispatch_rewards?: {};
    withdraw_unbonded?: {};
    check_slashing?: {};
    update_params?: { epoch_period: number; unbonding_period: number };
    update_config?: {
        owner?: string;
        rewards_dispatcher_contract?: string;
        validators_registry_contract?: string;
        stnibi_token_contract?: string;
    };
    redelegate_proxy?: { src_validator: string; redelegations: Redelegation[] };
    pause_contracts?: {};
    unpause_contracts?: {};
    add_guardians?: { addresses: string[] };
    remove_guardians?: { addresses: string[] };
}

// const CONTRACT_MESSAGES: { [key: string]: ExecuteMsg } = {
//     receive_cw20: {
//         receive: {
//             sender: "sender-address",
//             amount: "1000",
//             msg: "base64-encoded-message"
//         }
//     },
//     bond_forstnibi: {
//         bond_forstnibi: {}
//     },
//     bond_rewards: {
//         bond_rewards: {}
//     },
//     dispatch_rewards: {
//         dispatch_rewards: {}
//     },
//     withdraw_unbonded: {
//         withdraw_unbonded: {}
//     },
//     check_slashing: {
//         check_slashing: {}
//     },
//     update_params: {
//         update_params: {
//             epoch_period: 86400,  // Example value in seconds
//             unbonding_period: 604800  // Example value in seconds
//         }
//     },
//     update_config: {
//         update_config: {
//             owner: "new-owner-address",
//             rewards_dispatcher_contract: "new-rewards-dispatcher-contract-address",
//             validators_registry_contract: "new-validators-registry-contract-address",
//             stnibi_token_contract: "new-stnibi-token-contract-address"
//         }
//     },
//     redelegate_proxy: {
//         redelegate_proxy: {
//             src_validator: "validator-address",
//             redelegations: [
//                 {
//                     dst_validator: "destination-validator-address",
//                     amount: "1000"
//                 }
//             ]
//         }
//     },
//     pause_contracts: {
//         pause_contracts: {}
//     },
//     unpause_contracts: {
//         unpause_contracts: {}
//     },
//     add_guardians: {
//         add_guardians: {
//             addresses: ["guardian-address-1", "guardian-address-2"]
//         }
//     },
//     remove_guardians: {
//         remove_guardians: {
//             addresses: ["guardian-address-1", "guardian-address-2"]
//         }
//     }
// };


// export async function bondForNibi() {
    
//     const executeMsg:ExecuteMsg = {
//         bond_for_st_nibi:{

//         }
//     };
//     return executeMsg
// }
export const CONTRACT_MESSAGES = {
    "receive_cw20": {
        "receive": {
            "sender": "sender-address",
            "amount": "amount",
            "msg": "message"
        }
    },
    "bond_forstnibi": {
        "bond_forstnibi": {}
    },
    "bond_rewards": {
        "bond_rewards": {}
    },
    "dispatch_rewards": {
        "dispatch_rewards": {}
    },
    "withdraw_unbonded": {
        "withdraw_unbonded": {}
    },
    "check_slashing": {
        "check_slashing": {}
    },
    "update_params": {
        "update_params": {
            "epoch_period": "number",
            "unbonding_period": "number"
        }
    },
    "update_config": {
        "update_config": {
            "owner": "new-owner-address",
            "rewards_dispatcher_contract": "new-rewards-dispatcher-contract-address",
            "validators_registry_contract": "new-validators-registry-contract-address",
            "stnibi_token_contract": "new-stnibi-token-contract-address"
        }
    },
    "redelegate_proxy": {
        "redelegate_proxy": {
            "src_validator": "validator-address",
            "redelegations": [
                {
                    "dst_validator": "destination-validator-address",
                    "amount": "amount"
                }
            ]
        }
    },
    "pause_contracts": {
        "pause_contracts": {}
    },
    "unpause_contracts": {
        "unpause_contracts": {}
    },
    "add_guardians": {
        "add_guardians": {
            "addresses": [
                "guardian-address-1",
                "guardian-address-2"
            ]
        }
    },
    "remove_guardians": {
        "remove_guardians": {
            "addresses": [
                "guardian-address-1",
                "guardian-address-2"
            ]
        }
    }
};
