import React from 'react'
import { NavLink } from "react-router-dom";
import { MENU } from '../../config/index'
import { PokemonName } from '../../components/styled/general'

export const columns = () => {
  return [
    {
      title: "Pokemon Name",
      dataIndex: "name",
      key: "name",
      render: (text) => {
        return(
          <NavLink to={`${MENU.POKEMON}/detail/${text}`}><PokemonName>{ text }</PokemonName></NavLink>
        )
      }
    },
    {
      title: "Total Owned",
      dataIndex: "totalOwned",
      key: "totalOwned",
      render: (text) => (
        <span>
          { text ? text : 0 }
        </span>
      )
    }
  ]

}