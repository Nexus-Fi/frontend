import { validators } from "tailwind-merge"

export interface Validator {
    address: string 
}

export interface Config {
    owner:string,
    hub_contract:string 
}

export interface ValidatorResponce{
    total_delegated:number,
    address:string
}

export interface ExecuteMsg {
    add_validator?: {
        validator: Validator;
    };
    remove_validator?: {
        address: string;
    };
    update_config?: {
        owner?: string;
        hub_contract?: string;
    };
}
async function addValidator(val:Validator)  {

    const executeMsg: ExecuteMsg = {
        add_validator: {
            validator: val
        }
    };

    return  executeMsg
}

async function removeValidator(address: string) {
    const executeMsg: ExecuteMsg = {
        remove_validator: {
            address: address
        }
    };
    return executeMsg
}

async function UpdateConfig(owner?: string,hub_contract?: string) {
    const executeMsg: ExecuteMsg = {
        update_config: {
            owner: owner,
            hub_contract: owner
        }
    };
}
