<template>
  <div>
    <b-modal id="idBookByAuthor" centered size="lg">
      <template #modal-title>
        "{{ nameAuthor }}". Список литературы
      </template>
      <div v-if="isEmpty" class="d-block text-center">
        <table class="table mL-3 mr-3">
          <thead>
          <tr>
            <th>Книга</th>
            <th>Жанр</th>
          </tr>
          </thead>
          <tr v-for="book in dataBook" :key="dataBook.idBook">
            <td>
              <p @click="redirectFunc(book.idBook)"
                 style="color: blue"
                 onmouseover="this.style.textDecoration ='underline'; this.style.cursor = 'pointer';"
                 title="Перейти к данной книге"> {{ book.name }} </p>
            </td>
            <td>{{ book.genre.name }}</td>
          </tr>
        </table>
      </div>
      <div v-if="!isEmpty" class="text-center h-8000 mt-lg-2 mb-lg-3 mr-lg-auto ml-lg-auto mt-md-3
       ml-sm-2 mr-sm-2 ml-md-1 mt-sm-3">
        <h1 class="text-center">Результат поиска</h1>
        Ниего не найдено
      </div>

      <template #modal-footer>
        <b-button @click="$bvModal.hide('BookByAuthor')">Закрыть</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {AXIOS} from "@/httpCommons";
import authHeader from "@/authHeader";

export default {
  name: "BookByAuthor",
  props: ['idAuthor', 'nameAuthor'],
  data() {
    return {
      isEmpty: false,
      dataBook: []
    }
  },
  methods: {
    redirectFunc(idBook) {
      this.$router.push('/bookInfo/' + idBook)
    }
  },
  watch: {
    async idAuthor() {
      this.dataBook = []
      this.isEmpty = false
      let response = await AXIOS.get('/admin/getBookByAuthor/' + this.idAuthor,
          {
            headers: authHeader()
          })
          .catch(error => {
            console.log(error.response.data);
          })
          .then(result => {
            if (result.data.length !== 0) {
              this.isEmpty = true
              result.data.forEach(element => this.dataBook.push(element));
            }
          });
    }
  }
}
</script>

<style scoped>

</style>
