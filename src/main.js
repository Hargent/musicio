import "./style.css";

import App from "./App.vue";
import VeeValidatePlugin from "./includes/validation";
import { createApp } from "vue";
import { router } from "./route";
import { store } from "./store";

const app = createApp(App);

app.use(store);

app.use(router);
app.use(VeeValidatePlugin);
app.mount("#app");
