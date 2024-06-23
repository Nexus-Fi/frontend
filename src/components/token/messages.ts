export const CONTRACT_MESSAGES = {
    transfer: (recipient: string, amount: string) => ({
      transfer: {
        recipient,
        amount,
      },
    }),
    burn: (amount: string) => ({
      burn: {
        amount,
      },
    }),
    send: (contract: string, amount: string, msg: string) => ({
      send: {
        contract,
        amount,
        msg,
      },
    }),
    mint: (recipient: string, amount: string) => ({
      mint: {
        recipient,
        amount,
      },
    }),
    increase_allowance: (spender: string, amount: string, expires: string) => ({
      increase_allowance: {
        spender,
        amount,
        expires,
      },
    }),
    decrease_allowance: (spender: string, amount: string, expires: string) => ({
      decrease_allowance: {
        spender,
        amount,
        expires,
      },
    }),
    transfer_from: (owner: string, recipient: string, amount: string) => ({
      transfer_from: {
        owner,
        recipient,
        amount,
      },
    }),
    burn_from: (owner: string, amount: string) => ({
      burn_from: {
        owner,
        amount,
      },
    }),
    send_from: (owner: string, contract: string, amount: string, msg: string) => ({
      send_from: {
        owner,
        contract,
        amount,
        msg,
      },
    }),
    update_marketing: (project: string, description: string, marketing: string) => ({
      update_marketing: {
        project,
        description,
        marketing,
      },
    }),
    upload_logo: (logo: string) => ({
      upload_logo: {
        logo,
      },
    }),
    update_minter: (new_minter: string) => ({
      update_minter: {
        new_minter,
      },
    }),
  };
  