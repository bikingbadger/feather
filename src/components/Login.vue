<template>
  <div class="grid justify-center">
    <div
      class="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg "
    >
      <div class="mb-4">
        <label class="font-bold text-grey-darker block mb-2"
          >Username or Email</label
        >
        <input
          type="text"
          class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
          placeholder="Your Username"
        />
      </div>

      <div class="mb-4">
        <label class="font-bold text-grey-darker block mb-2">Password</label>
        <input
          type="text"
          class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
          placeholder="Your Password"
        />
      </div>

      <div class="flex items-center justify-between">
        <button>
          Login
        </button>

        <a
          class="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark float-right"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
    </div>
    <div class="text-center">
      <p class="text-grey-dark text-sm">
        Don't have an account?
        <a href="register" class="no-underline text-blue font-bold"
          >Create an Account</a
        >.
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
