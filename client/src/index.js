import React, {StrictMode} from "react";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import * as ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

root.render(
<ApolloProvider client={client}>
  <StrictMode>
  <App />
  </StrictMode>
</ApolloProvider>,
);
