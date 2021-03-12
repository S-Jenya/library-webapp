<template>
  <div id="app">

    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#" to="/">Библиотвека</b-navbar-brand>

      <b-button v-if="isAdmin" style="margin-left: 5px" class="my-2 my-sm-0" to="/admin">Admin</b-button>
      <b-button style="margin-left: 5px" class="my-2 my-sm-0" @click="getLocalStoreInfo">LocaleStore</b-button>

      <b-collapse id="nav-collapse" is-nav>
        <!--        <b-navbar-nav>-->
        <!--          <b-nav-item href="#">Link</b-nav-item>-->
        <!--          <b-nav-item href="#" disabled>Disabled</b-nav-item>-->
        <!--        </b-navbar-nav>-->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Я ищу..."></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Поиск</b-button>
          </b-nav-form>

          <b-button v-if="isAuth === false" v-b-modal.modal-center style="margin-left: 5px" class="my-2 my-sm-0" type="button"
                    @click="openRegistrationModal">Войти
          </b-button>
<!--          <b-button v-if="isAuth === false" v-b-modal.modal-center style="margin-left: 5px" class="my-2 my-sm-0" type="button" to="/login">
            Войти
          </b-button>-->
          <b-button v-if="isAuth === true" v-b-modal.modal-center style="margin-left: 5px" class="my-2 my-sm-0" type="button" @click="logout">
            Выйти
          </b-button>
          <b-button v-if="isAuth === false" id="show-btn" type="button" to="/registration">Регистрация</b-button>
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
  computed: mapGetters(['isAdmin', 'isAuth']),
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

  }, mounted() {

    let user = JSON.parse(localStorage.getItem('user'));
    console.log("LocalStoreInfo:\n" + user)
    if(user === null) {
      return false
    }
  }
}
</script>

<style>
#app {
}
</style>
