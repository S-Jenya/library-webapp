<template>
  <div>
    <!--    <div class="col-lg-7 col-md-2 col-sm-2 col-xs-1">-->
    <div class=" center-block" style="width: 80%; margin-left: 10%; margin-right: 10%">


      <h1><p class="top-name center-block text-center">Панель администратора</p></h1>
      <b-card no-body>
        <b-tabs pills card vertical nav-wrapper-class="w-20">
          <b-tab title="Пользователи" active>
            <b-card-text>
              Список всех пользователей
              <userList/>
            </b-card-text>
          </b-tab>
          <b-tab title="Роли">
            <b-card-text>
              <p>Список доступных ролей</p>
              <b-button style="margin-left: 5px" class="my-2 my-sm-0" @click="openNewRoleModal()">Новая роль</b-button>
              <roleModal
                  v-if="isRoleModalOpen"
                  :title = "getRoleModal.titleRoleModal"
                  :text = "getRoleModal.textRoleModal"
                  :idRole = "getRoleModal.idRole"
                  :inputText = "getRoleModal.inputText"
                  :mode = "getRoleModal.mode"
                  @close="isRoleModalOpen = false"
              />
              <roleContent/>
            </b-card-text>
          </b-tab>
          <b-tab title="Книги">
            <b-card-text>Список книг</b-card-text>
          </b-tab>
          <b-tab title="Жанры">
            <b-card-text>Управление жанрами</b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
    <!--    </div>-->

  </div>
</template>


<script>
import userList from './User/userList'
import roleModal from './Role/RoleModal'
import roleContent from "@/components/Administration/Role/roleContent";

import {mapGetters, mapMutations} from 'vuex';

export default {
  name: 'App',
  components: {
    userList, roleModal, roleContent
  },
  computed: mapGetters(['getRoleModal']),
  data() {
    return {
      isRoleModalOpen: true
    }
  },
  methods: {
    ...mapMutations(['setRoleModal']),
    openNewRoleModal() {
      this.setRoleModal({
        title: "Новая Роль",
        text: "Введите наименование",
        mode: "0"
      });
      this.$bvModal.show('roleModal');
    }
  }
}
</script>


