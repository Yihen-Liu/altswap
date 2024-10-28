/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { OrderBook__factory} from "../types";
import { ethers, Signer, PayableOverrides } from "ethers";
import type { Web3Provider, Provider } from "@ethersproject/providers";
import detectEthereumProvider from "@metamask/detect-provider";

export interface IWalletInfo {
    address: string;
    networkName: string;
    chainId: number;
    balance: string;
}

export class EtherClient {
    seedlistContractAddress: string;
    winProvider?: any;
    provider?: Web3Provider;
    client?: OrderbookClient;
    //     readonly onAccountsDidChange = new Emitter<string[]>();
    //     onAccountsChange = this.onAccountsDidChange.event;

    constructor(seedlistContractAddress: string) {
        this.seedlistContractAddress = seedlistContractAddress;
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

    connectSeedlistContract() {
        if (this.provider) {
            this.client = new OrderbookClient();
            this.client.connectProvider(this.seedlistContractAddress, this.provider);
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
    private seedlist: any | undefined;
    private provider: Provider | undefined;
    private signer: Signer | undefined;
    private _waitConfirmations = 3;

    constructor() {
        this._waitConfirmations = 3;
    }

    public connectProvider(address: string, provider: Provider): OrderbookClient {
        this.provider = provider;
        this.seedlist = OrderBook__factory.connect(address, this.provider);

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
        if (this.provider === undefined || this.seedlist === undefined) {
            return Promise.reject("need to connect a valid provider");
        }
        return Promise.resolve(this.seedlist);
    }

    public async createSaveOrder(
        sBTCReceiver: string, amount: number, token: string, config: PayableOverrides = {}): Promise<any> {

        if (this.provider === undefined || this.seedlist === undefined || this.signer === undefined) {
            return Promise.reject("need to connect a valid provider and signer")
        }

        const gas = await this.seedlist.connect(this.signer).estimateGas.storeDataDisableRecipent(sBTCReceiver, amount, token, { ...config })

        const transaction = await this.seedlist.connect(this.signer).storeDataDisableRecipent(sBTCReceiver, amount, token, { gasLimit: gas.mul(13).div(10), ...config })
        const receipt = await transaction.wait(this._waitConfirmations);
        return receipt;
    }

}

const INFURA_KEY = process.env.REACT_APP_ORDERBOOK_CONTRACT_ADDR;
if (typeof INFURA_KEY === 'undefined') {
    throw new Error(`REACT_APP_ORDERBOOK_CONTRACT_ADDR must be a defined environment variable`)
}

export const etherClient = new EtherClient(process.env.REACT_APP_ORDERBOOK_CONTRACT_ADDR ? process.env.REACT_APP_ORDERBOOK_CONTRACT_ADDR : "");
