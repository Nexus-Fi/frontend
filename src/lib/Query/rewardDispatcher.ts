export const REWARD_QUERY_MESSAGES = {
  get_buffered_rewards: () => ({
    get_buffered_rewards: {},
  }),
  config: () => ({
    config: {},
  }),
  get_user_rewards: (user_address: string, hub_contract: string, contract_addr: string) => ({
    get_user_rewards: {
      user_address,
      hub_contract,
      contract_addr,
    },
  }),
};
