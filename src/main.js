import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/tailwind.css'
import router from './router'
import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBky_eUqBhGzVeHr81Pk-HRjvpwO7zUEog',
  authDomain: 'feather-ecd56.firebaseapp.com',
  projectId: 'feather-ecd56',
  storageBucket: 'feather-ecd56.appspot.com',
  messagingSenderId: '662077318866',
  appId: '1:662077318866:web:1b8f3c0aed9cc83dc86f0b',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app){
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})



