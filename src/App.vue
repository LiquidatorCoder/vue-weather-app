<template>
  <div id="app">
    <input
      type="search"
      name="Loaction"
      id="search"
      placeholder="Location"
      v-model="query"
      v-on:keypress.enter="fetchWeather()"
    >
    <div class="weather">
      <div
        class="weather-details"
        v-if="typeof weather.main != 'undefined'"
      >
        <img
          :src="icon()"
          alt=""
        >
        <div class="location">{{weather.name}}, {{weather.sys.country}}</div>
        <div class="date">{{date()}}</div>
        <div class="temp">{{Math.round(weather.main.temp)}}&#176;C</div>
        <div class="humidity">{{Math.round(weather.main.humidity)}}%</div>
        <div class="climate">{{weather.weather[0].main}}</div>
        <div class="climate-desc">{{weather.weather[0].description}}</div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {
      api_key: "7b678bd07458e876f1fff30ddcde15de",
      base_url: "https://api.openweathermap.org/data/2.5/weather?q=",
      api_url: "&units=metric&appid=7b678bd07458e876f1fff30ddcde15de",
      icon_url: "http://openweathermap.org/img/wn/",
      query: "",
      weather: {}
    };
  },
  methods: {
    async fetchWeather() {
      const res = await fetch(this.base_url + this.query + this.api_url);
      this.weather = await res.json();
      this.query = await this.weather.name;
    },
    date() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;
      return today;
    },
    icon() {
      var image_url = this.icon_url + this.weather.weather[0].icon + "@2x.png";
      return image_url;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap");
#app {
  font-family: "Oxygen", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}
</style>
