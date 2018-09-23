import Vue from "vue";
import VueMaterial from "vue-material";
import App from "./App.vue";
import store from "./store";

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default-dark.css";

Vue.config.productionTip = false;

Vue.use(VueMaterial);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");




