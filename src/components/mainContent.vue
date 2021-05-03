<template>
  <b-container class="mt-xl-5 mt-sm-3 mt-lg-3 mt-3 d-block text-center container">
    <div class="row mb-3 ">
      <div class="col-12 col-lg-9 col-md-8">
        <b-input
            placeholder="Я ищу..." v-model="searchText"></b-input>
      </div>
      <div class="col col-lg-3 col-md-4">
        <b-button class="bg-primary my-1 my-sm-0 mr-2" @click="search">Поиск</b-button>
        <b-button class="my-1 my-sm-0" variant="outline-primary" @click="cancelSearch">Сбросить</b-button>
      </div>
    </div>
    <!--
        class="
        mt-lg-2 mb-lg-3 mr-lg-auto ml-lg-2 mr-lg-2
        mt-md-3 mt-md-3
        ml-sm-2 mr-sm-2 mb-sm-3
        ml-2 mr-2 mb-3 shadow"
        -->
    <b-row align-v="center" class=" col-lg-0 col-xl-0 mb-3">
      <b-col class=" col-lg-0 col-xl-0 col-md-0 col-sm-0 col-0">
        <FilterGenre/>
      </b-col>
    </b-row>
    <b-button v-if="isAdmin" id="show-btn"
              type="button"
              class="bg-primary"
              to="/admin/bookCreate">Добавить книгу
    </b-button>

    <b-row align-v="center" class="mt-2 h-auto justify-content-center align-items-center">
      <div v-if="getCardInfo.length === 0 && !bookIsLoading" class="text-center h-8000 mt-lg-2  mt-md-3
       mr-sm-2  mt-sm-3">
        <h1 class="text-center">Результат поиска</h1>
        Ниего не найдено
      </div>

      <Loader v-if="bookIsLoading" class="text-center"/>

      <cardItem v-for="card in getCardInfo" :key="getCardInfo.id"
                class="
                 ml-xl-auto mr-xl-auto
                mt-lg-2 mb-lg-3 ml-lg-2 mr-lg-2
                mt-md-3 mt-md-3
                ml-sm-2 mr-sm-2 mb-sm-3
                ml-2 mr-2 mb-3 shadow"
                :img-src="card.url"
                :name="card.name"
                :author="card.author"
                :id='card.id'
      />
    </b-row>
  </b-container>
</template>

<script>
import cardItem from "@/components/cardItem";
import FilterGenre from "@/components/FilterGenre";
import Loader from "@/components/Loader"
import {mapActions, mapGetters} from "vuex";

export default {
  name: "mainContent",
  components: {cardItem, FilterGenre, Loader},
  computed: mapGetters(['isAdmin', 'getCardInfo', 'bookIsLoading']),
  data() {
    return {
      searchText: '',
      displayCard: [],
      currentPage: 1,
      rows: 5,
      perPage: 3,
      loading: true
    }
  },
  methods: {
    ...mapActions(['filterCard']),
    search() {
      this.filterCard({
        mode: "byName",
        strSearch: this.searchText
      })
    },
    cancelSearch() {
      this.searchText = ""
      this.filterCard({
        mode: "all",
        strSearch: "empty"
      })
    },
    paginate(currentPage) {
      let start = (currentPage - 1) * this.perPage
      this.displayCard = this.getCardInfo.slice(start, start + 6)
    }
  },
  mounted() {
    this.filterCard({
      mode: "all",
      strSearch: "empty"
    })
  }
};
</script>
