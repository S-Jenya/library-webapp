<template>
  <div id="app">

        <b-navbar toggleable="lg" type="dark" variant="success">
          <b-navbar-brand href="#" to="/">Библиотвека</b-navbar-brand>

          <b-button style="margin-left: 5px" class="my-2 my-sm-0" to="/admin">Admin</b-button>

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

              <b-button  v-b-modal.modal-center style="margin-left: 5px" class="my-2 my-sm-0" type="button" @click="openRegistrationModal">Войти</b-button>
              <b-button id="show-btn" type="button"  to="/registration">Регистрация</b-button>
              <modal
                  v-if="isModalOpen"
                  title="Очень важная информация"
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

export default {
  name: 'App',
  components: {
    headComponent,
    Modal
  },
  data() {
    return {
      isModalOpen: true
    }
  },
  methods: {
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
