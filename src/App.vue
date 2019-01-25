<template>
  <div id="app">
    <router-link to="/">
      <div id="app-logo">WeatherBook</div>
    </router-link>
    <div id="nav">
      <router-link to="/add">
        <v-icon name="plus-square" scale="2" color="rgb(255,255,255)"/>
      </router-link>
    </div>
    <transition name="fade">
      <keep-alive>
        <router-view id="routerView"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import "vue-awesome/icons/plus-square";
import Icon from "vue-awesome/components/Icon";

export default {
  name: "app",
  components: {
    "v-icon": Icon
  }
};
</script>

<style>
body,
html {
  background-color: rgb(82, 82, 82);
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  width: 800px;
  height: 770px;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgba(20, 20, 20, 0.897);
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  margin: auto;
}

a {
  color: rgb(255, 255, 255);
}

#app-logo {
  position: absolute;
  font-size: 30px;
  font-weight: bold;
}

#app-logo:hover {
  text-decoration: underline;
}

#nav {
  position: absolute;
  right: 20px;
  top: 25px;
  font-size: 20px;
}

#routerView {
  position: absolute;
  top: 75px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
