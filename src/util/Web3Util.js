import abi from './constants/Abi'

let web3 = new Web3(new Web3.providers.HttpProvider('http://120.79.191.116:1443'));

let Web3Util = {
  instance: web3,
  getBalance: function () {
    return web3.fromWei(web3.eth.getBalance(localStorage.getItem('walletAddress')), 'ether').toFixed(4);
  },
  getTokenContact: function (tokenAddress) {
    return web3.eth.contract(abi).at(tokenAddress);
  },
  getTokenBalance: function (tokenAddress) {
    let contract = this.getTokenContact(tokenAddress);
    return (contract.balanceOf(localStorage.getItem('walletAddress')).toNumber() / Math.pow(10, contract.decimals().toNumber())).toFixed(4);
  },
};
export default Web3Util;
