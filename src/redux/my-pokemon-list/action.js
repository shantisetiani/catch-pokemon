export const storeMyPokemonList = (myPokemonList) => {
  return {
    type: "storeMyPokemonList",
    data: myPokemonList
  }
}

export const replaceMyPokemonList = (myPokemonList) => {
  return {
    type: "replaceMyPokemonList",
    data: myPokemonList
  }
}