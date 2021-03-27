import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../store'
import { BrowserRouter } from "react-router-dom"
import PokemonApp from '../index'
import { GET_POKEMONS } from '../pokemon-list/index'

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

describe('Pokemon App', () => {
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
    
    it('Should open Pokemon List page', () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Provider store={store}>
                    <BrowserRouter>
                        <PokemonApp />
                    </BrowserRouter>
                </Provider>
            </MockedProvider>
        );
        
        const headerTitle = screen.getByTestId('header-title')
        expect(headerTitle).toHaveTextContent(/pokemon list/i)
    });
})