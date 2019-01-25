<template>
  <div class="list-item">
    <span class="day">{{data.date | humanize}}</span>
    <span class="icon">
      <img :src="data.icon">
    </span>
    <span class="condition">{{data.condition}}</span>
    <span class="temp-max">
      <v-icon name="thermometer-full" scale="2" color="rgb(255,150,150)"/>
      <span class="temp">{{data.maxTemp}}&#176;c</span>
    </span>
    <span class="temp-min">
      <v-icon name="thermometer-empty" scale="2" color="rgb(255, 255, 255)"/>
      <span class="temp">{{data.minTemp}}&#176;c</span>
    </span>
  </div>
</template>

<script>
import "vue-awesome/icons/thermometer-full";
import "vue-awesome/icons/thermometer-empty";
import Icon from "vue-awesome/components/Icon";
import moment from "moment";

export default {
  name: "forecast-list-item",
  props: ["data"],
  components: {
    "v-icon": Icon
  },
  filters: {
    humanize(date) {
      return moment(date, "YYYY-MM-DD").format("DD MMMM");
    }
  }
};
</script>

<style scoped>
.list-item {
  position: relative;
  width: 740px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 2px;
}

.day {
  position: absolute;
  left: 15px;
  top: 22px;
  font-size: 1em;
}

.icon {
  position: absolute;
  width: 69px;
  left: 140px;
  top: 0px;
}

.condition {
  position: absolute;
  font-size: 1em;
  left: 250px;
  width: auto;
  top: 22px;
  text-align: left;
}

.temp-max {
  position: absolute;
  right: 230px;
  top: 15px;
  width: auto;
}

.temp-min {
  position: absolute;
  right: 100px;
  top: 15px;
  width: auto;
}

.temp {
  position: absolute;
  font-size: 1.6em;
  margin-left: 10px;
}
</style>
