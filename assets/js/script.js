//Formatando ID
const idFormat = (id) => {
  const idString = id.toString();
  if (idString.length <= 1) {
    return `00${id}`;
  } else if (idString.length <= 2) {
    return `0${id}`;
  } else {
    return idString;
  }
};
//Formatando Types Icon
const elementIconFormat = (typesArray) => {
  return typesArray.map((type) => {
    const pattern = `<a href="#">
          <img class="card-type-icon ${type}-icon ${type}-icon-bg" title="${type}" alt="${type} icon" src="/assets/img/types/v1/${type}.svg">
         </a>`;
    return pattern;
  });
};
// Validando Origem da imagem (local ou remota)
const imgCheck = (id) => {
  const mainURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  const alternativeURL = `/assets/img/pokemons/${id}.png`;
  return id <= 649 ? mainURL : alternativeURL;
};

//Formatando Card
const cardFormat = (pokemonObj) => {
  const id = pokemonObj.id;
  const idCard = idFormat(id);
  const name = pokemonObj.name;
  const types = typesPokemon(pokemonObj);
  const icon = elementIconFormat(types).join(" ");
  const pattern = `<div id="${id}" class="card ${types[0]}-card-bg">
    <!--START CARDBOX  -->

      <div class="card-id-box">
       <div class="card-id">#${idCard} | ${name}</div>
      </div>
      <!--START IMAGE  -->
      <div class="card-image-box">
        <div class="card-image"
          style="background-image: url('${imgCheck(id)}');">
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
};
// Extraindo os tipos
const typesPokemon = (pokemonObj) => {
  return pokemonObj.types.map((typeInfo) => typeInfo.type.name);
};
//Definindo URL para obtenção
const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

// Definindo número de pokemons carregados
const TotalPokemonLoading = 151;
const generatePokemonPromisses = () =>
  Array(TotalPokemonLoading)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1)).then((response) => response.json())
    );
// Gerando o HTML
const generateHTML = (pokemons) => {
  return pokemons.reduce((acc, pokemon) => {
    acc += cardFormat(pokemon);
    return acc;
  }, "");
};
//Inserindo os pokemons no arquivo HTML
const insertPokemons = (pokemons) => {
  const pokedex = document.querySelector('[data-js="pokedex');
  pokedex.innerHTML = pokemons;
};
// Promisses
const pokemonPromises = generatePokemonPromisses();
Promise.all(pokemonPromises).then(generateHTML).then(insertPokemons);
