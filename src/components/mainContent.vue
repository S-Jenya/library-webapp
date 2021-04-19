<template>
  <b-container class="mt-5">
    <div class="row mb-4 offset-md-1">
      <div class="col-md-8 ">
        <b-input class="mr-sm-2" placeholder="Я ищу..." v-model="searchText"></b-input>
      </div>
      <div class="col-md-4">
        <b-button class="bg-primary my-1 my-sm-0 mr-2" @click="search">Поиск</b-button>
        <b-button class="my-1 my-sm-0" variant="outline-primary" @click="cancelSearch">Сбросить</b-button>
      </div>
    </div>
    <FilterGenre/>
    <b-button v-if="isAdmin" id="show-btn"
              type="button"
              class="bg-primary"
              to="/admin/bookCreate">Добавить книгу
    </b-button>

    <!--    <img :src="card.url" alt="rr" v-for="card in getCardInfo" :key="getCardInfo.id"/>-->
    <b-row align-v="center" class="mt-2 h-auto justify-content-center align-items-center">

      <div v-if="getCardInfo.length === 0 && !bookIsLoading" class="text-center h-8000 mt-lg-2 mb-lg-3 mr-lg-auto ml-lg-auto mt-md-3
       ml-sm-2 mr-sm-2 ml-md-1 mt-sm-3">
        <h1 class="text-center">Результат поиска</h1>
        Ниего не найдено
      </div>

      <Loader v-if="bookIsLoading" class="text-center" />

      <cardItem v-for="card in getCardInfo" :key="getCardInfo.id"
                class="h-8000 mt-lg-2 mb-lg-3 mr-lg-auto ml-lg-auto mt-md-3 ml-sm-2 mr-sm-2 ml-md-1 mt-sm-3  shadow"
                :img-src="card.url"
                :name="card.name"
                :author="card.author"
                :id='card.id'
      />
    </b-row>

<!--    Блок пагинации-->
<!--    <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-text="Начало"
        prev-text="<"
        next-text=">"
        last-text="Конец"
        @input="paginate(currentPage)"
    />-->
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
    // this.loading = false
   // this.displayCard = this.getCardInfo.slice(0, 6)
  }
};
</script>
