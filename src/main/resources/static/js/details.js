import {POKE_APP_API} from "./keys.js";

const species = "pokemon-species"

let queryString = window.location.href
let pokemon = queryString.charAt(queryString.length-1)
console.log(queryString)

const showDetails = (res) => {
    document.getElementById("detailBody").innerHTML +=
        `
        <div data-id="${res.id}">
        <h3>${res.name} no.<span>${res.id}</span></h3>
        <img src="${res.sprites.front_default}" alt="poke Image">
        </div>
        `
}

export const pokeDetails = () => {
    fetch(POKE_APP_API + "pokemon/" + pokemon)
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            $("#detailBody").html("")
            if(typeof res.name === 'string' && res.name !== '') {
                showDetails(res)
            }
        })
}

pokeDetails()