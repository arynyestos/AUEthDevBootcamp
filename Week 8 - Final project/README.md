# SummerPay: Smart Temperature-Adjusted Payments System

<p align="justify">
SummerPay is an innovative and efficient automated payment system designed to streamline compensation processes while integrating dynamic temperature adjustments through Chainlink oracles. By leveraging real-time temperature data sourced from a reliable external API via Chainlink's decentralized oracles, SummerPay intelligently calculates and applies appropriate payment multipliers to employee earnings based on the climatic conditions of their working city. This forward-thinking solution not only ensures fair compensation reflective of environmental challenges but also simplifies payroll management for businesses. With its user-friendly interface and seamless integration of blockchain technology and Chainlink oracles, SummerPay redefines how payments are made, fostering a harmonious balance between labor and weather variables.
</p>

<p align="justify">
In our journey to create SummerPay, we embarked on a multi-faceted technological exploration to ensure a comprehensive and seamless solution. To accurately value employee compensation, we harnessed the power of the blockchain by utilizing an available Oracle to retrieve real-time Ethereum price data, ensuring precise payment conversions. To achieve a reliable temperature-based wage adjustment, we set up a Chainlink node, seamlessly integrating an external adapter to fetch temperature data from OpenWeatherMap’s API. Through a custom-built job, we bridged the gap between weather conditions and fair pay, ensuring employees are compensated according to the environmental challenges they face.
</p>

<p align="justify">
Our commitment to excellence extended to the architectural design of our smart contract. By employing a proxy architecture, we ensured that our smart contract remains future-proof and easily upgradeable, allowing for the incorporation of new features and optimizations without disrupting ongoing operations. The implementation of callbacks played a pivotal role in preventing synchronization issues, ensuring data consistency and reliability throughout our solution.
</p>

<p align="justify">
Automation was a key focus, culminating in the integration of a Chainlink upkeep mechanism. Through this intelligent automation, payments are executed automatically on a daily basis, eradicating the need for manual intervention and streamlining payroll management for businesses. This innovation ensures timely and accurate compensation, underlining our dedication to efficiency and fairness in every aspect of SummerPay's functionality.
</p>

<p align="justify">
Together, these technical accomplishments coalesce into a cutting-edge system that redefines how payments are conducted in the modern workplace. SummerPay stands as a testament to our commitment to leveraging blockchain, Chainlink oracles, and innovative architecture to create a truly transformative solution for both employees and employers.
</p>

## Graphical User Interface

On top of a fully functional back end, SummerPay's user interface allows the company to add and remove employees from the contract, as well as set up the Chainlink automation contract address (so that only this contract can initiate payments), pay manually (e.g. if the Chainlink upkeep contract has run out of LINK and action needs to be taken) and withdraw the funds from the payments contract (e. g. if the company shuts down).

![SummerPay Front end](https://github.com/arynyestos/AUEthDevBootcamp/assets/33223441/1fc03690-4a5b-4f49-8383-643b4818c1ad)

## Testnet App

To prove that SummerPay is a fully functional system, it was deployed on the Sepolia testnet:

- [Payments (proxy) contract](https://sepolia.etherscan.io/address/0x014211CA975a62fB4c3c74001fBd7e6D5Fc92a11)
- [Payments (implementation) contract](https://sepolia.etherscan.io/address/0xB1Bc827C6F8201E089c1710CcdFedC866A36432E)
- [Get ETH price contract](https://sepolia.etherscan.io/address/0x802B31EedF9781053d410144F5a589FAf53A9F8b)
- [Get cities' temperatures contract](https://sepolia.etherscan.io/address/0x0Ac8ae1b5D2DF7AC252DcAcAeecB72dAf26d2c89)
- [Chainlink upkeep contract](https://sepolia.etherscan.io/address/0xd6ecA3326fa9b186D62F02DD989913EF1f7c799E)

## Video Presentation

Below you can see the video presentation for the Alchemy University Ethereum Developer Bootcamp final project submission.

https://github.com/arynyestos/AUEthDevBootcamp/assets/33223441/db8b6cfc-d193-4c2c-9c49-060bcd8e6db0
