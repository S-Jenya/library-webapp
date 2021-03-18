<template>
  <div class="center-block w-75 ml-auto mr-auto">
    <h1><p class="top-name center-block text-center">Администрирование пользователями</p></h1>
    <table class="table">
      <thead>
      <tr>
        <th>Номер</th>
        <th>Имя</th>
        <th>Почта</th>
        <th>Пароль</th>
        <th>Роль</th>
      </tr>
      </thead>
      <tr v-for="(user, index) in getUsers" :key="getUsers.idUser">
        <td>{{ index + 1 }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.password }}</td>
        <td>{{ user.role.name }}</td>
        <td>
          <b-button class="my-2 my-sm-0 ml-3" @click="">Редактировать</b-button>
        </td>
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
