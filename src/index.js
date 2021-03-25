import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import * as serviceWorker from './serviceWorker'
import { store, persistor } from './store'
import PokemonApp from './pages/index'
import 'antd/dist/antd.css'
import './index.scss'

  
const client = new ApolloClient({
  ssrMode: true,
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PokemonApp />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

ReactDOM.hydrate(<App />, document.getElementById('root'));
serviceWorker.register()