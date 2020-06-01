<template>
  <div id="app">
    <div class="grid grid-cols-1">
      <div class="grid justify-center">
        <img src="@/assets/icons8-scale-64.png" alt="Scale Icon" />
      </div>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/weight">Weight</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
