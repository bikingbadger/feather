<template>
  <div id="app">
    <div
      class="grid justify-center md:border-2 rounded border-blue-500 p-4 md:mx-32 gap-4 text-sm md:text-xl"
    >
      <VueApexCharts
        v-if="loaded"
        width="100%"
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
        type: 'datetime',
        categories: [],
      },
      stroke: {
        curve: 'smooth',
      },
      colors: ['#002FA7', '#80c2ff', '##003d75', '#bfe1ff'],
    };

    this.pvSeries = [
      {
        name: 'Weight',
        data: [],
      },
      {
        name: 'Moving Avg',
        data: [],
      },
    ];

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
    let movingAvg = [];
    // The loop is between the first date and the last
    while (currentDate <= maxDate) {
      // Use the counter to set the date
      const weightDate = new Date(this.weightData[counter].weightDate);
      // console.log(currentDate, weightDate);
      // Check the values of the currentDate to the one in the array
      // If the dates are not equal then push an empty value into the array
      // This fills the array with the current dates in the loop where there are
      //   no values in the weight data
      const dateWeight = `${weightDate.getFullYear()}${weightDate.getMonth()}${weightDate.getDate()}`;
      const dateCurrent = `${currentDate.getFullYear()}${currentDate.getMonth()}${currentDate.getDate()}`;
      // console.log(dateCurrent, dateWeight);
      if (dateWeight !== dateCurrent) {
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

      const movingAvgLength = 7;
      if (counter > movingAvgLength) {
        if (movingAvg.length >= movingAvgLength) movingAvg.shift();
        movingAvg.push(currentWeight);
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;

        this.weightData[counter].movingAvg =
          movingAvg.reduce(reducer) / movingAvg.length;
      } else {
        this.weightData[counter].movingAvg = currentWeight;
      }

      // Increase the counter
      counter++;
      // Set the date to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Set the values in the graph by looping over the array with
    // the filled days
    // console.log(this.weightData);
    this.weightData.forEach((value) => {
      this.pvOptions.xaxis.categories.push(
        new Date(value.weightDate).getTime(),
      );
      this.pvSeries[0].data.push(value.weightKilograms);
      this.pvSeries[1].data.push(value.movingAvg);
    });

    this.loaded = true;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
