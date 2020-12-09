<template>
  <div>
    <b-navbar toggleable="lg" type="dark" fixed="top" variant="info">
      <b-navbar-brand href="#">Pokedex</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Favorites Pokemons" right>
            <b-dropdown-item
              v-for="(poke, index) in favoritePokemons"
              :key="index"
              href="#"
              >{{ poke.name }}</b-dropdown-item
            >
            <b-dropdown-item v-if="favoritePokemons.length == 0"
              >No hay Pokemons</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Lista />
  </div>
</template>

<script>
// @ is an alias to /src
import Lista from "@/components/Lista.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Home",
  components: {
    Lista,
  },
  computed: {
    ...mapState(["favoritePokemons"]),
  },
};
</script>
