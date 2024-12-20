const pokemonOL = document.getElementById('pokemons-list')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151 // qtd pokemons visiveis - 1° geração

// vindo da API
const limit = 10
let offset = 0


// convert pokemon object from pokemon list to html pokemon list item and assigning to inner HTML of <OL>
function loadPokemonsToLi(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newHtml = pokemonList.map((pokemon) => `
        <li class="pokemon ${pokemon.mainType}">
            <span class="number">#00${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(``)}
                </ol>

            <img
                src="${pokemon.photo}
                "
                alt="${pokemon.name}"
            />
            </div>
        </li>
        `).join(``)

        pokemonOL.innerHTML += newHtml
        // atribuindo ao HTML interno da <OL> a string de <li's> sem separador; sem separador -> no intuito de formar uma string única. Gerando assim, nossa nova lista de Pokemons dinâmica, com os dados da API. 
    })
}

// loading <li> pokemons, de acordo com o offset (desvio) & limit (qtdExibir) definido nas variáveis
loadPokemonsToLi(offset, limit)

// add event click in button for pagination
loadMoreButton.addEventListener('click', () => {

    // atualização do offset -> offset (desvio) passa a ser ele mesmo, mais a soma dos que já estão sendo exibidos na primeira chamada
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonsToLi(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
        // pegando botão, acessando o elemento pai e removendo o botão (child element)
    } else {
        loadPokemonsToLi(offset, limit)
    }
})

