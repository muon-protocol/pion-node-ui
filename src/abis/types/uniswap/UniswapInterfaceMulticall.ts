/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export declare namespace UniswapInterfaceMulticall {
  export type CallStruct = {
    target: string;
    gasLimit: BigNumberish;
    callData: BytesLike;
  };

  export type CallStructOutput = [string, BigNumber, string] & {
    target: string;
    gasLimit: BigNumber;
    callData: string;
  };

  export type ResultStruct = {
    success: boolean;
    gasUsed: BigNumberish;
    returnData: BytesLike;
  };

  export type ResultStructOutput = [boolean, BigNumber, string] & {
    success: boolean;
    gasUsed: BigNumber;
    returnData: string;
  };
}

export interface UniswapInterfaceMulticallInterface extends utils.Interface {
  functions: {
    "getCurrentBlockTimestamp()": FunctionFragment;
    "getEthBalance(address)": FunctionFragment;
    "multicall((address,uint256,bytes)[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getCurrentBlockTimestamp"
      | "getEthBalance"
      | "multicall"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getCurrentBlockTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEthBalance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "multicall",
    values: [UniswapInterfaceMulticall.CallStruct[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "getCurrentBlockTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEthBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;

  events: {};
}

export interface UniswapInterfaceMulticall extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: UniswapInterfaceMulticallInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getCurrentBlockTimestamp(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { timestamp: BigNumber }>;

    getEthBalance(
      addr: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { balance: BigNumber }>;

    multicall(
      calls: UniswapInterfaceMulticall.CallStruct[],
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  getEthBalance(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

  multicall(
    calls: UniswapInterfaceMulticall.CallStruct[],
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    getEthBalance(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    multicall(
      calls: UniswapInterfaceMulticall.CallStruct[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, UniswapInterfaceMulticall.ResultStructOutput[]] & {
        blockNumber: BigNumber;
        returnData: UniswapInterfaceMulticall.ResultStructOutput[];
      }
    >;
  };

  filters: {};

  estimateGas: {
    getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    getEthBalance(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    multicall(
      calls: UniswapInterfaceMulticall.CallStruct[],
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getCurrentBlockTimestamp(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEthBalance(
      addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    multicall(
      calls: UniswapInterfaceMulticall.CallStruct[],
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
