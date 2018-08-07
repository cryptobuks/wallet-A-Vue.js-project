import abi from './constants/Abi'
import mtHttpUtil from './MyetherwalletHttpUtils'
import mtConfig from './constants/MythereWalletConfig'
import Tx from 'ethereumjs-tx'
import {Toast} from 'mint-ui'
// import {MessageBox} from 'mint-ui';

let Web3 = require("web3");
let web3 = new Web3(new Web3.providers.HttpProvider('https://api.myetherapi.com/eth'));

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
    return mtHttpUtil.post("/api", {
      action: "eth_call",
      apikey: mtConfig.apiKey,
      data: contract.balanceOf.getData(localStorage.getItem('walletAddress')),
      module: "proxy",
      to: tokenAddress,
    }).then(function (res) {
      return parseInt(res.result, 16) / Math.pow(10, 4);
    });
  },
  getSymbol: function (tokenAddress) {
    let contract = this.getTokenContact(tokenAddress);
    return mtHttpUtil.post("/api", {
      action: "eth_call",
      apikey: mtConfig.apiKey,
      data: contract.symbol.getData(),
      module: "proxy",
      to: tokenAddress,
    }).then(function (res) {
      // console.log(web3.asciiToHex(res.result));
      return 'eth'
    });
  },
  sendTransaction: function (priviteKey, tokenAddress, receiveWalletAddress, sendAmount) {
    let contract = this.getTokenContact(tokenAddress);

    let privateKey = new Buffer(priviteKey, 'hex');

    let rawTx = {
      nonce: "",
      gasPrice: "",
      gasLimit: '0x441c4f',
      to: tokenAddress,
      value: '0x00',
      data: contract.transfer.getData(receiveWalletAddress, sendAmount * Math.pow(10, 4)),
      chainId: 4
    };

    return mtHttpUtil.post("/api", {
      action: "eth_estimateGas",
      apikey: mtConfig.apiKey,
      module: "proxy",
      from: localStorage.getItem('walletAddress'),
      to: tokenAddress,
      value: '0x00',
    }).then(function (res) {
      mtHttpUtil.post("/api", {
        action: "eth_gasPrice",
        apikey: mtConfig.apiKey,
        module: "proxy",
      }).then(function (res) {
        rawTx.gasPrice = res.result;

        mtHttpUtil.post("/api", {
          action: "eth_getTransactionCount",
          address: localStorage.getItem('walletAddress'),
          apikey: mtConfig.apiKey,
          module: "proxy",
          tag: "latest",
        }).then(function (res) {
          rawTx.nonce = res.result;

          console.log(rawTx);

          let tx = new Tx(rawTx);
          tx.sign(privateKey);

          let serializedTx = tx.serialize();

          return mtHttpUtil.post("/api", {
            action: "eth_sendRawTransaction",
            apikey: mtConfig.apiKey,
            hex: '0x' + serializedTx.toString('hex'),
            module: "proxy",
          }).then(function (res) {
            Toast('交易成功');
            return res;
          });

        });
      });
    });


  },
};
export default Web3Util;
