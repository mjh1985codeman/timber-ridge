import React from "react";
import { render } from "react-dom";
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";

const httpLink = createHttpLink({
  uri: 'https://gql-api-timber-properties.onrender.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);






