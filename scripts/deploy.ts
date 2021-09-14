import * as hre from "hardhat";

async function main() {
  const Platform = await hre.ethers.getContractFactory("Platform");
  const platform = await Platform.deploy();
  await platform.deployed();

  console.log("Platform deployed to:", platform.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
