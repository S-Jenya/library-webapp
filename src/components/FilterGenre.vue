<template>
  <div class=" mb-2 md-1  col-lg-0 col-xl-0 mb-3" id="filterContainer">
    <p class="text-center">Фильтр: {{genreInputName}}</p>
    <p>
      <input type="button"
             value="Всe"
             class="bg-light rounded-pill pr-3 pt-1 pb-1 mr-2 mb-2"
             :style="styleData"
             @click="allGenre"
             @mouseover="(event) => changeColor(event, styleData, -1)"
             @mouseleave="() => originalColor(styleData, -1)"
      >

      <input v-for="(genre, index) in getGenres" :key="getGenres.idGenre" type="button"
             :id="genre.idGenre"
             :value="genre.name"
             name="categories"
             class="bg-light rounded-pill pr-3 pt-1 pb-1 mr-2 mb-2"
             :style="styleData"
             @mouseover="(event) => changeColor(event, styleData, index)"
             @mouseleave="() => originalColor(styleData, index)"
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
      },
      genreInputName: ''

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
      let text = document.getElementsByTagName("input")[id + 2]
      this.genreInputName = "\"" + text.value + "\""
      this.filterCard({
        mode: "byGenreName",
        strSearch: genreName
      })
    },
    allGenre() {
      this.genreInputName = "\"Все\""
      this.filterCard({
        mode: "all",
        strSearch: "empty"
      })
    }
  },
  mounted() {
    this.genreInputName = "\"Все\""
    this.getGenreList()
  }
}
</script>

<style>
</style>
