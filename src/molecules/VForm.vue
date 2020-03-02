<template>
  <div class="form">
    <div class="popup" :class="{ show: togglePopup }">
      <div class="popup-content">
        <label class="close" @click="closePopup"></label>
        <div class="inner">
          <div class="message success" v-if="success">{{ success }}</div>
          <div class="message error" v-if="error" v-html="error"></div>
        </div>
      </div>
    </div>
    <form :action="action" :method="method" @submit.prevent="onSubmit">
      <slot></slot>
    </form>
  </div>
</template>

<script>
import { serialize } from "../_helpers/serialize-0.2.min";
import axios from "axios";

export default {
  name: "VForm",
  props: {
    action: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: "post"
    },
    formId: {
      type: String,
      default: "form"
    },
    popupButtonText: {
      type: String,
      default: "Закрыть"
    },
    errorMessage: {
      type: String,
      default: "Ошибка при отправке, попробуйте еще раз"
    }
  },
  data() {
    return {
      success: "",
      error: "",
      togglePopup: false
    };
  },
  methods: {
    onSubmit: function(e) {
      let self = this,
        form = e.currentTarget,
        data = serialize(form);
      axios({
        method: this.method,
        url: this.action + "?" + data,
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(r => {
          if (r.data.status === "ok") {
            self.success = r.data.notice;
            self.error = "";
            self.togglePopup = true;
            self.clearForm(form);
          } else {
            if (r.data.errors && Object.entries(r.data.errors).length > 0) {
              let errors = "<b>Форма содержит ошибки:</b><br>";
              for (let er in r.data.errors) {
                errors += r.data.errors[er][0] + "<br />";
              }
              self.error = errors;
            } else {
              self.error = self.errorMessage;
            }
            self.togglePopup = true;
          }
        })
        .catch(error => {
          self.error = self.errorMessage;
          self.togglePopup = true;
        });
    },
    clearForm: function(form) {
      form.querySelectorAll('input:not([type="submit"])').forEach(i => {
        i.value = "";
      });
      form.querySelectorAll("textarea").forEach(i => {
        i.value = "";
      });
    },
    closePopup: function() {
      this.success = "";
      this.error = "";
      this.togglePopup = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.popup {
  &.show {
    visibility: visible;
    z-index: 9991;
  }
  &-content {
    margin-top: 15px;
    .message {
      margin-bottom: 30px;
      &.success {
        color: #009900;
      }
      &.error {
        color: #a90707;
      }
    }
  }
}

.form-group {
  &:not(:last-child) {
    margin-bottom: 15px;
  }
  [type="text"],
  [type="password"],
  [type="phone"],
  textarea {
    border: 1px solid #ccc;
    padding: 5px 10px 4px;
    display: block;
    margin-top: 8px;
    width: 100%;
  }
}
.feedback-form {
  border: 1px solid #d0d0d0;
  padding: 30px;
}
</style>
