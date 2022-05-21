import {combineReducer, Store} from "./core.js";
import {pokemonsReducer} from "./pokemons/pokemons.js";
import {appReducer} from "./app/app.js";
import {pokemonReducer} from "./pokemon/pokemon.js";

const rootReducer = combineReducer({
    pokemons: pokemonsReducer,
    pokemon: pokemonReducer,
    app: appReducer
})

export const store = new Store(rootReducer)
