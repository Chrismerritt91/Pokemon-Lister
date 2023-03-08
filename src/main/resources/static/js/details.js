import {POKE_APP_API} from "./keys.js";

const species = "pokemon-species/"

// targets the url parameters and gets the id number for the fetch request
let queryString = window.location.href
let url = new URL(queryString)
let parameters = url.searchParams
let pokemon = parameters.get("id")


// builds the page to show details of selected pokemons Name, Height, Weight, Types, and Images
const showDetails = (res) => {
    document.getElementById("detailBody").innerHTML +=
        `
        <div data-id="${res.id}">
            <div>
                <h1 id="detailsName" class="ps-1 m-2">${res.name}</h1>
            </div>
            <div class="stats d-flex">
                <div class="number m-1 w-25">
                    <h4 class="title border rounded border-dark text-center">No.</h4>
                    <div id="number" class="section stat border rounded border-dark p-1 pt-3">National: #${res.id}</div>
                </div>
                <div class="height m-1 w-25">
                    <h4 class="title border rounded border-dark text-center">Height</h4>
                    <div id="height" class="section stat border rounded border-dark p-1">${res.height}</div>
                </div>
                <div class="weight m-1 w-25">
                    <h4 class="title border rounded border-dark text-center">Weight</h4>
                    <div id="weight" class="section stat border rounded border-dark p-1">${res.weight}</div>
                </div>
                <div class="types m-1 w-25">
                    <h4 class="title border rounded border-dark text-center">Type</h4>
                    <div id="types" class="section stat border rounded border-dark p-1 text-center pt-3 ">${res.types[0].type.name}</div>
                </div>
            </div>
            <div class="pictures text-center" >
                <h4 class="title border rounded border-dark m-1">Pictures</h4>
                <div class="section my-2 border rounded border-dark mx-1">
                    <img class="detailImg border rounded border-1 border-dark m-1" src="${res.sprites.front_default}" alt="No Image Available">
                    <img class="detailImg border rounded border-1 border-dark m-1" src="${res.sprites.front_shiny}" alt="No Image Available">
                </div>
            </div>
            <div  >
                <h4 class="title border rounded border-dark m-1 text-center">Abilities</h4>
                <div class="section my-2 border rounded border-dark mx-1">
                    <div id="abilities" class="p-2"></div>
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

    $(function heightConversion() {
        let height = $("#height").text() + "0"
        let meters = parseFloat(height) / 100
        let inches = meters / 0.0254
        let feet = parseInt(inches / 12)
        let remainingInches = Math.round(inches - (12 * feet))
        let feetAndInches = feet + "'" + " " + remainingInches + '"'

        $("#height").html(feetAndInches + `</br>` + meters + ' m')
    })

    $(function weightConversion() {
        let grams = $("#weight").text() + "00"
        let kg = parseInt(grams) / 1000
        let lbs = (grams / 453.59237).toFixed(1)
        $("#weight").html(lbs + " lbs" + `</br>` + kg + " Kg")
    })

    $(function showTypes() {
        try {
            $("#types").html(`${res.types[0].type.name}` + '/' + `${res.types[1].type.name}`)
        } catch (Exception) {
        }


    })

    $(function tryAbility() {
        try {
            for (let i = 0; i < `${res.abilities}`.length; i++) {
                let name = `${res.abilities[i].ability.name}`
                abilityInfo(name)
            }
            }catch(Exception){
            }

    })

}

const speciesDetails = (res) => {
    document.getElementById("speciesDetails").innerHTML +=
        `<div>
            <div class="stats d-flex">
                <div class="m-1 w-25">
                <h4 class="title border rounded border-dark text-center">Classification</h4>
                <div id="classification" class="section stat border rounded border-dark p-1 pt-3">Not Yet Classified</div>
                </div>
                <div class="m-1 w-25">
                <h4 class="title border rounded border-dark text-center">Capture Rate</h4>
                <div class="section stat border rounded border-dark p-1 pt-3">${res.capture_rate}</div>
                </div>
                <div class="m-1 w-25">
                <h4 class="title border rounded border-dark text-center">Base Happiness</h4>
                <div class="section stat border rounded border-dark p-1 pt-3">${res.base_happiness}</div>
                </div>
                <div class="m-1 w-25">
                <h4 class="title border rounded border-dark text-center">Habitat</h4>
                <div id="habitat" class="section stat border rounded border-dark p-1 pt-3">Unknown</div>
                </div>
            </div>
            <div class="text-center" >
                <h4 class="title border rounded border-dark m-1">Flavor Text</h4>
                <div class="section my-2 border rounded border-dark mx-1">
                    <p id="flavorText">This Pokemon is still quite the mystery</p>
                </div>
            </div>
        </div>
        `

        $(function tryHabitat(){
            try {
                $("#habitat").html(`${res.habitat.name}`)
            }catch (Exception) {
            }
        })

        $(function tryGenus(){
        try {
            $("#classification").html(`${res.genera[7].genus}`)
        }catch (Exception){

        }
    })

        $(function tryFlavor(){
            try {
                for(let i = 0; i < `${res.flavor_text_entries}`.length; i++){
                    if(`${res.flavor_text_entries[i].language.name}` === "en"){
                        $("#flavorText").html(`${res.flavor_text_entries[i].flavor_text}`)
                        break;
                    }
                }
            }catch (Exception){
            }

        })

}

const abilityDetails = (res) => {
    try {
        if(`${res.effect_entries}` === ''){
            document.getElementById("abilities").innerHTML +=
                `<p class="ability">
           <span class='fw-bold m-0 text-capitalize'>${res.name}</span>: Not Defined
         </p>`
        }else{
            for(let i = 0; i < `${res.effect_entries}`.length; i++){
                let lang = `${res.effect_entries[i].language.name}`
                if(lang === "en"){
                    document.getElementById("abilities").innerHTML +=
                        `<p class="ability">
           <span class='fw-bold m-0 text-capitalize'>${res.name}</span>: ${res.effect_entries[i].effect}
         </p>`
                }
            }
        }

    }catch (Exception) {
    }

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

export const speciesInfo = () => {
    fetch(POKE_APP_API + species + pokemon)
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            $("#speciesDetails").html("")
            speciesDetails(res)
        })
}

export const abilityInfo = (name) => {
    fetch(POKE_APP_API + "ability/" + name)
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            abilityDetails(res)
        })
}

pokeDetails()
speciesInfo()

