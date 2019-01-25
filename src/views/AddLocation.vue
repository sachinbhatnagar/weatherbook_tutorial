<template>
  <div class="add-location-panel">
    <span class="title">Add a Location</span>
    <span @click="goBack" class="goback-btn">
      <v-icon name="window-close" scale="1.5" color="rgb(190,0,0)"/>
    </span>
    <span class="location-input">
      <input
        type="text"
        placeholder="Type in a location..."
        v-model="locationQuery"
        @keyup="getLocation"
      >
    </span>
    <span class="suggestions-panel">
      <ul class="suggestions-list">
        <li
          v-for="location in suggestions"
          :key="location"
          @click="setLocation(location)"
        >{{location}}</li>
      </ul>
    </span>
  </div>
</template>

<script>
import location from "../services/location";
import storage from "../services/storage";
import _ from "lodash";
import "vue-awesome/icons/window-close";
import Icon from "vue-awesome/components/Icon";

export default {
  name: "add-location",
  components: {
    "v-icon": Icon
  },
  data() {
    return {
      locationQuery: "",
      suggestions: []
    };
  },
  methods: {
    getLocation: _.debounce(async function() {
      if (this.locationQuery !== "") {
        const getSuggestions = await location(this.locationQuery);
        this.suggestions = getSuggestions.map(place => {
          const splitLocation = place.name.split(", ");
          return `${splitLocation[0]}, ${place.country}`;
        });
      } else {
        this.suggestions = [];
      }
    }, 200),
    setLocation(location) {
      // store location and redirect
      storage.storeLocation(location);
      this.goBack();
    },
    goBack() {
      this.locationQuery = "";
      this.suggestions = [];
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.add-location-panel {
  position: relative;
  background-color: rgba(41, 41, 58, 0.9);
  width: 760px;
  height: 670px;
  color: rgb(255, 255, 255);
}

.title {
  position: absolute;
  font-size: 1.8em;
  left: 10px;
  top: 10px;
}

.location-input {
  position: absolute;
  top: 70px;
  left: 0px;
  padding: 5px;
}

input {
  font-size: 30px;
  padding: 20px;
  border: 0;
  outline: none;
  width: 710px;
}

.suggestions-panel {
  position: absolute;
  top: 152px;
  left: 10px;
  width: 740px;
}

.suggestions-list {
  margin: 0px;
  padding: 0px;
  list-style: none;
}

.suggestions-list > li {
  position: relative;
  padding: 12px;
  box-sizing: border-box;
  background-color: rgb(231, 231, 231);
  text-align: left;
  color: rgb(0, 87, 158);
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
}

.goback-btn {
  position: absolute;
  top: 18px;
  right: 10px;
  cursor: pointer;
}
</style>
