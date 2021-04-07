<template>
  <div class="mb-2">
    <label>Фильтр по жанрам</label>
    <p>
      <input id="idInputFilter" v-for="genre in getGenres" type="button" :id="genre.idGenre" name="categories"
             :value="genre.name"
             class="bg-light rounded-pill pl-3 pr-3 pt-1 pb-1 mr-2 mb-2">
    </p>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "FilterGenre",
  computed: mapGetters(['getGenres']),
  data() {
    return {}
  },
  methods: {
    ...mapActions(['getGenreList'])
  },
  mounted() {
    this.getGenreList()
  }
}
</script>

<style>
#idInputFilter {
  outline: 0;
  outline-offset: 0;
}
</style>
