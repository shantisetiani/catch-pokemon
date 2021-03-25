import React from 'react'
import { Button } from 'antd'
import { NavLink, HashRouter } from "react-router-dom";
import { MENU } from '../../config/index'
import { PokemonName } from '../../components/styled/general'

export const columns = (releasePokemon) => {
  return [
    {
      title: "Pokemon Name",
      dataIndex: "pokemonName",
      key: "pokemonName",
      render: (text) => {
        return(
          <HashRouter>
            <NavLink to={`${MENU.POKEMON}/detail/${text}`}><PokemonName>{ text }</PokemonName></NavLink>
          </HashRouter>
        )
      }
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
      render: (text, record) => {
        return(
          <span>
            {text}
          </span>
        )
      }
    },
    {
      title: "Caught Time",
      dataIndex: "caughtTime",
      key: "caughtTime",
      render: (text) => {
        return(
          <span>
            {text}
          </span>
        )
      }
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return(
          <span>
            <Button type="default" onClick={() => releasePokemon(record)}>Release</Button>
          </span>
        )
      },
      align: "right"
    }
  ]

}