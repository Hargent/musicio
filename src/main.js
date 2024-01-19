import "./style.css";

import App from "./app.vue";
import IconsPlugin from "./includes/font-awesome";
import VeeValidatePlugin from "./includes/validation";
import { createApp } from "vue";
import { router } from "./route";
import { store } from "./store";

const app = createApp(App);

app.use(store);

app.use(router);
app.use(VeeValidatePlugin);
app.use(IconsPlugin);
app.mount("#app");
