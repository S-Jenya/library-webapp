<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col col-lg-4 col-md-5 col-sm-5 col-6 text-center">
        <img :src="getBookInfo.url" alt="Обложка" class="pr-1 w-100 h-100">
      </div>
      <div class="col col-lg-8 col-sm-10 col-auto">
        <h2>{{ getBookInfo.name }}</h2>
        <h5>{{ getBookInfo.author }}</h5>
        <p>
          Жанр: {{ getBookInfo.genre }}
        </p>
        <p>
          Описание: {{ getBookInfo.description }}
        </p>
        <b-button v-if="isAuth" variant="success" @click="downLoadBookFunc(getBookInfo.id)">Скачать</b-button>
        <small v-if="!isAuth" style="color: red">Для скачивания документа войдите в систему</small>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "BookInfo",
  computed: mapGetters(['getBookInfo', 'isAuth']),
  methods: {
    ...mapActions(['loadBookInfo', "downloadBook"]),
    downLoadBookFunc(idBook) {
      this.downloadBook({idBook: idBook, vm: this});
    }
  },
  mounted() {
    this.loadBookInfo(document.location.href.split('/')[4])
  }
}
</script>

<style scoped>

</style>
