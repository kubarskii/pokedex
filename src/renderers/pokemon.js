import {getPokemon} from "../store/pokemon/pokemon.js";
import {store} from "../store/index.js";

const root = document.getElementById('root')

export const renderPokemon = (data) => {
    if (data.pokemon.data && !data.pokemon.isLoading) {
        const pokemon = data.pokemon.data;
        root.innerHTML = `
        <div class="row"> 
            <div class="col-12">
                <h2 style="text-align: center; text-transform: capitalize; font-size: 28px;"> 
                    ${pokemon.name} <span> №${(pokemon?.id || '').toString().padStart(3, '0')} </span> 
                </h2>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                 <figure class="img-wrapper">
                    <img src="${pokemon?.sprites?.other?.['official-artwork']?.front_default}" alt="${pokemon?.name}">
                </figure>
            </div>
            <div class="col-6">
                
            </div>
        </div>
        `
    }
}

export const renderPokemonPage = (params) => {
    const id = params[0][0];
    store.subscribe(renderPokemon)
    store.dispatch(getPokemon(id))
}
