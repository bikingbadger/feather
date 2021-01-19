<template>
  <div class="grid justify-center">
    <div
      class="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg "
    >
      <div class="mb-4">
        <!-- <label class="font-bold text-grey-darker block mb-2"
          >Username or Email</label
        > -->
        <input
          type="text"
          class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
          placeholder="Your Email"
          v-model="email"
        />
      </div>

      <div class="mb-4">
        <!-- <label class="font-bold text-grey-darker block mb-2">Password</label> -->
        <input
          type="password"
          class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
          placeholder="Your Password"
          v-model="password"
        />
      </div>

      <div class="flex items-center justify-between">
        <button @click.prevent="register">
          Create
        </button>
      </div>
    </div>
    <div class="text-center">
      <p class="text-grey-dark text-sm">
        Already have an account?
        <a href="login" class="no-underline text-blue font-bold">Login</a>.
      </p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'register',
  data: () => {
    return { email: '', password: '' };
  },
  methods: {
    register ()  {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            this.$router.go({path: this.$router.path});
          },
          (err) => {
            alert(err.message);
          },
        );
    },
  },
};
</script>

<style></style>
