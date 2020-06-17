<template>
  <!-- opacity-0 pointer-events-none  -->
  <div
    class="grid justify-center md:border-2 rounded border-blue-500 p-4 md:mx-32 gap-4 text-sm md:text-xl"
  >
    <!-- <div
      class="absolute md:w-1/2 py-8 bg-white rounded-lg shadow-lg md:text-xl grid justify-center gap-4"
    > -->
    <div class="grid grid-cols-3 grid-flow-col gap-4 mx-4">
      <label class="grid justify-start py-2" for="weight-date">Date</label>
      <input
        class="bg-blue-100 rounded p-2 col-span-2"
        type="date"
        name="weight-date"
        id="weight-date"
        v-model="weightDate"
      />
    </div>
    <div class="grid grid-cols-3 grid-flow-col gap-4 mx-4">
      <label class="grid justify-start py-2" for="weight">Enter weight?</label>
      <input
        class="bg-blue-100 rounded p-2 col-span-2"
        type="number"
        step="0.1"
        min="0"
        name="weight-kilograms"
        id="weight-kilograms"
        v-model="weightKilograms"
      />
    </div>
    <div class="grid grid-cols-3 grid-flow-col gap-4 mx-4">
      <label class="grid justify-start py-2" for="fat-perc">Fat %</label>
      <input
        class="bg-blue-100 rounded p-2 col-span-2"
        type="number"
        step="0.1"
        min="0"
        name="fat-perc"
        id="fat-perc"
        v-model="fatPercent"
      />
    </div>
    <div class="grid grid-cols-3 grid-flow-col gap-4 mx-4">
      <label class="grid justify-start py-2" for="weight-bone"
        >Bone Weight</label
      >
      <input
        class="bg-blue-100 rounded p-2 col-span-2"
        type="number"
        step="0.1"
        min="0"
        name="weight-bone"
        id="weight-bone"
        v-model="weightBone"
      />
    </div>
    <div class="grid grid-cols-3 grid-flow-col gap-4 mx-4">
      <label class="grid justify-start py-2" for="water-perc">Water %</label>
      <input
        class="bg-blue-100 rounded p-2 col-span-2"
        type="number"
        step="0.1"
        min="0"
        name="water-perc"
        id="water-perc"
        v-model="waterPercent"
      />
    </div>
    <div class="grid grid-cols-3 grid-flow-col gap-4 mx-4">
      <label class="grid justify-start py-2" for="weight-muscle">Muscle</label>
      <input
        class="bg-blue-100 rounded p-2 col-span-2"
        type="number"
        step="0.1"
        min="0"
        name="weight-muscle"
        id="weight-muscle"
        v-model="weightMuscle"
      />
    </div>
    <div class="grid grid-cols-3 grid-flow-col gap-4 mx-4">
      <label class="grid justify-start py-2" for="belly-index"
        >Belly Index</label
      >
      <input
        class="bg-blue-100 rounded p-2 col-span-2"
        type="number"
        step="0.1"
        min="0"
        name="belly-index"
        id="belly-index"
        v-model="bellyIndex"
      />
    </div>
    <div class="button-item span-across">
      <button @click="createWeight">
        Add weight
      </button>
    </div>
  </div>
</template>

<script>
const url = '/.netlify/functions/weight-create';

export default {
  data: () => ({
    weightDate: '',
    weightKilograms: 0.0,
    fatPercent: 0.0,
    weightBone: 0.0,
    waterPercent: 0.0,
    weightMuscle: 0.0,
    bellyIndex: 0.0,
  }),
  methods: {
    createWeight: function() {
      if (this.weightKilograms <= 0) {
        alert('Weight is required');
        return;
      }

      const weight = {
        weightDate: this.weightDate,
        weightKilograms: this.weightKilograms,
        fatPercent: this.fatPercent ? this.fatPercent : 0.0,
        weightBone: this.weightBone ? this.weightBone : 0.0,
        waterPercent: this.waterPercent ? this.waterPercent : 0.0,
        weightMuscle: this.weightMuscle ? this.weightMuscle : 0.0,
        bellyIndex: this.bellyIndex ? this.bellyIndex : 0.0,
      };
      console.log(weight);
      //Create weight
      const accessToken = 'Test123'; //localStorage.getItem('accessToken');
      // console.log(accessToken);
      // console.log(weight);
      fetch(url, {
        // mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(weight),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // TODO: updateChart();
        })
        .catch((err) => {
          console.log(err);
        });

      // Reset Values
      this.weightDate = '';
      this.weightKilograms = '';
      this.fatPercent = '';
      this.weightBone = '';
      this.waterPercent = '';
      this.weightMuscle = '';
      this.bellyIndex = '';
    },
  },
};
</script>

<style></style>
