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
    string public name = "Inflow";
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
        students[msg.sender] = Student(payable(msg.sender), new uint256[](0));
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

        emit CourseCreated(courseId, courseMetadata, msg.sender, coursePrice);
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

    function fetchSardineBalance() public view returns (uint256) {
        return token.balanceOf(msg.sender);
    }

    function fetchCourses() public view returns (Course[] memory) {
        uint256 courseCount = _courseIds.current();
        Course[] memory courseList = new Course[](courseCount);
        for (uint256 i = 1; i <= courseCount; i++) {
            courseList[i - 1] = courses[i];
        }
        return courseList;
    }

    function fetchCourseById(uint256 courseId)
        public
        view
        returns (Course memory)
    {
        return courses[courseId];
    }

    function fetchEnrolledCourses(address _student) public view returns (uint256[] memory) {
        return students[_student].courseEnrolledList;
    }

    function fetchCreatedCourses() public view returns (Course[] memory) {
        uint256 courseCount = _courseIds.current();
        uint256 courseCreatedCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < courseCount; i++) {
            if (courses[i + 1].authorAddress == msg.sender) {
                courseCreatedCount += 1;
            }
        }

        Course[] memory coursesCreated = new Course[](courseCreatedCount);
        for (uint256 i = 0; i < courseCount; i++) {
            if (courses[i + 1].authorAddress == msg.sender) {
                Course storage currentCourse = courses[i + 1];
                coursesCreated[currentIndex] = currentCourse;
                currentIndex += 1;
            }
        }
        return coursesCreated;
    }
}
