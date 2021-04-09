<template>
  <b-card class="md-2">
    <b-card-sub-title class="mb-2">
      <b-container class="ml-0 pl-0 ">
        <div class="row">
          <div class="col">
            {{ name }}
            <span v-if="this.role === 'ADMIN'" aria-hidden="true" class="pull-right">&#9989;</span>
            <br>
            {{ date }}
          </div>
          <div v-if="isAdmin || (idUser === getAuthIdUser)" class="col-md-0 col-lg-0">
            <span aria-hidden="true" class="pull-right"
                  style="cursor: pointer;"
                  @click="showEditInput = !showEditInput">&#9998;</span>
            <span aria-hidden="true" class="pull-right"
                  style="cursor: pointer;"
                  @click="delCommentFunc(idBook, idComment)">
              &#10006;</span>
          </div>
        </div>
      </b-container>
    </b-card-sub-title>

    <b-card-text>
      <div v-if="!showEditInput">
        {{ text }} <br>
      </div>
      <div v-if="showEditInput">
        <input type="text" class="w-50 mr-3" v-model="strVal"/>
        <b-button type="button" class="bg-primary mr-2" @click="editCommentFunc()">Применить</b-button>
        <b-button  variant="outline-primary" class="mr-2" @click="showEditInput = !showEditInput">Отменить</b-button>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import EditCommentModal from "@/components/Book/EditCommentModal";

export default {
  props: ['ctxMain', 'idBook', 'idComment', 'idUser', 'role', 'name', 'text', 'date'],
  name: "CommentItem",
  components: {EditCommentModal},
  data() {
    return {
      isModalEditCommentOpen: true,
      showEditInput: false,
      strVal: this.text
    }
  },
  computed: mapGetters(['isAuth', 'isAdmin', 'getAuthIdUser', 'getCtxModalCom']),
  methods: {
    ...mapActions(['deleteComment', 'editComment']),
    ...mapMutations(['setValUpdate']),
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
                vm: this
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    editCommentFunc() {
      this.editComment({
        idBook: this.idBook,
        idComment: this.idComment,
        text: this.strVal,
        vm: this,
        mode: this.showEditInput
      });
      this.showEditInput = false
    },
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
