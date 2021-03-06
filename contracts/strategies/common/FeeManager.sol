// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "./StratManager.sol";

abstract contract FeeManager is StratManager {
    // Max fee cap used as denominator for various fees
    uint256 public constant MAX_FEE = 1000;

    // Reward for person who creates and deploys the strategy
    uint256 public constant STRATEGIST_FEE = 224;

    // Reward for person calling harvest
    uint256 public callFee = 111;

    // Cap on amount of call fee reward
    uint256 public constant MAX_CALL_FEE = 111;

    // Cap on fee taken to increase value for remaining depositors
    uint256 public constant WITHDRAWAL_FEE_CAP = 50;

    uint256 public constant WITHDRAWAL_MAX = 10000;

    // For setups that provide a burn mechanism in the strategy
    uint256 public burnFee = 20;

    // Cap on burn fee for transparency
    uint256 public constant MAX_BURN_FEE = 50;

    // Used to add to Protocol Owned Liquidity.
    // 1% default
    uint256 public protocolWithdrawalFee = 10;

    // Cap on protocolWithdrawalFee for transparency
    uint256 public constant PROTOCOL_WITHDRAWAL_FEE_CAP = 20;

    // Fee taken when a user withdraws to increase base value
    // for remaining depositors.
    uint256 public withdrawalFee = 10;

    // Portion of performance fee that goes to the protocol
    uint256 public protocolFee = MAX_FEE - STRATEGIST_FEE - callFee;

    // Events to emit when fees are updated to provide transparency for to users
    event WithdrawFeeUpdate(
        uint256 indexed previousFee,
        uint256 indexed newFee
    );
    event ProtocolWithdrawFeeUpdate(
        uint256 indexed previousFee,
        uint256 indexed newFee
    );
    event BurnFeeUpdate(uint256 indexed previousFee, uint256 indexed newFee);
    event CallFeeUpdate(
        uint256 indexed previousFee,
        uint256 indexed newFee,
        uint256 indexed protocolFee
    );

    /// @dev updates the callFee and also the protocolFee as a result
    function setCallFee(uint256 _fee) public onlyManager {
        require(_fee <= MAX_CALL_FEE, "!Call fee cap");

        uint256 previousFee = callFee;
        callFee = _fee;
        protocolFee = MAX_FEE - STRATEGIST_FEE - callFee;

        emit CallFeeUpdate(previousFee, _fee, protocolFee);
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
    function setBurnFee(uint256 _burnFee) public onlyManager {
        require(_burnFee <= MAX_BURN_FEE, "!Burn fee cap");

        uint256 previousFee = burnFee;
        burnFee = _burnFee;

        emit BurnFeeUpdate(previousFee, _burnFee);
    }
}
