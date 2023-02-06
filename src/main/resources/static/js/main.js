import {POKE_APP_API} from "./keys.js";

let pokemon = "pokemon/?limit=1279"

export const runPokeApp = () => {
    fetch(POKE_APP_API + pokemon)
        .then((res) => res.json())
        .then((res) => console.log(res))
    }
runPokeApp()

// .then($("#loader").addClass("hidden"))
        // .then((res) => {
        //     $("#content").html("")
        //     console.log(res);
        // })};