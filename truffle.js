const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: 'localhost',
      // gasPrice: 100000000000 //default
      // gasPrice: 2000000000,
      gasPrice: 20000000000,
      // gasPrice: 50000000000
      // gasPrice: 10000000000,
      // gasPrice: 7000000000 //7 gwei
      port: 7545,
      network_id: "*" // Match any network id
    },
    test: {
      host: 'localhost',
      port: 7545,
      gas: 8007776,
      gasPrice: 2000000000,
      network_id: "*", // Match any network id
      provider: () => {
        return new HDWalletProvider(
          'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
          'https://ropsten.infura.io/c2M8LGCNQPz9NnAZWkDt'
        )
      },
    },
    ropsten: {
      //gas: 8007776,
      gas: 4600000,
      // gas: 5600000,
      //gasPrice: 2000000000,
      // gasPrice: 5000000000, //didn't work
      // gasPrice: 20000000000,
      gasPrice: 10000000000,
      provider: () => {
        return new HDWalletProvider(
          'lottery hold latin index cool renew scatter cradle begin evil rich cream',
          'https://ropsten.infura.io/c2M8LGCNQPz9NnAZWkDt'
        )
      },
      network_id: 3
    },
  }
};
