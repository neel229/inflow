import hre from "hardhat";
import { Contract } from "@ethersproject/contracts";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Inflow Contract Tests", async () => {
  let inflow: Contract;
  let token: Contract;

  beforeEach("get factory", async () => {
    const Token = await hre.ethers.getContractFactory("Sardine");
    token = await Token.deploy();
    await token.deployed();
    const Inflow = await hre.ethers.getContractFactory("Inflow");
    inflow = await Inflow.deploy(token.address);
    await inflow.deployed();
  });

  it("Purchase Simulation", async () => {
    // Step 1: Create signers
    const [owner, teacher, student]: SignerWithAddress[] =
      await hre.ethers.getSigners();

    // Step 2: Create tokens
    await token.connect(owner).initialize();

    // Step 3: Give some amount of tokens to teacher and student
    await token.connect(owner).transfer(teacher.address, 10);
    await token.connect(owner).transfer(student.address, 10);
    const balance = await token.balanceOf(student.address);
    console.log(balance.toString());

    // create a course
    const coursePrice = hre.ethers.utils.parseUnits("1", "wei");
    console.log(coursePrice.toString());
    await inflow
      .connect(teacher)
      .createCourse(coursePrice, "metadata_link", false);

    await token.connect(student).approve(inflow.address, coursePrice);

    await inflow.connect(student).purchaseCourse(1);
  });
});
