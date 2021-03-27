<template>
  <div class="center-block w-75 ml-auto mr-auto">
    <h1><p class="top-name center-block text-center">Список ролей</p></h1>
    <b-button class="my-2 my-sm-0 bg-primary mr-2" @click="openNewRoleModal()">Новая роль</b-button>
    <roleModal
        v-if="isRoleModalOpen"
        :title="getRoleModal.titleRoleModal"
        :text="getRoleModal.textRoleModal"
        :idRole="getRoleModal.idRole"
        :inputText="getRoleModal.inputText"
        :mode="getRoleModal.mode"
        @close="isRoleModalOpen = false"
    />
    <table class="table mt-3 w-50 text-center ml-auto mr-auto">
      <thead>
      <tr>
        <th>Номер</th>
        <th>Наименование</th>
        <th>Действие</th>
      </tr>
      </thead>
      <tr v-for="(role, index) in getRole" :key="role.idRole">
        <td>{{ index + 1 }}</td>
        <td>{{ role.name }}</td>
        <td>
          <b-button class="my-2 my-sm-0 bg-primary mr-2" @click="openEditRoleModal(role.idRole, role.name)">Редактировать</b-button>
          <b-button class="my-2 my-sm-0 bg-danger mr-2">Удалить</b-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import RoleModal from "@/components/Administration/Role/RoleModal";

export default {
  name: "roleContent",
  components: {RoleModal},
  computed: mapGetters(['getRole', 'getRoleModal']),
  data() {
    return {
      isRoleModalOpen: true
    }
  },
  methods: {
    ...mapActions(['loadRole']),
    ...mapMutations(['setRoleModal']),
    openEditRoleModal(idRole, roleName) {
      this.setRoleModal({
        title: "Редактировать наименование роли: ",
        text: "Введите новое наименование",
        inputText: roleName,
        idRole: idRole.toString(),
        mode: "1"
      });
      this.$bvModal.show('roleModal');
    },
    openNewRoleModal() {
      this.setRoleModal({
        title: "Новая Роль",
        text: "Введите наименование",
        mode: "0"
      });
      this.$bvModal.show('roleModal');
    }
  },
  mounted() {
    this.loadRole()
  }
}
</script>

<style scoped>

</style>
