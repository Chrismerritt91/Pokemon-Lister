package com.example.pokemonlister.models;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import java.net.http.HttpClient;

public class PokeApiClient {

//    @Configuration
//    @Import(PokeApiReactorCachingConfiguration.class)
//    @EnableCaching
//    public class MyPokeApiReactorCachingConfiguration {
//        @Bean
//        public HttpClient httpClient() {
//            return HttpClient.create()
//                    .compress(true)
//                    .resolver(DefaultAddressResolverGroup.INSTANCE);
//        }
//    }

}

