import {
  createStore,
  combineReducers
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import pokemonListReducer from './redux/pokemon-list/reducer.js'
import myPokemonListReducer from './redux/my-pokemon-list/reducer.js'
import totalOwnedReducer from './redux/total-owned/reducer.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  pokemonList: pokemonListReducer,
  myPokemonList: myPokemonListReducer,
  totalOwned: totalOwnedReducer
})
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 

export const store = createStore(rootReducer)
export const persistor = persistStore(store)