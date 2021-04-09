<template>
  <b-modal id="idEditBookModal" size="lg" centered>
    <template #modal-title>
      Редактирование книги
    </template>
    <div class="d-block">
      <div class="form-group p-3">
        <div id="idBookError" style="color: red"></div>
        <p><label>Наименование</label>
          <input id="name" type="text" class="form-control" v-model="strNameVal" pattern="[а-яА-Я\s]+" required/>
        </p>
        <p><label>Описание</label>
          <input id="description" type="text" class="form-control" v-model="strDescription" pattern="[а-яА-Я\s]+"
                 required/>
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

        <p>
          <b-checkbox v-model="updImg"> Обновить обложку</b-checkbox>
        </p>
        <div v-if="updImg">
          <div class="border p-4 mb-3 rounded">
            <label>Обложка</label>
            <div id="idBookImageError" style="color: red"></div>
            <b-checkbox v-model="options" class="mt-2 mb-2"> Скачать обложку с интернета</b-checkbox>
            <div v-if="!options">
              <input id="cover" type="file" ref="uploadImage" class="form-control h-50" required/>
            </div>
          </div>
        </div>

        <p>
          <b-checkbox v-model="updContent"> Обновить файл</b-checkbox>
        </p>
        <div v-if="updContent">
          <div class="border p-4 mb-3 rounded">
            <label>Файл</label>
            <div id="idBookContentError" style="color: red"></div>
            <input id="fileBook" type="file" ref="uploadContent" class="form-control h-50" required/>
          </div>
        </div>
      </div>

    </div>
    <template #modal-footer>
      <b-button @click="$bvModal.hide('idEditCommentModal')">Закрыть</b-button>
      <b-button type="button" @click="updBookDataFunc()">Применить</b-button>
    </template>
  </b-modal>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "EditBookModal",
  props: ['idBook', 'nameBook', 'Description', 'Author', 'Genre'],
  computed: mapGetters(['getGenres', 'getAuthor']),
  data() {
    return {
      updImg: false,
      updContent: false,
      options: false,
      strNameVal: this.nameBook,
      strDescription: this.Description
    }
  },
  methods: {
    ...mapActions(['getGenreList', 'getAuthorList', 'updBookData']),
    updBookDataFunc() {
      this.baseData = new FormData()
      this.baseData.append("name", String(this.nameBook))
      this.baseData.append("description", this.strDescription)
      this.baseData.append("genre", document.getElementById('genre').value)
      this.baseData.append("author", document.getElementById('author').value)
      console.log(this.baseData)
      if (this.updImg) {
        if (!this.options) { // загружать файл самому
          let fileImage = this.$refs.uploadImage.files[0]
          if (fileImage === undefined) { // файл не загружен
            let erMes = document.getElementById('idBookImageError')
            erMes.innerText = "Выберите файл!"
            this.baseData = undefined
            return;
          }
          if (fileImage.type !== "image/png" && fileImage.type !== "image/jpeg") { // загружен неверный формат файла
            let erMes = document.getElementById('idBookError')
            erMes.innerText = "Недопустимый формат обложки. Используйте jpeg/png"
            this.baseData = undefined
            return
          }
          fileImage = "GoogleAPI"
          this.baseData.append("fileImage", fileImage)
        } else {
          let fileImage = "No"
          this.baseData.append("fileImage", fileImage)
        }
      }

        if (this.updContent) {
          let fileContent = this.$refs.uploadContent.files[0]
          if (fileContent === undefined) { // файл не загружен
            let erMes = document.getElementById('idBookContentError')
            erMes.innerText = "Выберите файл!"
            this.baseData = undefined
            return;
          }
          if (fileContent.type !== "application/pdf") {
            let erMes = document.getElementById('idBookError')
            erMes.innerText = "Недопустимый формат книги. Используйте pdf"
            this.baseData = undefined
            return
          }
          this.baseData.append("fileContent", fileContent)
        } else {
          let fileContent = "No"
          this.baseData.append("fileContent", fileContent)
        }

       console.log(this.baseData)
        this.updBookData({data: this.baseData})
      }
    },
    mounted() {
      this.getGenreList()
      this.getAuthorList()
    },
    watch: {
      nameBook: function (newVal) {
        this.strNameVal = newVal
      },
      Description: function (newVal) {
        this.strDescription = newVal
      }
    }
  }
</script>

<style scoped>

</style>
