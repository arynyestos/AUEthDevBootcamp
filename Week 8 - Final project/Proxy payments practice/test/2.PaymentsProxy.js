const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const { parseEther } = require("ethers");

describe("TempAdjustedPayments (proxy)", function () {
  let tempAdjustedPayments;

  beforeEach(async function () {
    const TempAdjustedPayments = await ethers.getContractFactory("TempAdjustedPayments");
    // Initialize
    tempAdjustedPayments = await upgrades.deployProxy(TempAdjustedPayments, [], { initializer: 'initialize' });
  });

  it("should retrieve the temperature in Sevilla", async function () {

    expect(await tempAdjustedPayments.tempSevilla()).to.equal(BigInt('31500'));
    expect(await tempAdjustedPayments.tempMadrid()).to.equal(BigInt('31000'));
  });

  
  it("should pay workers", async function () {

    [deployer, worker1, worker2] = await ethers.getSigners();
    
    await tempAdjustedPayments.registerWorker(worker1.getAddress(), "Sevilla");
    await tempAdjustedPayments.registerWorker(worker2.getAddress(), "Madrid");

    // Agregar al contrato 10 ETH para los pagos
    await deployer.sendTransaction({
      to: await tempAdjustedPayments.getAddress(),
      value: parseEther("10"),
    });

    // Obtener el saldo del contrato después de fondearlo
    const contractBalance = await ethers.provider.getBalance(await tempAdjustedPayments.getAddress());

    // Verificar que el contrato tenga suficientes fondos
    expect(contractBalance).to.equal(parseEther("10"));

    // Obtener los saldos de los trabajadores después de los pagos
    const balanceBeforePayment1 = await ethers.provider.getBalance(worker1.getAddress());
    const balanceBeforePayment2 = await ethers.provider.getBalance(worker2.getAddress());

    // Realizar los pagos a los trabajadores
    await tempAdjustedPayments.payWorkers();

    // Obtener los saldos de los trabajadores después de los pagos
    const balanceAfterPayment1 = await ethers.provider.getBalance(worker1.getAddress());
    const balanceAfterPayment2 = await ethers.provider.getBalance(worker2.getAddress());

    // Verificar que los trabajadores hayan recibido los pagos
    expect(balanceAfterPayment1 - balanceBeforePayment1).to.be.above(0);
    expect(balanceAfterPayment2 - balanceBeforePayment2).to.be.above(0);

  }); 

});
