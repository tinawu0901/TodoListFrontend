<template>
  <li>
    <label>
      <!--      这里勾选和取消勾选可以使用change和click作为事件处理-->
      <input
        type="checkbox"
        :checked="todo.done"
        @change="handleCheck(todo.id)"
      />
      <!--v-model数据的双向绑定，checkbox使用v-model来双向绑定其是否被勾选,也可以实现效果但不推荐(因为其实修改了props中的数据)-->
      <!-- 1.初始化列表是否勾選2. 雙向數據綁定  違反原則props只能閱讀 不能修改 -->
      <!-- <input type="checkbox" v-model="this.done"/> -->
      <!--这里修改了从List修改过来的props,这里的不允许改是浅层次，就是如果props是一个对象则这个修改这个对象的某一个属性vue是放行的-->
      <!-- <input type="checkbox" v-model="todo.done"/>-->
      <span   v-show="!todo.isEdit">{{ todo.title }}</span>
      <!--預設隱藏-->
       <input 
       v-show="todo.isEdit"
       type="text"
       :value="todo.title"  
       @blur="handleBlur(todo,$event)"
       ref="inputTitle">
    </label>
    
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
    <!-- 因為css關係浮動 -->
     <button class="btn btn-edit" @click="handleEdit(todo)">編輯</button>
  </li>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  name: "MyItem",
  props: ["todo", "checkTodo","deleteTodo"], //外部引進資料時，就需要透過 props 屬性來引用外部的狀態
  // mounted(){
  //     console.log(this.todo)  //Vue 實體與掛載完成
  // }
  methods: {
    //delete 是js裡的關鍵字 類似 let vat const
    handleCheck(id) {
      console.log(id);
      //通知Add 把該todoObj對象的修改
      this.checkTodo(id);
    },
    //編輯
    handleEdit(todo){
        console.log(todo.id);
        //出現輸入框
       
       //暫時配套
        if(todo.hasOwnProperty.call('isEdit')){
          todo.isEdit = true
       }else{
        //讓todo多一個屬性
        this.$set(todo,'isEdit',true)
       }
        //拿到輸入框時獲取焦點
        //method 都執行完了才重新解析模板 所以這時input還未出現
        //this.$refs.inputTitle.focus();
        
        //會在dom節點更新後完畢再執行
        this.$nextTick(function(){
            this.$refs.inputTitle.focus();
        })
    },
    //刪除
    handleDelete(id) {
      Swal.fire({
      title: "確認是否刪除",
      icon: "warning",
      showCancelButton: true,
      dangerMode: true,
    }).then((isConfirm) => { //如果用一班function(isConfirm){} 會變undefined
      if (isConfirm.isConfirmed) {
       // console.log(this)
       this.deleteTodo(id);
      } 
    })
        // if(confirm('是否刪除')){
        //     //通知App刪除對應對象
        //     console.log(this)
        //   //  this.deleteTodo(id);
        // }
    },
    handleBlur(todo,e){
      //並更換數據
      if(!e.target.value.trim()) return alert('不得為空值')
     this.$bus.$emit('updateTodo',todo.id,e.target.value)
      //讓input消失
      todo.isEdit = false
    }
  },
};
</script>


<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
li label {
  float: left;
  cursor: pointer;
}
li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}
li button {
  float: right;
  display: none;
  margin-top: 3px;
}
li:before {
  content: initial;
}
li:last-child {
  border-bottom: none;
}
li:hover {
  background: #ddd;
}
li:hover button {
  display: block;
}
</style>