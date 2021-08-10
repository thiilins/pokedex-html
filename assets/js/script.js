const pattern = {
  id: function (id) {
    const idString = id.toString();
    if (idString.length <= 1) {
      return `00${id}`;
    } else if (idString.length <= 2) {
      return `0${id}`;
    } else {
      return idString;
    }
  },
  icon: function (typesArray) {
    return typesArray.map((type) => {
      const pattern = `<a href="#">
          <img class="card-type-icon ${type}-icon ${type}-icon-bg" title="${type}" alt="${type} icon" src="/assets/img/types/v1/${type}.svg">
         </a>`;
      return pattern;
    });
  },
  card: function (pokemonObj) {
    const id = pokemonObj.id;
    const idCard = this.id(id);
    const name = pokemonObj.name;
    const types = typesPokemon(pokemonObj);
    const icon = this.icon(types).join(" ");
    const typeClass = types[0];
    const pokemonImageFolder = "/assets/img/pokemons/";
    const pattern = `<div id="${id}" class="card ${typeClass}-card-bg">
    <!--START CARDBOX  -->

      <div class="card-id-box">
       <div class="card-id">#${idCard} | ${name}</div>
      </div>
      <!--START IMAGE  -->
      <div class="card-image-box">
        <div class="card-image"
          style="background-image: url('${pokemonImageFolder}/${id}.png');">
        </div>
    
      </div>
      <!--START TYPES  -->
      <div class="card-types-box">
        <div class="card-types">
          ${icon}
        </div>

    </div>
  </div>
  <!--END CARDBOX  -->
  </div>`;
    return pattern;
  },
};

const typesPokemon = (pokemonObj) => {
  return pokemonObj.types.map((typeInfo) => typeInfo.type.name);
};
const fetchPokemon = () => {
  const urlAPI = "https://pokeapi.co/api/v2/pokemon";
  const getPokemonUrl = (id) => `${urlAPI}/${id}`;
  const pokemonPromises = [];
  const TotalPokemonLoading = 151;
  for (let i = 1; i <= TotalPokemonLoading; i++) {
    pokemonPromises.push(
      fetch(getPokemonUrl(i)).then((response) => response.json())
    );
  }
  Promise.all(pokemonPromises).then((pokemon) => {
    const lisPokemons = pokemon.reduce((acc, pokemon) => {
      acc += pattern.card(pokemon);
      return acc;
    }, "");
    const pokedex = document.querySelector('[data-js="pokedex');
    pokedex.innerHTML = lisPokemons;
  });
};
fetchPokemon();
