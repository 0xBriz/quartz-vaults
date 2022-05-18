export interface VaultDeployConfig {
  tokenName: string;
  tokenSymbol: string;
  approvalDelay: number;
  vaultName: string;
  strategyName: string;
  stratArgs: any[];
}

export interface AmesProtocolStrategyLPConfig {
  want: string;
  poolId: number;
  chefAddress: string;
  vault: string;
  router: string;
  keeper: string;
  strategist: string;
  protocolFeeRecipient: string;
  _protocolPairAddress: string;
  _buybackTokenAddress: string;
  _outputToNativeRoute: string[];
  _outputToLp0Route: string[];
  _outputToLp1Route: string[];
  _protocolLp0Route: string[];
  _protocolLp1Route: string[];
  _nativeToBuybackRoute: string[];
}


export interface StratProtocolSingleStakeConfig {
  want: string;
  poolId: number;
  chefAddress: string;
  vault: string;
  router: string;
  keeper: string;
  strategist: string;
  protocolFeeRecipient: string;
  _protocolPairAddress: string;
  _buybackTokenAddress: string;
  _protocolLp0Route: string[];
  _protocolLp1Route: string[];
  _nativeToBuybackRoute: string[];
  _outputToNativeRoute: string[];
  _outputToWant: string[];
}
