import React, {StrictMode} from "react";
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import * as ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));

const httpLink = createHttpLink({
  uri: '/graphql',
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

root.render(
<ApolloProvider client={client}>
  <StrictMode>
  <App />
  </StrictMode>
</ApolloProvider>,
);
