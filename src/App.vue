<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "web-intro",
  data() {
    return {}
  },
  methods: {},
  mounted() {
    // if (!localStorage.getItem("token")) {
    //   this.$router.push('/login');
    // }
  }
}
</script>
<style lang="less">
html {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.el-carousel__indicators {
  display: none !important;
}

.no-select {
  -webkit-user-select: none; /* Safari 3.1+ */
  -moz-user-select: none; /* Firefox 2+ */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Standard syntax */
}
</style>
