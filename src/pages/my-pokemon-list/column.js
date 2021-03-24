import React from 'react'
import { Button } from 'antd'
import { NavLink, HashRouter } from "react-router-dom";
import { MENU } from '../../config/index'
import { PokemonName } from '../../components/styled/general'

export const columns = (releasePokemon) => {
  return [
    {
      title: "Pokemon Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return(
          <HashRouter>
            <NavLink to={`${MENU.POKEMON}/detail/${record.pokemonId}`}><PokemonName>{ record.pokemonName }</PokemonName></NavLink>
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
            {record.nickname}
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