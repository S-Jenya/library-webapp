<template>
  <div class="center-block w-75 ml-lg-auto mr-lg-auto">
    <h1><p class="top-name center-block text-center">Администрирование жанрами</p></h1>
    <b-button style="margin-left: 5px" class="my-2 my-sm-0 bg-primary" @click="openNewGenreModal()">Новая роль
    </b-button>
    <GenreModal
        v-if="isGenreModalOpen"
        :title="getGenreModal.title"
        :text="getGenreModal.text"
        :idRole="getGenreModal.idGenre"
        :inputText="getGenreModal.inputText"
        :mode="getGenreModal.mode"
        @close="isGenreModalOpen = false"
        ref="genreModal"
        @hide="testF('success')"
    />
    <b-button variant="success" @click="testF('success')" class="mb-2">Success</b-button>
    <table class="table mt-3 w-50 text-center ml-auto mr-auto">
      <thead>
      <tr>
        <th>Номер</th>
        <th>Наименование</th>
        <th>Действие</th>
      </tr>
      </thead>
      <tr v-for="(genre, index) in getGenres" :key="getGenres.idGenre">
        <td>{{ index + 1 }}</td>
        <td>{{ genre.name }}</td>
        <td>
          <b-button class="my-2 my-sm-0 bg-primary mr-2" @click="openEditGenereModal(genre.idGenre, genre.name)">Редактировать</b-button>
          <b-button class="my-2 my-sm-0 bg-danger mr-2" @click="">Удалить</b-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import GenreModal from "@/components/Administration/Genre/GenreModal";
import toastFunc from "@/toastFunc";

export default {
  name: "GenreList",
  components: {GenreModal, toastFunc},
  computed: mapGetters(['getGenres', 'getRoleModal', "getGenreModal", 'getGenreStatus']),
  data() {
    return {
      isGenreModalOpen: true
    }
  },
  methods: {
    ...mapActions(['getGenreList']),
    ...mapMutations(['setGenreModal']),
    openNewGenreModal() {
      this.setGenreModal({
        title: "Новый жанр",
        text: "Наименование нового жанра",
        mode: "0"
      });
      this.$bvModal.show('genreModal');
    },
    openEditGenereModal(id, txt) {
      this.setGenreModal({
        title: "Редактировать наименование жанра",
        text: "Наименование жанра",
        inputText: txt,
        idGenre: id,
        mode: "1"
      });
      this.$bvModal.show('genreModal');
    },
    testF(variant, message) {
      this.$bvToast.toast(message, {
        title: `Внимание ${variant || 'default'}`,
        variant: variant,
        solid: true
      })
    }
  },
  mounted() {
    this.getGenreList()
  },
  watch: {
    isGenreModalOpen: function () {
      let serverResult =  this.getGenreStatus
      // console.log("In function")
      // console.log(serverResult)
      if (this.isGenreModalOpen === false) {
        if(serverResult.status === "200") {
          this.testF('success', 'Запись успешно добавлена. СТАТУС 200')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
