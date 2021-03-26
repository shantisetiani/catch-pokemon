import React, { useEffect, useContext } from 'react'
import { Table, Modal } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { replaceMyPokemonList, storeTotalOwnedPokemon } from '../../action.js'
import { columns } from './column'
import { TitleContext } from '../index'


function MyPokemonList(id) {
    const state = useSelector(state => state)
    const data = state.myPokemonList
    const dispatch = useDispatch()
    const titleContext = useContext(TitleContext);
    
    // Set Page Title
    useEffect(() => {
        titleContext.changeTitle("My Pokemon List")
        // eslint-disable-next-line 
    }, [])

    // Function when "Release" button clicked
    const releasePokemon = async (myPokemon) => {
        Modal.confirm({
            title: (
                <h3>
                    Are you sure you want to release {myPokemon.nickname} <span className="modal-header">[{myPokemon.pokemonName}]</span> ?
                </h3>
                ),
            content: (
                <div>
                    <h5>{myPokemon.nickname} will be sad... :(</h5>
                </div>
            ),
            async onOk() { // Remove the released pokemon from MyPokemonList
                let index = 0
        
                // eslint-disable-next-line 
                data.map((item, idx) =>{
                    // Get the deleted index
                    if(item.nickname === myPokemon.nickname){
                        index = idx
                    }
                })
                // Delete myPokemon in redux
                data.splice(index,1)
                dispatch(replaceMyPokemonList(data))
                
                let totalOwned = state.totalOwned

                if(totalOwned[myPokemon.pokemonName]) {
                    // Substract total owned of the deleted pokemon
                    dispatch(storeTotalOwnedPokemon({
                        [myPokemon.pokemonName]: totalOwned[myPokemon.pokemonName]-1
                    }))
                }
            },
            okText: 'Bye...',
            cancelText: "NO!!!"
        });
    }

    return (
        <div className="my-pokemon-list">
            <Table dataSource={data} rowKey={(record) => record.caughtTime} columns={columns(releasePokemon)} />
        </div>
    )
}

export default MyPokemonList