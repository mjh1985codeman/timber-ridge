import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import * as ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  uri: 'http://localhost:5001/',
  cache: new InMemoryCache(),
});

root.render(
<ApolloProvider client={client}>
  <App />
</ApolloProvider>,
);
