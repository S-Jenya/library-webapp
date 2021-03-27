<template>
  <div class="center-block w-75 ml-auto mr-auto">
    <h1><p class="top-name center-block text-center">Администрирование пользователями</p></h1>
    <table class="table mt-3 w-50 text-center ml-auto mr-auto">
      <thead>
      <tr>
        <th>Номер</th>
        <th>Имя</th>
        <th>Почта</th>
        <th>Роль</th>
        <th>Действие</th>
      </tr>
      </thead>
      <tr v-for="(user, index) in getUsers" :key="getUsers.idUser">
        <td>{{ index + 1 }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role.name }}</td>
        <td>
          <b-button class="my-2 my-sm-0 bg-primary mr-2" @click="">Редактировать</b-button>
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
