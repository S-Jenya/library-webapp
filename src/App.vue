<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="data" variant="success" class="bg-light" >
        <b-navbar-brand href="#" to="/"
                        class="pl-lg-2 pl-xl-2
                        col-xl-8 ml-xl-5 pr-lg-5
                        col-lg-7 col-md-7
                        col-sm-7 col-7">Библиотека
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" class="" type="dark" variant="info"
                         style="background: blue; color: white; font-size: 20pt;">≡
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav class=" container ml-md-3 ml-3 ml-lg-3">
          <b-navbar-nav left class="container ml-md-0 hidden-xs-down col-lg-0 col-xl-0">
          </b-navbar-nav>
          <b-navbar-nav class="col-xl-0 col-md-0 col-lg-0  w-75">
            <div class="bg-dark w-0 col-md-0 col-lg-0 col-xl-0 mb-3" style="height: 2px;"/>
            <p v-if="isAuth === true" style="color: blue" class="bg-light mr-3 pr-0 mt-auto mb-auto"
               onmouseover="this.style.textDecoration ='underline'; this.style.cursor = 'pointer';"
               @click="$router.push('/myProfile')"
            >Личный кабинет
            </p>
            <b-nav-item-dropdown v-if="isAdmin" variant="primaty" right text="Администрирование" class="mr-3">
              <b-dropdown-item to="/admin/userlist">Пользователи</b-dropdown-item>
              <b-dropdown-item to="/admin/rolelist">Роли</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item to="/admin/authorList">Авторы</b-dropdown-item>
              <b-dropdown-item to="/admin/genreList">Жанры</b-dropdown-item>
            </b-nav-item-dropdown>
            <a v-if="isAuth === false" style="color: blue" class="bg-light mr-3"
               onmouseover="this.style.textDecoration ='underline'; this.style.cursor = 'pointer';"
               @click="openRegistrationModal">Войти
            </a>
            <a v-if="isAuth === true"
               onmouseover="this.style.textDecoration ='underline'; this.style.cursor = 'pointer';"
               class="bg-light mr-3 mt-auto mb-auto"
               @click="logout">Выйти
            </a>
            <router-link v-if="isAuth === false"
                         id="show-btn"
                         type="text"
                         to="/registration">Регистрация
            </router-link>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <modal
          v-if="isModalOpen"
          title="Вход в систему"
          @close="isModalOpen = false"
      />
      <div class="row-12 w-100" style="min-height: 100vh;">
        <router-view/>
      </div>
    </div>
    <div class="row mt-5 col-12">
      <div class="footer bottom  w-100" style="background-color: #f8f9fa; bottom: 0; position: absolute">
        <small style="margin-left: 5%"> Сёмин Евгений. СТП. Курсовая работа. 2021г.</small>
      </div>
    </div>

  </div>
</template>

<script>
import headComponent from '@/components/headComponent'
import Modal from './Modal'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',
  components: {headComponent, Modal},
  computed: mapGetters(['isAdmin', 'isAuth', 'getLocalStoreName']),
  data() {
    return {
      jk: false,
      isModalOpen: true,
      strTest: '',
      URLUserName: this.getLocalStoreName
    }
  },
  methods: {
    ...mapActions(['logout', 'getLocalStoreInfo']),

    openRegistrationModal() {
      this.$bvModal.show('bv-modal-example');
    },

    goTestFF() {
      alert(this.strTest)
    }

  },
  watch: {
    getLocalStoreName(newVal) {
      this.URLUserName = newVal
    }
  }
}
</script>

<style v-if="true">
body {
}

#app {
  position: relative;
  min-height: 100vh;
}
</style>
