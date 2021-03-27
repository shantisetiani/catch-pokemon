import React, {useState} from 'react'
import { Route, Switch } from "react-router-dom"

import LayoutHeader from '../layout/header'
import LayoutFooter from '../layout/footer'
import PokemonList from './pokemon-list/'
import PokemonDetail from './pokemon-detail/'
import MyPokemonList from './my-pokemon-list/'
import Page404 from './404/'
import Break from '../components/break'

import { MENU } from '../config/index'


const defaultTitle = 'Pokemon List'

export const TitleContext = React.createContext({
  title: defaultTitle,
  changeTitle: () => {}
});

function PokemonApp() {
  const [title, setTitle] = useState(defaultTitle)
  const [titleBefore, settitleBefore] = useState(defaultTitle)
  const isDetail = title === "Pokemon Detail"

  return (
    <TitleContext.Provider
      value={{
        title: title,
        titleBefore: titleBefore,
        changeTitle: (newTitle) => {
          settitleBefore(title)
          setTitle(newTitle)
        }
      }}
    >
      <LayoutHeader />
      <div className="content">
        <Switch>
          <Route exact
            path={MENU.HOME}
            component={PokemonList}
          />
          <Route exact
            path={`${MENU.POKEMON}/detail/:name`}
            component={PokemonDetail}
          />
          <Route exact
            path={MENU.MY_POKEMON_LIST}
            component={ MyPokemonList }
          />
          <Route component={ Page404 } />
        </Switch>
      </div>
      <LayoutFooter />
      <Break height={isDetail ? 112 : 50} />
    </TitleContext.Provider>
  )
}

export default PokemonApp