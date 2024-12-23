/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../common";
import type {
  OrderBook,
  OrderBookInterface,
} from "../../../contracts/OrderBook.sol/OrderBook";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_usdtToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdcToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_recipientAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "amount",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tokenType",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "DataStored",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getUserDataByIndex",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
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
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserHistory",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "amount",
            type: "int256",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct OrderBook.UserData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
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
    name: "price",
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
    inputs: [],
    name: "recipientAddress",
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
    name: "requiredAmount",
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
        name: "sBTCReceiver",
        type: "address",
      },
      {
        internalType: "int256",
        name: "_amount",
        type: "int256",
      },
      {
        internalType: "string",
        name: "tokenType",
        type: "string",
      },
    ],
    name: "storeDataWithRecipient",
    outputs: [],
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
        internalType: "uint256",
        name: "_newPrice",
        type: "uint256",
      },
    ],
    name: "updatePrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newRecipient",
        type: "address",
      },
    ],
    name: "updateRecipient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "usdcToken",
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
    name: "usdtToken",
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
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userHistory",
    outputs: [
      {
        internalType: "int256",
        name: "amount",
        type: "int256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "tokenType",
        type: "string",
      },
    ],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610fa0380380610fa083398101604081905261002f916100c9565b600080546001600160a01b038087166001600160a01b0319928316179092556001805486841690831617905560048490556003805490911633179055811661008857600280546001600160a01b031916301790556100a4565b600280546001600160a01b0319166001600160a01b0383161790555b50505050610116565b80516001600160a01b03811681146100c457600080fd5b919050565b600080600080608085870312156100df57600080fd5b6100e8856100ad565b93506100f6602086016100ad565b92506040850151915061010b606086016100ad565b905092959194509250565b610e7b806101256000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80638da5cb5b1161008c578063ad1adeb511610066578063ad1adeb5146101f6578063f2fde38b14610209578063feec756c1461021c578063ff2a2cb21461022f57600080fd5b80638da5cb5b146101c7578063a035b1fe146101da578063a98ad46c146101e357600080fd5b806348b9ef40116100c857806348b9ef40146101685780634fb3d3b11461017f5780635aff59991461019f5780638d6cc56d146101b257600080fd5b806311eac855146100ef5780631e32ea281461011f57806322e8b99014610155575b600080fd5b600154610102906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61013261012d366004610b7d565b610242565b604080519384526001600160a01b03909216602084015290820152606001610116565b610132610163366004610b7d565b6102c4565b61017160065481565b604051908152602001610116565b61019261018d366004610ba7565b610310565b6040516101169190610bc9565b600254610102906001600160a01b031681565b6101c56101c0366004610c2b565b6103a8565b005b600354610102906001600160a01b031681565b61017160045481565b600054610102906001600160a01b031681565b6101c5610204366004610ce7565b61040c565b6101c5610217366004610ba7565b6106eb565b6101c561022a366004610ba7565b6107ca565b6101c561023d366004610d2e565b610853565b6001600160a01b03821660009081526005602052604081208054829182918291908690811061027357610273610d85565b600091825260209182902060408051606081018252600393909302909101805480845260018201546001600160a01b0316948401859052600290910154929091018290529891975095509350505050565b600560205281600052604060002081815481106102e057600080fd5b60009182526020909120600390910201805460018201546002909201549093506001600160a01b03909116915083565b6001600160a01b0381166000908152600560209081526040808320805482518185028101850190935280835260609492939192909184015b8282101561039d5760008481526020908190206040805160608101825260038602909201805483526001808201546001600160a01b031684860152600290910154918301919091529083529092019101610348565b505050509050919050565b6003546001600160a01b031633146104075760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e657200000000000000000060448201526064015b60405180910390fd5b600455565b6003546001600160a01b031633146104665760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e657200000000000000000060448201526064016103fe565b6040805180820190915260048152631554d11560e21b6020918201528151908201206000907f74e5e263d4ef61ad836ecb4da4e5e7cc4e949a6b06d255609264859fdb431630016104c357506000546001600160a01b0316610565565b6040805180820190915260048152635553444360e01b6020918201528251908301207f29535e4168d63ec2988ccae9ecde9b63335195a6eaab88dae98ff067906bd1560161051d57506001546001600160a01b0316610565565b60405162461bcd60e51b815260206004820152601660248201527f556e737570706f7274656420746f6b656e20747970650000000000000000000060448201526064016103fe565b6040516370a0823160e01b81523060048201526000906001600160a01b038316906370a0823190602401602060405180830381865afa1580156105ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d09190610d9b565b9050808411156106225760405162461bcd60e51b815260206004820152601d60248201527f496e73756666696369656e7420636f6e74726163742062616c616e636500000060448201526064016103fe565b60035460405163a9059cbb60e01b81526001600160a01b039182166004820152602481018690529083169063a9059cbb906044016020604051808303816000875af1158015610675573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106999190610db4565b6106e55760405162461bcd60e51b815260206004820152601760248201527f546f6b656e207769746864726177616c206661696c656400000000000000000060448201526064016103fe565b50505050565b6003546001600160a01b031633146107455760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e657200000000000000000060448201526064016103fe565b6001600160a01b03811661079b5760405162461bcd60e51b815260206004820152601d60248201527f4e6577206f776e657220697320746865207a65726f206164647265737300000060448201526064016103fe565b6003805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6003546001600160a01b031633146108245760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e657200000000000000000060448201526064016103fe565b6002805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6040805180820190915260048152631554d11560e21b6020918201528151908201206000907f74e5e263d4ef61ad836ecb4da4e5e7cc4e949a6b06d255609264859fdb431630016108b057506000546001600160a01b0316610906565b6040805180820190915260048152635553444360e01b6020918201528251908301207f29535e4168d63ec2988ccae9ecde9b63335195a6eaab88dae98ff067906bd1560161051d57506001546001600160a01b03165b6000600454846109169190610dd6565b6040516370a0823160e01b815233600482015290915081906001600160a01b038416906370a0823190602401602060405180830381865afa15801561095f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109839190610d9b565b10156109d15760405162461bcd60e51b815260206004820152601a60248201527f496e73756666696369656e7420746f6b656e2062616c616e636500000000000060448201526064016103fe565b6002546040516323b872dd60e01b81523360048201526001600160a01b03918216602482015260448101839052908316906323b872dd906064016020604051808303816000875af1158015610a2a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a4e9190610db4565b610a9a5760405162461bcd60e51b815260206004820152601560248201527f546f6b656e207472616e73666572206661696c6564000000000000000000000060448201526064016103fe565b604080516060810182528581526001600160a01b03878116602080840191825242848601818152336000818152600585528881208054600180820183559183529590912088516003909602019485559451948401805473ffffffffffffffffffffffffffffffffffffffff19169590961694909417909455925160029091015592519192917f857a2893a5f092e545e2fca183144f55963d97fb004b8f81a047ff3f3ac1dca791610b519189918b918a9190610e01565b60405180910390a2505050505050565b80356001600160a01b0381168114610b7857600080fd5b919050565b60008060408385031215610b9057600080fd5b610b9983610b61565b946020939093013593505050565b600060208284031215610bb957600080fd5b610bc282610b61565b9392505050565b602080825282518282018190526000919060409081850190868401855b82811015610c1e57815180518552868101516001600160a01b0316878601528501518585015260609093019290850190600101610be6565b5091979650505050505050565b600060208284031215610c3d57600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112610c6b57600080fd5b813567ffffffffffffffff80821115610c8657610c86610c44565b604051601f8301601f19908116603f01168101908282118183101715610cae57610cae610c44565b81604052838152866020858801011115610cc757600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060408385031215610cfa57600080fd5b82359150602083013567ffffffffffffffff811115610d1857600080fd5b610d2485828601610c5a565b9150509250929050565b600080600060608486031215610d4357600080fd5b610d4c84610b61565b925060208401359150604084013567ffffffffffffffff811115610d6f57600080fd5b610d7b86828701610c5a565b9150509250925092565b634e487b7160e01b600052603260045260246000fd5b600060208284031215610dad57600080fd5b5051919050565b600060208284031215610dc657600080fd5b81518015158114610bc257600080fd5b8082028115828204841417610dfb57634e487b7160e01b600052601160045260246000fd5b92915050565b848152600060206001600160a01b0386168184015260806040840152845180608085015260005b81811015610e445786810183015185820160a001528201610e28565b50600060a0828601015260a0601f19601f830116850101925050508260608301529594505050505056fea164736f6c6343000811000a";

type OrderBookConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OrderBookConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OrderBook__factory extends ContractFactory {
  constructor(...args: OrderBookConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _usdtToken: PromiseOrValue<string>,
    _usdcToken: PromiseOrValue<string>,
    _price: PromiseOrValue<BigNumberish>,
    _recipientAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OrderBook> {
    return super.deploy(
      _usdtToken,
      _usdcToken,
      _price,
      _recipientAddress,
      overrides || {}
    ) as Promise<OrderBook>;
  }
  override getDeployTransaction(
    _usdtToken: PromiseOrValue<string>,
    _usdcToken: PromiseOrValue<string>,
    _price: PromiseOrValue<BigNumberish>,
    _recipientAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _usdtToken,
      _usdcToken,
      _price,
      _recipientAddress,
      overrides || {}
    );
  }
  override attach(address: string): OrderBook {
    return super.attach(address) as OrderBook;
  }
  override connect(signer: Signer): OrderBook__factory {
    return super.connect(signer) as OrderBook__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OrderBookInterface {
    return new utils.Interface(_abi) as OrderBookInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OrderBook {
    return new Contract(address, _abi, signerOrProvider) as OrderBook;
  }
}