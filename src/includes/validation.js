import {
  ErrorMessage,
  Field as VeeField,
  Form as VeeForm,
  configure,
  defineRule
} from "vee-validate";
import {
  alpha_spaces as alphaSpaces,
  confirmed,
  email,
  not_one_of as excluded,
  max,
  max_value as maxValue,
  min,
  min_value as minValue,
  numeric,
  required
} from "@vee-validate/rules";

import { defineComponent } from "vue";

export default defineComponent({
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("tos", required);
    defineRule("min", min);
    defineRule("min_value", minValue);
    defineRule("max", max);
    defineRule("max_value", maxValue);
    defineRule("email", email);
    defineRule("numeric", numeric);
    defineRule("confirmed", confirmed);
    defineRule("excluded", excluded);
    defineRule("alpha_spaces", alphaSpaces);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The ${ctx.field} field is required.`,
          min: `The ${ctx.field} field is too short.`,
          max: `The ${ctx.field} field is too long.`,
          alpha_spaces: `The ${ctx.field} field is for letters and spaces.`,
          email: `The ${ctx.field} field must be a valid email.`,
          numeric: `The ${ctx.field} field must be a number.`,
          excluded: `The ${ctx.value} value  is not available for the ${ctx.field} field.`,
          max_value: `The ${ctx.field} field value should be less than ${ctx.value}.`,
          min_value: `The ${ctx.field} field value should be greater than ${ctx.value}.`,
          confirmed: `The passwords don't match`,
          tos: "You  must accept the Terms of Service"
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The ${ctx.field} field is invalid`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    });
  }
});
