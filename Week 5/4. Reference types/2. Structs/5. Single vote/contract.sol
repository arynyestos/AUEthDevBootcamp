// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
	enum Choices { Yes, No }
	
	struct Vote {
		Choices choice;
		address voter;
	}
	
	// TODO: create a public state variable: an array of votes
	Vote[] public votes;

	function createVote(Choices choice) external {
		// TODO: add a new vote to the array of votes state variable
		require(!hasVoted(msg.sender), "You can only vote once!");
		votes.push(Vote(choice, msg.sender));
	}

	// function hasVoted(address _taxPayer) external view returns(bool){
	// 	for(uint i; i < votes.length; i++){
	// 		if(votes[i].voter == _taxPayer) return true;
	// 	}
	// 	return false;
	// }

	// function findChoice(address _voter) external view returns(Choices){
	// 	for(uint i; i < votes.length; i++){
	// 		if(votes[i].voter == _voter) return votes[i].choice;
	// 	}
	// }

    // A better way
	function findVote(address _taxPayer) internal view returns(Vote memory){
		for(uint i; i < votes.length; i++){
			if(votes[i].voter == _taxPayer) return votes[i];
		}
		return Vote(Choices(0), address(0));
	}
	
	function hasVoted(address _taxPayer) public view returns(bool){		
		if(findVote(_taxPayer).voter == _taxPayer) return true;
		else return false;
	}

	function findChoice(address _voter) external view returns(Choices){
		return findVote(_voter).choice;
	}
}