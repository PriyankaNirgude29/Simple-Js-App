// Immidietely Invoked Function Expression (IIFE)
let PokemonRepository = (function(){
let PokemonList = [
{
  name:'Bulbasaur',
  height: 3,
  type: ['grass', 'poison']
},

{
  name:'Butterfree',
  height: 5,
  type: ['bug', 'flying']
},

{
  name:'Caterpie',
  height: 2,
  type: ['bug']
},

{
  name:'Charmeleon',
  height: 7,
  type: ['fire']
}
];

// Public Function to create elements list and Button for each Pokemon object
 function addListItem(pokemon){
   let PokemonUList = document.querySelector(".Pokemon-List");
   let ListPokemon = document.createElement("li");
   let Button = document.createElement("button");
   Button.innerText = pokemon.name;
   Button.classList.add("button-class");
   ListPokemon.appendChild(Button);
   PokemonUList.appendChild(ListPokemon);
 }

// Public Function to Add an item to Array
function add(pokemon){
  if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "type" in pokemon
    ) {
      PokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
}

// Public Function to get items of Array
function getAll(){
  return PokemonList;
}

return{
  add : add,
  getAll : getAll,
  addListItem : addListItem
};

})();

// adding an item to PokemonRepository
PokemonRepository.add({ name: 'Charizard', height: 8, type: ['Flying']});

console.log(PokemonRepository.getAll());

// foreach function
PokemonRepository.getAll().forEach(function(pokemon) {
  if(pokemon.height > 5){
    document.write(pokemon.name + " ("+"Height :"+pokemon.height+")"+" - Wow, That's Big!<br\>");

  }else{
    document.write(pokemon.name + " ("+"Height :"+pokemon.height+")<br\>");
  }
  PokemonRepository.addListItem(pokemon);
});
