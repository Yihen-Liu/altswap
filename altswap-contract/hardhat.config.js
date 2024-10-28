require("@nomiclabs/hardhat-waffle");
//require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-etherscan");
const { ethers } = require("ethers");

//.secrets format: { "privkey":"....", "alchemyapikey":"...." }
const { polygon_deploy_privkey, polygon_scan_url} = require("./.secrets.json");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: //"0.6.6",
      {
        compilers:[
            {
                version:"0.8.12",
                settings:{
	                evmVersion:"istanbul",
                    optimizer:{
                        enabled:true,
	                    runs:10
                    }
                },
            }
        ],
      },
	networks: {
	  matic: {
		  url: `${polygon_scan_url}`,
		  accounts: [`${polygon_deploy_privkey}`],
		  gas: 21000000,
		  gasPrice: 80000000000,
		  chainId:137
	  }  },
};

