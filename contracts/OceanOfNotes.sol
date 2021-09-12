// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract Token is ERC20PresetMinterPauser {
    constructor() ERC20PresetMinterPauser("Sardine", "Sard") {
        _mint(msg.sender, 10000000);
    }

    function mintSardine(uint256 amount) public {
        mint(msg.sender, amount);
    }
}

contract Platform is ReentrancyGuard {
    // a utility type for counting operation
    using Counters for Counters.Counter;
    Counters.Counter private _courseIds;
    Counters.Counter private _coursesSolds;

    uint8 constant maxCreditTokensPerCourse = 70;
    address payable owner;
    string public name = "Ocean of Notes";
    ERC20PresetMinterPauser public token;

    constructor() {
        owner = payable(msg.sender);
        token = new Token();
    }

    struct Student {
        address payable studentAddress;
        uint256[] courseEnrolledList;
    }

    struct Course {
        uint256 courseId;
        string courseMetadata;
        address payable authorAddress;
        uint256 coursePrice;
    }

    // Create mappings to get author, student and course data from their ids
    mapping(address => Student) private students;
    mapping(uint256 => Course) private courses;

    // list of events we want to broadcast

    event CourseCreated(
        uint256 courseId,
        string courseMetadata,
        address authorAddress,
        uint256 coursePrice
    );

    event PurchasedCourse(
        uint256 courseId,
        address studentAddress,
        address authorAddress
    );

    event RewardedSardine(uint256 amount, address receiver);


    function addStudent() public {
        students[msg.sender] = Student(
            payable(msg.sender),
            new uint256[](0)
        );
    }

    function addCourse(uint256 coursePrice, string memory courseMetadata)
        public
    {
        _courseIds.increment();
        uint256 courseId = _courseIds.current();
        courses[courseId] = Course(
            courseId,
            courseMetadata,
            payable(msg.sender),
            coursePrice
        );

        emit CourseCreated(
          courseId,
          courseMetadata,
          msg.sender,
          coursePrice
        );
    }

    function purchaseCourse(uint256 courseId) public payable nonReentrant {
        uint256 price = courses[courseId].coursePrice;
        require(
            msg.value == price,
            "Insufficient funds to purchase this course..."
        );
        courses[courseId].authorAddress.transfer((msg.value / 10) * 9);
        payable(owner).transfer((msg.value / 10) * 1);
        _coursesSolds.increment();

        students[msg.sender].courseEnrolledList.push(courseId);

        emit PurchasedCourse(
            courseId,
            msg.sender,
            courses[courseId].authorAddress
        );
    }

    function rewardSardine(uint256 amount) public payable nonReentrant {
        token.transfer(msg.sender, amount);

        emit RewardedSardine(amount, msg.sender);
    }

    function getSardineBalance() public view returns (uint256) {
        return token.balanceOf(msg.sender);
    }

    function getEnrolledCourses() public view returns (uint256[] memory) {
        return students[msg.sender].courseEnrolledList;
    }
}
