const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const typeDefs = require("./schema");
const { Comment, Query, Mutation, User, Post } = require("./resolvers");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const { checkAuth } = require("./middleware/checkAuth");
const posts = require("./routes/posts");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Post,
    User,
    Comment,
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer: app })],
});
(async () => {
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        // get the user token from the headers
        const token = req.headers.authorization || "";

        return { token, checkAuth, res };
      },
    })
  );
})();
app.use("/api", posts);

app.listen(4000, async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  console.log("Listening on port http://localhost:4000/graphql");
});
