import { AmesProtocolStrategyLPConfig } from "../../../utils/deploy-util";
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

// Token0: AMES
const _outputToLp0Route: string[] = [TOKENS.ASHARE.BSC,TOKENS.BUSD.BSC, TOKENS.AMETHYST.BSC] ;

// Token1: BUSD
const _outputToLp1Route: string[] = [TOKENS.ASHARE.BSC, TOKENS.BUSD.BSC];

export const nameToken0 = "AMETHYST";
export const nameToken1 = "BUSD";

  // address _want,
  // uint256 _poolId,
  // address _chef,
  // address _vault,
  // address _unirouter,
  // address _keeper,
  // address _strategist,
  // address _protocolFeeRecipient,
  // address _protocolPairAddress,
  // address _burnTokenAddress,
  // address[] memory _outputToNativeRoute,
  // address[] memory _outputToLp0Route,
  // address[] memory _outputToLp1Route,
  // address[] memory _protocolLp0Route,
  // address[] memory _protocolLp1Route,
  // address[] _nativeToBuybackRoute
export const constructorArgs: AmesProtocolStrategyLPConfig = {
  want: PAIR_AMETHYST_BUSD_ADDRESS,
  poolId: 9,
  chefAddress: REWARD_POOL_ADDRESS_BSC,
  vault: null,
  router: PANCAKESWAP_ROUTER_ADDRESS,
  keeper: DEFAULT_KEEPER_ADDRESS_BSC,
  strategist: DEFAULT_STRATEGIST_ADDRESS_BSC,
  protocolFeeRecipient: TREASURY_ADDRESS_BSC,
  _protocolPairAddress: PAIR_AMETHYST_BUSD_ADDRESS,
  _buybackTokenAddress: TOKENS.AMETHYST.BSC,
  _outputToNativeRoute,
  _outputToLp0Route,
  _outputToLp1Route,
  _protocolLp0Route:  [TOKENS.BUSD.BSC, TOKENS.AMETHYST.BSC],
  _protocolLp1Route:[TOKENS.BUSD.BSC],
  _nativeToBuybackRoute: [TOKENS.BUSD.BSC, TOKENS.AMETHYST.BSC]
};

export const STRAT_PROTO_AMETHYST_BUSD_BSC = {
  nameToken0,
  nameToken1,
  constructorArgs,
};
