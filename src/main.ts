import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Maska from "maska";

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
  .use(vuetify)
  .use(router)
  .use(Maska as any)
  .mount("#app");
