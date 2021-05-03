<template>
  <div class="center-block w-75 ml-auto mr-auto">
    <h1 class="top-name center-block text-center">Пользователи</h1>
    <table class="table mt-3 w-75 text-center ml-auto mr-auto">
      <thead>
      <tr>
        <th>Номер</th>
        <th>Имя</th>
        <th>Почта</th>
        <th>Роль</th>
      </tr>
      </thead>
      <tr v-for="(user, index) in getUsers" :key="getUsers.idUser">
        <td>{{ index + 1 }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role.name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UserList",
  computed: mapGetters(['getUsers']),
  methods: {
    ...mapActions(['loadUsers'])
  },
  mounted() {
    this.loadUsers()
  }
}
</script>
