export const VALIDATOR_CONTRACT_MESSAGES = {
    add_validator: (validator: string) => ({
        add_validator: {
            validator,
        },
    }),
    remove_validator: (address: string) => ({
        remove_validator: {
            address,
        },
    }),
    update_config: (owner: string, hub_contract: string) => ({
        update_config: {
            owner,
            hub_contract,
        },
    }),
};

export const VALIDATOR_QUERY = {
    get_validator_for_delegation: () => ({
        get_validator_for_delegation:{}
    }),
    config:() => ({
        config:{}
    })
}
