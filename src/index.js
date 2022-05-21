import {store} from "./store/index.js";
import {Router} from "./router/router.js";
import {renderMain, renderMainPage} from "./renderers/main.js";
import {renderPokemon, renderPokemonPage} from "./renderers/pokemon.js";

const rootElement = document.getElementById('root')

const show404 = (params) => {
    console.error(404);
}

export const router = new Router({
    '/error': show404,
    '/': renderMainPage,
    '/:any': renderPokemonPage
})

router.onChange = () => {
    rootElement.innerHTML = ''
    store.unsubscribe(renderMain)
    store.unsubscribe(renderPokemon)
    store.clear()
}
