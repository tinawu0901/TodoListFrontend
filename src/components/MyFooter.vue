<template>
  <!--隐式类型转换-->
  <div class="todo-footer"  v-show="total">
    <label>
      <!--这里也可用v-model来替代，此时不需要计算属性了-->
      <!--      <input type="checkbox" :checked="isAll" @change="checkAll"/>-->
      <input type="checkbox" v-model="isAll"/> 
      <!-- isAll是自己計算的東西 不用更改 -->
    </label>
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ total }}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props:['todos','checkAllTodo','clearAllDoneTodo'],
  //計算屬性 
  computed:{
    doneTotal(){ //可以使用reduce 更高級
        // let i = 0;
        // this.todos.forEach((todo)=>{
        //     if(todo.done===true) i++;
        // })
        // return i
        // const doneCount = this.todos.reduce((pre,current)=>{
        //     return pre + (current.done ? 1:0)
        // },0)
        // return doneCount
       return  this.todos.reduce((pre,todo)=> pre + (todo.done ? 1:0),0)
    },
    total(){
        return this.todos.length;
    },
    // isAll(){
    //     return this.doneTotal === this.total && this.total > 0
    // }
     isAll:{
        //1.初次讀取該function2.所依賴的數據發生變化 
        //沒有用到任何相依的資料，因此不重新計算取值
        //需要每次更新，就用 method
//在意效能，就用 computed
        get(){
            return this.doneTotal === this.total && this.total > 0
        },
        //所倚賴的數據被修改
        set(value){
            console.log('@@',value)
              this.checkAllTodo(value);
        }
    }
  },
  methods:{
    // checkAll(e){
    //     console.log(e.target.checked)
    //     this.checkAllTodo(e.target.checked);
    // }
    clearAll(){
        this.clearAllDoneTodo();    
    }
  }
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}
.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}
.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}
.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>