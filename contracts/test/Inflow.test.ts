import hre from "hardhat";
import { Contract } from "@ethersproject/contracts";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import USDC from "../usdc.json";

describe("Inflow Contract Tests", async () => {
  let inflow: Contract;
  let token: Contract;
  let usdc: Contract;

  beforeEach("get factory", async () => {
    // get fakeusdc contract
    usdc = await hre.ethers.getContractAt(USDC.result, "0x68ec573C119826db2eaEA1Efbfc2970cDaC869c4")
    await usdc.deployed();
    // deploy sardine token
    const Token = await hre.ethers.getContractFactory("Sardine");
    token = await Token.deploy();
    await token.deployed();
    // deploy inflow
    const Inflow = await hre.ethers.getContractFactory("Inflow");
    inflow = await Inflow.deploy(token.address);
    await inflow.deployed();
  });

  it("Purchase Simulation", async () => {  
    // Step 1: Create signers
    const [owner, teacher, student]: SignerWithAddress[] =
      await hre.ethers.getSigners();

    await usdc.connect(teacher).gimmeSome();
    const usdcBalance = await usdc.balanceOf(teacher.address);
    console.log("USDC balance: " + usdcBalance);

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
