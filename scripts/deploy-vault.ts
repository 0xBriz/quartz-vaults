import { predictAddresses } from "../utils/predictAddresses";
import { deployCommonVault, deployStrategySharesLP } from "../utils/deploy-util";
import { STRAT_PROTO_AMETHYST_BUSD_BSC } from "./strats/bsc/strat-proto-ames-busd";

async function main() {
  const currentStrat = STRAT_PROTO_AMETHYST_BUSD_BSC;
  //const owner = '0x570108E54d11348BD3734FF73dc55eC52c28d3EF';
  const owner = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
  const predictedAddresses = await predictAddresses(owner);

  const vault = await deployCommonVault(
    owner,
    predictedAddresses.strategy,
    currentStrat.nameToken0,
    currentStrat.nameToken1
  );

  currentStrat.constructorArgs.vault = vault.address;

  // Update rewards check function name to match our reward pool/chef name
  const strategy = await deployStrategySharesLP(currentStrat.constructorArgs);

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
