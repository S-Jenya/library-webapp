<template>
  <b-container class="mt-2 w-50 align-content-center">
    <h1>Новая книга</h1>
    <form @submit.prevent="uploadData" enctype="multipart/form-data">
      <div class="form-group">
        <div id="idBookError" style="color: red"></div>
        <p><label>Наименование</label>
          <input id="name" type="text" class="form-control" v-model="name"/>
        </p>
        <p><label>Описание</label>
          <input id="description" type="text" class="form-control" v-model="description"/>
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
            <option v-for="author in getAuthor" :value="author.idAuthor">{{ author.firstName }} {{ author.lastName }}
              {{ author.patronymic }}
            </option>
          </select>
        </p>

        <!--        <p><label>Обложка</label>-->
        <!--          <input id="cover" type="file" ref="uploadImage" @change="onImageUpload()" class="form-control h-50" required/>-->
        <!--        </p>-->
                <p>
                  <label>Файл</label>
                  <input id="fileBook" type="file" ref="uploadContent" @change="onContentUpload()" class="form-control h-50"
                         required/>
                <p>
        <b-button type="submit">Добавить</b-button>
        </p>
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
    baseData: undefined,
    formImageData: undefined,
    formContentData: undefined,
    name: "",
    description: ""
  }),
  methods: {
    ...mapActions(['uploadBook', 'getGenreList', 'getAuthorList']),

    onImageUpload() {
      let file = this.$refs.uploadImage.files[0]
      this.formImageData = new FormData()
      this.formImageData.append("fileImage", file)
      console.log(file.type)
      if (file.type !== "image/png") {
        console.log("Недопустимый формат файла")
        this.formImageData = undefined
      }
    },
    onContentUpload() {
      let file = this.$refs.uploadContent.files[0]
      this.formContentData = new FormData()
      this.formContentData.append("fileContent", file)
      console.log(file.type)
      if (file.type !== "application/pdf") {
        console.log("Недопустимый формат файла")
        this.formContentData = undefined
      }
    },

    uploadData() {
      // if(this.formImageData.data.type)
      // let file1 = this.$refs.uploadImage.files[0]
      let file2 = this.$refs.uploadContent.files[0]
      this.baseData = new FormData();
      this.baseData.append("name", this.name)
      this.baseData.append("description", this.description)
      this.baseData.append("genre", document.getElementById('genre').value)
      this.baseData.append("author", document.getElementById('author').value)
      //this.baseData.append("fileImage", file1)

      // начало загрузки
      // let resp = axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.name + ":keyes&key=AIzaSyDLaeHSZsg9jUMoISejLAhSyaFJUZ7F8D0")
      //     .then(response => {
      //       console.log("Поиск прошёл успешно. Получены данные:")
      //       console.log(response.data.items[0].volumeInfo.imageLinks)
      //       console.log(response.data.items[0].volumeInfo.imageLinks.smallThumbnail)
      //
      //       /*let url = response.data.items[0].volumeInfo.imageLinks.smallThumbnail
      //       axios.get(url, {
      //         headers: {"Access-Control-Allow-Origin": "http://localhost:4000"}
      //       })
      //           .then(getResponse => {
      //             console.log("GET response")
      //             console.log(getResponse)
      //           })*/
      //       // this.baseData.append("fileContent", response)
      //     })
      //     .catch(error => {
      //       console.log("Произошла ошибка:")
      //       console.log(error)
      //     })

      // конец
        this.baseData.append("fileContent", file2)

      console.log(this.baseData)
      this.baseData.forEach(i => {
        console.log(i)
      })
      this.uploadBook(this.baseData);
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
