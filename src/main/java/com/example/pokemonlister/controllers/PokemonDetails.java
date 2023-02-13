package com.example.pokemonlister.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PokemonDetails {

    @GetMapping("/details")
    public String showPokemon(){
        return "/details";
    }

}
