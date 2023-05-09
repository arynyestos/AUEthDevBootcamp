// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hackathon {
    struct Project {
        string title;
        uint[] ratings;
    }
    
    Project[] projects;

    // TODO: add the findWinner function

    function newProject(string calldata _title) external {
        // creates a new project with a title and an empty ratings array
        projects.push(Project(_title, new uint[](0)));
    }

    function rate(uint _idx, uint _rating) external {
        // rates a project by its index
        projects[_idx].ratings.push(_rating);
    }

    function findWinner() external view returns(Project memory){
        uint totalPoints;
        uint topScore;
        Project memory topRated;
        for(uint i; i < projects.length; i++){   
            totalPoints = 0;         
            for(uint j; j < projects[i].ratings.length; j++){
                totalPoints += projects[i].ratings[j];
            }
            if(totalPoints/projects[i].ratings.length > topScore){
                topScore = totalPoints/projects[i].ratings.length;
                topRated = projects[i];
            }
        }
        return topRated;
    }
}
