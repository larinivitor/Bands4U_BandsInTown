<template>
  <div class="App" >
    <Search />
    <Info>
      <Events slot="events" />
    </Info>
    
  </div>
</template>

<script>
import Search from "components/Search.vue";
import Info from "components/Info.vue";
import Events from "components/Events.vue";

export default {
  name: "app",
  components: {
    Search,
    Info,
    Events
  }
};
</script>

<style lang="scss">

body{
  background-image: url('../imgs/background.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.App {
  padding: 50px;
  text-align: center;
}

</style>
