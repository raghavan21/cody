const { ApolloServer } = require("apollo-server"); // import ApolloServer from apollo-server
const { importSchema } = require("graphql-import"); // import schema using graphql-import
const EtherDataSource = require("./datasource/ethDatasource"); // import custom EtherDataSource 

require("dotenv").config(); // load environment variables

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // resolver to get ether balance
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // resolver to get total ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // resolver to get latest eth price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // resolver to get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({ // create Apollo server
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // instantiate EtherDataSource
  }), 
});

server.timeout = 0; 
server.listen("9000").then(({ url }) => { // start server on port 9000
  console.log(`🚀 Server ready at ${url}`); 
});
