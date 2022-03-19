// Immidietely Invoked Function Expression (IIFE)
let PokemonRepository = (function(){

// Declarations of Global variables
let PokemonList = [];
let ApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let ModalContainer = document.querySelector('.modal-container');

// Public Function to create elements list and Button for each Pokemon object
 function addListItem(Pokemon){
   let PokemonUList = document.querySelector(".Pokemon-List");
   let ListPokemon = document.createElement("div");
   let Button = document.createElement("button");
   Button.innerText = Pokemon.name;
   Button.classList.add("button-class");
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
function showDetails(Item){
  PokemonRepository.loadDetails(Item).then(function () {
    console.log(Item);
    showModal(Item.name, Item.height, Item.weight, Item.abilities, Item.types, Item.imageUrl);
 });
}

// Function for creating Modal That will show individual pokoemon details
function showModal(Name, Height, Weight, Abilities, Types, ImageUrl){
    ModalContainer.classList.add('is-visible')
    document.querySelector('.modal__title').innerText = Name;
    let Description = 'Height: ' + Height + '<br>Weight: ' + Weight;
    document.querySelector('.modal__text').innerHTML = Description;
    document.querySelector('.modal__img').setAttribute('src', ImageUrl);
    console.log(ImageUrl);

    let CloseButton = document.querySelector('.modal-close');
    CloseButton.addEventListener('click', hideModal);
    window.addEventListener('keydown', (e) => {
                  console.log(e.key);
                  if (e.key === 'Escape' && ModalContainer.classList.contains('is-visible'))
                      hideModal();
          });
    ModalContainer.classList.add('is-visible');
    }

    ModalContainer.addEventListener('click', (e) => {
   // Since this is also triggered when clicking INSIDE the modal
   // We only want to close if the user clicks directly on the overlay
   let Target = e.target;
   if (Target === ModalContainer) {
     hideModal();
   }
 });

 // Function for hiding Modal
function hideModal() {
            ModalContainer = document.querySelector('.modal-container');
            ModalContainer.classList.remove('is-visible');
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
      Item.weight = Details.weight;
      Item.abilities = Details.abilities;
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
    PokemonRepository.addListItem(Pokemon);   // Calling funtion addListItem to Add pokemons details
  });
});
