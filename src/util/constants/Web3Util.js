import abi from './Abi'

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

let Web3Util = {
  instance: web3,
  getBalance: function (accountAddress) {
    return web3.fromWei(web3.eth.getBalance(accountAddress), 'ether').toFixed(4);
  },
  getTokenBalance: function (accountAddress, tokenAddress) {
    let contract = web3.eth.contract(abi).at(tokenAddress);
    return (contract.balanceOf(accountAddress).toNumber() / Math.pow(10, contract.decimals().toNumber())).toFixed(4);
  }
};
export default Web3Util;
