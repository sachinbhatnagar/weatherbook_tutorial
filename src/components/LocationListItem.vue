<template>
  <div class="preloader" v-if="hasLoaded === false"/>
  <div :class="['loc-list-item', { night: !report.isDay }]" v-else>
    <span class="local-time">{{report.localtime | humanize}}</span>
    <span class="place-name" @click="gotoForecast()">
      <strong>{{report.place | city}}</strong>
      |
      {{report.condition}}
    </span>
    
    <span class="temp-display">{{report.temperature}} &#176;C</span>
    <span class="icon-holder">
      <img :src="report.icon">
    </span>
    <span class="remove-btn" @click="removeLocation()">
      <v-icon name="window-close" scale="1.5" color="rgb(255, 255, 255)"/>
    </span>
  </div>
</template>

<script>
import "vue-awesome/icons/window-close";
import Icon from "vue-awesome/components/Icon";
import weather from "@/services/weather";
import moment from "moment";

export default {
  name: "location-list-item",
  props: ["location"],
  components: {
    "v-icon": Icon
  },
  data() {
    return {
      report: {},
      hasLoaded: false
    };
  },
  async created() {
    const report = await weather(this.location);
    this.report = report;
    this.hasLoaded = true;
  },
  filters: {
    city(location) {
      return location.split(", ")[0];
    },
    humanize(date) {
      return moment(date, "YYYY-MM-DD h:mm").format("DD MMMM, YYYY | h:mm a");
    }
  },
  methods: {
    gotoForecast() {
      this.$router.push({
        name: "forecast",
        params: {
          report: this.report
        }
      });
    },
    removeLocation() {
      const isConfirmed = confirm(
        `Do you wish to remove ${this.report.place}?`
      );

      if (isConfirmed) {
        this.$emit("locationRemoved", this.report.place);
      }
    }
  }
};
</script>

<style scoped>
.preloader {
  position: relative;
  background-color: rgb(15, 42, 77);
  width: 750px;
  height: 80px;
  margin-bottom: 5px;
  background-image: url("../assets/preloader.gif");
  background-repeat: no-repeat;
  background-position: center;
}

.loc-list-item {
  position: relative;
  background-color: rgb(44, 169, 241);
  background: -webkit-linear-gradient(top, #00b7ea 0%, #009ec3 100%);
  background: linear-gradient(to bottom, #00b7ea 0%, #009ec3 100%);
  padding: 10px;
  width: 750px;
  height: 80px;
  box-sizing: border-box;
  margin-bottom: 5px;
  color: rgb(255, 255, 255);
}

.night {
  background-color: rgb(16, 32, 41);
  background: -webkit-linear-gradient(
    top,
    #575d93 0%,
    #191b2b 82%,
    #191b2b 100%
  );
  background: linear-gradient(to bottom, #575d93 0%, #191b2b 82%, #191b2b 100%);
}

.temp-display {
  position: absolute;
  margin: 0px;
  padding: 0px;
  font-size: 2.9em;
  right: 160px;
  top: 10px;
  /* color: rgb(255, 255, 255); */
}

.place-name {
  position: absolute;
  margin: 0px;
  padding: 0px;
  font-size: 1.2em;
  left: 10px;
  bottom: 15px;
  cursor: pointer;
}

.place-name:hover {
  text-decoration: underline;
}

.icon-holder {
  position: absolute;
  right: 70px;
}

.local-time {
  position: absolute;
  left: 10px;
  top: 15px;
}

.remove-btn {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 30px;
  right: 10px;
  background-color: transparent;
  cursor: pointer;
}
</style>
