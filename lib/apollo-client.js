import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? process.env.API_ENDPOINT
      : "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

export default client;
