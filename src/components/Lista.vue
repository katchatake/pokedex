<template>
  <div>
    <b-container>
      <b-row class="mt-5">
        <b-col md="4" v-for="(pokemon, index) in pokemons" :key="index">
          <b-card no-body class="overflow-hidden mt-3" style="max-width: 540px">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  :src="`${pokemon.img}`"
                  alt="Image"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body :title="upercase(pokemon.name)">
                  <b-card-text>
                    <b-button
                      variant="outline-primary mx-2"
                      @click="see(pokemon)"
                    >
                      <b-icon icon="eye-fill"></b-icon
                    ></b-button>
                    <b-button
                      v-if="pokemon.status == false"
                      variant="outline-danger"
                      @click="like(pokemon)"
                      ><b-icon icon="heart"></b-icon
                    ></b-button>
                    <b-button v-else variant="danger" @click="dislike(pokemon)"
                      ><b-icon icon="heart"></b-icon
                    ></b-button>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-pokemon" size="lg" hide-footer>
      <template #modal-title>
        <div class="text-center">
          <h1>Pokemon : {{ upercase(pokemon.name) }}</h1>
        </div>
      </template>
      <div class="d-block text-center">
        <b-row>
          <b-col md="6">
            <b-img class="rounded-0" :src="pokemon.img"></b-img>
          </b-col>
          <b-col md="6">
            <b-col>
              <h3>Type: {{ pokemon.type }}</h3>
            </b-col>
            <b-col>
              <h3>Stats:</h3>
              <ul v-for="(stat, index) in pokemon.stats" :key="index">
                <li>{{ stat.stat.name }} : {{ stat.base_stat }}</li>
              </ul>
            </b-col>
            <b-col>
              <b-icon
                v-if="pokemon.status == true"
                style="width: 120px; height: 120px"
                icon="check-circle"
                variant="success"
              ></b-icon>
            </b-col>
          </b-col>
        </b-row>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('modal-pokemon')"
        >Close Me</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  name: "Lista",
  data: () => ({
    pokemons: [],
    pokemon: {
      name: "",
      img: "",
      type: "",
      stats: [],
      status: false,
    },
  }),
  created: function () {
    this.getPokemos();
    this.getPokemons();
  },
  computed: {
    ...mapState(["favoritePokemons"]),
  },
  methods: {
    ...mapActions(["addFavorite", "delFavorite", "getPokemons"]),
    like: function (pokemon) {
      let pokes = this.pokemons;
      let index = pokes.findIndex((poke) => poke.name == pokemon.name);
      this.pokemons[index].status = true;
      this.addFavorite(pokemon);
    },
    dislike: function (pokemon) {
      let pokes = this.pokemons;
      let index = pokes.findIndex((poke) => poke.name == pokemon.name);
      this.pokemons[index].status = false;
      this.delFavorite(pokemon);
    },
    see: function (pokemon) {
      this.pokemon.name = pokemon.name;
      this.pokemon.type = pokemon.type;
      this.pokemon.img = pokemon.img;
      this.pokemon.stats = pokemon.stats;
      this.pokemon.status = pokemon.status;
      this.$bvModal.show("modal-pokemon");
    },
    upercase: function (value) {
      return value.toUpperCase();
    },
    mutationsPokemon: function (id, pokemon) {
      let newPokemon = {
        name: pokemon.name,
        type: pokemon.types[0].type.name,
        stats: pokemon.stats,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        status: false,
      };

      return newPokemon;
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    validPokemon: function (pokemon) {
      let pokes = this.favoritePokemons;

      return pokes.find((poke) => poke.name == pokemon.name);
    },
    validFavorite: function () {
      let favorites = this.favoritePokemons;
      let pokemons = this.pokemons;

      Object.values(favorites).forEach((key) => {
        let index = pokemons.findIndex((poke) => poke.name == key.name);
        console.log(index);
      });
    },
    getPokemos: async function () {
      try {
        let pokemon = [];
        for (let index = 1; index <= 152; index++) {
          let id = this.getRandomInt(index, 152);
          let res = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${index}`
          );
          //console.log(this.validPokemon(res.data));
          let pokeVal = this.validPokemon(res.data);
          if (pokeVal == undefined) {
            //pokemon.push(this.mutationsPokemon(id, res.data));
            this.pokemons.push(this.mutationsPokemon(index, res.data));
          } else {
            this.pokemons.push(pokeVal);
          }
        }
        //this.validFavorite();

        //console.log(this.pokemons);
      } catch (error) {
        console.log(error);
      }
    },
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>