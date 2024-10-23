// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.12;

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract OrderBook {
    address public usdtToken; // USDT Token Contract Address
    address public usdcToken; // USDC Token Contract Address
    address public recipientAddress; // The address that will receive the USDT/USDC
    address public owner; // Owner address
    uint256 public price; // 新增参数 price

    // Struct to store the user's data
    struct UserData {
        int amount;
        address receiver; //receiver is the signet address that will receive sBTC;
        uint256 timestamp;
    }

    // Mapping to store the user data history by user's address
    mapping(address => UserData[]) public userHistory;

    // Minimum amount required for the transaction
    uint256 public requiredAmount;

    // Define the event that will be emitted
    event DataStored(
        address indexed user,
        int amount,
        address userAddress,
        string tokenType,
        uint256 timestamp
    );

    // Modifier to restrict functions to owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(
        address _usdtToken,
        address _usdcToken,
        uint256 _price,
        address _recipientAddress
    ) {
        usdtToken = _usdtToken;
        usdcToken = _usdcToken;
        //requiredAmount = _requiredAmount; //后面优化成按单价*amout
        price = _price;
        recipientAddress = _recipientAddress;
        owner = msg.sender; // The deployer is the initial owner
    }

    // Function to store user data with token (USDT/USDC) transfer
    function storeDataDisableRecipent(
        address sBTCReceiver,
        int _amount, // 新增的参数 amount
        string memory tokenType
    ) external {
        IERC20 token;
        if (keccak256(bytes(tokenType)) == keccak256(bytes("USDT"))) {
            token = IERC20(usdtToken);
        } else if (keccak256(bytes(tokenType)) == keccak256(bytes("USDC"))) {
            token = IERC20(usdcToken);
        } else {
            revert("Unsupported token type");
        }

        uint256 totalAmount = uint256(_amount) * price; // 计算 amount * price

        // Ensure the user has sent the required token amount
        require(
            token.balanceOf(msg.sender) >= totalAmount,
            "Insufficient token balance"
        );

        // Transfer the token from the caller to the contract
        require(
            token.transferFrom(msg.sender, address(this), totalAmount),
            "Token transfer failed"
        );

        // Transfer the token to the recipient address
        //transferTokensToRecipient(token, totalAmount);

        // Store the data with timestamp
        UserData memory newData = UserData({
            amount: _amount,
            receiver: sBTCReceiver,
            timestamp: block.timestamp
        });
        userHistory[msg.sender].push(newData);

        // Emit the DataStored event with the user address, data, and token type
        emit DataStored(
            msg.sender,
            _amount,
            sBTCReceiver,
            tokenType,
            block.timestamp
        );
    }

    // Function to store user data with token (USDT/USDC) transfer
    function storeData(
        address sBTCReceiver,
        int _amount, // 新增的参数 amount
        string memory tokenType
    ) external {
        IERC20 token;
        if (keccak256(bytes(tokenType)) == keccak256(bytes("USDT"))) {
            token = IERC20(usdtToken);
        } else if (keccak256(bytes(tokenType)) == keccak256(bytes("USDC"))) {
            token = IERC20(usdcToken);
        } else {
            revert("Unsupported token type");
        }

        uint256 totalAmount = uint256(_amount) * price; // 计算 amount * price

        // Ensure the user has sent the required token amount
        require(
            token.balanceOf(msg.sender) >= totalAmount,
            "Insufficient token balance"
        );

        // Transfer the token from the caller to the contract
        require(
            token.transferFrom(msg.sender, address(this), totalAmount),
            "Token transfer failed"
        );

        // Transfer the token to the recipient address
        transferTokensToRecipient(token, totalAmount);

        // Store the data with timestamp
        UserData memory newData = UserData({
            amount: _amount,
            receiver: sBTCReceiver,
            timestamp: block.timestamp
        });
        userHistory[msg.sender].push(newData);

        // Emit the DataStored event with the user address, data, and token type
        emit DataStored(
            msg.sender,
            _amount,
            sBTCReceiver,
            tokenType,
            block.timestamp
        );
    }

    // Internal function to transfer tokens to a recipient address
    function transferTokensToRecipient(IERC20 token, uint256 amount) internal {
        require(
            token.transfer(recipientAddress, amount),
            "Token transfer to recipient failed"
        );
    }

    // Only the owner can withdraw tokens from the contract
    function withdrawTokens(
        uint256 amount,
        string memory tokenType
    ) external onlyOwner {
        IERC20 token;
        if (keccak256(bytes(tokenType)) == keccak256(bytes("USDT"))) {
            token = IERC20(usdtToken);
        } else if (keccak256(bytes(tokenType)) == keccak256(bytes("USDC"))) {
            token = IERC20(usdcToken);
        } else {
            revert("Unsupported token type");
        }

        uint256 contractBalance = token.balanceOf(address(this));
        require(amount <= contractBalance, "Insufficient contract balance");

        // Transfer tokens to the owner
        require(token.transfer(owner, amount), "Token withdrawal failed");
    }

    // Allows the current owner to transfer ownership to a new owner
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");

        // Transfer ownership
        owner = newOwner;
    }

    function updateRecipient(address _newRecipient) public onlyOwner {
        recipientAddress = _newRecipient;
    }

    function updatePrice(uint256 _newPrice) public onlyOwner {
        price = _newPrice;
    }

    // Function to retrieve all stored data for a user
    function getUserHistory(
        address _user
    ) external view returns (UserData[] memory) {
        return userHistory[_user];
    }

    // Function to retrieve a specific entry of user data based on index
    function getUserDataByIndex(
        address _user,
        uint256 index
    ) external view returns (int, address, uint256) {
        UserData memory data = userHistory[_user][index];
        return (data.amount, data.receiver, data.timestamp);
    }
}
