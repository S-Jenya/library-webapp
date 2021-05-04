<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="data" variant="success" class="bg-light">
        <b-navbar-brand href="#" to="/"
                        class="pl-lg-2 pl-xl-2
                        col-xl-8  pr-lg-5
                        col-lg-6 col-md-7
                        col-sm-7 col-7">Библиотека
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" class="" type="dark" variant="info"
                         style="background: blue; color: white; font-size: 20pt;">≡
        </b-navbar-toggle>

        <div class="col-xl-4 text-lg-center col-lg-6 col-md-5">
          <b-collapse id="nav-collapse" is-nav class=" container row-xl-12 row-lg-12 ml-md-3 ml-3 ml-lg-3 pl-md-0">
            <b-navbar-nav left class="container ml-md-0 hidden-xs-down col-xl-0 col-lg-0">
            </b-navbar-nav>
            <b-navbar-nav class="col-xl-12 col-md-12 col-lg-12  w-75">
<!--                          <div class="bg-dark w-0  mb-3" style="height: 2px;"/>-->
              <p v-if="isAuth === true" style="color: blue"
                 class="bg-light text-xl-right mt-auto mb-auto
                        col-xl-4 pr-xl-1 text-lg-center
                        col-lg-4
                        pl-md-0
                        pl-sm-0
                        pl-0"
                 onmouseover="this.style.textDecoration ='underline'; this.style.cursor = 'pointer';"
                 @click="$router.push('/myProfile')"
              >Личный кабинет
              </p>
              <b-nav-item-dropdown v-if="isAdmin" variant="primaty" right text="Администрирование"
                                   class="mr-0
                                   col-xl-6 text-xl-center pl-xl-1 pr-xl-1
                                   col-lg-6 text-lg-center
                                   pl-md-0
                                   pl-sm-0
                                   pl-0">
                <b-dropdown-item to="/admin/userlist">Пользователи</b-dropdown-item>
                <b-dropdown-item to="/admin/rolelist">Роли</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item to="/admin/authorList">Авторы</b-dropdown-item>
                <b-dropdown-item to="/admin/genreList">Жанры</b-dropdown-item>
              </b-nav-item-dropdown>
              <div class="text-xl-center mb-auto mt-auto
                          col-xl-2 pl-xl-1 pr-xl-0
                          col-lg-2 text-lg-center
                          pl-md-0
                          pl-sm-0
                          pl-0">
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
              </div>
            </b-navbar-nav>
          </b-collapse>
        </div>
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
