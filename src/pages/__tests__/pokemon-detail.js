import { MockedProvider } from '@apollo/client/testing'
import TestRenderer from 'react-test-renderer'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../store'
import PokemonDetail, { GET_POKEMON_DETAIL } from '../pokemon-detail/index'
import { render, screen } from '@testing-library/react'
import Pokeball from '../../assets/pokeball.gif'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
      })),
  });
})

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  console.error.mockRestore()
})

describe('Pokemon Detail', () => {
  const mocks = [
    {
      request: {
        query: GET_POKEMON_DETAIL,
        variables: {
          name: 'Entei'
        },
      },
      result: {
        data: {
          pokemon: {
            id: 3,
            name: 'Entei',
            sprites: {
              front_default: 'image-url'
            },
            moves: {
              move: {
                name: 'move'
              }
            },
            types: {
              type: {
                name: 'type'
              },
            },
          },
        },
      },
    },
  ];

  const errorMessage = "An error occured."
  const errorMocks = [
    {
      request: {
        query: GET_POKEMON_DETAIL,
        variables: {
          name: 'Entei'
        },
      },
      error: new Error(errorMessage)
    },
  ];

  it('Should show loading UI while loading', async () => {
      const component = TestRenderer.create(
          <MockedProvider mocks={mocks} addTypename={false}>
              <Provider store={store}>
                  <PokemonDetail />
              </Provider>
          </MockedProvider>
      );
      const img = component.root.findByType('img')
      expect(img.props.src).toBe(Pokeball)
  });


  /* it('Should render Table after loading', async () => {
      render(
          <MockedProvider mocks={mocks} addTypename={false}>
              <Provider store={store}>
                  <PokemonDetail />
              </Provider>
          </MockedProvider>
      );
      await new Promise(resolve => setTimeout(resolve, 100))
      expect(screen.getByText('Pokemon')).toBeInTheDocument()
  }); */


  /* it('Should show error UI when get an error', async () => {
      const component = TestRenderer.create(
          <MockedProvider mocks={errorMocks} addTypename={false}>
              <Provider store={store}>
                  <PokemonDetail />
              </Provider>
          </MockedProvider>
      );
      await new Promise(resolve => setTimeout(resolve, 100))
      const tree = component.toJSON()
      expect(tree).toContain('Error! ' + errorMessage)
  }); */
})