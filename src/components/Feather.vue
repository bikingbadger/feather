<template>
  <div id="app">
    <div style="scale">
      <div class="icon">
        <img src="../assets/icons8-scale-64.png" alt="Scale Icon" />
      </div>
    </div>
    <header>
      <div>
        <button
          id="btn-login"
          class="min-w-1/12 bg-transparent hover:bg-green-500 text-green-700 font-semibold uppercase hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded text-sm"
        >Log in</button>
        <button
          id="btn-logout"
          class="min-w-1/12 bg-transparent hover:bg-green-500 text-green-700 font-semibold uppercase hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded text-sm"
        >Log out</button>
      </div>
    </header>
    <button
      id="add-weight"
      @click="showModal = true"
      class="min-w-1/12 bg-transparent hover:bg-green-500 text-green-700 font-semibold uppercase hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded text-sm"
    >Add Weight</button>
    <Weight v-if="showModal" @close="showModal = false"></Weight>
    <div class="graph">
      <div id="chart-area"></div>
    </div>
  </div>
</template>

<script>
import Weight from "./Weight.vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  components: {
    Weight
  },
  data: () => ({
    showModal: false
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.scale {
  position: absolute;
  left: 50%;
  top: 0.5rem;
}
</style>
