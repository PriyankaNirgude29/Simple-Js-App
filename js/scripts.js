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

for(let i=0; i < PokemonList.length; i++)
{
  if(PokemonList[i].height > 5){
    document.write(PokemonList[i].name + " ("+"Height :"+PokemonList[i].height+")"+" - Wow, That's Big!<br\>");

  }else{
    document.write(PokemonList[i].name + " ("+"Height :"+PokemonList[i].height+")<br\>");
  }

}
