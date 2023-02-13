import {POKE_APP_API} from "./keys";

const pokemon = 4;
const species = "pokemon-species"

const showDetails = (name, id, sprites) => {
    document.getElementById("detailBody").innerHTML +=
        `
        <div>
        <h3>${name} no.<span>${id}</span></h3>
        <img src="${sprites.front_default}" alt="pokeImage">
        </div>
        `

}

export const pokeDetails = (pokemon) => {
    fetch(POKE_APP_API + "pokemon/" + pokemon + "/")
        .then((res) => res.json)
        .then((res) => {
            if (typeof res.name === 'string' && res.name !== '') {
                showDetails(res);
            }
        })
}

pokeDetails(4)