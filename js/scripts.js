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
 function addListItem(Pokemon){
   let PokemonUList = document.querySelector(".Pokemon-List");
   let ListPokemon = document.createElement("li");
   let Button = document.createElement("button");
   Button.innerText = Pokemon.name;
   Button.classList.add("button-class");
   ifPokemonSelected(Button, Pokemon);
   ListPokemon.appendChild(Button);
   PokemonUList.appendChild(ListPokemon);
}

function ifPokemonSelected(Button, Pokemon){
  Button.addEventListener('click', function() {
  document.querySelector('.Poko-Details').classList.toggle('is-visible');
  document.write("Name : "+Pokemon.name+"</br>"+"Height : "+Pokemon.height+"</br>"+"Types : "+Pokemon.type);
  showDetails(Pokemon);
});
}

function showDetails(Pokemon){
  console.log(Pokemon);
}

// Public Function to Add an item to Array
function add(Pokemon){
  if (
      typeof Pokemon === "object" &&
      "name" in Pokemon &&
      "height" in Pokemon &&
      "type" in Pokemon
    ) {
      PokemonList.push(Pokemon);
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
  addListItem : addListItem,
  //showDetails : showDetails
};

})();

// adding an item to PokemonRepository
PokemonRepository.add({ name: 'Charizard', height: 8, type: ['Flying']});

console.log(PokemonRepository.getAll());

// foreach function
PokemonRepository.getAll().forEach(function(Pokemon) {
  PokemonRepository.addListItem(Pokemon);
});
