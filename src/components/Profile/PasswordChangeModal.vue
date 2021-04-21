<template>
  <div>
    <b-modal id="idPwdChangeModal" centered size="md" hide-footer>
      <template #modal-title>
        Смена пароля
      </template>

      <form @submit.prevent="submitHandler">
        <div class="d-block text-center container">
          <div class="row">
            <div id="idPwdChangeError" class="mb-3" style="color: red"></div>

            <div class="row w-100">
              <div class="col">
                <p><label>Старый пароль: </label></p>
              </div>
              <div class="col">
                <input type="password" class="w-100" v-model="oldPwd"/>
              </div>
            </div>

            <div class="row w-100">
              <div class="col">
                <p><label>Новый пароль: </label></p>
              </div>
              <div class="col">
                <input id="password" type="password" class="w-100"
                       v-model.trim="password"
                       :class="{invalid: ($v.password.$dirty && !$v.password.required) ||
                   ($v.password.$dirty && !$v.password.minLength)}"
                />
                <small v-if="$v.password.$dirty && !$v.password.required" style="color: red">Введите пароль</small>

                <small v-else-if="$v.password.$dirty && !$v.password.minLength" style="color: red">
                  Пароль должен быть 5 символов. Сейчас он {{ password.length }}
                </small>
              </div>
            </div>

            <div class="row w-100">
              <div class="col">
                <p><label>Повторите пароль:</label></p>
              </div>
              <div class="col">
                <input type="password" class="w-100" v-model="repeatPwd"/>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="ml-auto mr-auto">
            <b-button @click="$bvModal.hide('idPwdChangeModal')" class="mr-2">Закрыть</b-button>
            <b-button type="submit">Применить</b-button>
          </div>
        </div>

      </form>
    </b-modal>
  </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'
import {mapActions} from "vuex";

export default {
  name: "PasswordChangeModal",
  validations: {
    password: {
      required,
      minLength: minLength(5)
    }
  },
  data() {
    return {
      oldPwd: "",
      password: "",
      repeatPwd: ""
    }
  },
  methods: {
    ...mapActions(['changeUserPassword']),
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.password !== this.repeatPwd) {
        let erMes = document.getElementById('idPwdChangeError')
        erMes.innerText = "<p>Неверное подтверждение пароля</p>"
        return
      }
      console.log("HER")
      this.changeUserPassword({
        pwdOld: this.oldPwd,
        pwdNew: this.password,
        vm: this
      })
    }
  }
}
</script>

<style scoped>

</style>
