<template>
    <b-card
        img-src="http://picsum.photos/300/400/?imagr=25"
        img-alt="Info"
        img-top
        style="max-width:15rem; height: 600px;"
        class="md-2"
    >
      <b-card-title>
        <small>
          <h5>{{name}}</h5>
        </small>
      </b-card-title>

      <b-card-text>
        <slot name="body"/>
      </b-card-text>
      <template #footer>
        <b-button variant="primaty">Применить</b-button>
      </template>
    </b-card>
</template>

<script>
export default {
  props: ['name']
}
</script>
