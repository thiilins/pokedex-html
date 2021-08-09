function iconType(typesArray) {
  return typesArray.map((type) => {
    return `
          <a href="#">
          <img class="card-type-icon ${type}-icon ${type}-icon-bg" title="${type}" alt="${type} icon" src="../assets/img/types/v1/${type}.svg">
         </a> 
          `;
  });
}

function typesPokemon(pokemonObj) {
  return pokemonObj.types.map((typeInfo) => typeInfo.type.name);
}

function idFormat(id) {
  const idString = id.toString();
  if (idString.length <= 1) {
    return `00${id}`;
  } else if (idString.length <= 2) {
    return `0${id}`;
  } else {
    return idString;
  }
}

function cardPattern(pokemonObj) {
  const id = pokemonObj.id;
  const name = pokemonObj.name;
  const types = typesPokemon(pokemonObj);
  const typeClass = types[0];
  // ${typeClass}
  return `<div id="${id}" class="card ${typeClass}-card-bg">
    <!--START CARDBOX  -->

      <div class="card-id-box">
       <div class="card-id">#${idFormat(id)} | ${name}</div>
      </div>
      <!--START IMAGE  -->
      <div class="card-image-box">
        <div class="card-image"
          style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg');">
        </div>
        <div class="card-image-object-2 ${typeClass}-bg-color"
          style="background-image: url('https://cdn.traction.one/pokedex/pokemon/${id}.png')"></div>
      </div>
      <!--START TYPES  -->
      <div class="card-types-box">
        <div class="card-types">
          ${iconType(types).join(" ")}
        </div>

    </div>
  </div>
  <!--END CARDBOX  -->
  </div>`;
}

const fetchPokemon = () => {
  const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemonPromises = [];
  for (let i = 1; i <= 150; i++) {
    pokemonPromises.push(
      fetch(getPokemonUrl(i)).then((response) => response.json())
    );
  }

  Promise.all(pokemonPromises).then((pokemon) => {
    const lisPokemons = pokemon.reduce((acc, pokemon) => {
      acc += cardPattern(pokemon);
      return acc;
    }, "");
    const pokedex = document.querySelector('[data-js="pokedex');
    pokedex.innerHTML = lisPokemons;
  });
};
fetchPokemon();
