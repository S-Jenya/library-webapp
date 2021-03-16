<template>
  <b-container class="mt-2 w-50 align-content-center">
    <h1>Новая книга</h1>
    <form @submit.prevent="uploadData" enctype="multipart/form-data">
      <div class="form-group">
        <p><label>Наименование</label>
          <input id="name" type="text" class="form-control" v-model="name"/>
        </p>
        <p><label>Описание</label>
          <input id="description" type="text" class="form-control" v-model="name"/>
        </p>
        <p><label>Обложка</label>
          <input id="cover" type="file" ref="uploadImage" @change="onImageUpload()" class="form-control h-50" required/>
        </p>
        <p>
          <label>Файл</label>
          <input id="fileBook" type="file" ref="uploadImage" @change="onImageUpload()" class="form-control h-50" required/>
        <p>
          <b-button type="submit">Добавить</b-button>
        </p>
      </div>
    </form>
  </b-container>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "BookCreate",
  data: () => ({
    formData: undefined
  }),
  methods: {
    ...mapActions(['uploadBook']),

    onImageUpload() {
      let file = this.$refs.uploadImage.files[0]
      this.formData = new FormData()
      this.formData.append("file", file)
    },
    uploadData() {
      if (this.formData !== undefined) {
        this.uploadBook(this.formData)
      }
    }
  }
}
</script>

<style scoped>

</style>
