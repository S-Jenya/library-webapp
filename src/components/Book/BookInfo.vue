<template>
  <div class="center-block w-75 ml-auto mr-auto">
    <h1><p class="top-name center-block text-center">Картчка книги</p></h1>
    <p>
    <h2>{{ getBookInfo.name }}</h2>
    </p>
    <p>
    <h5>{{ getBookInfo.author }}</h5>
    </p>
    <p>
      <img :src="getBookInfo.url" alt="Обложка" style="width: 300px; height: 500px;">
    </p>
    <p>
      Жанр: {{ getBookInfo.genre }}
    </p>
    <p>
      Описание: {{ getBookInfo.description }}
    </p>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "BookInfo",
  computed: mapGetters(['getBookInfo']),
  methods: {
    ...mapActions(['loadBookInfo']),
  },
  mounted() {
    console.log("HER mounted");
    this.loadBookInfo(document.location.href.split('/')[4])
  }
}
</script>

<style scoped>

</style>
