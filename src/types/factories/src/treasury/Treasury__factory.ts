/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Treasury,
  TreasuryInterface,
} from "../../../src/treasury/Treasury";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_seed",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "rule",
        type: "string",
      },
    ],
    name: "addRule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "callable",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "caller",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cycle",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "enableHalf",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastWithdrawAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ruleSize",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    name: "rules",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "seedToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_caller",
        type: "address",
      },
    ],
    name: "setCaller",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "enable",
        type: "bool",
      },
    ],
    name: "setHalf",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawCnt",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawETH",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040526000600355600480546001600160481b03191690556a131b9d825c4aa46d8000006005556871d75ab9b920500000600655680b6255df5f500800006007556008805461ffff1916905534801561005957600080fd5b506040516110d43803806110d4833981016040819052610078916100b3565b600280546001600160a01b039092166001600160a01b031992831617905560008054909116331790556001805460ff60a01b191690556100e3565b6000602082840312156100c557600080fd5b81516001600160a01b03811681146100dc57600080fd5b9392505050565b610fe2806100f26000396000f3fe6080604052600436106101025760003560e01c80638da5cb5b11610095578063beb92f5511610064578063beb92f55146102f2578063c6f9e40c14610312578063d9caed1214610333578063f2fde38b14610353578063fc9c8d391461037357600080fd5b80638da5cb5b1461027a5780638f2ad4cb1461029a5780639e2af5c7146102ba578063b831461e146102dc57600080fd5b806367b730f5116100d157806367b730f5146101c45780636a2ab602146101fe5780636a6278421461021f5780638bfb787b1461024d57600080fd5b8063311f84831461010e5780634782f7791461014b5780635e9d6e881461017b5780636190c9d5146101a957600080fd5b3661010957005b600080fd5b34801561011a57600080fd5b5060025461012e906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561015757600080fd5b5061016b610166366004610c95565b610393565b6040519015158152602001610142565b34801561018757600080fd5b50600a546101969061ffff1681565b60405161ffff9091168152602001610142565b3480156101b557600080fd5b506008546101969061ffff1681565b3480156101d057600080fd5b506004546101e59067ffffffffffffffff1681565b60405167ffffffffffffffff9091168152602001610142565b34801561020a57600080fd5b5060015461016b90600160a01b900460ff1681565b34801561022b57600080fd5b5061023f61023a366004610cc1565b610407565b604051908152602001610142565b34801561025957600080fd5b5061026d610268366004610cde565b6106e0565b6040516101429190610d02565b34801561028657600080fd5b5060005461012e906001600160a01b031681565b3480156102a657600080fd5b5061016b6102b5366004610d65565b61077a565b3480156102c657600080fd5b506102da6102d5366004610d98565b6107cb565b005b3480156102e857600080fd5b5061023f60035481565b3480156102fe57600080fd5b506102da61030d366004610cc1565b61086b565b34801561031e57600080fd5b5060045461016b90600160401b900460ff1681565b34801561033f57600080fd5b5061016b61034e366004610e49565b6108bc565b34801561035f57600080fd5b506102da61036e366004610cc1565b610b49565b34801561037f57600080fd5b5060015461012e906001600160a01b031681565b600080546001600160a01b031633146103c75760405162461bcd60e51b81526004016103be90610e8a565b60405180910390fd5b6040516001600160a01b0384169083156108fc029084906000818181858888f193505050501580156103fd573d6000803e3d6000fd5b5060019392505050565b60018054600091600160a01b90910460ff161515146104685760405162461bcd60e51b815260206004820152601b60248201527f54726561737572793a2063616c6c657220697320696e76616c6964000000000060448201526064016103be565b6001546001600160a01b031633146104c25760405162461bcd60e51b815260206004820152601c60248201527f54726561737572793a206f6e6c792063616c6c65722063616e20646f0000000060448201526064016103be565b600254604080516318160ddd60e01b815290516000926001600160a01b0316916318160ddd9160048083019260209291908290030181865afa15801561050c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105309190610ec1565b60085460055491925061ffff16906105489083610ef0565b1115610577576008546105609061ffff166001610f12565b6008805461ffff191661ffff929092169190911790555b60085460075461ffff9091161c6105c65760405162461bcd60e51b8152602060048201526013602482015272054726561737572793a206d696e742073746f7606c1b60448201526064016103be565b6002546008546007546040516340c10f1960e01b815230600482015261ffff9092161c60248201526001600160a01b03909116906340c10f19906044016020604051808303816000875af1158015610622573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106469190610f38565b506002546008546006546040516340c10f1960e01b81526001600160a01b03878116600483015261ffff9093169190911c60248201529116906340c10f19906044016020604051808303816000875af11580156106a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106cb9190610f38565b505060085460065461ffff9091161c92915050565b600960205260009081526040902080546106f990610f55565b80601f016020809104026020016040519081016040528092919081815260200182805461072590610f55565b80156107725780601f1061074757610100808354040283529160200191610772565b820191906000526020600020905b81548152906001019060200180831161075557829003601f168201915b505050505081565b600080546001600160a01b031633146107a55760405162461bcd60e51b81526004016103be90610e8a565b5060048054821515600160401b0268ff0000000000000000199091161790556001919050565b60008151116108125760405162461bcd60e51b815260206004820152601360248201527254726561737572793a206d736720656d70747960681b60448201526064016103be565b600a5461ffff166000908152600960209081526040909120825161083892840190610be4565b50600a805461ffff1690600061084d83610f90565b91906101000a81548161ffff021916908361ffff1602179055505050565b6000546001600160a01b031633146108955760405162461bcd60e51b81526004016103be90610e8a565b600180546001600160a81b0319166001600160a01b0390921691909117600160a01b179055565b600080546001600160a01b031633146108e75760405162461bcd60e51b81526004016103be90610e8a565b6001600160a01b0384161580159061090757506001600160a01b03831615155b61094c5760405162461bcd60e51b815260206004820152601660248201527554726561737572793a205a45524f204144445245535360501b60448201526064016103be565b6002546001600160a01b0384811691161480156109775750600454600160401b900460ff1615156001145b15610a115760045467ffffffffffffffff16158015906109975750600354155b156109a457506000610b42565b60045467ffffffffffffffff16158015906109c3575060035460011c82115b156109d15760035460011c91505b60038290556004546109ee9067ffffffffffffffff166001610fb2565b6004805467ffffffffffffffff191667ffffffffffffffff929092169190911790555b6040516370a0823160e01b815230600482015282906001600160a01b038516906370a0823190602401602060405180830381865afa158015610a57573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a7b9190610ec1565b1015610ac95760405162461bcd60e51b815260206004820152601860248201527f54726561737572793a20616d6f756e7420696e76616c6964000000000000000060448201526064016103be565b60405163a9059cbb60e01b81526001600160a01b0385811660048301526024820184905284169063a9059cbb906044016020604051808303816000875af1158015610b18573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b3c9190610f38565b50600190505b9392505050565b6000546001600160a01b03163314610b735760405162461bcd60e51b81526004016103be90610e8a565b6001600160a01b038116610bc25760405162461bcd60e51b815260206004820152601660248201527554726561737572793a205a45524f204144445245535360501b60448201526064016103be565b600080546001600160a01b0319166001600160a01b0392909216919091179055565b828054610bf090610f55565b90600052602060002090601f016020900481019282610c125760008555610c58565b82601f10610c2b57805160ff1916838001178555610c58565b82800160010185558215610c58579182015b82811115610c58578251825591602001919060010190610c3d565b50610c64929150610c68565b5090565b5b80821115610c645760008155600101610c69565b6001600160a01b0381168114610c9257600080fd5b50565b60008060408385031215610ca857600080fd5b8235610cb381610c7d565b946020939093013593505050565b600060208284031215610cd357600080fd5b8135610b4281610c7d565b600060208284031215610cf057600080fd5b813561ffff81168114610b4257600080fd5b600060208083528351808285015260005b81811015610d2f57858101830151858201604001528201610d13565b81811115610d41576000604083870101525b50601f01601f1916929092016040019392505050565b8015158114610c9257600080fd5b600060208284031215610d7757600080fd5b8135610b4281610d57565b634e487b7160e01b600052604160045260246000fd5b600060208284031215610daa57600080fd5b813567ffffffffffffffff80821115610dc257600080fd5b818401915084601f830112610dd657600080fd5b813581811115610de857610de8610d82565b604051601f8201601f19908116603f01168101908382118183101715610e1057610e10610d82565b81604052828152876020848701011115610e2957600080fd5b826020860160208301376000928101602001929092525095945050505050565b600080600060608486031215610e5e57600080fd5b8335610e6981610c7d565b92506020840135610e7981610c7d565b929592945050506040919091013590565b6020808252601b908201527f54726561737572793a206f6e6c79206f776e65722063616e20646f0000000000604082015260600190565b600060208284031215610ed357600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b600082610f0d57634e487b7160e01b600052601260045260246000fd5b500490565b600061ffff808316818516808303821115610f2f57610f2f610eda565b01949350505050565b600060208284031215610f4a57600080fd5b8151610b4281610d57565b600181811c90821680610f6957607f821691505b60208210811415610f8a57634e487b7160e01b600052602260045260246000fd5b50919050565b600061ffff80831681811415610fa857610fa8610eda565b6001019392505050565b600067ffffffffffffffff808316818516808303821115610f2f57610f2f610eda56fea164736f6c634300080c000a";

type TreasuryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TreasuryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Treasury__factory extends ContractFactory {
  constructor(...args: TreasuryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _seed: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Treasury> {
    return super.deploy(_seed, overrides || {}) as Promise<Treasury>;
  }
  override getDeployTransaction(
    _seed: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_seed, overrides || {});
  }
  override attach(address: string): Treasury {
    return super.attach(address) as Treasury;
  }
  override connect(signer: Signer): Treasury__factory {
    return super.connect(signer) as Treasury__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TreasuryInterface {
    return new utils.Interface(_abi) as TreasuryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Treasury {
    return new Contract(address, _abi, signerOrProvider) as Treasury;
  }
}