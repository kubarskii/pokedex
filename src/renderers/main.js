import {renderPokemonsList} from "../utils.js";
import {store} from "../store/index.js";
import {getPokemons} from "../store/pokemons/pokemons.js";
import {LIMIT} from "../constants.js";

const intersection = document.querySelector('.test');
let prevPokemonsCount = 0;

export const renderMain = (data) => {
    if (prevPokemonsCount !== data.pokemons.items.length) {
        prevPokemonsCount = data.pokemons.items.length
        renderPokemonsList(data.pokemons.items, data.app.OFFSET)
    }
    if (data.pokemons.isLoading) {
        intersection.innerHTML = `<img style="width: 50px; height: 50px" class="loading-indicator" src="https://assets.pokemon.com/static2/_ui/img/chrome/loaders/pokeball_gray.png">`
    } else {
        intersection.innerHTML = ''
    }
}

export const renderMainPage = (params) => {
    store.subscribe(renderMain)
    store.dispatch(getPokemons(LIMIT, 0))
    const options = {
        rootMargin: '0px',
        threshold: 0.0
    }
    const target = document.querySelector('.test');

    const callback = function (entries, observer) {
        entries.forEach(entry => {
            if (!store.value.pokemons.isLoading && entry.isIntersecting) {
                const state = store.getState();
                const offset = state.app.OFFSET
                store.dispatch(getPokemons(LIMIT, offset))
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);

}
