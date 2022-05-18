import { BigNumberish } from "ethers";
import { ethers } from "hardhat";
import { predictAddresses } from "./predictAddresses";
import { AmesProtocolStrategyLPConfig, StratProtocolSingleStakeConfig } from "./types";


export const deployAmesProtocolStrategy = async (
  stratArgs: AmesProtocolStrategyLPConfig
) => {
  const AmesProtocolStrategyLP = await ethers.getContractFactory("AmesProtocolStrategyLP");
  const strategy = await AmesProtocolStrategyLP.deploy(
    stratArgs.want,
    stratArgs.poolId,
    stratArgs.chefAddress,
    stratArgs.vault,
    stratArgs.router,
    stratArgs.keeper,
    stratArgs.strategist,
    stratArgs.protocolFeeRecipient,
    stratArgs._protocolPairAddress,
    stratArgs._buybackTokenAddress,
    stratArgs._outputToNativeRoute,
    stratArgs._outputToLp0Route,
    stratArgs._outputToLp1Route,
    stratArgs._protocolLp0Route,
    stratArgs._protocolLp1Route,
    stratArgs._nativeToBuybackRoute
  );

  await strategy.deployed();
  console.log("AmesProtocolStrategyLP deployed to:", strategy.address);
  return strategy;
};

export const deployCommonVault = async (
  ownerAddress: string,
  strategyAddress: string,
  nameToken0: string,
  nameToken1: string
) => {
  const predictedAddresses = await predictAddresses(ownerAddress);

  const Vault = await ethers.getContractFactory("Vault");
  const vaultArgs = {
    strategyAddress,
    tokenName: `AMES ${nameToken0}-${nameToken1} Vault LP`,
    tokenSymbol: `ames${nameToken0}-${nameToken1}-VLP`,
    approvalDelay: 10,
  };
  const vault = await Vault.deploy(
    vaultArgs.strategyAddress,
    vaultArgs.tokenName,
    vaultArgs.tokenSymbol,
    vaultArgs.approvalDelay
  );
  await vault.deployed();
  console.log("Vault deployed to:", vault.address);
  console.log(
    `predicted: ${predictedAddresses.vault} - actual: ${vault.address}`
  );

  return vault;
};


export const deploySingleStakeVault = async (
  ownerAddress: string,
  strategyAddress: string,
  tokenName: string
) => {
  const predictedAddresses = await predictAddresses(ownerAddress);

  const Vault = await ethers.getContractFactory("Vault");
  const vaultArgs = {
    strategyAddress,
    tokenName: `AMES ${tokenName} Vault LP`,
    tokenSymbol: `ames${tokenName}-VLP`,
    approvalDelay: 10,
  };
  const vault = await Vault.deploy(
    vaultArgs.strategyAddress,
    vaultArgs.tokenName,
    vaultArgs.tokenSymbol,
    vaultArgs.approvalDelay
  );
  await vault.deployed();
  console.log("AmesVault deployed to:", vault.address);
  console.log(
    `predicted: ${predictedAddresses.vault} - actual: ${vault.address}`
  );

  return vault;
};

export const deployProtocolStrategySingleStake = async (
  stratArgs: StratProtocolSingleStakeConfig
) => {
  const Strategy = await ethers.getContractFactory("StrategyProtocolSingleStake");
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
  // address[] memory _outputToWantRoute
  // address[] memory _protocolLp0Route,
  // address[] memory _protocolLp1Route,
  // address[] _nativeToBuybackRoute
  const strategy = await Strategy.deploy(
    stratArgs.want,
    stratArgs.poolId,
    stratArgs.chefAddress,
    stratArgs.vault,
    stratArgs.router,
    stratArgs.keeper,
    stratArgs.strategist,
    stratArgs.protocolFeeRecipient,
    stratArgs._protocolPairAddress,
    stratArgs._buybackTokenAddress,
    stratArgs._outputToNativeRoute,
    stratArgs._outputToWant,
    stratArgs._protocolLp0Route,
    stratArgs._protocolLp1Route,
    stratArgs._nativeToBuybackRoute
  );

  await strategy.deployed();
  console.log("StrategyProtocolSingleStake deployed to:", strategy.address);
  return strategy;
};


