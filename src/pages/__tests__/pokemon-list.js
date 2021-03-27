import { MockedProvider } from '@apollo/client/testing'
import TestRenderer from 'react-test-renderer'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../store'
import PokemonList, { GET_POKEMONS } from '../pokemon-list/index'
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

describe('Pokemon List', () => {
  const mocks = [
    {
      request: {
        query: GET_POKEMONS,
        variables: {
          limit: 10,
          offset: 0,
        },
      },
      result: {
        data: {
          pokemons: {
              count: 5,
              results: [
                  { image: 'image-url-1', name: 'Pikachu', url: 'pokemon-url-1' },
                  { image: 'image-url-2', name: 'Charmander', url: 'pokemon-url-2' },
                  { image: 'image-url-3', name: 'Rayquaza', url: 'pokemon-url-3' },
                  { image: 'image-url-4', name: 'Eevee', url: 'pokemon-url-4' },
                  { image: 'image-url-5', name: 'Bulbasaur', url: 'pokemon-url-5' },
              ]
          },
        },
      },
    },
  ];

  const errorMessage = "An error occured."
  const errorMocks = [
    {
      request: {
        query: GET_POKEMONS,
        variables: {
          limit: 10,
          offset: 0,
        },
      },
      error: new Error(errorMessage)
    },
  ];

  it('Should show loading UI while loading', () => {
      const component = TestRenderer.create(
          <MockedProvider mocks={mocks} addTypename={false}>
              <Provider store={store}>
                  <PokemonList />
              </Provider>
          </MockedProvider>
      );
      const img = component.root.findByType('img')
      expect(img.props.src).toBe(Pokeball)
  });


  it('Should render Table after loading', async () => {
      render(
          <MockedProvider mocks={mocks} addTypename={false}>
              <Provider store={store}>
                  <PokemonList />
              </Provider>
          </MockedProvider>
      );
      await new Promise(resolve => setTimeout(resolve, 100))
      expect(screen.getByText('Pokemon Name')).toBeInTheDocument()
  });


  it('Should show error UI when get an error', async () => {
      const component = TestRenderer.create(
          <MockedProvider mocks={errorMocks} addTypename={false}>
              <Provider store={store}>
                  <PokemonList />
              </Provider>
          </MockedProvider>
      );
      await new Promise(resolve => setTimeout(resolve, 100))
      const tree = component.toJSON()
      expect(tree).toContain('Error! ' + errorMessage)
  });
})