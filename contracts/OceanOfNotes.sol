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
    Counters.Counter private _authorIds;
    Counters.Counter private _studentIds;
    Counters.Counter private _courseIds;
    Counters.Counter private _coursesSolds;
    uint8 constant maxCreditTokensPerCourse = 70;

    // address of the owner of the platform
    // note: we are making it payable because we want to send matic
    // to and from our contract address
    address payable owner;
    string public name = "Ocean of Notes";
    ERC20PresetMinterPauser public token;

    constructor() {
        owner = payable(msg.sender);
        token = new Token();
    }

    // Define data types
    struct Author {
        uint256 authorId;
        address payable authorAddress;
        string authorMetadata;
    }

    struct Student {
        uint256 studentId;
        address payable studentAddress;
        uint256[] courseEnrolledList;
    }

    struct Course {
        uint256 courseId;
        address payable authorAddress;
        uint256 coursePrice;
        string courseMetadata;
    }

    // Create mappings to get author, student and course data from their ids
    mapping(uint256 => Author) private authors;
    mapping(uint256 => Student) private students;
    mapping(uint256 => Course) private courses;

    // list of events we want to broadcast
    event AuthorCreated(
        uint256 authorId,
        address authorAddress,
        string authorMetadata
    );

    event StudentCreated(uint256 studentId, address studentAddress);

    event CourseCreated(
        uint256 courseId,
        uint256 coursePrice,
        string courseMetadata
    );

    event PurchasedCourse(
        uint256 courseId,
        address studentAddress,
        address authorAddress
    );

    event RewardedSardine(uint256 amount, address receiver);

    function addAuthor(string memory authorMetadata) public returns (uint256) {
        _authorIds.increment();
        uint256 authorId = _authorIds.current();
        authors[authorId] = Author(
            authorId,
            payable(msg.sender),
            authorMetadata
        );

        emit AuthorCreated(authorId, msg.sender, authorMetadata);

        return authorId;
    }

    function addStudent() public returns (uint256) {
        _studentIds.increment();
        uint256 studentId = _studentIds.current();

        students[studentId] = Student(
            studentId,
            payable(msg.sender),
            new uint256[](0)
        );

        emit StudentCreated(studentId, msg.sender);

        return studentId;
    }

    function addCourse(uint256 coursePrice, string memory courseMetadata)
        public
        returns (uint256)
    {
        _courseIds.increment();
        uint256 courseId = _courseIds.current();
        courses[courseId] = Course(
            courseId,
            payable(msg.sender),
            coursePrice,
            courseMetadata
        );

        emit CourseCreated(courseId, coursePrice, courseMetadata);

        return courseId;
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
}
