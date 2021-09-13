import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

describe("Inflow", async function () {
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

    let authorBalance = await (await account1.getBalance()).toString();
    console.log("Author Balance Before: ", authorBalance);

    // create a course
    const coursePrice = ethers.utils.parseEther("1");
    await platform.connect(account1).addCourse(coursePrice, "aldjfksf");
    await platform.connect(account1).addCourse(coursePrice, "slfasf");

    // create a student
    let studentBalance = await (await account2.getBalance()).toString();
    console.log("Student Balance Before: ", studentBalance);
    await platform.connect(account2).addStudent();

    // purchase course
    await platform.connect(account2).purchaseCourse(1, { value: coursePrice });
    await platform.connect(account2).purchaseCourse(2, { value: coursePrice });

    // reward sardine
    await platform.connect(account2).rewardSardine(30);

    authorBalance = await (await account1.getBalance()).toString();
    studentBalance = await (await account2.getBalance()).toString();
    let studentTokenBalance = await (
      await platform.connect(account2).fetchSardineBalance()
    ).toString();
    let courses = await platform.connect(account2).fetchEnrolledCourses();
    courses = await Promise.all(
      courses.map(async (i: any) => {
        const course = i.toString();
        return course;
      })
    );
    console.log("Author Balance After: ", authorBalance);
    console.log("Student Balance After: ", studentBalance);
    console.log("Student Sardine Balance: ", studentTokenBalance);
    console.log("Student Enrolled Courses: ", courses);
  });
});
