// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "./StratManager.sol";

abstract contract FeeManager is StratManager {
    // Max fee cap used as denominator for various fees
    uint256 public constant MAX_FEE = 1000;

      // Cap on amount of call fee reward
    uint256 public constant MAX_CALL_FEE = 200;

     uint256 public constant MAX_STRATEGIST_FEE = 500;

    // Cap on fee taken to increase value for remaining depositors
    uint256 public constant WITHDRAWAL_FEE_CAP = 50;

    uint256 public constant WITHDRAWAL_MAX = 10000;

        // Cap on burn fee for transparency
    uint256 public constant MAX_BUYBACK_FEE = 50;

        // Cap on protocolWithdrawalFee 
    uint256 public constant PROTOCOL_WITHDRAWAL_FEE_CAP = 100;

    // Reward for person who creates and deploys the strategy
    uint256 public strategistFee = 224;

    // Reward for person calling harvest
    uint256 public callFee = 111;

    // For setups that provide a burn mechanism in the strategy
    uint256 public buyBackFee = 20;

    // Used to add to Protocol Owned Liquidity.
    // 1% default
    uint256 public protocolWithdrawalFee = 10;

    // Fee taken when a user withdraws to increase base value for remaining depositors
    uint256 public withdrawalFee = 10;

    // Portion of performance fee that goes to the protocol
    uint256 public protocolFee = MAX_FEE - strategistFee - callFee;

    // Events to emit when fees are updated to provide transparency for to users
    event WithdrawFeeUpdate(
        uint256 indexed previousFee,
        uint256 indexed newFee
    );
    event ProtocolWithdrawFeeUpdate(
        uint256 indexed previousFee,
        uint256 indexed newFee
    );
    event BuyBackFeeUpdate(uint256 indexed previousFee, uint256 indexed newFee);
    event CallFeeUpdate(
        uint256 indexed previousFee,
        uint256 indexed newFee,
        uint256 indexed protocolFee
    );
     event StratFeeUpdate(
        uint256 indexed previousFee,
        uint256 indexed newFee,
        uint256 indexed protocolFee
    );

    /// @dev updates the callFee and also the protocolFee as a result
    function setCallFee(uint256 _fee) public onlyOwner {
        require(_fee <= MAX_CALL_FEE, "!Call fee cap");

        uint256 previousFee = callFee;
        callFee = _fee;
        protocolFee = MAX_FEE - strategistFee - callFee;

        emit CallFeeUpdate(previousFee, _fee, protocolFee);
    }

      /// @dev updates the callFee and also the protocolFee as a result
    function setStrategistFee(uint256 _fee) public onlyOwner {
        require(_fee <= MAX_STRATEGIST_FEE, "!Strat fee cap");

        uint256 previousFee = strategistFee;
        strategistFee = _fee;
        protocolFee = MAX_FEE - strategistFee - callFee;

        emit StratFeeUpdate(previousFee, _fee, protocolFee);
    }

    /// @dev Set the withdrawal fee that remains pooled to accrue value for remaining depositors.
    function setWithdrawalFee(uint256 _fee) public onlyManager {
        require(_fee <= WITHDRAWAL_FEE_CAP, "!Withdraw fee cap");

        uint256 previousFee = withdrawalFee;
        withdrawalFee = _fee;

        emit WithdrawFeeUpdate(previousFee, _fee);
    }

    /// @dev Set the protocol portion of the withdrawal fee.
    function setProtocolWithdrawalFee(uint256 _fee) public onlyManager {
        require(_fee <= PROTOCOL_WITHDRAWAL_FEE_CAP, "!protocol fee cap");

        uint256 previousFee = protocolWithdrawalFee;
        protocolWithdrawalFee = _fee;
        emit ProtocolWithdrawFeeUpdate(previousFee, _fee);
    }

    /// @dev Set the burn fee.
    function setBuyBackFee(uint256 _fee) public onlyManager {
        require(_fee <= MAX_BUYBACK_FEE, "!Buy back fee cap");

        uint256 previousFee = buyBackFee;
        buyBackFee = _fee;

        emit BuyBackFeeUpdate(previousFee, _fee);
    }
}
