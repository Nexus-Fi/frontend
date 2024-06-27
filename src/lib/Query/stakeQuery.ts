export const STAKE_QUERY_MESSAGES = {
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
        restake: { staker }
    }),
    staker: (staker: string) => ({
        staker: { staker }
    })
};
