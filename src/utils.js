import {LIMIT} from "./constants.js";
import {router} from "./index.js";

const rootNode = document.getElementById('root')

export const renderPokemonsList = (pokemons, OFFSET) => {
    if (rootNode && pokemons.length) {

        const fragment = document.createDocumentFragment()
        const row = document.createElement('div')
        row.setAttribute('class', 'row')

        for (let i = 0; i < LIMIT; i++) {
            const el = pokemons[OFFSET + i];
            if (!el) break;
            const col = document.createElement('div')
            col.setAttribute('class', 'col-3')

            col.addEventListener('click', function() {
                history.pushState({}, '', `/${el.id}`)
                router.route()
            })

            col.innerHTML = `
                <div class="pokemon-info-wrapper" data-pokemonid="${el?.id}">
                    <div>
                        <figure class="img-wrapper">
                            <img style="min-height: 214px; width: 100%" src="${el?.sprites?.other?.['official-artwork']?.front_default}" alt="${el?.name}">
                        </figure>
                    </div>
                    <div class="pokemon-info">
                        <p>№${el.id.toString().padStart(3, '0')}</p>
                        <h5 style="text-transform: capitalize; font-size: 20px; font-weight: bold">${el?.name}</h5>
                        <div class="pokemon-labels-wrapper row">
                            ${el.types.reduce((acc, curr) => {
                                return acc + `<div class="pokemon-info-label" data-type="${curr?.type?.name || ''}"> ${curr?.type?.name || ''} </div>`
                            }, '')
                            }
                        </div>
                    </div>
                </div>
`

            row.appendChild(col)
        }


        fragment.appendChild(row)

        rootNode.append(fragment);

    }
}
