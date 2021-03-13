<template>
  <div class=" center-block" style="width: 80%; margin-left: 10%; margin-right: 10%">
    <h1><p class="top-name center-block text-center">Список ролей</p></h1>
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
      <tr v-for="(role, index) in getRole" :key="role.idRole">
        <td>{{ index + 1 }}</td>
        <td>{{ role.name }}</td>
        <td>
          <b-button class="my-2 my-sm-0" @click="openEditRoleModal(role.idRole, role.name)">Редактировать</b-button>
          <b-button class="my-2 my-sm-0">Удалить</b-button>
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
