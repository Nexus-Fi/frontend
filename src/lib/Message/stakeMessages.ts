
export interface Cw20ReceiveMsg {
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


export const STAKE_CONTRACT_MESSAGES = {
    receive: (msg: Cw20ReceiveMsg) => ({
        receive: {
            msg
        },
    }),
    bond_forstnibi: () => ({
        bond_forstnibi: {},
    }),
    bond_rewards: () => ({
        bond_rewards: {},
    }),
    restake: () => ({
        restake: {},
    }),
    dispatch_rewards: () => ({
        dispatch_rewards: {},
    }),
    withdraw_unbonded: () => ({
        withdraw_unbonded: {},
    }),
    check_slashing: () => ({
        check_slashing: {},
    }),
    update_params: (epoch_period: number, unbonding_period: number) => ({
        update_params: {
            epoch_period,
            unbonding_period,
        },
    }),
    update_config: (owner: string, rewards_dispatcher_contract: string, validators_registry_contract: string, stnibi_token_contract: string) => ({
        update_config: {
            owner,
            rewards_dispatcher_contract,
            validators_registry_contract,
            stnibi_token_contract,
        },
    }),
    redelegate_proxy: (src_validator: string, redelegations: string) => ({
        redelegate_proxy: {
            src_validator,
            redelegations,
        },
    }),
    pause_contracts: () => ({
        pause_contracts: {},
    }),
    unpause_contracts: () => ({
        unpause_contracts: {},
    }),
    add_guardians: (addresses: string[]) => ({
        add_guardians: {
            addresses,
        },
    }),
    remove_guardians: (addresses: string[]) => ({
        remove_guardians: {
            addresses,
        },
    }),
    deposit_liquidity: (stnibi_amount: string, nusd_amount: string) => ({
        deposit_liquidity: {
            stnibi_amount,
            nusd_amount,
        },
    }),
    withdraw_liquidity: () => ({
        withdraw_liquidity: {},
    }),
    swap: (from_token: string, to_token: string, amount: string) => ({
        swap: {
            from_token,
            to_token,
            amount,
        },
    }),
    burnrestakenibi: () => ({
        burn_restake_nibi: {

        }
    })
};



// pub enum QueryMsg {
//     Config { },
//     State { },
//     CurrentBatch { },
//     WithdrawableUnbonded {
//     address: String,
//     },
//     Parameters { },
//     UnbondRequests {
//     address: String,
//     },
//     AllHistory {
//     start_from: Option<u64>,
//         limit: Option<u32>,
//     },
// Guardians,
// }

export const STAKE_QUERY_MESSAGES_NEW = {
    config: () => ({
        config: {},
    }),
    state: () => ({
        state: {},
    }),
    current_batch: () => ({
        current_batch: {},
    }),
    withdrawable_unbonded: (address: string) => ({
        withdrawable_unbonded: {
            address,
        },
    }),
    parameters: () => ({
        parameters: {},
    }),
    unbond_requests: (address: string) => ({
        unbond_requests: {
            address,
        },
    }),
    all_history: (start_from?: number, limit?: number) => ({
        all_history: {
            start_from,
            limit,
        },
    }),
    guardians: () => ({
        guardians: {},
    }),
    restake: (staker: string) => ({
        restake: {
            staker,
        },
    }),
    staker: (staker: string) => ({
        staker: {
            staker,
        },
    }),
    delegation_data: (delegator: string) => ({
        delegation_data: {
            delegator,
        },
    }),
    get_unbonding_info: (user_address: string) => ({
        get_unbonding_info: {
            user_address,
        },
    }),
    hub_balance: (contractAddress: string) => ({
        hub_balance: {
            contract_address: contractAddress,
        },
    }),
};



// Import necessary modules

// Define TypeScript interfaces for each query
// export interface GetBufferedRewardsQuery {
//     get_buffered_rewards: {
//         contract_addr: string;
//     };
// }

// export interface ConfigQuery {
//     config: {};
// }

// export interface StateQuery {
//     state: {};
// }

// export interface CurrentBatchQuery {
//     current_batch: {};
// }

// export interface WithdrawableUnbondedQuery {
//     withdrawable_unbonded: {
//         address: string;
//     };
// }

// export interface ParametersQuery {
//     parameters: {};
// }

// export interface UnbondRequestsQuery {
//     unbond_requests: {
//         address: string;
//     };
// }

// export interface AllHistoryQuery {
//     all_history: {
//         start_from?: number;
//         limit?: number;
//     };
// }

// export interface GuardiansQuery {
//     guardians: {};
// }

// export interface RestakeQuery {
//     restake: {
//         staker: string;
//     };
// }

// export interface StakerQuery {
//     staker: {
//         staker: string;
//     };
// }

// export interface DelegationDataQuery {
//     delegation_data: {
//         delegator: string;
//     };
// }

// export interface HubBalanceQuery {
//     hub_balance: {
//         contract_address: string;
//     };
// }

// export interface GetUserRewardsQuery {
//     get_user_rewards: {
//         user_address: string;
//         hub_contract: string;
//         contract_addr: string;
//     };
// }


