import "@fortawesome/fontawesome-free/css/all.min.css";
import VueCompositionApi from "@vue/composition-api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "jquery/dist/jquery.min.js";
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
new Vue({
    render: h => h(App)
}).$mount("#app");
