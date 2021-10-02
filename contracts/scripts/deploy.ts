import * as hre from "hardhat";

async function main() {
  const account = await hre.ethers.getSigner("0xb2081CeAbAb639Ae73F562b5890C5D750f7c001e");
  const Sardine = await hre.ethers.getContractFactory("Sardine");
  const token = await Sardine.deploy();
  await token.deployed();
  await token.connect(account).initialize();

  const Inflow = await hre.ethers.getContractFactory("Inflow");
  const platform = await Inflow.deploy(token.address);
  await platform.deployed();

  console.log("Token deployed to:", token.address);
  console.log("Platform deployed to:", platform.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
