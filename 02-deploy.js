// 导入合约数据
let {abi, bytecode} = require('./01-compile')
require('dotenv').config()

// 1. 导入@truffle/hdwallet-provider和web3
let HDWalletProvider = require('@truffle/hdwallet-provider');
let Web3 = require('web3')
// 2. new一个web3实例
let web3 = new Web3()
// 3. 定义provider
let provider = new HDWalletProvider(process.env.MNEMONIC, process.env.RINKEBY_RPC_URL)
// 4. 设置provider
web3.setProvider(provider)

// 1. 拼接合约数据 abi
let contract = new web3.eth.Contract(abi)

// 2. 部署合约
let deploy = async () => {
    // 获取所有的账户
    let accounts = await web3.eth.getAccounts()
    console.log('accounts', accounts)

    // 部署合约
    let instance = await contract.deploy({
        data: bytecode,
        arguments: [] // 给构造函数传递参数
    }).send({
        from: accounts[0],
        skipDryRun: true
    })

    console.log('address:', instance.options.address)
    process.exit()
}

deploy()