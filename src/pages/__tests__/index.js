import { MockedProvider } from '@apollo/client/testing'
import TestRenderer from 'react-test-renderer'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../store'
import { Table } from 'antd'
import PokemonList, { GET_POKEMONS } from '../pokemon-list/index'
import {act} from '@testing-library/react'
import Pokeball from '../../assets/pokeball.gif'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

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
                { image: 'image-url-1', name: 'Buck', url: 'pokemon-url-1' },
                { image: 'image-url-1', name: 'Buck', url: 'pokemon-url-1' },
                { image: 'image-url-1', name: 'Buck', url: 'pokemon-url-1' },
                { image: 'image-url-1', name: 'Buck', url: 'pokemon-url-1' },
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

it('Should show loading UI', async () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Provider store={store}>
                <PokemonList />
            </Provider>
        </MockedProvider>,
    );
    const img = component.root.findByType('img');
    expect(img.props.src).toBe(Pokeball);
});


/* it('Should render Pokemon List', async () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Provider store={store}>
                <PokemonList />
            </Provider>
        </MockedProvider>
    );
    
    await new Promise(resolve => {console.log(resolve); setTimeout(resolve, 100)});

    // const tree = component.toJSON();
    const table = component.root.findByType(Table);
    // expect(table.props.dataSource).toBe(Pokeball);
    console.log(table)
    // expect(component.root.findByProps({className: "sub"}).children).toEqual(['Sub']);
}); */


it('Should show error UI', async () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={errorMocks} addTypename={false}>
            <Provider store={store}>
                <PokemonList />
            </Provider>
        </MockedProvider>,
    );
    await new Promise(resolve => setTimeout(resolve, 100))
    const tree = component.toJSON();
    expect(tree).toContain('Error! ' + errorMessage);
});