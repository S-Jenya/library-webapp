<template>
    <b-modal id="bv-modal-example" centered>
      <template #modal-title>
        {{ title }}
      </template>
      <div class="d-block p-lg-3" size="md">
        <p><label>Имя</label>
          <input id="name" type="text" class="form-control" v-model="login"/>
        </p>
        <p><label>Пароль</label>
          <input id="password" type="password" class="form-control" v-model.trim="password"/>
        </p>
        <div id="errorField" style="color: red"></div>
      </div>
      <template #modal-footer>
        <b-button type="button" @click="submitHandler">Войти</b-button>
        <b-button @click="$bvModal.hide('bv-modal-example')">Закрыть</b-button>
      </template>
    </b-modal>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
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
    },

    closeModal() {
      this.$emit('close')
    }
  }
}
</script>
