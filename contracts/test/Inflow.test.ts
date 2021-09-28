import hre from "hardhat";
import { Contract, ContractReceipt } from "@ethersproject/contracts";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";

describe("Inflow Contract Tests", async () => {
  let inflow: Contract;

  beforeEach("get factory", async () => {
    const Inflow = await hre.ethers.getContractFactory("Inflow");
    inflow = await Inflow.deploy();
    await inflow.deployed();
  });
  it("Purchase Course", async () => {
    // get a bunch of test accounts
    const [_, teacher, student]: SignerWithAddress[] =
      await hre.ethers.getSigners();

    // create a course
    const coursePrice = hre.ethers.utils.parseEther("1");
    await inflow
      .connect(teacher)
      .createCourse(coursePrice, "metadata_link", false);
    // expect(
    //   hre.ethers.utils.formatEther(
    //     await (await teacher.getBalance()).toString()
    //   )
    // ).to.equal("9999.999551965152625421");
  });
});
