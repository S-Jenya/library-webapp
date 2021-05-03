<template>
  <div class="center-block w-75 ml-auto mr-auto">
    <h1 class="top-name center-block text-center">Жанры</h1>
    <b-button style="margin-left: 5px" class="my-2 my-sm-0 bg-primary" @click="openNewGenreModal()">Новый жанр
    </b-button>
    <GenreModal
        v-if="isGenreModalOpen"
        :title="getGenreModal.title"
        :text="getGenreModal.text"
        :idRole="getGenreModal.idGenre"
        :inputText="getGenreModal.inputText"
        :mode="getGenreModal.mode"
        @close="isGenreModalOpen = false"
    />

    <BookByGenre
        v-if="BookByGenreModalOpen"
        @close="BookByGenreModalOpen = false"
        :id-genre="genreIdInfo"
        :name-genre="genreNameInfo"
    />

    <table class="table mt-3 w-75 text-center ml-auto mr-auto">
      <thead>
      <tr>
        <th>Номер</th>
        <th>Наименование</th>
        <th>Действие</th>
      </tr>
      </thead>
      <tr v-for="(genre, index) in getGenres" :key="getGenres.idGenre">
        <td>{{ index + 1 }}</td>
        <td class="text-center"><a
            @click="openBookByGenreModal(genre.idGenre, genre.name)"
            style="color: blue; cursor: pointer;"
            title="Список книг с текущем жанром"
        > {{ genre.name }} </a></td>

        <td>
          <b-button class="my-2 my-sm-0 bg-primary mr-2" @click="openEditGenreModal(genre.idGenre, genre.name)">
            Редактировать
          </b-button>
          <b-button class="my-2 my-sm-0 bg-danger mr-2" @click="deleteGenreFunc(genre.idGenre)">Удалить</b-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import GenreModal from "@/components/Administration/Genre/GenreModal";
import toastFunc from "@/toastFunc";
import BookByGenre from "@/components/Administration/Genre/BookByGenre";

export default {
  name: "GenreList",
  components: {GenreModal, toastFunc, BookByGenre},
  computed: mapGetters(['getGenres', 'getRoleModal', "getGenreModal"]),
  data() {
    return {
      isGenreModalOpen: true,
      BookByGenreModalOpen: true,
      genreIdInfo: "",
      genreNameInfo: ""
    }
  },
  methods: {
    ...mapActions(['getGenreList', 'deleteGenre']),
    ...mapMutations(['setGenreModal']),
    openBookByGenreModal(id, txt) {
      this.genreIdInfo = id
      this.genreNameInfo = txt
      this.$bvModal.show('idBookByGenre')
    },
    openNewGenreModal() {
      // this.isGenreModalOpen = true
      this.setGenreModal({
        title: "Новый жанр",
        text: "Наименование нового жанра",
        mode: "0"
      });
      this.$bvModal.show('idGenreModal');
    },
    openEditGenreModal(id, txt) {
      // this.isGenreModalOpen = true
      this.setGenreModal({
        title: "Редактировать наименование жанра",
        text: "Наименование жанра",
        inputText: txt,
        idGenre: id,
        mode: "1"
      });
      this.$bvModal.show('idGenreModal');
    },
    deleteGenreFunc(id) {
      this.deleteGenre({id: id, vm: this})
    }
  },
  mounted() {
    this.getGenreList()
  }
}
</script>

<style scoped>

</style>
