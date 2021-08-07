//Instanciando requisições
const fetchPokemon = () => {
  const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`
  const pokemonPromises = [];


  for (let i = 1; i <= 150; i++) {
    pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
  }
  Promise.all(pokemonPromises)
    .then(pokemon => {

      const lisPokemons = pokemon.reduce((acc, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)
        acc += `
        <li class="card ${types[0]}">
        <img class="card-image " alt="${pokemon.name}" src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png">
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}<h2>
        <p class-"card-subtitle">${types.join(' | ')}</p>
        </li>
        `
        return acc;
      }, '')
      const ul = document.querySelector('[data-js="pokedex');

      ul.innerHTML = lisPokemons; console.log(ul.innerHTML)
    })

};
fetchPokemon();