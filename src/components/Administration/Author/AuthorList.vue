<template>
  <div class="center-block w-75 ml-auto mr-auto">
    <h1 class="top-name center-block text-center">Список авторов</h1>
    <b-button class="my-2 my-sm-0 bg-primary" @click="openAddAuthorModal()">Новый автор</b-button>
    <AuthorModal
        v-if="isModalOpen"
        :title="getAuthModal.titleAuthModal"
        :textFirstName="getAuthModal.inputFirstName"
        :textLastName="getAuthModal.inputLastName"
        :textPatronymic="getAuthModal.inputPatronymic"
        :idRole="getAuthModal.idAuth"
        :mode="getAuthModal.mode"
        @close="isModalOpen = false"
    />

    <BookByAuthor
        v-if="BookByAuthorModalOpen"
        @close="BookByAuthorModalOpen = false"
        :id-author="authorIdInfo"
        :name-author="authorNameInfo"
    />

    <table class="table mt-3 w-75 text-center ml-auto mr-auto">
      <thead>
      <tr>
        <th>Номер</th>
        <th>Автор</th>
        <th>Действие</th>
      </tr>
      </thead>
      <tr v-for="(author, index) in getAuthor" :key="getAuthor.idAuthor">
        <td>{{ index + 1 }}</td>
        <td><a
            @click="openBookByAuthorModal(author.idAuthor, author.lastName + ` ` + author.firstName + ` ` + author.patronymic)"
            style="color: blue; cursor: pointer;"
            title="Список книг с текущем жанром"
        >{{ author.lastName }} {{ author.firstName }} {{ author.patronymic }} </a></td>
        <td>
          <b-button class="my-2 my-sm-0 bg-primary mr-2"
                    @click="openEditAuthorModal(author.idAuthor, author.firstName, author.lastName, author.patronymic)">
            Редактировать
          </b-button>
          <b-button class="my-2 my-sm-0 bg-danger mr-2" @click="deleteAuthorFunc(author.idAuthor)">Удалить</b-button>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
import AuthorModal from "@/components/Administration/Author/AuthorModal";
import BookByAuthor from "@/components/Administration/Author/BookByAuthor";
import {mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  name: "AuthorList",
  components: {AuthorModal, BookByAuthor},
  computed: mapGetters(['getAuthModal', 'getAuthor']),
  data() {
    return {
      isModalOpen: true,
      BookByAuthorModalOpen: true,
      authorIdInfo: "",
      authorNameInfo: ""
    }
  },
  methods: {
    ...mapActions(['getAuthorList', 'deleteAuthor']),
    ...mapMutations(['setAuthModal']),
    openAddAuthorModal() {
      this.setAuthModal({
        title: "Новый автор",
        mode: "0"
      });
      this.$bvModal.show('authorModal');
    },
    openEditAuthorModal(id, txtFirst, txtLast, txtPat) {

      // console.log(" id: " + id)
      this.setAuthModal({
        title: "Редактировать данные автора",
        inputFirstName: txtFirst,
        inputLastName: txtLast,
        inputPatronymic: txtPat,
        idAuth: id.toString(),
        mode: "1"
      });
      this.$bvModal.show('authorModal');
    },
    deleteAuthorFunc(id) {
      this.deleteAuthor({id: id, vm: this})
    },
    openBookByAuthorModal(id, author) {
      this.authorIdInfo = id
      this.authorNameInfo = author
      this.$bvModal.show('idBookByAuthor')
    }
  },
  mounted() {
    this.getAuthorList()
  }
}
</script>

<style scoped>

</style>
