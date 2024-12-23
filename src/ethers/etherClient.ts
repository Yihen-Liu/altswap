/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { OrderBook__factory } from "../types";
import { ethers, Signer, PayableOverrides } from "ethers";
import type { Web3Provider, Provider } from "@ethersproject/providers";
import detectEthereumProvider from "@metamask/detect-provider";
import usdtAbi from "./abi/usdt.json";
import usdcAbi from "./abi/usdc.json";
import { StableCoin } from "../constants/network";
export interface IWalletInfo {
    address: string;
    networkName: string;
    chainId: number;
    balance: string;
}

export class EtherClient {
    orderBookContractAddr: string;
    winProvider?: any;
    provider?: Web3Provider;
    client?: OrderbookClient;

    constructor(orderBookContractAddr: string) {
        this.orderBookContractAddr = orderBookContractAddr;
    }

    async loadProvider() {
        if (this.provider) {
            return;
        }
        this.winProvider = await detectEthereumProvider();
        if (this.winProvider) {
            // change event bind
            this.winProvider.on("accountsChanged", (accounts: string[]) => {
                // this.onAccountsDidChange.fire(accounts);
                window.location.reload();
            });
            this.winProvider.on("chainChanged", () => {
                window.location.reload();
            });
            this.provider = new ethers.providers.Web3Provider(this.winProvider);
            return;
        }
        throw new Error("there are no eth provider.");
    }

    async getWalletInfo(): Promise<IWalletInfo | undefined> {
        if (this.provider) {
            await this.winProvider.request({ method: "eth_requestAccounts" });
            const address = await this.provider.getSigner().getAddress();
            const balance = await this.provider.getBalance(address);
            const network = await this.provider.getNetwork();
            return {
                address,
                networkName: network.name,
                chainId: network.chainId,
                balance: ethers.utils.formatEther(balance),
            };
        }
        throw new Error("get wallet info failed");
    }

    connectOrderBookContract() {
        if (this.provider) {
            this.client = new OrderbookClient();
            this.client.connectProvider(this.orderBookContractAddr, this.provider);
            this.client.setWaitConfirmations(1);
        }
    }

    connectSigner() {
        if (this.client && this.provider) {
            this.client.setWaitConfirmations(1);
            const signer = this.provider.getSigner();
            this.client.connectSigner(signer);
        }
    }

    resetClientConfirmations() {
        if (this.client) {
            this.client.setWaitConfirmations(1); // set number of confirmations to wait default is 5 blocks
        }
    }
}

class OrderbookClient {
    private orderBook: any | undefined;
    private provider: Provider | undefined;
    private signer: Signer | undefined;
    private _waitConfirmations = 3;

    constructor() {
        this._waitConfirmations = 3;
    }

    public connectProvider(address: string, provider: Provider): OrderbookClient {
        this.provider = provider;
        this.orderBook = OrderBook__factory.connect(address, this.provider);

        return this;
    }

    public connectSigner(signer: Signer): OrderbookClient {
        this.signer = signer;
        return this;
    }

    public setWaitConfirmations(num: number): void {
        this._waitConfirmations = num;
    }

    public contract(): Promise<any> {
        if (this.provider === undefined || this.orderBook === undefined) {
            return Promise.reject("need to connect a valid provider");
        }
        return Promise.resolve(this.orderBook);
    }

    public async createSaveOrder(
        sBTCReceiver: string, amount: number, token: StableCoin, config: PayableOverrides = {}): Promise<any> {

        if (this.provider === undefined || this.orderBook === undefined || this.signer === undefined) {
            return Promise.reject("need to connect a valid provider and signer")
        }

        const approved = await this.handleApproval(token, ethers.utils.parseUnits(amount.toString(), 18));
        if (!approved) {
            return Promise.reject("Approval failed");
        }
        const gas = await this.orderBook.connect(this.signer).estimateGas.storeDataWithRecipient(sBTCReceiver, amount, token, { ...config })

        const transaction = await this.orderBook.connect(this.signer).storeDataWithRecipient(sBTCReceiver, amount, token, { gasLimit: gas.mul(13).div(10), ...config })
        const receipt = await transaction.wait(this._waitConfirmations);
        return receipt;
    }

    public async handleApproval(
        tokenType: string,
        requiredAmount: ethers.BigNumber
    ): Promise<any> {
        const tokenAbi = tokenType === "USDT" ? usdtAbi : usdcAbi;
        const tokenAddress = tokenType === "USDT" ? process.env.REACT_APP_USDT_ADDR : process.env.REACT_APP_USDC_ADDR;
        if (typeof tokenAddress === 'undefined') {
            throw new Error(`REACT_APP_USDC_OR_USDT_ADDRESS must be a defined environment variable`)
        }

        const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, this.signer);

        try {
            // Step 1: Check allowance
            const allowance = await tokenContract.allowance(this.signer?.getAddress(), this.orderBook?.address);
            console.log("Current allowance:", ethers.utils.formatUnits(allowance, 18));

            if (allowance.gte(requiredAmount)) {
                console.log("Sufficient allowance. Skipping approve.");
                return true;
            }

            const neededAmount = requiredAmount.sub(allowance);

            // Step 2: Check user balance
            const balance = await tokenContract.balanceOf(this.signer?.getAddress());
            console.log("Current balance:", ethers.utils.formatUnits(balance, 18));

            if (balance.lt(neededAmount)) {
                console.error("Insufficient balance. Cannot proceed with approve.");
                return false;
            }

            // Step 3: Approve the required amount
            console.log("Insufficient allowance. Approving now...");
            const approveTx = await tokenContract.approve(this.signer?.getAddress(), neededAmount);
            console.log("Approval transaction sent. Hash:", approveTx.hash);

            // Wait for the transaction to be mined
            const receipt = await approveTx.wait();
            console.log("Approval successful. Receipt:", receipt);
            return true;
        } catch (error) {
            console.error("Error during approval process:", error);
            return false;
        }
    }
}

const INFURA_KEY = process.env.REACT_APP_ORDERBOOK_CONTRACT_ADDR;
if (typeof INFURA_KEY === 'undefined') {
    throw new Error(`REACT_APP_ORDERBOOK_CONTRACT_ADDR must be a defined environment variable`)
}

export const etherClient = new EtherClient(process.env.REACT_APP_ORDERBOOK_CONTRACT_ADDR ? process.env.REACT_APP_ORDERBOOK_CONTRACT_ADDR : "");
