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
            <div>
                <h1>#${res.id} <span id="detailsName">${res.name}</span></h1>
            </div>
            <div class="stats d-flex">
                <div class="classification m-1 w-25">
                    <h4 class="title border rounded border-dark text-center">Classification</h4>
                    <div class="section stat border rounded border-dark p-1"></div>
                </div>
                <div class="height m-1 w-25">
                    <h4 class="title border rounded border-dark text-center">Height</h4>
                    <div class="section stat border rounded border-dark p-1">${res.height}m</div>
                </div>
                <div class="weight m-1 w-25">
                    <h4 class="title border rounded border-dark text-center">Weight</h4>
                    <div class="section stat border rounded border-dark p-1">${res.weight}Kg</div>
                </div>
                <div class="types m-1 w-25">
                    <h4 class="title border rounded border-dark text-center">Type</h4>
                    <div class="section stat border rounded border-dark p-1"></div>
                </div>
            </div>
            <div class="pictures text-center" >
                <h4 class="title border rounded border-dark my-1">Pictures</h4>
                <div class="section my-2 border rounded border-dark">
                    <img class="detailImg border rounded border-1 border-dark m-1" src="${res.sprites.front_default}" alt="poke Image">
                    <img class="detailImg border rounded border-1 border-dark m-1" src="${res.sprites.front_shiny}" alt="shiny Image">
                </div>
            </div>
        </div>
        `

    // capitalize the first letter in name
    $("#detailsName").each(function (index, element) {
        let name = $(element).text()
        let newString = name.charAt(0).toUpperCase() + name.slice(1)
        $(this).text(newString)
    })

}


// fetch request for details page
export const pokeDetails = () => {
    fetch(POKE_APP_API + "pokemon/" + pokemon)
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            $("#detailBody").html("")
            if (typeof res.name === 'string' && res.name !== '') {
                showDetails(res)
            }
        })
}

pokeDetails()