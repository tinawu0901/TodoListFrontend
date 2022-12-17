<template>
  <ul class="todo-main">
    <MyItem
      v-for="todoObj in todos"
      :key="todoObj.id"
      :todo="todoObj"
      :checkTodo="checkTodo"
      :deleteTodo="deleteTodo"
    />
    <!-- v-for 便利的時候 key ->id todo 傳送  //checkTodo它不用 他兒子用-->
  </ul>
</template>

<script >
import MyItem from "./MyItem.vue";
export default {
  name: "MyList",
  components: {
    MyItem,
  },
  props: ["todos","checkTodo","deleteTodo"], //出現在MyList實例對象上vc
};
</script> 

<style scoped>
/*main*/
.todo-main {
  margin-left: 0;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}
.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>