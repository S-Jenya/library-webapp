<template>
  <b-container style="margin-top: 30px; width: 50%" align-v="center">
    <h1>Регистрация</h1>
    <form @submit.prevent="submitHandler">
      <div class="form-group">

        <p><label>Имя</label>
          <input id="name" type="text" class="form-control"
                 v-model="name"
                 :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.alpha)}"
          />
          <small v-if="$v.name.$dirty && !$v.name.required" style="color: red">Поле не может быть пустым</small>
          <small v-else-if="$v.name.$dirty && !$v.name.alpha" style="color: red">Имя может содержать только символы алфавита</small>
        </p>

        <p><label>Email</label>
          <input id="email" type="text" class="form-control"
                 v-model.trim="email"
                 :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.required)}"
          />
          <small v-if="$v.email.$dirty && !$v.email.required" style="color: red">Поле email не может быть пустым</small>
          <small v-else-if="$v.email.$dirty && !$v.email.email" style="color: red">Введите корректный Email</small>
        </p>

        <p><label>Пароль</label>
          <input id="password" type="password" class="form-control"
                 v-model.trim="password"
                 :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          />
          <small v-if="$v.password.$dirty && !$v.password.required" style="color: red">Введите пароль</small>

          <small v-else-if="$v.password.$dirty && !$v.password.minLength" style="color: red">
            Пароль должен быть 5 символов. Сейчас он {{ password.length }}
          </small>
        </p>
        <b-button type="submit">Зарегистрировать</b-button>

      </div>
    </form>
  </b-container>
</template>

<script>
import {email, required, minLength, alpha} from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: "registrationComponent",
  data: () => ({
    name: '',
    email: '',
    password: ''
  }),
  validations: {
    name: {
      alpha,
      required
    },
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(5)
    }
  },
  methods: {
    ...mapActions(['createUser']),

    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      } else {
        console.log(`Name: ${this.name} Email: ${this.email} Password: ${this.password}`)
        this.createUser({
          name: this.name,
          email: this.email,
          password: this.password
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
