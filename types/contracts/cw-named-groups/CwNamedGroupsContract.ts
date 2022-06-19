/**
* This file was automatically generated by cosmwasm-typescript-gen@0.2.15.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the cosmwasm-typescript-gen generate command to regenerate this file.
*/

import { CosmWasmClient, ExecuteResult, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
export interface DumpResponse {
  groups: Group[];
  [k: string]: unknown;
}
export interface Group {
  addresses: string[];
  name: string;
  [k: string]: unknown;
}
export interface InstantiateMsg {
  groups?: Group[] | null;
  [k: string]: unknown;
}
export type Addr = string;
export interface ListAddressesResponse {
  addresses: Addr[];
  [k: string]: unknown;
}
export interface ListGroupsResponse {
  groups: string[];
  [k: string]: unknown;
}
export interface CwNamedGroupsReadOnlyInterface {
  contractAddress: string;
  dump: () => Promise<DumpResponse>;
  listGroups: ({
    address,
    limit,
    offset
  }: {
    address: string;
    limit?: number;
    offset?: number;
  }) => Promise<ListGroupsResponse>;
  listAddresses: ({
    group,
    limit,
    offset
  }: {
    group: string;
    limit?: number;
    offset?: number;
  }) => Promise<ListAddressesResponse>;
  isAddressInGroup: ({
    address,
    group
  }: {
    address: string;
    group: string;
  }) => Promise<IsAddressInGroupResponse>;
}
export class CwNamedGroupsQueryClient implements CwNamedGroupsReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.dump = this.dump.bind(this);
    this.listGroups = this.listGroups.bind(this);
    this.listAddresses = this.listAddresses.bind(this);
    this.isAddressInGroup = this.isAddressInGroup.bind(this);
  }

  dump = async (): Promise<DumpResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      dump: {}
    });
  };
  listGroups = async ({
    address,
    limit,
    offset
  }: {
    address: string;
    limit?: number;
    offset?: number;
  }): Promise<ListGroupsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_groups: {
        address,
        limit,
        offset
      }
    });
  };
  listAddresses = async ({
    group,
    limit,
    offset
  }: {
    group: string;
    limit?: number;
    offset?: number;
  }): Promise<ListAddressesResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_addresses: {
        group,
        limit,
        offset
      }
    });
  };
  isAddressInGroup = async ({
    address,
    group
  }: {
    address: string;
    group: string;
  }): Promise<IsAddressInGroupResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      is_address_in_group: {
        address,
        group
      }
    });
  };
}
export interface CwNamedGroupsInterface extends CwNamedGroupsReadOnlyInterface {
  contractAddress: string;
  sender: string;
  update: ({
    addressesToAdd,
    addressesToRemove,
    group
  }: {
    addressesToAdd?: string[];
    addressesToRemove?: string[];
    group: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: readonly Coin[]) => Promise<ExecuteResult>;
  removeGroup: ({
    group
  }: {
    group: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: readonly Coin[]) => Promise<ExecuteResult>;
  updateOwner: ({
    owner
  }: {
    owner: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: readonly Coin[]) => Promise<ExecuteResult>;
}
export class CwNamedGroupsClient extends CwNamedGroupsQueryClient implements CwNamedGroupsInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.update = this.update.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
    this.updateOwner = this.updateOwner.bind(this);
  }

  update = async ({
    addressesToAdd,
    addressesToRemove,
    group
  }: {
    addressesToAdd?: string[];
    addressesToRemove?: string[];
    group: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: readonly Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update: {
        addresses_to_add: addressesToAdd,
        addresses_to_remove: addressesToRemove,
        group
      }
    }, fee, memo, funds);
  };
  removeGroup = async ({
    group
  }: {
    group: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: readonly Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      remove_group: {
        group
      }
    }, fee, memo, funds);
  };
  updateOwner = async ({
    owner
  }: {
    owner: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: readonly Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_owner: {
        owner
      }
    }, fee, memo, funds);
  };
}