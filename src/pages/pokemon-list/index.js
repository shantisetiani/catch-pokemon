import React, { useState, useEffect, useContext } from 'react'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { gql, useQuery } from '@apollo/client';
import { columns } from './column'
import TablePagination from '../../components/pagination.js'
import { TitleContext } from '../index'
import Loading from '../../components/loading'

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

function PokemonList() {
    const state = useSelector(state => state)
    const history = useHistory()
    const titleContext = useContext(TitleContext);
  
    const LIMIT = 10
    const [offset, setOffset] = useState(0)
    const [page, setPage] = useState(1)
    const [pokemonList, setPokemonList] = useState([])
    
    const variables = {
      limit: LIMIT,
      offset: offset,
    }

    // Get Pokemon List data using GraphQl
    const { loading, error, data } = useQuery(GET_POKEMONS, {
      variables: variables,
    });
  
    useEffect(() => {
        // Set page title
        titleContext.changeTitle("Pokemon List")
  
        // Get page from URL
        const params = window.location.hash.split('?')
        if(params[1]) {
            const pageTemp = params[1].split('=')[1]
            setPage(pageTemp)
            setOffset(pageTemp*LIMIT-LIMIT)
        }
        // eslint-disable-next-line 
    }, [])
  
    // Add active class for the current active pagination
    useEffect(() => {
      const paginationElement = document.getElementsByClassName(`ant-pagination-item-${page}`)[0]
      if(paginationElement) {
          paginationElement.classList.add('ant-pagination-item-active')
      }
    });
  
    useEffect(() => {
      if(data?.pokemons?.results && state.totalOwned) {
        const dataTemp = JSON.parse(JSON.stringify(data.pokemons.results));
        dataTemp.forEach(item => {
            if(state.totalOwned[item.name]) {
                // Set totalOwned in Pokemon List
                item.totalOwned = state.totalOwned[item.name]
                Object.preventExtensions(item)
            }
        })
        setPokemonList(dataTemp)
      }
      // eslint-disable-next-line 
    }, [data])
  
    // Function for Pagination to go to another page
    const goTo = async (to) => {
      let lastPage = Math.floor(data?.pokemons?.count / LIMIT)
      if(data?.pokemons?.count % LIMIT > 0) {
          lastPage += 1
      }
  
      if(to === 'next'){
          if(page !== lastPage){
              setPage(page+1)
              setOffset(page+LIMIT)
          }
      }else if(to === 'prev'){
          if(page !== 0) {
              setPage(page-1)
              setOffset(page-LIMIT)
          }
      }else{
          await setPage(to)
          setOffset(to*LIMIT-LIMIT)
      }
      // Push the page to url
      history.push(`?page=${to}`)
    }
  
    if (loading) return <Loading />
    if (error) return `Error! ${error.message}`;
  
    return (
      <div className="pokemon-list">
        <Table dataSource={pokemonList} rowKey={(record) => record.name} columns={columns()} pagination={false} />
        <TablePagination totalData={data?.pokemons?.count} page={page} goTo={goTo} />
      </div>
    )
}

export default PokemonList