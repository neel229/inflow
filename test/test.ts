import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

describe("Ocean of Notes - Testing", async function () {
  it("Deploy the smart contracts", async function () {
    console.log(
      "----------------Deploying Smart Contracts--------------------"
    );
    const Platform = await ethers.getContractFactory("Platform");
    const platform = await Platform.deploy();
    await platform.deployed();

    // get a bunch of test accounts
    const [_, account1, account2]: SignerWithAddress[] =
      await ethers.getSigners();

    // create an author whose account address is account1
    let authorBalance = await (await account1.getBalance()).toString();
    console.log("Author Balance Before: ", authorBalance);
    await platform.connect(account1).addAuthor("asdf");

    // create a course
    const coursePrice = ethers.utils.parseEther("1");
    await platform.connect(account1).addCourse(coursePrice, "aldjfksf");

    // create a student
    let studentBalance = await (await account2.getBalance()).toString();
    console.log("Student Balance Before: ", studentBalance);
    await platform.connect(account2).addStudent();

    // purchase course
    await platform.connect(account2).purchaseCourse(1, { value: coursePrice });

    // reward sardine
    await platform.connect(account2).rewardSardine(30);

    authorBalance = await (await account1.getBalance()).toString();
    studentBalance = await (await account2.getBalance()).toString();
    let studentTokenBalance = await (
      await platform.connect(account2).getSardineBalance()
    ).toString();
    console.log("Author Balance After: ", authorBalance);
    console.log("Student Balance After: ", studentBalance);
    console.log("Student Sardine Balance: ", studentTokenBalance);
  });
});
