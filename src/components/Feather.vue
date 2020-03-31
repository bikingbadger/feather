<template>
  <div id="app">
    <div class="grid grid-cols-1">
      <div class="grid justify-center">
        <img src="../assets/icons8-scale-64.png" alt="Scale Icon" />
      </div>
    </div>
    <header>
      <div>
        <button id="btn-login">Log in</button>
        <button id="btn-logout">Log out</button>
        <button id="add-weight" @click="showModal()">Add Weight</button>
      </div>
    </header>
    <Weight v-if="openModal" v-on:hideModal="hideModal()"></Weight>
    <div class="graph">
      <div id="chart-area"></div>
    </div>
  </div>
</template>

<script>
import Weight from './Weight.vue';

export default {
  name: 'Feather',
  components: {
    Weight,
  },
  data: () => ({
    openModal: false,
  }),
  methods: {
    showModal: function() {
      this.openModal = true;
    },
    hideModal: function() {
      this.openModal = false;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
