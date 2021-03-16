<template>
    <b-container style="margin-top: 30px">
      <div class="row mb-4">
        <div class="col-md-8 offset-md-2">
          <b-input class="mr-sm-2" placeholder="Я ищу..."></b-input>
<!--          <b-button size="sm" class="my-2 my-sm-0" type="submit">Поиск</b-button>-->
        </div>
      </div>
      <b-button id="show-btn" type="button" to="/admin/bookCreate">Добавить книгу</b-button>
      <b-row align-v="center" style="height: auto; margin: 10px;">
          <cardItem v-for="job in jobs" :key="jobs.id" :name="job.title" class="h-8000 m-auto">
            <template v-slot:body style="margin-top: 50px">
              <p>
                Оценка
              </p>
            </template>
          </cardItem>
      </b-row>
      <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
          @input="paginate(currentPage)"
      ></b-pagination>
    </b-container>
</template>

<script>
import cardItem from "@/components/cardItem";

export default {
  name: "mainContent",
  components: {cardItem},
  data() {
    return {
      jobs: [],
      currentPage: 1,
      rows: 1,
      perPage: 3
    }
  },
  mounted() {
    this.loadCards()
  },
  methods: {
    async loadCards() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      const val = await res.json();
      this.jobs = val;
      this.rows = this.jobs.length;
    },
    paginate(currentPage){
      alert(currentPage)
    }
  }
};
</script>
