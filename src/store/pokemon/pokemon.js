import {store} from "../index.js";

export const pokemonActionTypes = {
    POKEMON_IS_LOADING: 'POKEMON_IS_LOADING',
    POKEMON_ON_SUCCESS: 'POKEMON_ON_SUCCESS',
    POKEMON_ON_ERROR: 'POKEMON_ON_ERROR'
}

export const pokemonActions = {
    load: () => ({
        type: pokemonActionTypes.POKEMON_IS_LOADING,
    }),
    success: (data) => ({
        type: pokemonActionTypes.POKEMON_ON_SUCCESS,
        payload: data
    }),
    error: (e) => ({
        type: pokemonActionTypes.POKEMON_ON_ERROR,
        payload: e,
    }),
}

const defaultPokemonState = {
    data: {},
    isLoading: false,
    error: null,
}

export const pokemonReducer = (state = defaultPokemonState, action) => {
    const {type, payload} = action

    switch (type) {
        case pokemonActionTypes.POKEMON_IS_LOADING: {
            return {
                ...state,
                isLoading: true,
                error: null
            }
        }
        case pokemonActionTypes.POKEMON_ON_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                data: payload
            }
        }
        case pokemonActionTypes.POKEMON_ON_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        }
        default:
            return state
    }
}

/**
 * complex actions
 * */
export const getPokemon = (id) => async (dispatch) => {
    store.dispatch(pokemonActions.load())
    try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(data => data.json())
        dispatch(pokemonActions.success(data))
    } catch (e) {
        dispatch(pokemonActions.error(e))
    }
}
