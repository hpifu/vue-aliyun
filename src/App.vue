<template>
  <v-app>
    <THeader />
    <TSlider />

    <v-content>
      <transition name="slide-x-transition" mode="out-in">
        <v-container mt-10>
          <router-view></router-view>
        </v-container>
      </transition>
    </v-content>
  </v-app>
</template>

<style>
#app {
  font-family: "Roboto Condensed", sans-serif;
  /* font-family: "Inconsolata", "ZCOOL XiaoWei", sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fafafa;
}
</style>

<script>
import THeader from "./components/THeader";
import TSlider from "./components/TSlider";

export default {
  name: "App",
  components: {
    THeader,
    TSlider
  },
  data: () => ({
    //
  })
};
</script>
