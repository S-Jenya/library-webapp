<template>
  <!-- Modal -->
  <div>

    <b-modal id="bv-modal-example" centered size="lg">
      <template #modal-title>
        {{title}}
      </template>
      <div class="d-block text-center">
        <input type="text">
      </div>
      <template #modal-footer>
        <b-button @click="$bvModal.hide('bv-modal-example')">Закрыть</b-button>
        <b-button>Применить</b-button>

      </template>
    </b-modal>

  </div>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>
