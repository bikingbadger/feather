<template>
  <div id="app">
    <div class="grid grid-cols-1">
      <div class="grid justify-center">
        <img src="../assets/icons8-scale-64.png" alt="Scale Icon" />
      </div>
    </div>
    <header>
      <div class="grid md:grid-flow-col p-4 gap-2">
        <!-- <button id="btn-login">Log in</button>
        <button id="btn-logout">Log out</button> -->
        <button @click="showModal()">Add Weight</button>
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
    weight: [],
    url: '/.netlify/functions/weight-read-all',
  }),
  methods: {
    showModal: function() {
      this.openModal = true;
    },
    hideModal: function() {
      this.openModal = false;
    },
    getWeightValues: async function() {
      this.weight = await fetch(this.url, {
        // mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        });
      // console.log(this.weight[0].weightKilograms);
    },
  },
  created() {
    this.getWeightValues();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
