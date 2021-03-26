import {
    storePokemonList,
    storeMyPokemonList,
    replaceMyPokemonList,
    storeTotalOwnedPokemon
} from '../action.js'

describe('actions', () => {
    const pokemonList = [
        {
            id: 1,
            name: "Pikachu"
        },
        {
            id: 2,
            name: "Eevee"
        },
        {
            id: 3,
            name: "Entei"
        }
    ]

    it('Should call action to store Pokemon List', () => {
        const expectedAction = {
            type: "storePokemonList",
            data: pokemonList
        }
        expect(storePokemonList(pokemonList)).toEqual(expectedAction)
    })

    it('Should call action to store My Pokemon List', () => {
        const expectedAction = {
            type: "storeMyPokemonList",
            data: pokemonList
        }
        expect(storeMyPokemonList(pokemonList)).toEqual(expectedAction)
    })

    it('Should call action to replace My Pokemon List', () => {
        const expectedAction = {
            type: "replaceMyPokemonList",
            data: pokemonList
        }
        expect(replaceMyPokemonList(pokemonList)).toEqual(expectedAction)
    })

    it('Should call action to store Total Owned Pokemon', () => {
        const expectedAction = {
            type: "storeTotalOwnedPokemon",
            data: pokemonList
        }
        expect(storeTotalOwnedPokemon(pokemonList)).toEqual(expectedAction)
    })
})