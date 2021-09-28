import * as hre from "hardhat";

async function main() {
  const Inflow = await hre.ethers.getContractFactory("Inflow");
  const platform = await Inflow.deploy();
  await platform.deployed();

  console.log("Platform deployed to:", platform.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
