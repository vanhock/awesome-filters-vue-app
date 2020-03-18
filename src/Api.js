import axios from "axios";
import {notification} from "./notification";
import router from "./_router/index"
class Api {
  constructor() {
    let service = axios.create();
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = error => {
    if (error.response.status === 401) {
      //this.redirectTo(document, "");
      router.push("/unauthorized")
    } else {
      notification.error("Что то пошло не так, перезагрузите страницу и попробуйте снова");
    }
    return Promise.reject(error);
  };

  redirectTo = (document, path) => {
    document.location = path;
  };

  async get(path, options = {}) {
    return await this.service.request({
      method: "GET",
      url: path,
      ...options
    });
  }

  async patch(path, payload) {
    return await this.service
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload
      })
  }

  async post(path, payload, options = {}) {
    return await this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
        ...options
      })
  }
}

export default new Api();
