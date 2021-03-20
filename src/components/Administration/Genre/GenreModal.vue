<template>
  <div>
    <form @submit.prevent="getRequest()">
      <b-modal id="genreModal" centered size="md">
        <template #modal-title>
          {{ title }}
        </template>
        <div class="d-block text-center">
          <p>
            {{ text }} <input type="text" class="w-50" v-model="strVal"/>
          </p>
          <div id="idGenreError" style="color: red"></div>
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
import toastFunc from "@/toastFunc";

export default {
  name: "GenreModal",
  data() {
    return {
      strVal: this.inputText
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    inputText: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    idGenre: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: ''
    }
  },
  computed: mapGetters(['getGenreModal', 'getGenreStatus']),
  methods: {
    ...mapActions(['addGenre', 'updGenre']),
    ...mapMutations(['addRole', 'changeInput']),

    getRequest() {
      if (this.strVal !== "") {
        if(this.getGenreModal.mode === "0") {
          this.addGenre({name: this.strVal})
        } else if (this.getGenreModal.mode === "1") {
          this.updGenre({
            id: this.getGenreModal.idGenre,
            name: this.strVal
          })
        }
        // this.closeModal()
      }
      // обработка результата
      /*let ss = this.getGenreStatus
      console.log("status: "+ ss)
      for (var item in ss) {
        console.log(item)
      }
      */
      // this.closeModal()
    },
    closeModal() {
      this.$emit('close')
    }
  },
  mounted() {
    console.log(this.getGenreModal.inputText)
    this.strVal = this.getGenreModal.inputText
  },
  watch: {
    inputText: function(newVal) {

      this.strVal = newVal
    }
  }
}

</script>


<style scoped>

</style>
