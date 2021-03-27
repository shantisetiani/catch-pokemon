import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import * as serviceWorker from './serviceWorker'
import { store, persistor } from './store'
import 'antd/dist/antd.css'
import './index.scss'


const PokemonApp = lazy(() => import('./pages/index'))
  
const client = new ApolloClient({
  ssrMode: true,
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
})

const renderLoader = () => <p>Loading</p>

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HashRouter>
            <Suspense fallback={renderLoader()}>
              <PokemonApp />
            </Suspense>
          </HashRouter>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

ReactDOM.hydrate(<App />, document.getElementById('root'));
serviceWorker.register()