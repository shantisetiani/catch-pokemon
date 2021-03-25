import { gql, useQuery } from '@apollo/client';

const GET_POKEMONS = gql`
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

  
export const useGetPokemon = (gqlVariables) => {
    const { loading, error, data } = useQuery(GET_POKEMONS, {
      variables: gqlVariables,
    });
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return data.pokemons;
};