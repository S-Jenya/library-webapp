<template>
  <b-container align-v="center" class="mt-3 row-cols-lg-1 row-cols-xl-1 row-cols-md-1 w-100">
    <h1 class="text-center">Регистрация</h1>
    <form @submit.prevent="submitHandler">
      <div class="form-group center-block  w-100 ml-auto mr-auto container offset">

        <p><label>Имя</label>
          <input id="name" type="text" class="form-control"
                 v-model="name"
                 :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.alphaName)}"
          />
          <small v-if="$v.name.$dirty && !$v.name.required" style="color: red">Поле не может быть пустым</small>
          <small v-else-if="$v.name.$dirty && !$v.name.alphaName" style="color: red">Имя может содержать только символы кириллицы</small>
        </p>

        <p><label>Логин</label>
          <input id="login" type="text" class="form-control"
                 v-model="login"
                 :class="{invalid: ($v.login.$dirty && !$v.login.required) || ($v.login.$dirty && !$v.login.alpha)}"
          />
          <small v-if="$v.login.$dirty && !$v.login.required" style="color: red">Поле не может быть пустым</small>
          <small v-else-if="$v.login.$dirty && !$v.login.alpha" style="color: red">Логин может содержать только символы латинского алфавита</small>
        </p>

        <p><label>Email</label>
          <input id="email" type="email" class="form-control"
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
import {email, required, minLength, alpha, helpers} from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

// Каретка ^ означает совпадение с началом текста, а доллар $ – с концом.
// Квантификатор звёздочка означает 0 или больше количеств повторений.
const alphaName = helpers.regex('alphaName', /^[a-zA-Za-яА-Я]*$/)

export default {
  name: "registrationComponent",
  data: () => ({
    name: '',
    login: '',
    email: '',
    password: ''
  }),
  validations: {
    name: {
      alphaName,
      required
    },
    login: {
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
        this.createUser({
          name: this.name,
          email: this.email,
          login: this.login,
          password: this.password,
          vm: this
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
