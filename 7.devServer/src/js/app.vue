<template>
  <div class="vue-comp">
    <div>{{message}}</div>
    <input type="text" v-model="message">
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '这是一个vue组件'
    }
  }
}
</script> 
<style>
.vue-comp {
  border: 1px dotted blue;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
}
</style>
