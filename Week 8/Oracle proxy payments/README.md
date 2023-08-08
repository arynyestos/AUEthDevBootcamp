# Oracle proxy payments

This subproject contains the project's actual contracts, those that are implemented for the final solution. These contracts are:

- GetEthPrice.sol: Retrieves the price of ETH in order to calculate the workers' base wage, which is constant in USD.
- GetTempFeel.sol: Retrieves the thermal sensation in the city where the worker is.
- TempAdjustedPayments: Sends the payments of the individually calculated wages to each and every worker. This a contract that uses the proxy pattern ERC1967. The main goal here was to develop a contract that fulfilled the function of sending the payments to the registered workers while being secure and upgradeable. This way, once the contract has been funded there is no need to move the ETH kept there for the payments if an upgrade is needed, among other advantages. Some obvious upgrades that could be made (but weren't included in the current contract since they're not essential to prove functionality) are including a method to deregister workers from the contract (as shown in the code featured in this repo, commented out), or changing the parameters used to calculate the workers' wages, in case a new agreement were reached.

