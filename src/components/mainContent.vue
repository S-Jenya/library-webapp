<template>
  <b-container class="mt-5">
    <div class="row mb-4">
      <div class="col-md-8 offset-md-2">
        <b-input class="mr-sm-2" placeholder="Я ищу..."></b-input>
        <!--          <b-button size="sm" class="my-2 my-sm-0" type="submit">Поиск</b-button>-->
      </div>
    </div>
    <FilterGenre/>
    <b-button v-if="isAdmin" id="show-btn"
              type="button"
              class="bg-primary"
              to="/admin/bookCreate">Добавить книгу
    </b-button>

    <!--    <img :src="card.url" alt="rr" v-for="card in getCardInfo" :key="getCardInfo.id"/>-->
    <b-row align-v="center" class="mt-2 h-auto">
      <cardItem v-for="card in getCardInfo" :key="getCardInfo.id"
                class="h-8000 mt-lg-2 mb-lg-3 mr-lg-auto ml-lg-auto mt-md-3 ml-sm-2 mr-sm-2 ml-md-1 mt-sm-3  shadow"
                :img-src="card.url"
                :name="card.name"
                :author="card.author"
                :id='card.id'
      >
        <!--        <template v-slot:body style="margin-top: 50px">
                  <p>
                    Оценка
                  </p>
                </template>-->
      </cardItem>
    </b-row>
    <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-text="Начало"
        prev-text="<"
        next-text=">"
        last-text="Конец"
        @input="paginate(currentPage)"
    ></b-pagination>
  </b-container>
</template>

<script>
import cardItem from "@/components/cardItem";
import FilterGenre from "@/components/FilterGenre";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "mainContent",
  components: {cardItem, FilterGenre},
  computed: mapGetters(['isAdmin', 'getCardInfo']),
  data() {
    return {
      currentPage: 1,
      rows: 10,
      perPage: 3
    }
  },
  methods: {
    ...mapActions(['loadCardList']),

    paginate(currentPage) {
      alert(currentPage)
    }
  },
  mounted() {
    this.loadCardList()
  }
};
</script>
