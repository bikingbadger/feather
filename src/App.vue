<template>
  <div id="app" class="container mx-auto text-center">
    <div class="grid grid-cols-1">
      <div class="grid justify-center">
        <img src="@/assets/icons8-scale-64.png" alt="Scale Icon" />
      </div>
    </div>
    <div id="nav" class="p-8">
      
      <router-link v-if="isLoggedIn" to="/" class="font-bold"
        >Home
      </router-link>
      <router-link v-if="isLoggedIn" to="/weight" class="font-bold"
        >Weight
      </router-link>
      <router-link v-if="!isLoggedIn" to="/login" class="font-bold"
        >Login
      </router-link>
      <router-link v-if="!isLoggedIn" to="/register" class="font-bold"
        >Register
      </router-link>
      <div v-if="isLoggedIn" @click="logout"><span>{{currentUser}}</span> Logout</div>
    </div>
    <router-view />
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'app',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
    };
  },
  created() {
    const user = firebase.auth().currentUser;
    if (user) {
      this.isLoggedIn = true;
      this.currentUser = user.email;
    }
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
