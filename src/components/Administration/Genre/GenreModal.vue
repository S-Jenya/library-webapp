<template>
  <div>
    <form @submit.prevent="getRequest()">
      <b-modal id="idGenreModal" centered size="md">
        <template #modal-title>
          {{ title }}
        </template>
        <div class="d-block text-center container">
          <div class="row-12 mt-2">
            <div class="col-12 text-left pr-sm-0">
              <label>{{ text }} </label>
            </div>
            <div class="col-12">
              <input type="text" class="w-100" v-model="strVal" pattern="[А-Я|а-я|A-Z|a-z|\s]+"/>
            </div>
          </div>
          <div id="idGenreError" style="color: red"></div>
        </div>
        <template #modal-footer>
          <b-button @click="$bvModal.hide('idGenreModal')">Закрыть</b-button>
          <b-button type="submit" @click="getRequest()">Применить</b-button>
        </template>
      </b-modal>
    </form>
  </div>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";

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
  computed: mapGetters(['getGenreModal']),
  methods: {
    ...mapActions(['addGenre', 'updGenre']),
    ...mapMutations(['addRole', 'changeInput']),

    getRequest() {
      if (this.strVal !== "") {
        if (this.getGenreModal.mode === "0") {
          this.addGenre({
            name: this.strVal,
            vm: this
          })
        } else if (this.getGenreModal.mode === "1") {
          this.updGenre({
            id: this.getGenreModal.idGenre,
            name: this.strVal,
            vm: this
          })
        }
      }
    },
    closeGenreModal() {
      this.$emit('close')
    }
  },
  mounted() {
    this.strVal = this.getGenreModal.inputText
  },
  watch: {
    inputText: function (newVal) {
      this.strVal = newVal
    }
  }
}

</script>


<style scoped>

</style>
