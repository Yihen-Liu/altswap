const hre = require("hardhat");

async function main(){
	await deployAllContracts();
}

async function deployAllContracts() {
    const OrderBook = await hre.ethers.getContractFactory("OrderBook");
    let USDT = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
    let USDC = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
    let price = 1;
    let recipent = "0x010259c4609E5b89525AD472a8d3f060A12EE6A2";
    const orderBook = await OrderBook.deploy(USDT, USDC, price, recipent);
    await orderBook.deployed();
    console.log("VaultHub deployed to:", orderBook.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
