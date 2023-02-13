import {POKE_APP_API} from "./keys";

const species = "pokemon-species"

// let queryString = window.location.href
// let pokemon = queryString.charAt(queryString.length-1)
// console.log(queryString)

const showDetails = (name, id, sprites) => {
    document.getElementById("detailBody").innerHTML +=
        `
        <div data-id="${id}">
        <h3>${name} no.<span>${id}</span></h3>
        <img src="${sprites.front_default}" alt="pokeImage">
        </div>
        `

}

export const pokeDetails = () => {
    fetch(POKE_APP_API + "pokemon/4", {method: "GET"})
        .then((res) => res.json())
        .then((res) => {
            $("#detailBody").html("")
            if(typeof res.name === 'string' && res.name !== '') {
                showDetails(res);
            }
        })
}

pokeDetails()