<template>
  <b-modal id="idEditCommentModal" size="md" centered>
    <template #modal-title>
      Редактирование комментария
    </template>
    <div class="d-block text-center">
      <p>
        Текст: <input type="text" class="w-50" v-model="strVal"/>
      </p>
    </div>
    <template #modal-footer>
      <b-button @click="$bvModal.hide('idEditCommentModal')">Закрыть</b-button>
      <b-button type="button">Применить</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "EditCommentModal",
  props: ['idBook', 'idComment', 'text'],
  data() {
    return {
      strVal: this.text
    }
  },
  watch: {
    text: function (newVal) {
      this.strVal = newVal
    }
  }
}
</script>

<style scoped>

</style>
