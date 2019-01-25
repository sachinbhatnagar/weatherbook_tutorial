<template>
  <div class="location-list">
    <location-list-item
      v-for="city in locations"
      :location="city.place"
      :key="city.id"
      @locationRemoved="updateList"
    />
  </div>
</template>

<script>
import LocationListItem from "@/components/LocationListItem";
import storage from "../services/storage";

export default {
  name: "home",
  components: {
    LocationListItem
  },
  data() {
    return {
      locations: []
    };
  },
  created() {
    this.getLocations();
  },
  methods: {
    getLocations() {
      this.locations = storage.getLocations();
    },
    updateList(location) {
      storage.deleteLocation(location);
      this.getLocations();
    }
  }
};
</script>

<style scoped>
.location-list {
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
  top: 50px;
  height: 680px;
  width: 770px;
  text-align: left;
  color: rgb(255, 255, 255);
}
</style>