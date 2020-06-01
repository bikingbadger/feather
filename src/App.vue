<template>
  <div id="app" class="container mx-auto text-center">
    <div class="grid grid-cols-1">
      <div class="grid justify-center">
        <img src="@/assets/icons8-scale-64.png" alt="Scale Icon" />
      </div>
    </div>
    <div id="nav" class="p-8">
      <router-link to="/" class="font-bold">Home</router-link> |
      <router-link to="/weight" class="font-bold">Weight</router-link>
    </div>
    <router-view />
  </div>
</template>

<style></style>
