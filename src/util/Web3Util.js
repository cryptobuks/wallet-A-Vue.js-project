import abi from './constants/Abi'

let web3 = new Web3(new Web3.providers.HttpProvider('http://120.79.191.116:1443'));

let Web3Util = {
  instance: web3,
  getBalance: function (accountAddress) {
    return web3.fromWei(web3.eth.getBalance(accountAddress), 'ether').toFixed(4);
  },
  getTokenContact: function (accountAddress, tokenAddress) {
    return web3.eth.contract(abi).at(tokenAddress);
  },
  getTokenBalance: function (accountAddress, tokenAddress) {
    let contract = this.getTokenContact(accountAddress, tokenAddress);
    return (contract.balanceOf(accountAddress).toNumber() / Math.pow(10, contract.decimals().toNumber())).toFixed(4);
  },
};
export default Web3Util;
