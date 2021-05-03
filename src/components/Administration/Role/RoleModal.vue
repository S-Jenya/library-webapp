<template>
  <!-- Modal -->
  <div>
    <form @submit.prevent="createNewRole()">
      <b-modal id="roleModal" centered size="md">
        <template #modal-title>
          {{ title }}
        </template>
        <div class="d-block text-center">
          {{ text }} <input type="text" v-model="inputText">
          <div id="idRoleError" style="color: red"></div>
        </div>
        <template #modal-footer>
          <b-button @click="$bvModal.hide('roleModal')">Закрыть</b-button>
          <b-button type="submit" @click="createNewRole">Применить</b-button>
        </template>
      </b-modal>
    </form>

  </div>

</template>

<script>

import {mapActions, mapMutations, mapGetters} from 'vuex'

export default {
  data() {
    return {
      nameLine: ''
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    inputText: {
      type: String,
      default: ''
    },
    idRole: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: ''
    }
  },
  computed: mapGetters(['getRoleModal', 'getId', 'getName']),
  methods: {
    ...mapActions(['addRoleFunc', 'updRoleFunc', 'addGenre']),
    ...mapMutations(['addRole', 'updNameRole']),

    createNewRole() {
      if (this.inputText !== "") {
        if (this.mode === "0") {
          this.addRole({
            name: this.inputText
          })
          this.addRoleFunc({vm: this})
        } else if (this.mode === "1") {
          this.updNameRole({
            name: this.inputText
          });
          let varData = {
            id: this.getId,
            name: this.getName
          };
          this.updRoleFunc(varData)
        }
       // this.closeModal();
      }
    },
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>
