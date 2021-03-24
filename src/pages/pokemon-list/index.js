import React, { useState, useEffect, useContext } from 'react'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { columns } from './column'
import { useGetPokemon } from '../../graphQl/pokemon-list'
import TablePagination from '../../components/pagination.js'
import { TitleContext } from '../index'

function PokemonList(props) {
    const state = useSelector(state => state)
    const history = useHistory()
    const titleContext = useContext(TitleContext);

    const LIMIT = 10
    const [offset, setOffset] = useState(0)
    const [page, setPage] = useState(1)
    const [pokemonList, setPokemonList] = useState([])
    const [loading, setLoading] = useState(false)
    
    //Get Pokemon List
    const data = useGetPokemon({
      limit: LIMIT,
      offset: offset,
    })

    useEffect(() => {
        setLoading(true)
        // Set page title
        titleContext.changeTitle("Pokemon List")

        // Get page from URL
        const params = window.location.hash.split('?')
        if(params[1]) {
            const pageTemp = params[1].split('=')[1]
            setPage(pageTemp)
            setOffset(pageTemp*LIMIT-LIMIT)
        }
        setLoading(false)
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
        if(data) {
            initializeData()
        }
        // eslint-disable-next-line 
    }, [data])

    const initializeData = () => {
        if(data.results && state.totalOwned) {
            const dataTemp = JSON.parse(JSON.stringify(data.results));
            dataTemp.forEach(item => {
                if(state.totalOwned[item.name]) {
                    // Set totalOwned in Pokemon List
                    item.totalOwned = state.totalOwned[item.name]
                    Object.preventExtensions(item)
                }
            })
            setPokemonList(dataTemp)
        }
    }

    const goTo = async (to) => {
        let lastPage = Math.floor(data.count / LIMIT)
        if(data.count % LIMIT > 0) {
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
        history.push(`?page=${to}`)
    }

    return (
        <div className="pokemon-list">
            {pokemonList && <Table dataSource={pokemonList} columns={columns()} pagination={false}  loading={loading} />}
            <TablePagination totalData={data.count} page={page} goTo={goTo} />
        </div>
    )
}

export default PokemonList