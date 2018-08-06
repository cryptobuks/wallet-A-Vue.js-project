import abi from './constants/Abi'
import mtHttpUtil from './MyetherwalletHttpUtils'
import mtConfig from './constants/MythereWalletConfig'

let web3 = new Web3(new Web3.providers.HttpProvider('http://120.79.191.116:1443'));

let Web3Util = {
  instance: web3,
  getBalance: function () {
    return mtHttpUtil.post("/api", {
      action: "balance",
      address: localStorage.getItem('walletAddress'),
      apikey: mtConfig.apiKey,
      module: "account",
      tag: "latest"
    }).then(function (res) {
      return web3.fromWei(res.result, 'ether');
    });
  },
  getTokenContact: function (tokenAddress) {
    return web3.eth.contract(abi).at(tokenAddress);
  },
  getTokenBalance: function (tokenAddress) {
    let contract = this.getTokenContact(tokenAddress);
    // return (contract.balanceOf(localStorage.getItem('walletAddress')).toNumber() / Math.pow(10, contract.decimals().toNumber())).toFixed(4);
    return mtHttpUtil.post("/api", {
      action: "eth_call",
      apikey: mtConfig.apiKey,
      data: contract.balanceOf.getData(localStorage.getItem('walletAddress')),
      module: "proxy",
      to: tokenAddress,
    }).then(function (res) {
      return parseInt(res.result, 16);
    });
  },
};
export default Web3Util;
