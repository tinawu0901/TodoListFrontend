<template>
   <div class="todo-header">
    <!-- <input type="text" placeholder="輸入任務名稱" v-model="title" @keyup.enter="add"/> -->
    <!-- v-model 雙向綁定 -->
      <input type="text" placeholder="輸入任務名稱" @keyup.enter="add" v-model="title"/>
  </div>
</template>

<script>
//import {nanoid} from 'nanoid'//uuid 輕量版 需先下載 npm i nanoid  
export default {
    name:'MyHearder',
    data(){
        return{
            title:''//隨著輸入東西就維護好了
        }
    },
    props:['addTodo'],
    methods:{
        //uuid 全球唯一值 根據你的網卡、地理位置
        add(){
            //檢查數據
            if(!this.title.trim()) return alert("不能為空值")
           // console.log(e.target.value)
            //將用戶輸入包裝成todo物件
            //要先拿到id 看有沒有重複
            //done預設為未完成
            //const todObj ={id:nanoid(),title:e.target.value,done:false}
            const todObj ={id:null,title:this.title,done:false}
            //通知App組件增加一個todo物件
            this.addTodo(todObj)
            //清空輸入
            this.title=''//e.target.value ="";//不直接操作dom

        },
     
        // add(){
        //     console.log(this.title)
        // }
    }
}
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}
.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>