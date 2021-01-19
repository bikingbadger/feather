<template>
  <div id="app" class="container mx-auto text-center">
    <div class="grid grid-cols-1">
      <div class="grid justify-center">
        <img src="@/assets/icons8-scale-64.png" alt="Scale Icon" />
      </div>
    </div>
    <div id="nav" class="p-8">
      <router-link to="/" class="font-bold">Home</router-link> |
      <router-link to="/weight" class="font-bold">Weight</router-link> |
      <router-link to="/login" class="font-bold">Login</router-link> |
      <router-link to="/register" class="font-bold">Register</router-link> |
      <button @click="logout">Logout</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import firebase from 'firebase';
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
export default {
  name: 'app',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('login');
        });
    },
  },
};
</script>

<style></style>
