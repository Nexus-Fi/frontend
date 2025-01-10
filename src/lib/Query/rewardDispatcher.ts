export const REWARD_QUERY_MESSAGES = {
  get_buffered_rewards: (contract_addr:string) => ({
    get_buffered_rewards: { contract_addr},
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
