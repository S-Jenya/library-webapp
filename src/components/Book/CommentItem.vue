<template>
  <b-card class="md-2">
    <b-card-sub-title class="mb-2">
      <b-container class="ml-0 pl-0 ">
        <div class="row">
          <div class="col">
            {{name}}
            <span v-if="this.role === 'ADMIN'" aria-hidden="true" class="pull-right">&#9989;</span>
            <br>
            {{date}}
          </div>
          <div v-if="isAdmin || (idUser === getAuthIdUser)" class="col-md-0 col-lg-0">
            <span aria-hidden="true" class="pull-right">&#9998;</span>
            <span aria-hidden="true" class="pull-right" @click="delCommentFunc(idBook, idComment)" style="cursor: pointer;">&#10006;</span>
          </div>
        </div>
      </b-container>
    </b-card-sub-title>

    <b-card-text>
      {{ text }}
    </b-card-text>
  </b-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: ['idBook', 'idComment', 'idUser', 'role', 'name', 'text', 'date'],
  name: "CommentItem",
  computed: mapGetters(['isAuth', 'isAdmin', 'getAuthIdUser']),
  methods: {
    ...mapActions(['deleteComment']),
    delCommentFunc(idBook, idComment) {
      let message = 'Удалить комментарий?\nПодтвердите действие!'
      this.$bvModal.msgBoxConfirm(message, {
        title: 'Удаление комментария',
        size: 'lg',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Удалить',
        cancelTitle: 'Отменить',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
          .then(value => {
            if (value) {
              this.deleteComment({
                idBook: idBook,
                idComment: idComment,
                vm: this})
            }
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
</script>

<style scoped>

</style>
