// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract StackClub {
    address[] members;

    constructor(){
        members.push(msg.sender);
    }

    function addMember(address _newMember) external{
        require(isMember(msg.sender));
        members.push(_newMember);
    }

    function isMember(address _person) public view returns(bool){
        for(uint i; i < members.length; i++){
            if(members[i] == _person) return true;
        }
        return false;
    }

    function removeLastMember() external{
        require(isMember(msg.sender));
        members.pop();
    }
}