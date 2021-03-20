<template>
  <b-card
      :img-src="this.imgSrc"
      img-alt="Info"
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

export default {
  props: ['name', 'author', 'imgSrc']
}
</script>
