/* import the fontawesome core */

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faTarpDroplet } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

// import { faMusic } from "@fortawesome/free-solid-svg-icons";

/* import font awesome icon component */

/* import specific icons */

/* add icons to the library */
library.add(faMusic, faCircleCheck, faTarpDroplet, faSpinner);
export default {
  install(app) {
    // Register the FontAwesomeIcon component globally
    app.component("font-awesome-icon", FontAwesomeIcon);
  }
};
