<template>
  <div>

    <form @submit.prevent="getRequest()">
      <b-modal id="authorModal" centered size="md">
        <template #modal-title>
          {{ title }}
        </template>
        <div class="d-block text-center container">
          <div class="row-12">
            <div class="col-4 text-left pr-sm-0">
              <label> Фамилия: </label>
            </div>
            <div class="col-12">
              <input type="text" class="w-100" v-model="lastName" pattern="[А-Я|а-я|A-Z|a-z|\s]+"/>
            </div>
          </div>
          <div class="row-12">
            <div class="col-4 text-left pr-sm-0">
              <label> Имя: </label>
            </div>
            <div class="col-12">
              <input type="text" class="w-100 pull-right" v-model="firstName" pattern="[А-Я|а-я|A-Z|a-z|\s]+"/>
            </div>
          </div>
          <div class="row-12">
            <div class="col-4 text-left pr-sm-0">
              <label> Отчество: </label>
            </div>
            <div class="col-12">
              <input type="text" class="w-100" v-model="patronymic" pattern="[А-Я|а-я|A-Z|a-z|\s]+"/>
            </div>
          </div>
          <div id="idAuthorError" style="color: red"></div>
        </div>
        <template #modal-footer>
          <b-button @click="$bvModal.hide('authorModal')">Закрыть</b-button>
          <b-button type="submit" @click="getRequest()">Применить</b-button>
        </template>
      </b-modal>
    </form>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "AuthorModal",
  data() {
    return {
      firstName: this.textFirstName,
      lastName: this.textLastName,
      patronymic: this.textPatronymic
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    textFirstName: {
      type: String,
      default: ''
    },
    textLastName: {
      type: String,
      default: ''
    },
    textPatronymic: {
      type: String,
      default: ''
    },
    inputText: {
      type: String,
      default: ''
    },
    idRole: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: ''
    }
  },
  computed: mapGetters(['getAuthModal']),
  methods: {
    ...mapActions(['addAuthor', 'editAuthor']),
    ...mapMutations(['addRole']),

    getRequest() {
      if (this.firstName !== "" && this.lastName !== "" && this.patronymic !== "") {
        if (this.getAuthModal.mode === "0") {
          this.addAuthor({
            firstName: this.firstName,
            lastName: this.lastName,
            patronymic: this.patronymic,
            vm: this
          })
        } else  if (this.getAuthModal.mode === "1") {
          console.log(this.getAuthModal.idAuth)
          this.editAuthor({
            id: this.getAuthModal.idAuth,
            firstName: this.firstName,
            lastName: this.lastName,
            patronymic: this.patronymic,
            vm: this
          })
        }
      }
    },
    closeModal() {
      this.$emit('close')
    }
  },
  mounted() {
    this.firstName = this.getAuthModal.textFirstName
    this.lastName = this.getAuthModal.textLastName
    this.patronymic = this.getAuthModal.textPatronymic
  },
  watch: {
    textFirstName: function (newVal) {
      this.firstName = newVal
    },
    textLastName: function (newVal) {
      this.lastName = newVal
    },
    textPatronymic: function (newVal) {
      this.patronymic = newVal
    }
  }
}
</script>

<style scoped>

</style>
