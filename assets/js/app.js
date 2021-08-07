// const iconType = (array) => {
//   array.map((item) => {
//     const icon = `<img src="/assets/img/types-icon/${item}.svg>`;
//   });
// };

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
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
      const iconType = types.map((type) => {
        return `
          <a href="#">
          <img class="card-type-icon ${type}-icon ${type}-bg-color" title="${type}" alt="${type} icon" src="../assets/img/types-icon/${type}.svg">
         </a> 
          `;
      });
      const idLength = (id) => {
        const idString = id.toString();
        if (idString.length <= 1) {
          return `00${id}`;
        } else if (idString.length <= 2) {
          return `0${id}`;
        } else {
          return idString;
        }
      };

      // console.log(iconType);
      acc += `
          <div class="pokedex-card ${types[0]}-bg-color">
      <!--START CARDBOX  -->
      <div class="card">
        <div class="card-id">
          #${idLength(pokemon.id)} | ${pokemon.name}
        </div>
        <!--START IMAGE  -->
        <div class="card-image">
          <div class="card-image-object" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
            pokemon.id
          }.svg');"></div>
        </div>
        <!--START IMAGE  -->
        <div class="card-types">
          <div class="card-types-box">
            ${iconType.join(" ")}
          </div>
        </div>
      </div>
      <!--END CARDBOX  -->

    </div>
        `;

      return acc;
    }, "");
    const pokedex = document.querySelector('[data-js="pokedex');

    pokedex.innerHTML = lisPokemons;
  });
};
setTimeout(() => {
  fetchPokemon();
}, 0);
//${types.join(" | ")}
//Numeros Expressa
// let numeros = [1, 2, 3];
// let triplo = numeros.map((numero) => numero * 3);
// console.log("Numeros Expressa");
// console.log(triplo); // [ 3, 6, 9 ]
// "https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png"
