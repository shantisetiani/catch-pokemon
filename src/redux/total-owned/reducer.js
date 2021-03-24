const totalOwnedReducer = (state = [], action) => {
  switch(action.type) {
        case "storeTotalOwnedPokemon":
            return Object.assign({}, state, 
              action.data
            )
        default:
            return state
  }
}

export default totalOwnedReducer;