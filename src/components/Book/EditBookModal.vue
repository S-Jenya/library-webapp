<template>
  <b-modal id="idEditBookModal" size="lg" centered>
    <template #modal-title>
      Редактирование книги
    </template>
    <div class="d-block">
      <div class="form-group p-3">
        <div id="idBookError" style="color: red"></div>
        <p><label>Наименование</label>
          <input id="name" type="text" class="form-control" v-model="strNameVal" required/>
        </p>
        <p><label>Описание</label>
          <input id="description" type="text" class="form-control" v-model="strDescription"
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
              <input id="cover" type="file" ref="updImage" @change="clearBookImageError" class="form-control h-50"
                     required/>
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
            <input id="fileBook" type="file" ref="updContent" class="form-control h-50" required/>
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
  props: ['idBook', 'nameBook', 'description', 'author', 'genre'],
  computed: mapGetters(['getGenres', 'getAuthor']),
  data() {
    return {
      updImg: false,
      updContent: false,
      options: false,
      strNameVal: this.nameBook,
      strDescription: this.description
    }
  },
  methods: {
    ...mapActions(['getGenreList', 'getAuthorList', 'updBookData', 'filterCard']),
    updBookDataFunc() {
      this.baseData = new FormData()
      this.baseData.append("idBook", this.idBook)
      this.baseData.append("name", this.strNameVal)
      this.baseData.append("description", this.strDescription)
      this.baseData.append("genre", document.getElementById('genre').value)
      this.baseData.append("author", document.getElementById('author').value)
      console.log(this.baseData)
      if (this.updImg) {
        if (!this.options) { // загружать файл самому
          let fileImage = this.$refs.updImage.files[0]
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
          this.baseData.append("fileImage", fileImage)
        } else {
          this.baseData.append("imgFromEthernet", "true")
        }
      } else {
        this.baseData.append("fileImage", "NO_DATA")
      }

      if (this.updContent) {
        let fileContent = this.$refs.updContent.files[0]
        if (fileContent === undefined) { // файл не загружен
          let erMes = document.getElementById('idBookContentError')
          erMes.innerText = "Выберите файл!"
          this.baseData = undefined
          return;
        }
        if (fileContent.type !== "application/pdf") { // неверный формат файла
          let erMes = document.getElementById('idBookError')
          erMes.innerText = "Недопустимый формат книги. Используйте pdf"
          this.baseData = undefined
          return
        }
        this.baseData.append("fileContent", fileContent)
      } else {
        this.baseData.append("fileContent", "NO_DATA")
      }

      this.updBookData({
        baseData: this.baseData,
        idBook: this.idBook,
        vm: this
      })
    },
    clearBookImageError() {
      document.getElementById('idBookImageError').innerText = ""
    }
  },
  mounted() {
    this.filterCard({
      mode: "all",
      strSearch: "empty"
    })
    this.getAuthorList()
    this.getGenreList()
  },
  watch: {
    nameBook: function (newVal) {
      this.strNameVal = newVal
    },
    description: function (newVal) {
      this.strDescription = newVal
    }
  }
}
</script>

<style scoped>

</style>
