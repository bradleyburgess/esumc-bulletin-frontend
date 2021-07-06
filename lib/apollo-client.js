import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://esumc-bulletin-backend.herokuapp.com/graphql"
      : "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

export default client;
