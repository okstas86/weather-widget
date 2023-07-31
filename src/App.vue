<template>
  <WeatherWidget />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherWidget from "./components/WeatherWidget.vue";

export default defineComponent({
  name: "App",
  components: {
    WeatherWidget,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #007bff;
  margin-top: 60px;
}
</style>
