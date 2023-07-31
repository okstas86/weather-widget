import { createApp } from "vue";
import App from "./App.vue";
import SvgSelector from "./components/SvgSelector.vue";
import WeatherWidget from "./components/WeatherWidget.vue";
import "./style/variables.scss";
import "./style/index.scss";

const app = createApp(App);

app.config.compilerOptions.isCustomElement = (tag: string) =>
  tag === "svg-selector";

app.component("SvgSelector", SvgSelector);
app.component("weather-widget", WeatherWidget);

app.mount("#app");
