<template>
  <b-container class="mt-2 w-50 align-content-center">
    <h1>Новая книга</h1>
    <form enctype="multipart/form-data" @submit.prevent="uploadData">
      <div class="form-group">
        <div id="idBookError" style="color: red"></div>
        <p><label>Наименование</label>
          <input id="name" type="text" class="form-control" v-model="name"
                 pattern="[0-9|А-Я|а-я|A-Z|a-z|.|,|\s]+" required/>
        </p>
        <p><label>Описание</label>
          <input id="description" type="text" class="form-control" v-model="description"
                 pattern="[0-9|А-Я|а-я|A-Z|a-z|.|,|\s]+" required/>
        </p>
        <label>Жанр</label>
        <p>
          <select class="w-25" id="genre">
            <option v-for="genre in getGenres" :value="genre.idGenre">{{ genre.name }}</option>
          </select>
        </p>

        <label>Автор</label>
        <p>
          <select class="w-75" id="author">
            <option v-for="author in getAuthor" :value="author.idAuthor">
              {{ author.lastName }} {{ author.firstName }} {{ author.patronymic }}
            </option>
          </select>
        </p>

        <div class="border p-4 mb-3 rounded">
          <label>Обложка</label>
          <b-checkbox v-model="options" class="mt-2 mb-2"> Скачать обложку с интернета</b-checkbox>
          <div v-if="!options">
            <input id="cover" type="file" ref="uploadImage" class="form-control h-50" required/>
          </div>
        </div>
        <div class="border p-4 mb-3 rounded">
          <label>Файл</label>
          <input id="fileBook" type="file" ref="uploadContent" class="form-control h-50" required/>
        </div>
        <b-button type="submit">Добавить</b-button>

      </div>
    </form>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
import authHeader from "@/authHeader";

export default {
  name: "BookCreate",
  computed: mapGetters(['getGenres', 'getAuthor']),
  data: () => ({
    options: false,
    baseData: undefined,
    formImageData: undefined,
    formContentData: undefined,
    name: "",
    description: ""
  }),
  methods: {
    ...mapActions(['uploadBookInetImage', 'uploadBookUserImage', 'getGenreList', 'getAuthorList']),

    uploadData() {
      this.baseData = new FormData()
      this.baseData.append("name", this.name)
      this.baseData.append("description", this.description)
      this.baseData.append("genre", document.getElementById('genre').value)
      this.baseData.append("author", document.getElementById('author').value)

      if (!this.options) {
        let fileImage = this.$refs.uploadImage.files[0]
        if (fileImage.type !== "image/png" && fileImage.type !== "image/jpeg") {
          let erMes = document.getElementById('idBookError')
          erMes.innerText = "Недопустимый формат обложки. Используйте jpeg/png"
          this.baseData = undefined
          console.log(this.baseData)
          return
        }
        this.baseData.append("fileImage", fileImage)
      }

      let fileContent = this.$refs.uploadContent.files[0]
      console.log(fileContent)
      if (fileContent.type !== "application/pdf") {
        let erMes = document.getElementById('idBookError')
        erMes.innerText = "Недопустимый формат книги. Используйте pdf"
        this.baseData = undefined
        console.log(this.baseData)
        return
      }
      this.baseData.append("fileContent", fileContent)

      // this.baseData.forEach(i => console.log(i))
      if (this.options) {
        this.uploadBookInetImage(this.baseData);
      } else {
        this.uploadBookUserImage(this.baseData)
      }
    },
  },
  mounted() {
    this.getGenreList()
    this.getAuthorList()
  }
}
</script>

<style scoped>

</style>
