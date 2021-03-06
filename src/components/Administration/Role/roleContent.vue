<template>
  <div>
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
  computed: mapGetters(['getRole']),
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
    }
  },
  async mounted() {
    console.log("hello")
    await this.loadRole()
  }
}
</script>

<style scoped>

</style>
