const myPokemonListReducer = (state = [], action) => {
    switch(action.type) {
        case "storeMyPokemonList":
            return [...state, ...action.data]
        case "replaceMyPokemonList":
            return [...action.data]
        default:
            return state
  }
}

export default myPokemonListReducer;