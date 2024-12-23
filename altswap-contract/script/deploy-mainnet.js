const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main(){
	await deployAllContracts();
}

async function deployAllContracts() {
    const OrderBook = await hre.ethers.getContractFactory("OrderBook");
    let USDT = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
    let USDC = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
    let price = ethers.utils.parseEther("0.1");
    let recipent = "0x010259c4609E5b89525AD472a8d3f060A12EE6A2";
    const orderBook = await OrderBook.deploy(USDT, USDC, price, recipent);
    await orderBook.deployed();
    console.log("OrderBook deployed to:", orderBook.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
