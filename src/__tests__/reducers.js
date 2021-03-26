import pokemonListReducer from '../redux/pokemon-list/reducer.js'
import myPokemonListReducer from '../redux/my-pokemon-list/reducer.js'
import totalOwnedReducer from '../redux/total-owned/reducer.js'


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

const newPokemonList = [
    {
        id: 4,
        name: "Mewtwo"
    },
    {
        id: 5,
        name: "Rayquaza"
    },
    {
        id: 6,
        name: "Kadabra"
    }
]

/* Test pokemonListReducer - Start */
describe('Test pokemonListReducer', () => {
    // Test with the undefined state
    it('Should return the initial state', () => {
        const initialState = []
        expect(pokemonListReducer(undefined, {})).toEqual(initialState)
    })

    // Test with the state only
    it('Should return the state in the parameter', () => {
        expect(pokemonListReducer(pokemonList, {})).toEqual(pokemonList)
    })

    it('Should return the new state', () => {
        // Test with the action only
        expect(
            pokemonListReducer([], {
                type: "storePokemonList",
                data: pokemonList
            })
        ).toEqual(pokemonList)

        // Test with the state and action
        expect(
            pokemonListReducer(pokemonList, {
                type: "storePokemonList",
                data: newPokemonList
            })
        ).toEqual(newPokemonList)
    })
})
/* Test pokemonListReducer - End */

/* Test myPokemonListReducer - Start */
describe('Test myPokemonListReducer', () => {
    // Test with the undefined state
    it('Should return the initial state', () => {
        const initialState = []
        expect(myPokemonListReducer(undefined, {})).toEqual(initialState)
    })

    // Test with the state only
    it('Should return the state in the parameter', () => {
        expect(myPokemonListReducer(pokemonList, {})).toEqual(pokemonList)
    })

    /* Test with type: storeMyPokemonList - Start */
    it('Should return the old state plus the new state', () => {
        // Test with the action only
        expect(
            myPokemonListReducer([], {
                type: "storeMyPokemonList",
                data: pokemonList
            })
        ).toEqual(pokemonList)

        // Test with the state and action
        expect(
            myPokemonListReducer(pokemonList, {
                type: "storeMyPokemonList",
                data: newPokemonList
            })
        ).toEqual([...pokemonList, ...newPokemonList])
    })
    /* Test with type: storeMyPokemonList - End */

    /* Test with type: replaceMyPokemonList - Start */
    it('Should return the new state', () => {
        // Test with the action only
        expect(
            myPokemonListReducer([], {
                type: "replaceMyPokemonList",
                data: pokemonList
            })
        ).toEqual(pokemonList)

        // Test with the state and action
        expect(
            myPokemonListReducer(pokemonList, {
                type: "replaceMyPokemonList",
                data: newPokemonList
            })
        ).toEqual(newPokemonList)
    })
    /* Test with type: replaceMyPokemonList - end */
})
/* Test myPokemonListReducer - End */

/* Test totalOwnedReducer - Start */
describe('Test totalOwnedReducer', () => {
    const totalOwned = {
        "Entei" : 1,
        "Pikachu" : 3,
        "Eevee" : 2,
    }
    const newTotalOwned = {
        "Eevee" : 3,
        "Charmander" : 2
    }
    // Test with the undefined state
    it('Should return the initial state', () => {
        const initialState = []
        expect(totalOwnedReducer(undefined, {})).toEqual(initialState)
    })

    // Test with the state only
    it('Should return the state in the parameter', () => {
        expect(totalOwnedReducer(totalOwned, {})).toEqual(totalOwned)
    })

    it('Should return the old state plus the new state', () => {
        // Test with the action only
        expect(
            totalOwnedReducer([], {
                type: "storeTotalOwnedPokemon",
                data: totalOwned
            })
        ).toEqual(totalOwned)

        // Test with the state and action
        expect(
            totalOwnedReducer(totalOwned, {
                type: "storeTotalOwnedPokemon",
                data: newTotalOwned
            })
        ).toEqual({...totalOwned, ...newTotalOwned})
    })
})
/* Test totalOwnedReducer - End */