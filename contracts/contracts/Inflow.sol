// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract Inflow is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _courseId;
    Counters.Counter private _courseSold;

    struct Course {
        address payable author;
        uint256 id;
        uint256 price;
        string metadata;
        bool acceptTokens;
    }

    mapping(uint256 => Course) public courses; // maps courseId to course
    mapping(address => uint256[]) public purchasedCourses; // maps an address with purchased course's id

    event NewCourse(uint256 indexed id, string indexed metadata);

    function createCourse(
        uint256 _price,
        string memory _metadata,
        bool _acceptTokens
    ) external returns (uint256) {
        _courseId.increment();
        uint256 id = _courseId.current();

        Course memory course;
        course.author = payable(msg.sender);
        course.id = id;
        course.price = _price;
        course.metadata = _metadata;
        course.acceptTokens = _acceptTokens;

        courses[id] = course;
        purchasedCourses[msg.sender].push(course.id);

        emit NewCourse(id, _metadata);
        return id;
    }

    function purchaseCourse(uint256 _id) external payable nonReentrant {
        Course memory course = courses[_id];
        uint256 price = course.price;
        require(
            msg.value == price,
            "Insufficient funds to purchase this course..."
        );
        course.author.transfer(msg.value);
        purchasedCourses[msg.sender].push(course.id);
        _courseSold.increment();
    }

    function getCourses() external view returns (Course[] memory) {
        uint256 courseCount = _courseId.current();
        Course[] memory courseList = new Course[](courseCount);
        for (uint256 i = 1; i <= courseCount; i++) {
            courseList[i - 1] = courses[i];
        }
        return courseList;
    }

    function getCourseById(uint256 courseId)
        external
        view
        returns (Course memory)
    {
        return courses[courseId];
    }

    function getEnrolledCourses() external view returns (uint256[] memory) {
        return purchasedCourses[msg.sender];
    }

    function getCreatedCourses() external view returns (Course[] memory) {
        uint256 courseCount = _courseId.current();
        uint256 courseCreatedCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < courseCount; i++) {
            if (courses[i + 1].author == msg.sender) {
                courseCreatedCount += 1;
            }
        }

        Course[] memory coursesCreated = new Course[](courseCreatedCount);
        for (uint256 i = 0; i < courseCount; i++) {
            if (courses[i + 1].author == msg.sender) {
                Course storage currentCourse = courses[i + 1];
                coursesCreated[currentIndex] = currentCourse;
                currentIndex += 1;
            }
        }
        return coursesCreated;
    }
}
