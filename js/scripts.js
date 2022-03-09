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

// Public Function to Add an item to Array
function add(pokemon){
  PokemonList.push(pokemon);
}
// Public Function to get items of Array
function getAll(){
  return PokemonList;
}

return{
  add : add,
  getAll : getAll
};

})();

// foreach function
PokemonRepository.getAll().forEach(function(pokemon) {
  if(pokemon.height > 5){
    document.write(pokemon.name + " ("+"Height :"+pokemon.height+")"+" - Wow, That's Big!<br\>");

  }else{
    document.write(pokemon.name + " ("+"Height :"+pokemon.height+")<br\>");
  }
});
