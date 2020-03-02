import { normalizeDate } from "../helpers";
import Vue from "vue";
(function() {
  Vue.filter("truncate", (value, length) => {
    return value && value.length > length
      ? `${value.substring(0, length)}...`
      : value;
  });

  Vue.filter("normalizeDate", value => {
    return normalizeDate(value);
  });
})();
