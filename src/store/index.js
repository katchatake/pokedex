import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        favoritePokemons: []
    },
    mutations: {
        addFavorite(state, pokemon) {
            state.favoritePokemons.push(pokemon)
            localStorage.setItem('pokemons', JSON.stringify(state.favoritePokemons));
        },
        delFavorite(state, pokemon) {
            let index = state.favoritePokemons.findIndex((poke) => poke.name == pokemon.name);
            state.favoritePokemons.splice(index, 1);
            localStorage.setItem('pokemons', JSON.stringify(state.favoritePokemons));
        },
        get(state, pokemons) {
            state.favoritePokemons = pokemons
        }
    },
    actions: {
        getPokemons({ commit }) {
            let poke = JSON.parse(localStorage.getItem('pokemons'));
            if (poke) {
                commit('get', poke);
            } else {
                localStorage.setItem('pokemons', JSON.stringify([]));
            }
        },
        addFavorite({ commit }, pokemon) {
            commit('addFavorite', pokemon)
        },
        delFavorite({ commit }, pokemon) {
            commit('delFavorite', pokemon)
        }
    },
    modules: {}
})