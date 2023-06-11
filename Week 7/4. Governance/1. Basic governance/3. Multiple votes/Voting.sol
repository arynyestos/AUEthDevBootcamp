// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Voting {
    enum VoteStates {Abstention, Yes, No}

    struct Proposal {
        address target;
        bytes data;
        uint yesCount;
        uint noCount;
        mapping (address => VoteStates) voteStates;
    }
    
    Proposal[] public proposals;
    event ProposalCreated(uint _ProposalId);
    event VoteCast(uint _ProposalId, address indexed _voterAddress);
    
    function newProposal(address _target, bytes calldata _data) external {
        Proposal storage proposal = proposals.push();
        proposal.target = _target;
        proposal.data = _data;
        emit ProposalCreated(proposals.length - 1);
    }

    function castVote(uint _proposalId, bool _supports) external {
        Proposal storage proposal = proposals[_proposalId];

        // clear out previous vote 
        if(proposal.voteStates[msg.sender] == VoteStates.Yes) {
            proposal.yesCount--;
        }
        if(proposal.voteStates[msg.sender] == VoteStates.No) {
            proposal.noCount--;
        }

        // add new vote 
        if(_supports) {
            proposal.yesCount++;
        }
        else {
            proposal.noCount++;
        }

        // we're tracking whether or not someone has already voted 
        // and we're keeping track as well of what they voted
        proposal.voteStates[msg.sender] = _supports ? VoteStates.Yes : VoteStates.No;

        emit VoteCast(_proposalId, msg.sender);
    }
}