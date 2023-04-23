// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract StackClub {
    address[] members;

    function addMember(address _newMember) external{
        members.push(_newMember);
    }

    function isMember(address _person) public view returns(bool){
        for(uint i; i < members.length; i++){
            if(members[i] == _person) return true;
        }
        return false;
    }
}