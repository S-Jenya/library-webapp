<template>
  <b-container style="margin-top: 30px; width: 50%" align-v="center">
    <form @submit.prevent="submitHandler">
      <div class="form-group">
        <p><label>Логин</label>
          <input id="name" type="text" class="form-control" v-model="login"/>
        </p>
        <p><label>Пароль</label>
          <input id="password" type="password" class="form-control" v-model.trim="password"/>
          <b-button type="submit">Войти</b-button>
        </p>
      </div>
    </form>
  </b-container>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "authComponent",
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['loginSubmitHandler']),

    submitHandler() {
      if (this.login !== "" && this.password !== "") {
        this.loginSubmitHandler({
          login: this.login,
          password: this.password
        })
      }
    }
  }

}
</script>

<style scoped>

</style>
