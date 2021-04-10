<template>
  <div class="mb-2 offset-md-1">
    <p class="text-center">Фильтр по жанрам</p>
    <p>
      <input type="button"
             value="Всe"
             class="bg-light rounded-pill pl-3 pr-3 pt-1 pb-1 mr-2 mb-2"
             :style="styleData"
             @click="allGenre"
      >


      <input v-for="(genre, index) in getGenres" :key="getGenres.idGenre" type="button"
             :id="genre.idGenre"
             :value="genre.name"
             name="categories"
             class="bg-light rounded-pill pl-3 pr-3 pt-1 pb-1 mr-2 mb-2"
             :style="styleData"
             v-on:mouseover="(event) => changeColor(event, styleData, index)"
             v-on:mouseleave="() => originalColor(styleData, index)"
             @click="filterByGenreCardFunc(genre.name, index)">
    </p>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "FilterGenre",
  computed: mapGetters(['getGenres']),
  data() {
    return {
      styleData: {
        color: 'black',
        hover: false,
        outline: 'none'
      }

    }
  },
  methods: {
    ...mapActions(['getGenreList', 'filterCard']),
    changeColor(e, styleData, id) {
      e.preventDefault();
      // +2 т.к. добавлен input-все
      document.getElementsByTagName("input")[id + 2].style.color = "#008cf0"
    },
    originalColor(styleData, id) {
      document.getElementsByTagName("input")[id + 2].style.color = 'black';
    },
    filterByGenreCardFunc(genreName, id) {
      document.getElementsByTagName("input")[id + 2].style.color = "#008cf0"
      this.filterCard({
        mode: "byGenreName",
        strSearch: genreName
      })
    },
    allGenre() {
      this.filterCard({
        mode: "all",
        strSearch: "empty"
      })
    }
  },
  mounted() {
    this.getGenreList()
  }
}
</script>

<style>
</style>
