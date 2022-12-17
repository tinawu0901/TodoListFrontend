import Vue from 'vue'
import App from './App.vue'
// import Swal from 'sweetalert2';
// window.Swal = Swal;
Vue.config.productionTip = false

//event Bus 用於組件間的通信


new Vue({
  //將App放入 id為app容器裡
  render: h => h(App),
  beforeCreate(){
    //安裝組件間通信
    Vue.prototype.$bus =this
  }
}).$mount('#app')
