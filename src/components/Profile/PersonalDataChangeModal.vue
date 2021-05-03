<template>
  <div>
    <b-modal id="idPerDataChangeModal" centered size="md" hide-footer>
      <template #modal-title>
        Смена пароля
      </template>

      <form @submit.prevent="getRequest()">
        <div class="d-block text-center container">
          <div class="row-12">
            <div class="col-4 text-left pr-sm-0">
              <label>Имя: </label>
            </div>
            <div class="col-12">
              <input type="text" class="w-100" v-model="strName" pattern="[А-Я|а-я|A-Z|a-z|\s]+"/>
            </div>
          </div>

          <div class="row-12 mt-2">
            <div class="col-4 text-left pr-sm-0">
              <label>Логин: </label>
            </div>
            <div class="col-12">
              <input type="text" class="w-100" v-model="strLogin"/>
            </div>
          </div>

          <div class="row-12 mt-2 mb-3">
            <div class="col-4 text-left pr-sm-0">
              <label>Email: </label>
            </div>
            <div class="col-12">
              <input type="text" class="w-100" v-model="strEmail"/>
            </div>
          </div>

          <div id="idPerDataChangeError" class="mb-2" style="color: red"></div>
          <b-button @click="$bvModal.hide('idPerDataChangeModal')"  class="mr-2">Закрыть</b-button>
          <b-button type="submit">Применить</b-button>
        </div>
      </form>

    </b-modal>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "PersonalDataChangeModal",
  props: ['idUser', 'nameUser', 'loginUser', 'emailUser'],
  data() {
    return {
      strName: this.nameUser,
      strLogin: this.loginUser,
      strEmail: this.emailUser,
      baseLogin: this.loginUser
    }
  },
  methods: {
    ...mapActions(['changeBaseUserData']),
    getRequest() {
      let user = JSON.parse(localStorage.getItem('user'));
      let idUser = user.idUser;
      let baseData = new FormData()
      baseData.append("idUser", idUser)
      baseData.append("name", this.strName)
      baseData.append("login", this.strLogin)
      baseData.append("email", this.strEmail)
      // mode = 0 - это режим смены пароля. (Чтобы разлогинеться и обновить JWT)
      let myMode
      if(this.baseLogin === this.strLogin) {
        myMode = 1
      } else {
        myMode = 0
      }
      this.changeBaseUserData({baseData: baseData, mode: myMode, vm: this})
    }
  },
  watch: {
    nameUser: function (newVal) {
      this.strName = newVal
    },
    loginUser: function (newVal) {
      this.strLogin = newVal
    },
    emailUser: function (newVal) {
      this.strEmail = newVal
    }
  }
}
</script>

<style scoped>

</style>
