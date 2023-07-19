# Oracle proxy payments

This subproject contains the project's actual contracts, those that are implemented for the final solution. These contracts are:

- GetEthPrice.sol: Retrieves the price of ETH in order to calculate the workers' base wage, which is constant in USD.
- GetTempFeel.sol: Retrieves the thermal sensation in the city where the worker is.
- TempAdjustedPayments: Sends the payments of the individually calculated wages to each and every worker. This a contract that uses the proxy pattern ERC1967.
