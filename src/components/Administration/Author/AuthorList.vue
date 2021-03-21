<template>
  <div class="center-block w-75 ml-auto mr-auto">
    <h1><p class="top-name center-block text-center">Список авторов</p></h1>
    <b-button class="my-2 my-sm-0 bg-primary" @click="openAuthorModal()">Новая роль</b-button>
    <AuthorModal
        v-if="isModalOpen"
        :title="getAuthModal.titleAuthModal"
        :textFirstName="getAuthModal.textFirstName"
        :textLastName="getAuthModal.textLastName"
        :textPatronymic="getAuthModal.textPatronymic"
        :idRole="getAuthModal.idAuth"
        :mode="getAuthModal.mode"
        @close="isModalOpen = false"
    />

  <table class="table mt-3 w-50 text-center ml-auto mr-auto">
    <thead>
    <tr>
      <th>Номер</th>
      <th>Автор</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tr v-for="(author, index) in getAuthor" :key="getAuthor.idAuthor">
      <td>{{ index + 1 }}</td>
      <td>{{author.lastName}} {{ author.firstName }} {{author.patronymic}}</td>
      <td>
<!--        <b-button class="my-2 my-sm-0" @click="openEditAuthorModal(role.idRole, role.name)">Редактировать</b-button>-->
        <b-button class="my-2 my-sm-0 bg-primary mr-2">Редактировать</b-button>
        <b-button class="my-2 my-sm-0 bg-danger mr-2">Удалить</b-button>
      </td>
    </tr>
  </table>

  </div>
</template>

<script>
import AuthorModal from "@/components/Administration/Author/AuthorModal";
import {mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  name: "AuthorList",
  components: {AuthorModal},
  computed: mapGetters(['getAuthModal', 'getAuthor']),
  data() {
    return {
      isModalOpen: true
    }
  },
  methods: {
    ...mapActions(['getAuthorList']),
    ...mapMutations(['setAuthModal']),
    openAuthorModal() {
      this.setAuthModal({
        title: "Новый автор",
        textFirstName: "Имя",
        textLastName: "Фамилия",
        textPatronymic: "Отчества",
        mode: "0"
      });
      this.$bvModal.show('authorModal');
    }
  },
  mounted() {
    this.getAuthorList()
  }
}
</script>

<style scoped>

</style>
