const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const { parseEther } = require("ethers");

describe("TempAdjustedPaymentsV2 (proxy)", function () {
  let tempAdjustedPayments;
  let tempAdjustedPaymentsV2;

  beforeEach(async function () {
    const TempAdjustedPayments = await ethers.getContractFactory("TempAdjustedPayments");
    const TempAdjustedPaymentsV2 = await ethers.getContractFactory("TempAdjustedPaymentsV2");
    // Initialize
    tempAdjustedPayments = await upgrades.deployProxy(TempAdjustedPayments, [], { initializer: 'initialize' });
    tempAdjustedPaymentsV2 = await upgrades.deployProxy(TempAdjustedPaymentsV2, [32000,31200], { initializer: 'initialize' });
  });

  it("should retrieve the temperatures in Sevilla and Madrid for both V1 and V2", async function () {

    expect(await tempAdjustedPayments.tempSevilla()).to.equal(BigInt('31500'));
    expect(await tempAdjustedPayments.tempMadrid()).to.equal(BigInt('31000'));
    expect(await tempAdjustedPaymentsV2.tempSevilla()).to.equal(BigInt('32000'));
    expect(await tempAdjustedPaymentsV2.tempMadrid()).to.equal(BigInt('31200'));
  });

  
  it("should pay workers with both V1 and V2", async function () {

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


    await tempAdjustedPaymentsV2.registerWorker(worker1.getAddress(), "Sevilla");
    await tempAdjustedPaymentsV2.registerWorker(worker2.getAddress(), "Madrid");

    // Agregar al contrato 10 ETH para los pagos
    await deployer.sendTransaction({
      to: await tempAdjustedPaymentsV2.getAddress(),
      value: parseEther("10"),
    });

    // Obtener el saldo del contrato después de fondearlo
    const contractBalanceV2 = await ethers.provider.getBalance(await tempAdjustedPaymentsV2.getAddress());

    // Verificar que el contrato tenga suficientes fondos
    expect(contractBalanceV2).to.equal(parseEther("10"));

    // Obtener los saldos de los trabajadores después de los pagos
    const balanceBeforePayment1V2 = await ethers.provider.getBalance(worker1.getAddress());
    const balanceBeforePayment2V2 = await ethers.provider.getBalance(worker2.getAddress());

    // Realizar los pagos a los trabajadores
    await tempAdjustedPaymentsV2.payWorkers();

    // Obtener los saldos de los trabajadores después de los pagos
    const balanceAfterPayment1V2 = await ethers.provider.getBalance(worker1.getAddress());
    const balanceAfterPayment2V2 = await ethers.provider.getBalance(worker2.getAddress());

    // Verificar que los trabajadores hayan recibido los pagos
    expect(balanceAfterPayment1V2 - balanceBeforePayment1V2).to.be.above(0);
    expect(balanceAfterPayment2V2 - balanceBeforePayment2V2).to.be.above(0);

  }); 

});
