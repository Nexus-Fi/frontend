

export interface UpdateConfigMessage {
    owner: string;
    hub_contract: string;
    stnibi_reward_denom: string;
    nexus_fee_address: string;
    nexus_fee_rate: string;
}

export const REWARD_CONTRACT_MESSAGES = {
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



export interface GetBufferedRewardsQuery {
    get_buffered_rewards: {
        contract_addr: string;
    };
}

export interface ConfigQuery {
    config: {};
}



export interface GetUserRewardsQuery {
    get_user_rewards: {
        user_address: string;
        hub_contract: string;
        contract_addr: string;
    };
}

export interface GetUnbondingInfoQuery {
    get_unbonding_info: {
        user_address: string;
    };
}

