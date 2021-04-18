<template>
  <div id="app">

    <b-navbar toggleable="lg" type="data" variant="success" class="bg-light">
      <b-navbar-brand href="#" to="/">Библиотека</b-navbar-brand>

      <b-dropdown v-if="isAdmin" variant="primaty" right text="Администрирование">
        <b-dropdown-item to="/admin/userlist">Пользователи</b-dropdown-item>
        <b-dropdown-item to="/admin/rolelist">Роли</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
<!--        <b-dropdown-item>Книги</b-dropdown-item>-->
        <b-dropdown-item to="/admin/authorList">Авторы</b-dropdown-item>
        <b-dropdown-item to="/admin/genreList">Жанры</b-dropdown-item>
      </b-dropdown>

      <b-button class="my-2 my-sm-0 ml-2" variant="primaty" @click="getLocalStoreInfo">LocaleStore</b-button>

      <b-collapse id="nav-collapse" is-nav>
<!--        <b-nav-item class="my-2 my-sm-0 ml-2" @click="getLocalStoreInfo">LocaleStore</b-nav-item>-->
        <!--        <b-navbar-nav>
                  <b-nav-item href="#" disabled>Disabled</b-nav-item>
                </b-navbar-nav>-->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
<!--                    <b-nav-form>
                      <b-form-input size="sm" class="mr-sm-2" placeholder="Я ищу..."></b-form-input>
                      <b-button size="sm" class="my-2 my-sm-0" type="submit">Поиск</b-button>
                    </b-nav-form>-->

          <b-button class="my-2 my-sm-0 mr-3"
                    variant="primaty"
                    to="/myProfile">{{this.getLocalStoreName}}
          </b-button>

          <b-button v-if="isAuth === false" v-b-modal.modal-center style="margin-left: 5px"
                    class="my-2 my-sm-0 mr-3 bg-primary"
                    type="button"
                    @click="openRegistrationModal">Войти
          </b-button>
          <!--          <b-button v-if="isAuth === false" v-b-modal.modal-center style="margin-left: 5px" class="my-2 my-sm-0" type="button" to="/login">
                      Войти
                    </b-button>-->
          <b-button v-if="isAuth === true" v-b-modal.modal-center
                    class="my-2 my-sm-0 ml-1 bg-primary"
                    type="button" @click="logout">Выйти
          </b-button>
          <b-button v-if="isAuth === false" class="bg-primary"
                    id="show-btn"
                    type="button"
                    to="/registration">Регистрация
          </b-button>
          <modal
              v-if="isModalOpen"
              title="Вход в систему"
              @close="isModalOpen = false"
          />


        </b-navbar-nav>
      </b-collapse>
    </b-navbar>


    <router-view/>


  </div>
</template>

<script>
import headComponent from '@/components/headComponent'
import Modal from './Modal'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
    headComponent,
    Modal
  },
  computed: mapGetters(['isAdmin', 'isAuth', 'getLocalStoreName']),
  data() {
    return {
      jk: false,
      isModalOpen: true
    }
  },
  methods: {
    ...mapActions(['logout', 'getLocalStoreInfo']),

    openRegistrationModal() {
      this.$bvModal.show('bv-modal-example');
    }

  }
}
</script>

<style>
#app {
}
</style>
