// test/StoreDataWithMultiToken.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OrderBook", function () {
  let usdtToken, usdcToken, storeDataWithMultiToken;
  let owner, user1, user2, recipient;

  beforeEach(async function () {
    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    
    // Deploy mock USDT and USDC tokens
    usdtToken = await ERC20Mock.deploy("Mock USDT", "USDT", ethers.utils.parseEther("1000"));
    usdcToken = await ERC20Mock.deploy("Mock USDC", "USDC", ethers.utils.parseEther("1000"));
    await usdtToken.deployed();
    await usdcToken.deployed();

    // Get the owner, user1, user2, and recipient addresses
    [owner, user1, user2, recipient] = await ethers.getSigners();

    // Deploy StoreDataWithMultiToken contract
    const StoreDataWithMultiToken = await ethers.getContractFactory("OrderBook");
    storeDataWithMultiToken = await StoreDataWithMultiToken.deploy(
      usdtToken.address,
      usdcToken.address,
      ethers.utils.parseEther("1"), // price of each sBTC
      recipient.address
    );
    await storeDataWithMultiToken.deployed();

    // Distribute tokens to users
    await usdtToken.transfer(user1.address, ethers.utils.parseEther("100"));
    await usdcToken.transfer(user1.address, ethers.utils.parseEther("100"));
    await usdtToken.transfer(user2.address, ethers.utils.parseEther("100"));
    await usdcToken.transfer(user2.address, ethers.utils.parseEther("100"));
  });

  it("should allow storing data with USDT", async function () {
    // User1 approves the contract to spend USDT
    await usdtToken.connect(user1).approve(storeDataWithMultiToken.address, ethers.utils.parseEther("10"));

    // User1 stores data with USDT
    await storeDataWithMultiToken.connect(user1).storeData(123, user1.address,10, "USDT");

    // Retrieve user1's history
    const history = await storeDataWithMultiToken.getUserHistory(user1.address);
    expect(history.length).to.equal(1);
    expect(history[0].data).to.equal(123);
    expect(history[0].receiver).to.equal(user1.address);
  });

  it("should allow storing data with USDC", async function () {
    // User1 approves the contract to spend USDC
    await usdcToken.connect(user1).approve(storeDataWithMultiToken.address, ethers.utils.parseEther("10"));

    // User1 stores data with USDC
    await storeDataWithMultiToken.connect(user1).storeData(456, user1.address,10, "USDC");

    // Retrieve user1's history
    const history = await storeDataWithMultiToken.getUserHistory(user1.address);
    expect(history.length).to.equal(1);
    expect(history[0].data).to.equal(456);
    expect(history[0].receiver).to.equal(user1.address);
  });

  it("should allow the same user to store multiple data entries", async function () {
    // User1 approves the contract to spend USDT and USDC
    await usdtToken.connect(user1).approve(storeDataWithMultiToken.address, ethers.utils.parseEther("10"));
    await usdcToken.connect(user1).approve(storeDataWithMultiToken.address, ethers.utils.parseEther("10"));

    // User1 stores data twice with different tokens
    await storeDataWithMultiToken.connect(user1).storeData(123, user1.address,10, "USDT");
    await storeDataWithMultiToken.connect(user1).storeData(456, user1.address, 10,"USDC");

    // Retrieve user1's history
    const history = await storeDataWithMultiToken.getUserHistory(user1.address);
    expect(history.length).to.equal(2);
    expect(history[0].data).to.equal(123);
    expect(history[1].data).to.equal(456);
  });

  it("should allow retrieving specific data entry by index", async function () {
    // User1 approves the contract to spend USDT
    await usdtToken.connect(user1).approve(storeDataWithMultiToken.address, ethers.utils.parseEther("20"));

    // User1 stores data twice with USDT
    await storeDataWithMultiToken.connect(user1).storeData(123, user1.address,10, "USDT");
    await storeDataWithMultiToken.connect(user1).storeData(456, user1.address, 10,"USDT");

    // Retrieve user1's second data entry by index
    const entry = await storeDataWithMultiToken.getUserDataByIndex(user1.address, 1);
    expect(entry[0]).to.equal(456);
    expect(entry[1]).to.equal(user1.address);
  });

  it("should allow the owner to withdraw USDT", async function () {
    // User1 approves the contract to spend USDT and stores data
    await usdtToken.connect(user1).approve(storeDataWithMultiToken.address, ethers.utils.parseEther("10"));
    await storeDataWithMultiToken.connect(user1).storeDataDisableRecipent(123, user1.address, 10,"USDT");

    // Check recipient's USDT balance before withdrawal
    recipient.address = storeDataWithMultiToken.address;
    const recipientBalanceBefore = await usdtToken.balanceOf(recipient.address);

    console.log("recipentBalanceBefore:", recipientBalanceBefore)
    // Owner withdraws USDT
    await storeDataWithMultiToken.withdrawTokens(ethers.utils.parseEther("10"), "USDT");

    // Check recipient's USDT balance after withdrawal
    const recipientBalanceAfter = await usdtToken.balanceOf(recipient.address);
    console.log("recipentBalanceAfter:", recipientBalanceAfter)
    expect(recipientBalanceBefore.sub(recipientBalanceAfter)).to.equal(ethers.utils.parseEther("10"));
  });

  it("should allow the owner to withdraw USDC", async function () {
    // User1 approves the contract to spend USDC and stores data
    await usdcToken.connect(user1).approve(storeDataWithMultiToken.address, ethers.utils.parseEther("10"));
    await storeDataWithMultiToken.connect(user1).storeDataDisableRecipent(456, user1.address,10, "USDC");

      // Check recipient's USDC balance before withdrawal
      recipient.address = storeDataWithMultiToken.address;
    const recipientBalanceBefore = await usdcToken.balanceOf(recipient.address);

    // Owner withdraws USDC
    await storeDataWithMultiToken.withdrawTokens(ethers.utils.parseEther("10"), "USDC");

    // Check recipient's USDC balance after withdrawal
    const recipientBalanceAfter = await usdcToken.balanceOf(recipient.address);
    expect(recipientBalanceBefore.sub(recipientBalanceAfter)).to.equal(ethers.utils.parseEther("10"));
  });

  it("should restrict token withdrawal to the owner only", async function () {
    // User1 approves the contract to spend USDT and stores data
    await usdtToken.connect(user1).approve(storeDataWithMultiToken.address, ethers.utils.parseEther("10"));
    await storeDataWithMultiToken.connect(user1).storeData(123, user1.address, 10,"USDT");

    // User1 tries to withdraw USDT (should fail)
    await expect(storeDataWithMultiToken.connect(user1).withdrawTokens(ethers.utils.parseEther("10"), "USDT"))
      .to.be.revertedWith("Caller is not the owner");
  });

  it("should allow the owner to transfer ownership", async function () {
    // Owner transfers ownership to user1
    await storeDataWithMultiToken.transferOwnership(user1.address);

    // Check that user1 is the new owner
    expect(await storeDataWithMultiToken.owner()).to.equal(user1.address);

    // User1 (new owner) withdraws tokens
    await usdtToken.connect(user2).approve(storeDataWithMultiToken.address, ethers.utils.parseEther("10"));
    await storeDataWithMultiToken.connect(user2).storeDataDisableRecipent(789, user2.address,10, "USDT");

    await storeDataWithMultiToken.connect(user1).withdrawTokens(ethers.utils.parseEther("10"), "USDT");
  });
});
