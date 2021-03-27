<template>
  <b-card
      :img-src="imgSrc"
      :img-alt="defaultImg"
      img-top
      style="max-width:15rem; height: 600px;"
      class="md-2"
  >
    <b-card-title>
      <h5>{{ name }}</h5>
    </b-card-title>

    <b-card-text>
      <slot name="body"/>
      {{ author }}
    </b-card-text>
    <template #footer>
      <b-button variant="primaty">Применить</b-button>
    </template>
  </b-card>
</template>

<script>
import {mapActions} from "vuex";
import logoImg from "@/assets/logo.png"

export default {
  props: ['name', 'author', 'imgSrc', 'id'],
  data() {
    return {
      defaultImg: require('@/assets/logo.png')
    }
  },
  methods: {
    ...mapActions(['downloadBook']),
    downloadBook(id) {
      console.log(id)
      this.downloadBook(id)
    }
  }
}
</script>
