### 目录说明

* contracts : 合约文件

* public : 前端公共文件

* src : React前端源文件



### 编译环境

操作系统：Windows10

node: v16.4.0

npm: 7.18.1

solc: 0.8.13

web3: 1.7.1



### 钱包配置

1. 将Google浏览器设置为默认浏览器

2. 安装MetaMask

3. 新建或导入账户并切换到Rinkeby网络



### 运行合约已部署的React App

1. 在lottery根目录下

> npm install : 安装依赖包

> npm run start : 运行React App

注：运行成功会提示连接MetaMask钱包，若未登录MetaMask，仍需按照“钱包配置”的第3点操作。



### 重新部署合约并运行React App

1. 在lottery根目录下

> npm install : 安装依赖包

> node 02-deploy.js : 重新部署新的合约



2. src目录下App.js文件：使用重新部署的合约ABI和地址替换src/App.js中的abi和address



3. 在lottery根目录下

> npm run start : 运行React App

注：运行成功会提示连接MetaMask钱包，若未登录MetaMask，仍需按照“钱包配置”的第3点操作。



### 彩票规则说明

一、彩民：

1. 提交1个以太参与抽奖；

2. 可以参与多次；



二、开奖：仅管理员可开奖

1. 中奖人：从所有彩民中随机选中一个成为中奖人；

2. 瓜分奖池：

（1）管理员收取2%的奖池金额作为管理费费；

（2）中奖人瓜分98%的奖池金额。



三、退奖：仅管理员可退奖



四、期数：每次开奖后重置数据且期数加1。

