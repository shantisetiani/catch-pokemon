const pokemonListReducer = (state = [], action) => {
  switch(action.type) {
        case "storePokemonList":
            return action.data
        default:
            return state
  }
}

export default pokemonListReducer;