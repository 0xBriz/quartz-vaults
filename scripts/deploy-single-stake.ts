import { predictAddresses } from "../utils/predictAddresses";
import {  deployProtocolStrategySingleStake, deploySingleStakeVault } from "../utils/deploy-util";
import { STRAT_SINGLE_AMES } from "./strats/bsc/strat-single-ames";

async function main() {
  const currentStrat = STRAT_SINGLE_AMES;
   const currentStrategist = '0x570108E54d11348BD3734FF73dc55eC52c28d3EF'
  const predictedAddresses = await predictAddresses(currentStrategist);

  const vault = await deploySingleStakeVault(currentStrategist, predictedAddresses.strategy, currentStrat.tokenName);

  currentStrat.constructorArgs.vault = vault.address;
  const strategy = await deployProtocolStrategySingleStake(
    currentStrat.constructorArgs
  );

  const tx = await strategy.setPendingRewardsFunctionName("pendingShare");
  await tx.wait(1);

  console.log({
    vault: vault.address,
    strategy: strategy.address,
  });

  let verifyArgs = "";
  Object.values(currentStrat.constructorArgs).forEach((arg) => {
    if (Array.isArray(arg)) {
      verifyArgs += `"${JSON.stringify(arg)}"` + " ";
    } else {
      verifyArgs += typeof arg === "number" ? arg + " " : `"${arg}" `;
    }
  });

  console.log(verifyArgs);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
