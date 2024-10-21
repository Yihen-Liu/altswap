## Development

### Prerequisites

- nodejs 14.17.0
- hardhat 2.3.0

### Install Dependencies

```bash
yarn install
```

### Compile

```bash
npx hardhat compile
```

### Running the tests

```bash
npx hardhat test
```

### Deploy

```bash
npx hardhat run scripts/deploy.js --network rinkeby/ropsten/...
```
After deployed finish, treasury contract address will be displayed, please remember it which
will be used in seedlist-core deployed.

### Contract Address 
```
The contract address on Ethereum，Polygon or BSC are same;
```
  
  |   Contract Name    |              Contract address              |
  | :----------------: | :----------------------------------------: |
  |     Seed Token     | 0xE0bF09afE8638B8f4bB14b4133Ba5F44e290e9d5 |
  | VaultHubPermission | 0x58D427B2A45c35AC650bc16b8FEA6900c3C5c3EF |
  |      Treasury      | 0xe3cc49f9B628efb8021Af924DE32838F78A16553 |
  |      VaultHub      | 0xe1A7ba3b1D3e19c735C57ac5513a7dEBD53360b2 |


### DOMAIN_SEPATATOR Value
|   Network          |               Domain Separator Value       |
| :----------------: | :----------------------------------------: |
| Polygon            | 0xcaa373a87286947d7b122a2a705a47cebbe9270431f34436a9f8112472ef5db5 |
| BSC                | 0x71e21f3c9e0e120f022fc26f45867b4605e78e39d7eac4427ed9fae08c742c80 |
| Ethereum           | 0x99805167a4860a311555c62a50d498d04822861b80ceb9a63a639d1a33c81bc5|

## License

[MIT](LICENSE).
