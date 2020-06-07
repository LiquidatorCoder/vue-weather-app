<template>
  <div
    id="app"
    v-bind:class="{clear: clear,snow: snow, rain: rain, clouds: clouds}"
  >
    <input
      type="search"
      name="Loaction"
      id="search"
      placeholder="Location"
      v-model="query"
      v-on:keypress.enter="fetchWeather()"
    >
    <div
      class="weather"
      v-if="typeof weather.main != 'undefined'"
    >
      <div class="weather-details">
        <img
          class="icon"
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
    <img
      src="./assets/loader.gif"
      v-if="!dataFetched"
    >
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
      weather: {},
      dataFetched: true,
      clear: true,
      clouds: false,
      rain: false,
      snow: false
    };
  },
  methods: {
    async fetchWeather() {
      this.dataFetched = false;
      this.weather = {};
      const res = await fetch(this.base_url + this.query + this.api_url);
      this.weather = await res.json();
      this.query = await this.weather.name;
      this.dataFetched = true;
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
      if (
        this.weather.weather[0].icon == "01d" ||
        this.weather.weather[0].icon == "01n"
      ) {
        this.clear = true;
        this.clouds = false;
        this.rain = false;
        this.snow = false;
      } else if (
        this.weather.weather[0].icon == "02d" ||
        this.weather.weather[0].icon == "02n" ||
        this.weather.weather[0].icon == "03d" ||
        this.weather.weather[0].icon == "03n" ||
        this.weather.weather[0].icon == "04d" ||
        this.weather.weather[0].icon == "04n"
      ) {
        this.clear = false;
        this.clouds = true;
        this.rain = false;
        this.snow = false;
      } else if (
        this.weather.weather[0].icon == "09d" ||
        this.weather.weather[0].icon == "09n" ||
        this.weather.weather[0].icon == "10d" ||
        this.weather.weather[0].icon == "10n" ||
        this.weather.weather[0].icon == "11d" ||
        this.weather.weather[0].icon == "11n"
      ) {
        this.clear = false;
        this.clouds = false;
        this.rain = true;
        this.snow = false;
      } else if (
        this.weather.weather[0].icon == "13d" ||
        this.weather.weather[0].icon == "13n" ||
        this.weather.weather[0].icon == "50d" ||
        this.weather.weather[0].icon == "50n"
      ) {
        this.clear = false;
        this.clouds = false;
        this.rain = false;
        this.snow = true;
      }
      return image_url;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap");
* {
  margin: 0;
  padding: 0;
}
#app {
  min-height: 100vh;
  font-family: "Oxygen", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 20px 10px;
  box-sizing: border-box;
  transition: background 1.4s;
}
#search {
  width: 100%;
  max-width: 50rem;
  border: 0;
  padding: 20px;
  opacity: 70%;
  background-color: #ffffff;
  border-radius: 10px;
  font-size: 1rem;
  box-shadow: 5px 5px 30px -9px rgba(0, 0, 0, 0.2);
  color: #555555;
}

#search::placeholder {
  font-size: 1rem;
  color: #888888;
}

.weather {
  width: 100%;
  height: 100%;
  max-width: 40rem;
  margin: 20px auto;
  padding: 20px;
  opacity: 70%;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 5px 5px 30px -9px rgba(0, 0, 0, 0.2);
}

.icon {
  width: 100px;
}

.clear {
  background-size: cover;
  background: #ffb75e;
  background: -webkit-linear-gradient(to right, #ed8f03, #ffb75e);
  background: linear-gradient(to right, #ed8f03, #ffb75e);
}
.clouds {
  background: #76b852;
  background: -webkit-linear-gradient(to right, #8dc26f, #76b852);
  background: linear-gradient(to right, #8dc26f, #76b852);
}
.rain {
  background: #673ab7;
  background: -webkit-linear-gradient(to right, #512da8, #673ab7);
  background: linear-gradient(to right, #512da8, #673ab7);
}

.snow {
  background: #8e9eab;
  background: -webkit-linear-gradient(to right, #eef2f3, #8e9eab);
  background: linear-gradient(to right, #eef2f3, #8e9eab);
}
</style>
