// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    // 管理员地址
    address payable manager;

    // 抽奖数据
    struct LotteryData {
        // 所有彩民
        address payable[] players;
        // 中奖人
        address payable winner;
    }

    // 彩票期数
    uint round;
    // 每期开奖中奖数据
    mapping(uint => LotteryData) LotteryDatas;

    // 定义onlyManager修饰器
    modifier onlyManager() {
        require(manager == msg.sender);
        _;
    }

    constructor() {
        manager = payable(msg.sender);
        round = 1;
    }

    /*
     * 投注
     */
    function play() payable public {
        require(msg.value == 1 ether);
        LotteryDatas[round].players.push(payable(msg.sender));
    }

    /*
     * 开奖
     */
    function runLottery() public onlyManager {
        LotteryData storage data = LotteryDatas[round];

        // 至少2个参与者才能开奖
        require(data.players.length > 1);

        // 生成随机数
        uint v = uint(sha256(abi.encodePacked(block.timestamp, data.players.length)));
        // 将随机数对data.players.length取余，得到中奖人的下标
        uint index = v % data.players.length;

        data.winner = data.players[index];

        dividePrizePool(data);

        round++;
    }

    /*
     * 瓜分奖池
     */
    function dividePrizePool(LotteryData memory _data) private {
        // 瓜分的奖池总金额
        uint totalAmount = address(this).balance;

        // 管理员收取2%的奖池金额作为管理费费
        uint managerDivide = totalAmount * 2 / 100;
        // 中奖人瓜分98%的奖池金额
        uint winnerDivide = totalAmount - managerDivide;

        manager.transfer(managerDivide);
        _data.winner.transfer(winnerDivide);
    }

    /*
     * 退奖
     */
    function refund() public onlyManager {
        LotteryData storage data = LotteryDatas[round];

        for (uint i = 0; i < data.players.length; i++) {
            data.players[i].transfer(1 ether);
        }

        round++;
    }

    /*
     * 获取管理员地址
     */
    function getManager() public view returns (address) {
        return manager;
    }

    /*
     * 获取合约余额
     */
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    /*
     * 获取某期彩民池人数
     */
    function getPlayersCount(uint _round) public view returns (uint) {
        return LotteryDatas[_round].players.length;
    }

    /*
     * 获取某期彩民池
     */
    function getPlayers(uint _round) public view returns (address payable[] memory) {
        return LotteryDatas[_round].players;
    }

    /*
     * 获取某期中奖人
     */
    function getWinner(uint _round) public view returns (address) {
        return LotteryDatas[_round].winner;
    }

    /*
     * 获取彩票期数
     */
    function getRound() public view returns (uint) {
        return round;
    }
}
