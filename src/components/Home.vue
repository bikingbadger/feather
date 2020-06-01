<template>
  <div id="app">
    
    <VueApexCharts
      v-if="loaded"
      width="800"
      type="line"
      :options="pvOptions"
      :series="pvSeries"
    >
    </VueApexCharts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'Feather',
  components: {
    VueApexCharts,
  },
  data: () => ({
    loaded: false,
    openModal: false,
    weightData: [],
    url: '/.netlify/functions/weight-read-all',
    //Chart options
    pvOptions: null,
    pvSeries: null,
  }),
  methods: {
    showModal: function() {
      this.openModal = true;
    },
    hideModal: function() {
      this.openModal = false;
    },
    getWeightValues: async function() {
      this.weightData = await fetch(this.url, {
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
  async created() {
    // Fetch the data via API and convert response to json
    const resp = await fetch(this.url);
    // Store the json values into the 
    this.weightData = await resp.json();
    // console.log(data);
    this.pvOptions = {
      xaxis: {
        categories: [],
      },
    };

    this.pvSeries = [
      {
        name: 'Weight',
        data: [],
      },
    ];

    /**
     * It will also sort the data from oldest to newest based on the date
     */
    this.weightData.sort((a, b) => {
      const dateA = new Date(a.weightDate);
      const dateB = new Date(b.weightDate);

      /**
       * Return result based on whether the date is bigger or smaller
       * The return is based on sorting oldest to newest so
       * newer values should come after older ones
       */
      if (dateA > dateB) return 1;
      if (dateA < dateB) return -1;
      return 0;
    });

    console.log();

    this.weightData.forEach((value) => {
      // console.log(value.weightDate);
      this.pvOptions.xaxis.categories.push(value.weightDate);
      this.pvSeries[0].data.push(value.weightKilograms);
    });

    this.loaded = true;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
