// 导入模块
let path =  require('path');
let fs = require('fs');
let solc =  require('solc');

// 获取合约的绝对路径
let lotteryPath = path.resolve('./', 'contracts', 'Lottery.sol');

// 定义变量
let encode = 'utf-8'

// 读取合约
let lotterySource = fs.readFileSync(lotteryPath, encode);

//预先定义好编译源json对象
let jsonContractSource = JSON.stringify({
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: lotterySource,
        }
    },
    settings: { // 自定义编译输出的格式。以下选择输出全部结果。
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    },
});

// 编译得到结果
let output = JSON.parse(solc.compile(jsonContractSource));
let abi = output.contracts['Lottery.sol']['Lottery'].abi;
let bytecode = output.contracts['Lottery.sol']['Lottery'].evm.bytecode.object;

module.exports = {
    abi,
    bytecode
}