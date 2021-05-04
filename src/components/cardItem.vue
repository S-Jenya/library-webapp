<template>
  <router-link :to="this.URLtoBookInfo" >
    <b-card
        :img-src="imgSrc"
        img-alt="Картинка"
        img-top
        img-height="400"
        style="width: 15rem; height: 600px;"
        class="md-2 "
    >
      <b-card-title>
        <h5>{{ name }}</h5>
      </b-card-title>

      <b-card-text>
        <slot name="body"/>
        {{ author }}
      </b-card-text>
      <template #footer>
        <b-button variant="primaty">Открыть</b-button>
      </template>
    </b-card>
  </router-link>
</template>

<script>
import {mapActions} from "vuex";
import logoImg from "@/assets/logo.png"

export default {
  props: ['name', 'author', 'imgSrc', 'id'],
  data() {
    return {
      defaultImg: require('@/assets/logo.png'),
      URLtoBookInfo: "/BookInfo/" + this.id
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
