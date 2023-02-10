import {POKE_APP_API} from "./keys.js";

// /?limit=1279 append this to the end of query for all pokemon, too much for page initial limit is ?offset=20&limit=20
let pokeQuery = "pokemon"
let pokeQueryAll = "pokemon/?limit=1279"

const createPokemonCard = ({name, id, sprites, types}) => {
    document.getElementById("content").innerHTML +=
        `
        <div data-id="${id}" id="card" class="text-center card border border-0 container">
        <img class="card-img-top" src="${sprites.front_default}" alt="Poke image">
        <div class="lower-card rounded-1 pt-2">
        <h4 class="name">${name}</h4>
        <h6 class="pokeNum">NO. ${id}</h6>
        <p class="type hidden">${types[0].type.name}</p>
        </div>
        </div>
        `
    // changes color according to pokemon type
    $(".type").each(function(index,element){
        let type = $(element).text()
        switch (type){
            case "fire":{
                $(element).parent().css('background-color', '#F1812F')
                break;
            }
            case "grass":{
                $(element).parent().css('background-color', '#78C851')
                break;
            }
            case "water":{
                $(element).parent().css('background-color', '#6891F1')
                break;
            }
            case "normal":{
                $(element).parent().css('background-color', '#A9A978')
                break;
            }
            case "electric":{
                $(element).parent().css('background-color', '#F9D130')
                break;
            }
            case "ice":{
                $(element).parent().css('background-color', '#99D9D8')
                break;
            }
            case "fighting":{
                $(element).parent().css('background-color', '#C13029')
                break;
            }
            case "poison":{
                $(element).parent().css('background-color', '#A041A1')
                break;
            }
            case "ground":{
                $(element).parent().css('background-color', '#E0C068')
                break;
            }
            case "flying":{
                $(element).parent().css('background-color', '#A990F1')
                break;
            }
            case "psychic":{
                $(element).parent().css('background-color', '#F95889')
                break;
            }
            case "bug":{
                $(element).parent().css('background-color', '#A9B820')
                break;
            }
            case "rock":{
                $(element).parent().css('background-color', '#B8A139')
                break;
            }
            case "ghost":{
                $(element).parent().css('background-color', '#70589B')
                break;
            }
            case "dark":{
                $(element).parent().css('background-color', '#715849')
                break;
            }
            case "dragon":{
                $(element).parent().css('background-color', '#7138F9')
                break;
            }
            case "steel":{
                $(element).parent().css('background-color', '#B9B9D0')
                break;
            }
            case "fairy":{
                $(element).parent().css('background-color', '#F0B7BD')
                break;
            }
            default:{
                $(element).parent().css('background-color', 'silver')
                break;
            }
        }

        })

    // $(".card").each(function(index,element){
    //     if($(element).attr("data-id") > 151){
    //     }
    // })

}
// <input type="hidden" value="${past_types[0].generation.names}"> trying to get this to work to identify the pokemon's generation, so I can sort by gen

export const runPokeApp = () => {
    fetch(POKE_APP_API + pokeQuery)
        .then((res) => res.json())
        // .then((res) => console.log(res))
        .then($("#loader").addClass("hidden"))
        .then((res) => {
            $("#content").html("")
            console.log(res)
            res.results.forEach((pokemon) => {
                if(typeof pokemon.name === 'string' && pokemon.name !== ''){
                    getPokemon(pokemon.name).then((res) => {
                        createPokemonCard(res)
                    })
                }
            })
        })
}

const getPokemon = name => {
    return fetch(POKE_APP_API + pokeQuery + "/" + name, {method: "GET"})
        .then((res) => res.json())
}

runPokeApp()


