// Allows us to use ES6 in our migrations and tests.
require('babel-register')

const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  build: "webpack --config webpack.config.js",
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: 'localhost',
      gasPrice: 20000000000,
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
      gas: 4600000,
      // gasPrice: 10000000000, //too long
      gasPrice: 20000000000,
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
