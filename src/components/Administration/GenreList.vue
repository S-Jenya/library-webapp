<template>
  <div class="center-block w-75 ml-auto mr-auto">
    <h1><p class="top-name center-block text-center">Администрирование жанрами</p></h1>
    <b-button style="margin-left: 5px" class="my-2 my-sm-0" @click="openNewRoleModal()">Новая роль</b-button>
    <roleModal
        v-if="isRoleModalOpen"
        :title="getRoleModal.titleRoleModal"
        :text="getRoleModal.textRoleModal"
        :idRole="getRoleModal.idRole"
        :inputText="getRoleModal.inputText"
        :mode="getRoleModal.mode"
        @close="isRoleModalOpen = false"
    />
    <table class="table">
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
          <b-button class="my-2 my-sm-0 ml-3" @click="">Редактировать</b-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import RoleModal from "@/components/Administration/Role/RoleModal";

export default {
  name: "GenreList",
  components: {RoleModal},
  computed: mapGetters(['getGenres', 'getRoleModal']),
  data() {
    return {
      isRoleModalOpen: true
    }
  },
  methods: {
    ...mapActions(['getGenreList']),
    ...mapMutations(['setRoleModal']),
    openNewRoleModal() {
      this.setRoleModal({
        title: "Новый жанр",
        text: "Введите наименование",
        mode: "2"
      });
      this.$bvModal.show('roleModal');
    }
  },
  mounted() {
    this.getGenreList()
  }
}
</script>

<style scoped>

</style>
