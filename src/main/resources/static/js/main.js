import {POKE_APP_API} from "./keys.js";

// /?limit=1279 append this to the end of query for all pokemon, too much for page initial limit is ?offset=20&limit=20
const pokeQuery = "pokemon"
const kanto = "/?limit=151"
const johto = "/?offset=151&limit=100";
const hoenn = "/?offset=251&limit=135";
const sinnoh = "/?offset=386&limit=108";
const unova = "/?offset=494&limit=155";
const kalos = "/?offset=649&limit=72";
const alola = "/?offset=721&limit=88";
const galar = "/?offset=809&limit=96";
const paldea = "/?offset=905&limit=103";

const createPokemonCard = ({name, id, sprites, types}) => {
    document.getElementById("content").innerHTML +=
        `
        <div data-id="${id}" id="card" class="pokeCard text-center card border border-0 container">
        <img id="pokeImage" class="card-img-top" src="${sprites.front_default}" alt="Poke image">
        <div class="lower-card rounded-1 pt-2">
        <h4 class="name">${name}</h4>
        <div class="d-flex justify-content-around align-items-baseline">
        <a id="details" class="details btn btn-outline-dark border-0" url="http://localhost:8080/details/?id=1"><i class="fa-regular fa-scroll"></i></a>
        <h6 class="pokeNum">NO. ${id}</h6>
        <a class="btn btn-outline-dark border-0"><i class="fa-regular fa-star"></i></a>
        </div>
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

    // sets the url value for redirect to details page
    $(".details").each(function(index,element){
            let url = new URL("http://localhost:8080/details/?id=")
            let id = $(element).parent().parent().parent().attr("data-id")
            let newUrl = url + id
            // $(element).attr("url",newUrl)
        $(this).click(function(){
            window.location = newUrl;
        })
    })


    // <i className = "fa-solid fa-star" >< /i>

}

export const runPokeApp = (limit) => {
    fetch(POKE_APP_API + pokeQuery + limit)
        .then((res) => res.json())
        .then((res) => {
            $("#content").html("")
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


// this function is to sort the pokemon by regions
$(".regionBtn").click(function(){
    let region = $(this).val()
    $(".introduction").addClass("hidden")
    switch (region){
        case "kanto":{
            runPokeApp(kanto)
            break;
        }
        case "johto":{
            runPokeApp(johto)
            break;
        }
        case "hoenn":{
            runPokeApp(hoenn)
            break;
        }
        case "sinnoh":{
            runPokeApp(sinnoh)
            break;
        }
        case "unova":{
            runPokeApp(unova)
            break;
        }
        case "kalos":{
            runPokeApp(kalos)
            break;
        }
        case "alola":{
            runPokeApp(alola)
            break;
        }
        case "galar":{
            runPokeApp(galar)
            break;
        }
        case "paldea":{
            runPokeApp(paldea)
            break;
        }
        default:{
            $(".introduction").removeClass("hidden")
            break;
        }
    }
})

$("#details").click(function() {
    console.log("hi")
})



