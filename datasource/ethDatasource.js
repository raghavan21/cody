// DataSource for fetching Ethereum blockchain data
const { RESTDataSource } = require("apollo-datasource-rest"); 

// Vitalik Buterin's Ethereum address 
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";  

// Etherscan Data Source Class that extends Apollo RESTDataSource
class EtherDataSource extends RESTDataSource {

  // Constructor to set base URL
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api"; 
  }

  // Method to add CORS headers before each request
  willSendRequest(request) {
    request.headers.set("access-control-allow-origin", "https://studio.apollographql.com");
    request.headers.set("access-control-allow-credentials", "true");
  }

  // Method to get ETH balance for an address
  async etherBalanceByAddress() {
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Method to get total ETH supply
  async totalSupplyOfEther() {
    return this.get(  
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Method to get latest ETH price
  async getLatestEthereumPrice() {
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Method to get average block confirmation time
  async getBlockConfirmationTime() {
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

module.exports = EtherDataSource;
