import { StratProtocolSingleStakeConfig } from "../../../utils/types";
import { TOKENS } from "../../data/tokens";
import {
  TREASURY_ADDRESS_BSC,
  DEFAULT_KEEPER_ADDRESS_BSC,
  DEFAULT_STRATEGIST_ADDRESS_BSC,
  PAIR_AMETHYST_BUSD_ADDRESS,
  PANCAKESWAP_ROUTER_ADDRESS,
  REWARD_POOL_ADDRESS_BSC,
} from "./bsc-addresses";

// Output to native = ASHARE -> BUSD
const _outputToNativeRoute: string[] = [
  TOKENS.ASHARE.BSC,
  TOKENS.BUSD.BSC,
];

// // Token0: AMES
// const _outputToLp0Route: string[] = [TOKENS.ASHARE.BSC,TOKENS.BUSD.BSC, TOKENS.AMETHYST.BSC] ;

// // Token1: BUSD
// const _outputToLp1Route: string[] = [TOKENS.ASHARE.BSC, TOKENS.BUSD.BSC];

export const nameToken0 = "AMETHYST";

//    want: string;
//   poolId: number;
//   chefAddress: string;
//   vault: string;
//   router: string;
//   keeper: string;
//   strategist: string;
//   protocolFeeRecipient: string;
//   _protocolPairAddress: string;
//   _buybackTokenAddress: string;
//   _protocolLp0Route: string[];
//   _protocolLp1Route: string[];
//   _nativeToBuybackRoute: string[];
//   _outputToNativeRoute: string[];
//   _outputToWant: string[];
export const constructorArgs: StratProtocolSingleStakeConfig = {
  want: TOKENS.AMETHYST.BSC,
  poolId: 6,
  chefAddress: REWARD_POOL_ADDRESS_BSC,
  vault: null,
  router: PANCAKESWAP_ROUTER_ADDRESS,
  keeper: DEFAULT_KEEPER_ADDRESS_BSC,
  strategist: DEFAULT_STRATEGIST_ADDRESS_BSC,
  protocolFeeRecipient: TREASURY_ADDRESS_BSC,
  _protocolPairAddress: PAIR_AMETHYST_BUSD_ADDRESS,
  _buybackTokenAddress: TOKENS.AMETHYST.BSC,
  _outputToNativeRoute,
  _outputToWant: [TOKENS.ASHARE.BSC, TOKENS.AMETHYST.BSC],
  _protocolLp0Route:  [TOKENS.BUSD.BSC, TOKENS.AMETHYST.BSC],
  _protocolLp1Route:[TOKENS.BUSD.BSC],
  _nativeToBuybackRoute: [TOKENS.BUSD.BSC, TOKENS.AMETHYST.BSC]
};

export const STRAT_SINGLE_AMES = {
  tokenName: 'Amethyst',
  constructorArgs,
};
