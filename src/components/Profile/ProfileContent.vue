<template>
  <div>
    <div class="center-block w-75 ml-auto mr-auto mt-5">
      <b-tabs v-if="isLoadDataProfile" content-class="mt-3" fill>
        <b-tab title="Профиль" active >
          <div class="mt-3 center-block w-75 ml-auto mr-auto container offset">
            <h1><p class="text-center">Личные данные пользователя</p></h1>
            <p>Имя: <input v-if="isLoadDataProfile" type="text" disabled :value="getUserDataProfile.user.name"/></p>
            <p>Логин: <input v-if="isLoadDataProfile" type="text" disabled :value="getUserDataProfile.user.login"/></p>
            <p>Email: <input v-if="isLoadDataProfile" type="text" disabled :value="getUserDataProfile.user.email"/></p>
          </div>
        </b-tab>
        <b-tab title="Загрузки">
          <h1><p  class="text-center">Список загруженного материала</p></h1>
          <div>
            <b-card v-if="isLoadDataProfile" v-for="book in getUserDataProfile.user.books" class="mt-3">
              <b-card-sub-title v-if="isLoadDataProfile" class="mb-2">
                {{ book.author.lastName }} {{ book.author.firstName }} {{ book.author.author }}
              </b-card-sub-title>

              <b-card-text v-if="isLoadDataProfile">
                <h4>{{ book.name }}</h4>
              </b-card-text>
            </b-card>

          </div>
        </b-tab>
        <b-tab title="Комментарии">
          <h1><p class="text-center">Список оставленных комментариев</p></h1>
          <b-card v-for="comment in getUserDataProfile.comments" class="mt-3 center-block w-75 ml-auto mr-auto"
                  style="width: 1000px;">
            <b-card-sub-title class="mb-2 w-100">
              <b-container class="ml-0 pl-0 mr-0">
                <div class="row  w-auto">
                  <div v-if="isLoadDataProfile" class="col">
                    {{ comment.date }} к книге "{{ comment.book.name }}"
                  </div>
                  <div class="col-md-0 col-lg-0 col-xl-0">
                    <span aria-hidden="true" class="pull-right">&#9998;</span>
                    <span aria-hidden="true" class="pull-right">&#10006;</span>
                  </div>
                </div>
              </b-container>
            </b-card-sub-title>

            <b-card-text v-if="isLoadDataProfile">
              {{ comment.text }}
            </b-card-text>
          </b-card>
        </b-tab>
      </b-tabs>
    </div>

    <!--    <pre>
              <code>
              {{ getUserDataProfile }}
              </code>
            </pre>-->
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ProfileContent",
  computed: mapGetters(['getUserDataProfile', 'isLoadDataProfile']),
  methods: {
    ...mapActions(['loadUserData'])
  },
  mounted() {
    this.loadUserData();
  }
}
</script>

<style scoped>

</style>
