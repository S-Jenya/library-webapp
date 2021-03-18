<template>
  <div>

    <form @submit.prevent="getRequest()">
      <b-modal id="authorModal" centered size="md">
        <template #modal-title>
          {{ title }}
        </template>
        <div class="d-block text-center">
          <p>
            {{ textFirstName }} <input type="text" v-model="firstName"/>
          </p>
          <p>
            {{ textLastName }} <input type="text" v-model="lastName"/>
          </p>
          <p>
            {{ textPatronymic }} <input type="text" v-model="patronymic"/>
          </p>
        </div>
        <template #modal-footer>
          <b-button @click="$bvModal.hide('roleModal')">Закрыть</b-button>
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
      firstName: "",
      lastName: "",
      patronymic: ""
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
  computed: mapGetters(['getRoleModal']),
  methods: {
    ...mapActions(['addAuthor']),
    ...mapMutations(['addRole']),

    getRequest() {
      console.log("her")
      if (this.firstName !== "" && this.lastName !== "" && this.patronymic !== "") {
        this.addAuthor({
          firstName: this.firstName,
          lastName: this.lastName,
          patronymic: this.patronymic
        })
      }
    },
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
