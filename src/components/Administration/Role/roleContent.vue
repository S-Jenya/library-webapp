<template>
  <div class="center-block w-75 ml-auto mr-auto">
    <h1 class="top-name center-block text-center">Список ролей</h1>
    <b-button class="my-2 my-sm-0 bg-primary mr-2" @click="openNewRoleModal()">Новая роль</b-button>
    <roleModal
        v-if="isRoleModalOpen"
        :title="getRoleModal.titleRoleModal"
        :text="getRoleModal.textRoleModal"
        :idRole="getRoleModal.idRole"
        :inputText="getRoleModal.inputText"
        :mode="getRoleModal.mode"
        @close="isRoleModalOpen = false"
    />
    <div class="wrapper">
      <table class="table mt-3 w-75 text-center ml-auto mr-auto">
        <thead>
        <tr>
          <th>Номер</th>
          <th>Наименование</th>
          <th>Действие</th>
        </tr>
        </thead>
        <tr v-for="(role, index) in getRole" :key="role.idRole">
          <td class="pb-auto pt-auto">{{ index + 1 }}</td>
          <td>{{ role.name }}</td>
          <td>
            <b-button class="my-2 my-sm-0 bg-primary mr-2" @click="openEditRoleModal(role.idRole, role.name)">
              Редактировать
            </b-button>
            <b-button class="my-2 my-sm-0 bg-danger mr-2">Удалить</b-button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import RoleModal from "@/components/Administration/Role/RoleModal";

export default {
  name: "roleContent",
  components: {RoleModal},
  computed: mapGetters(['getRole', 'getRoleModal']),
  data() {
    return {
      isRoleModalOpen: true
    }
  },
  methods: {
    ...mapActions(['loadRole']),
    ...mapMutations(['setRoleModal']),
    openEditRoleModal(idRole, roleName) {
      this.setRoleModal({
        title: "Редактировать наименование роли: ",
        text: "Введите новое наименование",
        inputText: roleName,
        idRole: idRole.toString(),
        mode: "1"
      });
      this.$bvModal.show('roleModal');
    },
    openNewRoleModal() {
      this.setRoleModal({
        title: "Новая Роль",
        text: "Введите наименование",
        mode: "0"
      });
      this.$bvModal.show('roleModal');
    }
  },
  mounted() {
    this.loadRole()
  }
}
</script>

<style v-if="true">
.wrapper {
  /*width: 95%;*/
  /*max-width: 1200px;*/
  margin: 0 auto;
}

.table {
  border-collapse: collapse; /* Для отображения только ОДНОЙ линии вокруг ячейки */
  width: 100%;
}

.table td {
  position: relative;	/* Устанавливаем положение относительно его исходного плока */
}

.table td, .table th {

}

@media screen and (max-width: 1100px) {
  thead {
    display: none;	/* Блокируем отображение подписи столбцов */
  }
  .table td {
    position: relative;	/* Устанавливаем положение относительно его исходного блока */
    display: block;		/*задаём блочное отображение всех td элементов */
    padding-left: 40%;
    border: none;
  }
  .table td:nth-child(odd){ /* для добавления стилей к каждому НЕЧЁТНОМУ td */
    background-color: #ccc;
  }
  .table td:before {
    content: attr(data-label); /* Вставляем в html текст содержимое по тегу data-label */
    position: absolute;
    left: 2%;
  }
  .table tr {
    border-bottom: 5px solid black;
  }
}


@media screen and (max-width: 600px) {
  .table td:before {
    position: static;	/* Заголовок встаёт по центру */
    display: block;		/* Задаём блочную архитектуру */
    background-color: #ccc;
    font-weight: bold;
    padding: 10px;
  }
  .table td {
    padding: 10px;
    text-align: center;
  }
  .table td:nth-child(odd){	/* для добавления стилей к каждому НЕЧЁТНОМУ td */
    background-color: #fff;
  }

  li:before { /*Задаём свой маркер к каждому элементу списка*/
   /* content: "•";		/* Вставляем в html текст */
    /*margin-right: 2px;
  }

  li {
    /*list-style-type: none; /*Отменяем вид маркера для каждого элемента списка*/
  }
}
</style>
