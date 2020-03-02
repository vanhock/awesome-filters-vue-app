import moment from "moment";
/**
 * Возвращает значение параметра по имени и url
 * @param name
 * @param url
 * @returns {string}
 */
export const getParameterByName = function(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const setCookie = function(name, value, options) {
  options = options || {};

  let expires = options.expires;

  if (typeof expires === "number" && expires) {
    const d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = name + "=" + value;

  for (const propName in options) {
    if (!options.hasOwnProperty(propName)) {
      continue;
    }
    updatedCookie += "; " + propName;
    const propValue = options[propName];

    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
};

export const deleteCookie = function(name) {
  setCookie(name, "", {
    expires: -1,
    path: "/"
  });
};

export const getCookie = function(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const parents = function(el, cls) {
  if (!el.classList.contains(cls)) el = el.parentElement;
  return el;
};

export const normalizeDate = function(date) {
  if(!date || typeof date !== "string") {
    return date
  }
  if (moment().diff(moment(date), "hours") <= 24) {
    return moment(date).fromNow();
  } else {
    return moment(date).format("D.MM.YY");
  }
};