import {POKE_APP_API} from "./keys.js";

// /?limit=1279 append this to the end of query for all pokemon, too much for page initial limit is ?offset=20&limit=20
let pokeQuery = "pokemon"

const createPokemonCard = ({name, id, sprites}) => {
    document.getElementById("content").innerHTML +=
        `
        <div data-id="${id}" id="card" class="border border-warning border-4 rounded bg-secondary text-center card">
        <img class="card-img-top" src="${sprites.front_default}" alt="Poke image">
        <h4 class="name">${name}</h4>
        <h6 class="pokeNum">NO. ${id}</h6>
        </div>
        `
}

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


