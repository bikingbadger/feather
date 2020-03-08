<template>
  <form action>
    <div class="input-item-col">
      <label for="weight-date">Date</label>
      <input type="date" name="weight-date" id="weight-date" />
    </div>
    <div class="input-item-col">
      <label for="weight">Enter weight?</label>
      <input type="number" step="0.1" min="0" name="weight-kilograms" id="weight-kilograms" />
    </div>
    <div class="input-item-col">
      <label for="fat-perc">Fat %</label>
      <input type="number" step="0.1" min="0" name="fat-perc" id="fat-perc" />
    </div>
    <div class="input-item-col">
      <label for="weight-bone">Bone Weight</label>
      <input type="number" step="0.1" min="0" name="weight-bone" id="weight-bone" />
    </div>
    <div class="input-item-col">
      <label for="water-perc">Water %</label>
      <input type="number" step="0.1" min="0" name="water-perc" id="water-perc" />
    </div>
    <div class="input-item-col">
      <label for="weight-muscle">Muscle</label>
      <input type="number" step="0.1" min="0" name="weight-muscle" id="weight-muscle" />
    </div>
    <div class="input-item-col">
      <label for="belly-index">Belly Index</label>
      <input type="number" step="0.1" min="0" name="belly-index" id="belly-index" />
    </div>
    <div class="button-item span-across">
      <button
        type="submit"
        class="min-w-1/12 bg-transparent hover:bg-green-500 text-green-700 font-semibold uppercase hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded text-sm"
      >Add weight</button>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style>
</style>