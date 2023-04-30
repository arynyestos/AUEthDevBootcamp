import { ethers } from 'ethers';

export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  handleApprove,
  connectedAccount,
  isGoerliSelected
}) {
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {ethers.utils.formatEther(value)} ETH</div>
        </li>
        <div
          className={`button${(connectedAccount.toLowerCase() !== arbiter.toLowerCase() || !isGoerliSelected) ? "_disabled" : ""}`}
          id={address}
          onClick={(e) => {
            e.preventDefault();
            if (connectedAccount.toLowerCase() === arbiter.toLowerCase() || !isGoerliSelected) {
              handleApprove();
            }
          }}
        >
          Approve
        </div>
      </ul>
    </div>
  );
}
