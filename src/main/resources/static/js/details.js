import {POKE_APP_API} from "./keys.js";

const species = "pokemon-species"

// targets the url parameters and gets the id number for the fetch request
let queryString = window.location.href
let url = new URL(queryString)
let parameters = url.searchParams
let pokemon = parameters.get("id")


// builds the page to show details of selected pokemon
const showDetails = (res) => {
    document.getElementById("detailBody").innerHTML +=
        `
        <div data-id="${res.id}">
        <h3>${res.name} no.<span>${res.id}</span></h3>
        <img src="${res.sprites.front_default}" alt="poke Image">
        </div>
        `
}


// fetch request for details page
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