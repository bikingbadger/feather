<template>
  <div id="app">
    <div class="grid justify-center border-2 rounded border-blue-500 p-4 mx-32">
      <VueApexCharts
        v-if="loaded"
        width="800"
        type="line"
        stroke="smooth"
        :options="pvOptions"
        :series="pvSeries"
      />
    </div>
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
    },
  },
  async created() {
    // Fetch the data via API and convert response to json
    const resp = await fetch(this.url);
    // Store the json values into the
    this.weightData = await resp.json();
    this.pvOptions = {
      xaxis: {
        // TODO: See if you can set the type to date for better formatting
        type: 'datetime',
        categories: [],
      },
      stroke: {
        curve: 'smooth',
      },
      colors: ['#002FA7'],
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

    /**
     * Fill the array with empty dates where a weight has not been input
     * This is to give the graph x-axis the correct number of days
     */
    // Find the first date and the last date in the array of wights
    let currentDate = new Date(this.weightData[0].weightDate);
    let maxDate = new Date(
      this.weightData[this.weightData.length - 1].weightDate,
    );
    // The counter is used for finding current index used to look up the array
    // This is updated inside the loop automatically but the initial values move
    //   on as empty dates are pushed on.
    let counter = 0;
    // The current weight is added to the empty value and updated once a weight entry
    //   is found. That way the weight stays the same during that time creating a flat
    //   line over time. This I found was the best way to get around the empty days.
    let currentWeight = this.weightData[0].weightKilograms;
    // The loop is between the first date and the last
    while (currentDate <= maxDate) {
      // Use the counter to set the date
      const weightDate = new Date(this.weightData[counter].weightDate);
      // Check the values of the currentDate to the one in the array
      // If the dates are not equal then push an empty value into the array
      // This fills the array with the current dates in the loop where there are
      //   no values in the weight data
      if (weightDate.valueOf() !== currentDate.valueOf()) {
        // Create the empty date for consistent look
        // The month and date need to be padded for single digit numbers
        const emptyYear = currentDate.getFullYear();
        let emptyMonth = currentDate.getMonth() + 1;
        emptyMonth.toString().padStart(2, '0');
        const emptyDate = currentDate
          .getDate()
          .toString()
          .padStart(2, '0');
        const emptyDateFull = `${emptyYear}-${emptyMonth}-${emptyDate}`;
        // Insert the empty weight using splice and the counter. This fills the array
        this.weightData.splice(counter, 0, {
          weightDate: emptyDateFull,
          weightKilograms: currentWeight,
        });
      } else {
        // If the date is found and is equal then set the current weight
        //   for the next empty values if there are any
        currentWeight = this.weightData[counter].weightKilograms;
      }

      // Increase the counter
      counter++;
      // Set the date to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Set the values in the graph by looping over the array with
    // the filled days
    this.weightData.forEach((value) => {
      this.pvOptions.xaxis.categories.push(
        new Date(value.weightDate).getTime(),
      );
      this.pvSeries[0].data.push(value.weightKilograms);
    });

    this.loaded = true;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
