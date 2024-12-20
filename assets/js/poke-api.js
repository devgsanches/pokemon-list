// object to assign methods
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    // convertendo do modelo da PokeAPI para nosso próprio modelo/instância
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [mainType] = types

    pokemon.types = types
    pokemon.mainType = mainType
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

// default parameters, caso ninguém informe um outro valor para offset e limit, será padronizado os valores após o '='.
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        // garantindo que todas reqs de detalhe sejam processadas
        .then((pokemonDetails) => pokemonDetails)
}
// por último, teremos um novo array (map) com cada detalhe de cada pokemon em JSON
