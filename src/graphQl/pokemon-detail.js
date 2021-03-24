import { gql, useQuery } from '@apollo/client';

const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

export const useGetPokemonDetail = (name) => {
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: {name: name},
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return data.pokemon;
};