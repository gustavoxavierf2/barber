import { createApp } from "vue";
import App from "./App.vue";
import { vMaska } from "maska";
import router from "./router";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { Vue } from "vue-class-component";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
  },
});

createApp(App)
  .directive("maska", vMaska)
  .use(vuetify)
  .use(router)
  .mount("#app");
