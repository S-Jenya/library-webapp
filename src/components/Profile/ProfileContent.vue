<template>
  <div>
    <div class="center-block w-75 ml-auto mr-auto mt-5">
      <b-tabs v-if="isLoadDataProfile" content-class="mt-3" fill>
        <b-tab title="Профиль" active>
          <h1><p class="text-center">Личные данные пользователя</p></h1>
          <div class="  mt-3 center-block text-center w-75 ml-auto mr-auto container offset">
            <div class="top-cover center-block mt-4 rounded border ml-auto mr-auto mr-2 mb-2 p-3 w-50">
              <p>Имя: <input v-if="isLoadDataProfile" type="text" disabled :value="getUserDataProfile.user.name"/></p>
              <p>Логин: <input v-if="isLoadDataProfile" type="text" disabled :value="getUserDataProfile.user.login"/>
              </p>
              <p>Email: <input v-if="isLoadDataProfile" type="text" disabled :value="getUserDataProfile.user.email"/>
              </p>

              <b-button variant="info" class="mt-2" @click="$bvModal.show('idPerDataChangeModal')">
                Изменить личные данные
              </b-button>

              <PersonalDataChangeModal
                  v-if="PerDataChangeModalOpen"
                  @close="PerDataChangeModalOpen = false"
                  :id-user="getUserDataProfile.user.idUser"
                  :login-user="getUserDataProfile.user.login"
                  :name-user="getUserDataProfile.user.name"
                  :email-user="getUserDataProfile.user.email"
              />

              <b-button variant="danger" class="mt-2" @click="$bvModal.show('idPwdChangeModal')">
                Изменить пароль
              </b-button>

              <PasswordChangeModal
                v-if="PwdChangeModalOpen"
                @close="PwdChangeModalOpen = false"
              />



            </div>
          </div>
        </b-tab>
        <b-tab title="Загрузки">
          <h1><p class="text-center">Список загруженного материала</p></h1>
          <div>
            <b-card v-if="isLoadDataProfile" v-for="book in getUserDataProfile.user.books"
                    class="mt-3 center-block w-75 ml-auto mr-auto"
                    style="width: 1000px;">
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
          <b-card v-for="comment in getUserDataProfile.comments"
                  class="mt-3 center-block w-75 ml-auto mr-auto"
                  style="width: 1000px;">
            <b-card-sub-title class="mb-2 w-100">
              <b-container class="ml-0 pl-0 mr-0">
                <div class="row  w-auto">
                  <div v-if="isLoadDataProfile" class="col">
                    {{ comment.date }} к книге <a :href="/bookInfo/+comment.book.idBook"> "{{ comment.book.name }}" </a>
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
import PasswordChangeModal from "@/components/Profile/PasswordChangeModal";
import PersonalDataChangeModal from "@/components/Profile/PersonalDataChangeModal";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ProfileContent",
  components: {PasswordChangeModal, PersonalDataChangeModal},
  computed: mapGetters(['getUserDataProfile', 'isLoadDataProfile']),
  data() {
    return {
      PwdChangeModalOpen: true,
      PerDataChangeModalOpen: true
    }
  },
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
