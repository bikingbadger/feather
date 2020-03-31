<template>
  <!-- opacity-0 pointer-events-none  -->
  <div
    class="modal absolute w-full h-full top-0 left-0 flex items-center justify-center"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-black opacity-25 top-0 left-0 cursor-pointer"
    ></div>

    <div class="absolute md:w-1/2 py-8 bg-white rounded-lg shadow-lg md:text-xl grid justify-center gap-4">
      <div class="grid grid-cols-3 grid-flow-col gap-4 mx-4">
        <label class="grid justify-start py-2" for="weight-date">Date</label>
        <input  class="bg-green-200 rounded p-2 col-span-2" type="date" name="weight-date" id="weight-date" />
      </div>
      <div class="grid grid-cols-3 grid-flow-col gap-4 mx-4">
        <label class="grid justify-start py-2" for="weight">Enter weight?</label>
        <input class="bg-green-200 rounded p-2 col-span-2"
          type="number"
          step="0.1"
          min="0"
          name="weight-kilograms"
          id="weight-kilograms"
        />
      </div>
      <div class="grid grid-cols-3 grid-flow-col gap-4 mx-4">
        <label class="grid justify-start py-2" for="fat-perc">Fat %</label>
        <input  class="bg-green-200 rounded p-2 col-span-2" type="number" step="0.1" min="0" name="fat-perc" id="fat-perc" />
      </div>
      <div class="grid grid-cols-3 grid-flow-col gap-4 mx-4">
        <label class="grid justify-start py-2" for="weight-bone">Bone Weight</label>
        <input class="bg-green-200 rounded p-2 col-span-2"
          type="number"
          step="0.1"
          min="0"
          name="weight-bone"
          id="weight-bone"
        />
      </div>
      <div class="grid grid-cols-3 grid-flow-col gap-4 mx-4">
        <label class="grid justify-start py-2" for="water-perc">Water %</label>
        <input class="bg-green-200 rounded p-2 col-span-2"
          type="number"
          step="0.1"
          min="0"
          name="water-perc"
          id="water-perc"
        />
      </div>
      <div class="grid grid-cols-3 grid-flow-col gap-4 mx-4">
        <label class="grid justify-start py-2" for="weight-muscle">Muscle</label>
        <input class="bg-green-200 rounded p-2 col-span-2"
          type="number"
          step="0.1"
          min="0"
          name="weight-muscle"
          id="weight-muscle"
        />
      </div>
      <div class="grid grid-cols-3 grid-flow-col gap-4 mx-4">
        <label class="grid justify-start py-2" for="belly-index">Belly Index</label>
        <input class="bg-green-200 rounded p-2 col-span-2"
          type="number"
          step="0.1"
          min="0"
          name="belly-index"
          id="belly-index"
        />
      </div>
      <div class="button-item span-across">
        <button @click="closeModal"
          type="submit">
          Add weight
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal: function () {
      console.log('Close Modal');
      this.$emit('hideModal');
    }
  }
};
</script>

<style></style>
