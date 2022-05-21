import {BASE_URL, LIMIT} from "../../constants.js";
import {appActions} from "../app/app.js";

export const pokemonsActionTypes = {
    POKEMONS_ON_SUCCESS: 'POKEMONS_ON_SUCCESS',
    POKEMONS_ON_LOAD: 'POKEMONS_ON_LOAD',
    POKEMONS_ON_ERROR: 'POKEMONS_ON_ERROR',
}

export const pokemonsActions = {
    load: () => ({
        type: pokemonsActionTypes.POKEMONS_ON_LOAD
    }),
    success: (data) => ({
        type: pokemonsActionTypes.POKEMONS_ON_SUCCESS,
        payload: data,
    }),
    error: (error) => ({
        type: pokemonsActionTypes.POKEMONS_ON_ERROR,
        payload: error
    }),
}

const pokemonsDefaultState = {
    isLoading: false,
    items: [],
    error: null,
}

export const pokemonsReducer = (state = pokemonsDefaultState, action) => {
    const {type, payload} = action

    switch (type) {
        case pokemonsActionTypes.POKEMONS_ON_SUCCESS: {
            return {
                ...state,
                items: [...state.items, ...payload],
                error: null,
                isLoading: false
            }
        }
        case pokemonsActionTypes.POKEMONS_ON_LOAD: {
            return {
                ...state,
                isLoading: true,
                error: null
            }
        }

        case pokemonsActionTypes.POKEMONS_ON_ERROR: {
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

/** complex action*/

const fetchPokemonData = (url) => {
    return fetch(url).then(res => res.json())
}

export const getPokemons = (limit, offset) => (dispatch) => {
    dispatch(pokemonsActions.load())
    fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
        .then(res => {
            if (!res.ok) {
                dispatch(pokemonsActions.error(res.statusText))
                return;
            }
            return res.json()
        })
        .then(data => {
            const promiseArr = []
            if (data.results) {
                data.results.forEach(el => {
                    promiseArr.push(fetchPokemonData(el.url))
                })
                Promise.all(promiseArr).then((data) => {
                    dispatch(pokemonsActions.success(data))
                    dispatch(appActions.changeOffset(offset + LIMIT))
                })
            } else {
                dispatch(pokemonsActions.success([]))
            }
        })
}
