import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import messagePlugin from '@/utils/message.plugin'
import store from './store'
import Paginate from 'vuejs-paginate'
import tooltipDirective from '@/directives/tooltip.directives'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import Loader from "@/components/app/Loader";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyBJ2Z4tSpUsFQ-UZA9SSlo93V2ok50WyKk",
  authDomain: "vue-project-9cf4b.firebaseapp.com",
  projectId: "vue-project-9cf4b",
  storageBucket: "vue-project-9cf4b.appspot.com",
  messagingSenderId: "948746777826",
  appId: "1:948746777826:web:5479b3cd7965d1e6669abb",
  measurementId: "G-2FZ5TQYE24"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})
