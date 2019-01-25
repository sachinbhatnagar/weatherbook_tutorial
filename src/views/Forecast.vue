<template>
  <div :class="['forecast-panel', { night: !report.isDay }]">
    <span class="location-name">{{report.place}}</span>
    <span class="current-temp">{{report.temperature}}&#176;C</span>
    <span class="icon">
      <img :src="report.icon">
    </span>
    <span class="condition">{{report.condition}}</span>
    <span class="divider"/>
    <span class="forecast-title">7 DAY FORECAST</span>
    <span class="forecast-table">
      <forecast-list-item v-for="day in report.forecast" :data="day" :key="day.date"/>
    </span>
  </div>
</template>

<script>
import ForecastListItem from "@/components/ForecastListItem";
export default {
  name: "forecast",
  props: ["report"],
  components: {
    ForecastListItem
  }
};
</script>

<style>
.forecast-panel {
  position: relative;
  background-color: rgba(0, 155, 226, 0.9);
  background: -webkit-linear-gradient(
    top,
    #87e0fd 0%,
    #53cbf1 40%,
    #05abe0 100%
  );
  background: linear-gradient(to bottom, #87e0fd 0%, #53cbf1 40%, #05abe0 100%);
  color: rgb(0, 0, 0);
  width: 760px;
  height: 670px;
}

.night {
  color: rgb(255, 255, 255);
  background: -webkit-linear-gradient(
    top,
    #575d93 0%,
    #191b2b 82%,
    #191b2b 100%
  );
  background: linear-gradient(to bottom, #575d93 0%, #191b2b 82%, #191b2b 100%);
}

.location-name {
  position: absolute;
  font-size: 1.5em;
  top: 15px;
  left: 15px;
}

.current-temp {
  position: absolute;
  font-size: 70px;
  left: 15px;
  top: 40px;
}

.icon {
  position: absolute;
  right: 20px;
  top: 20px;
}

.condition {
  position: absolute;
  top: 80px;
  right: 20px;
  font-size: 1.4em;
}

.divider {
  position: absolute;
  height: 1px;
  width: 740px;
  top: 140px;
  left: 10px;
  background-color: rgb(255, 255, 255);
}

.forecast-title {
  position: absolute;
  font-size: 1.3em;
  left: 10px;
  top: 145px;
  font-weight: bold;
}

.forecast-table {
  position: absolute;
  top: 190px;
  left: 10px;
}
</style>
