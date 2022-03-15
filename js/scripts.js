// Immidietely Invoked Function Expression (IIFE)
let PokemonRepository = (function(){
let PokemonList = [];
let ApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
  showDetails(Pokemon);
});
}

function showDetails(Item){
  PokemonRepository.loadDetails(Item).then(function () {
      console.log(Item);
      document.write("Name : "+Item.name+"</br>"+"DetailsUrl : "+Item.detailsUrl+"</br>"+"ImageUrl : "+Item.imageUrl+"</br>"+"Height : "+Item.height+"</br>"+"Types : "+Item.types);
    });
}

// Public Function to Add an item to Array
function add(Pokemon){
  if (
      typeof Pokemon === "object" &&
      "name" in Pokemon
    ) {
      PokemonList.push(Pokemon);
    } else {
      console.log("pokemon is not correct");
    }
}

// Public fuction for loading PokemonList from ApiUrl
function loadList() {
    return fetch(ApiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (Item) {
        let Pokemon = {
          name: Item.name,
          detailsUrl: Item.url
        };
        add(Pokemon);
        console.log(Pokemon);
      });
    }).catch(function (E) {
      console.error(E);
    })
  }

// Public fuction for loading further details of PokemonList from URL
  function loadDetails(Item) {
    let Url = Item.detailsUrl;
    return fetch(Url).then(function (response) {
      return response.json();
    }).then(function (Details) {
      // Now we add the details to the item
      Item.imageUrl = Details.sprites.front_default;
      Item.height = Details.height;
      Item.types = Details.types;
    }).catch(function (E) {
      console.error(E);
    });
  }
  
// Public Function to get items of Array
function getAll(){
  return PokemonList;
}

return{
  add : add,
  getAll : getAll,
  addListItem : addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails
  };

})();

PokemonRepository.loadList().then(function () {
  PokemonRepository.getAll().forEach(function (Pokemon) {
    PokemonRepository.addListItem(Pokemon);
  });
});
