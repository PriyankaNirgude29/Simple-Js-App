// Immidietely Invoked Function Expression (IIFE)
let PokemonRepository = (function(){

// Declarations of Global variables
let PokemonList = [];
let ApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// Public Function to create elements list and Button for each Pokemon object
 function addListItem(Pokemon){
   let PokemonUList = document.querySelector(".list-group");
   let ListPokemon = document.createElement("li");
   let Button = document.createElement("button");
   Button.innerText = Pokemon.name;
   Button.classList.add("btn-primary");
   ListPokemon.classList.add("li");
   ifPokemonSelected(Button, Pokemon);
   ListPokemon.appendChild(Button);
   PokemonUList.appendChild(ListPokemon);
}

function ifPokemonSelected(Button, Pokemon){
  Button.addEventListener('click', function() {
  showDetails(Pokemon);
});
}

// Public function to Display Pokemon details
function showDetails(Pokemon){
  PokemonRepository.loadDetails(Pokemon).then(function () {
    console.log(Pokemon);
    showModal(Pokemon);
 });
}

// Function for creating Modal That will show individual pokoemon details
function showModal(Pokemon){

    let ModalBody = $(".modal-body");
    let ModalTitle = $(".modal-title");

    ModalTitle.empty();
    ModalBody.empty();

    let NameElement = $("<h1>"+ Pokemon.name +"</h1>");
    let ImageElement = $('<img class="pokemon-modal-img" style="width:100%">');
    ImageElement.attr("src",Pokemon.imageUrl);
    let HeightElement = $("<p>"+ "Height : " + Pokemon.height +"</p>");
    let WeightElement = $("<p>"+ "Weight : " + Pokemon.weight +"</p>");
    let TypeElement = $("<p>"+ "Types : " + Pokemon.types +"</p>");
    let AbilitiesElement = $("<p>"+ "Abilities : " + Pokemon.abilities +"</p>");

    ModalTitle.append(NameElement);
    ModalBody.append(ImageElement);
    ModalBody.append(HeightElement);
    ModalBody.append(WeightElement);
    ModalBody.append(TypeElement);
    ModalBody.append(AbilitiesElement);
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
      Item.types = [];
      for (let i = 0; i < Details.types.length; i++) {
          Item.types.push(Details.types[i].type.name);
        }
      Item.weight = Details.weight;
      Item.abilities = [];
      for (let i = 0; i < Details.abilities.length; i++) {
          Item.abilities.push(Details.abilities[i].ability.name);
        }
    }).catch(function (E) {
      console.error(E);
    });
  }

  function findPokemon(SearchName) {
    // Clear all the buttons on the page when user types in search box
    $(".list-group").empty();

    // Add pokemon buttons for which the name includes the search string
    PokemonList.forEach((Pokemon) => {
      if (properCasing(Pokemon.name).indexOf(properCasing(SearchName)) > -1) {
        addListItem(Pokemon);
      }
    });
  }
  //makes each String start with uppercase letter
  function properCasing(Item) {
    return Item.charAt(0).toUpperCase() + Item.slice(1);
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
  showDetails: showDetails,
  showModal: showModal,
  ifPokemonSelected: ifPokemonSelected,
  findPokemon: findPokemon
  };

})();

PokemonRepository.loadList().then(function () {
  PokemonRepository.getAll().forEach(function (Pokemon) {
    PokemonRepository.addListItem(Pokemon);   // Calling funtion addListItem to Add pokemons details
  });
});
