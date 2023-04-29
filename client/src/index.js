import React, {StrictMode} from "react";
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import * as ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));

const httpLink = createHttpLink({
  uri: '/graphql',
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

root.render(
<ApolloProvider client={client}>
  <StrictMode>
  <App />
  </StrictMode>
</ApolloProvider>,
);
