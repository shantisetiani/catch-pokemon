import path from 'path';
import fs from 'fs';

import React from 'react'
import ReactDOM from 'react-dom'
import express from 'express'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
import fetch from 'cross-fetch'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { getDataFromTree } from "@apollo/client/react/ssr"
import { store } from '../src/store'

import PokemonApp from '../src/pages/index'

const PORT = process.env.PORT || 3006
const app = express()


function Html({ content, state }) {
    return (
      <html>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
          }} />
        </body>
      </html>
    );
}

app.use((req, res) => {
    const client = new ApolloClient({
        ssrMode: true,
        link: createHttpLink({
            uri: process.env.REACT_APP_API_URL,
            credentials: 'same-origin',
            /* headers: {
                cookie: req.header('Cookie'),
            }, */
            fetch
        }),
        cache: new InMemoryCache(),
    });

    const context = {}
    const App = (
        <ApolloProvider client={client}>
            <Provider store={store}>
                {/* <PersistGate loading={null} persistor={persistor}> */}
                    <StaticRouter location={req.url} context={context}>
                        <PokemonApp />
                    </StaticRouter>
                {/* </PersistGate> */}
            </Provider>
        </ApolloProvider>
    );
    /* const indexFile = path.resolve('./public/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }
  
      if (context.status === 404) {
        res.status(404);
      }
  
      return res.send(
        data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
      );
    }); */

    getDataFromTree(App).then((content) => {
        const initialState = client.extract();

        const html = <Html content={content} state={initialState} />;

        res.status(200);
        res.send(`<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`);
        res.end();
    });
});
/* app.get('/*', (req, res) => {
    const context = {};
    const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <PokemonApp />
        </StaticRouter>
    );
  
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }
    
        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
    });
});

app.use(express.static('./build')); */

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});