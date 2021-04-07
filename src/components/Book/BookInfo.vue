<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col col-lg-4 col-md-5 col-sm-5 col-6 text-center">
        <img :src="getBookInfo.url" alt="Обложка" class="pr-1 w-100 h-100">
      </div>
      <div class="col col-lg-8 col-sm-10 col-auto">
        <h2>{{ getBookInfo.name }}</h2>
        <h5>{{ getBookInfo.author }}</h5>
        <p>
          Жанр: {{ getBookInfo.genre }}
        </p>
        <p>
          Описание: {{ getBookInfo.description }}
        </p>
        <small v-if="!isAuth" style="color: red">Для скачивания документа войдите в систему</small>
        <b-button v-if="isAuth" variant="success" class="mr-2" @click="downLoadBookFunc(getBookInfo.id)">Скачать
        </b-button>
        <b-button v-if="isAdmin" variant="info" class="mr-2" @click="editBookFunc(getBookInfo.id)">Редактировать
        </b-button>
        <b-button v-if="isAdmin" variant="danger" class="mr-2" @click="deleteBookFunc(getBookInfo.id)">Удалить
        </b-button>
      </div>
    </div>

    <h1>Комментарии</h1>
    <CommentItem v-for="comment in getBookInfo.comments" class="mb-3"
                 :id-book="getBookInfo.id"
                 :idComment="comment.idComment"
                 :id-user="comment.user.idUser"
                 :role="comment.user.role.name"
                 :name="comment.user.name"
                 :date="comment.date"
                 :text="comment.text"
    ></CommentItem>

    <div v-if="isAuth" class="row mt-1 mb-3">
      <div class="col col-lg-10 text-center">
        <b-input v-model="textMessage" class="mr-sm-2" placeholder="Новый комментарий..."></b-input>
      </div>
      <div class="col col-lg-2 text-center">
        <b-button
            variant="outline-primary"
            @click="addCommentFunc(getBookInfo.id)"
        >Отправить
        </b-button>
      </div>
    </div>

    <div v-if="!isAuth" class="text-center mb-3">
      <p style="color: red">Войдите в систему, чтобы оставить свой комментарий</p>
    </div>

  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CommentItem from "@/components/Book/CommentItem";

export default {
  name: "BookInfo",
  components: {CommentItem},
  data: () => ({
    textMessage: '',
    isDeleteBook: ''
  }),
  computed: mapGetters(['getBookInfo', 'isAuth', 'isAdmin']),
  methods: {
    ...mapActions(['loadBookInfo', "downloadBook", 'deleteBook', 'addComment']),
    downLoadBookFunc(idBook) {
      this.downloadBook({idBook: idBook, vm: this});
    },
    deleteBookFunc(idBook) {
      let message = 'Удаление книги влечёт удаление всех комментариев и истории скачиваний.\nПодтвердите действие!'
      this.$bvModal.msgBoxConfirm(message, {
        title: 'Удаление книги',
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
              this.deleteBook({id: idBook, vm: this})
            }
          })
          .catch(err => {
            console.log(err)
          })

    },
    addCommentFunc(idBook) {
      if (this.textMessage !== '') {
        this.addComment({
          idBook: idBook,
          text: this.textMessage,
          vm: this
        })
      }
    },
    editBookFunc(idBook) {

    }
  },
  mounted() {
    this.loadBookInfo(document.location.href.split('/')[4])
  }
}
</script>

<style scoped>
.button {
  padding: 5px;
}
</style>
