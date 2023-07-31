<template>
  <div :class="['weather-widget', theme]">
    <div>
      <SvgSelector
        :id="'change-theme'"
        @click="changeTheme"
        title="Change Theme"
      >
        <span>Change Theme</span></SvgSelector
      >

      <h1>Weather</h1>
      <div v-if="id">
        <SvgSelector :id="mainWeather" />
      </div>
    </div>
    <transition-group name="fade" >
    <transition  name="fade" v-if="showAddCity">
    <div class="add-city" >
      <input
        v-model="searchCity"
        type="text"
        placeholder="Введите название города"
      />
      <button @click="getWeather" >Получить погоду</button>
    </div>
  </transition>

  
    
      <div v-for="(city, index) in items" v-else  :key="index" class="weather-card">
        <SvgSelector :id="'close'" @click="remove(index)" />

        <h2>{{ city }}</h2>
        <div>
          <p>Температура: {{ weatherData[city]?.temp }}°C</p>
          <p>Описание: {{ weatherData[city]?.description }}</p>
        </div>
        <p>Ощущается как: {{ weatherData[city]?.feels_like }}°C</p>
        <p>Минимальная температура: {{ weatherData[city]?.low_temp }}°C</p>
        <div>
          <p>Максимальная температура: {{ weatherData[city]?.high_temp }}°C</p>
          <p>Влажность: {{ weatherData[city]?.humidity }}%</p>
        </div>
        <div>
          <p>
            Раствет:
            {{
              weatherData[city]?.sunrise
                ? new Date(weatherData[city]?.sunrise * 1000).toLocaleString(
                    "en-US",
                    { timeStyle: "short" }
                  )
                : "Н/Д"
            }}
          </p>
          <p>
            Закат:
            {{
              weatherData[city]?.sunset
                ? new Date(weatherData[city]?.sunset * 1000).toLocaleString(
                    "en-US",
                    { timeStyle: "short" }
                  )
                : "Н/Д"
            }}
          </p>
        </div>
      </div>
    </transition-group>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";


interface WeatherData {
  temp: number;
  description: string;
  feels_like: number;
  low_temp: number;
  high_temp: number;
  humidity: number;
  mainWeather: string;
  sunrise: number;
  sunset: number;
}

export default defineComponent({
  setup() {
    const searchCity = ref("");
    const weatherData: { [city: string]: WeatherData } = {};
    const items = ref<string[]>([]);
    const mainWeather = ref<string>("");
    const sunrise = ref<number>();
    const sunset = ref<number>();
    
    const id = ref(true);
    const theme: Ref<string> = ref("light");
    const showAddCity = ref<boolean>(true);

    async function getWeather() {
      if (!searchCity.value) {
        alert("Пожалуйста, введите название города.");
        return;
      }

      const key = "c9209b7eea3ebd7cb5b3bbd134d66113";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric&appid=${key}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      
      id.value = true;
      showAddCity.value = false;

      if (data.cod === "404") {
        alert(
          "Город не найден. Пожалуйста, введите правильное название города."
        );
        return;
      }

      const city = searchCity.value;

      weatherData[city] = {
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        feels_like: Math.round(data.main.feels_like),
        low_temp: Math.round(data.main.temp_min),
        high_temp: Math.round(data.main.temp_max),
        humidity: data.main.humidity,
        mainWeather: data.weather[0].main,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
      };

      mainWeather.value = data.weather[0].main;
      sunrise.value = data.sys.sunrise;
      sunset.value = data.sys.sunrise;

      items.value.push(city);
      searchCity.value = "";
    }

    function remove(index: number) {
      if (index >= 0 && index < items.value.length) {
        const city = items.value[index];
        delete weatherData[city];
        items.value.splice(index, 1);
        id.value = false;
        showAddCity.value = true;
      }
    }

    function changeTheme() {
      theme.value = theme.value === "light" ? "dark" : "light";
    }

    return {
      searchCity,
      weatherData,
      items,
      mainWeather,
      getWeather,
      remove,
      id,
      sunrise,
      sunset,
      changeTheme,
      theme,
      showAddCity
    };
  },
});
</script>
