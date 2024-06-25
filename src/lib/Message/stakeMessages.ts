
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


export const STAKE_CONTRACT_MESSAGES = {
    receive: (msg: string) => ({
        receive: {
            msg,
        },
    }),
    bond_forstnibi: () => ({
        bond_for_stnibi: {},
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
    withdraw_liquidity: (lp_tokens: string) => ({
        withdraw_liquidity: {
            lp_tokens,
        },
    }),
    swap: (from_token: string, to_token: string, amount: string) => ({
        swap: {
            from_token,
            to_token,
            amount,
        },
    }),
};