<template>
  <div class="form-group">
    <div class="form-group__toggle" v-if="toggle">
      <v-radio-checkbox
        name="form-toggle"
        @change="toggleForm"
        :checked="toggleChecked"
        :label="toggleLabel"
        ios
      />
    </div>
    <div class="form-group__title" v-if="title">{{ title }}</div>
    <div class="form-group__description" v-if="description">
      {{ description }}
    </div>
    <form
      ref="thisFormGroup"
      @submit.prevent="$emit('submit')"
      :class="{ changed: childrenChanged, loading: loading }"
      :disabled="toggle && !enabled"
    >
      <div class="form-items">
        <slot></slot>
      </div>
    </form>
  </div>
</template>

<script>
import VToggle from "../atoms/VToggle";
import VRadioCheckbox from "../atoms/VRadioCheckbox";
export default {
  name: "FormGroup",
  /**
   * This is the component - aggregator,
   * it tracks inputs data and returns changed items, placed in slot.
   * @returns: {
   *   changedItemsArray: [],
   *   changedItems: {},
   *   allItems: {},
   * }
   **/
  components: { VRadioCheckbox, VToggle },
  mounted() {
    this.$children.forEach((children, index) => {
      if (index === 0) {
        const targetEl = children.$el.querySelector("input:not([disabled])");
        targetEl && targetEl.focus();
      }
      children.$on("onchange", this.handleChildrenChanged);
    });
  },
  beforeDestroy() {
    this.$children.forEach(children => {
      children.$off("onchange", this.handleChildrenChanged);
    });
  },
  data: () => ({
    name: "FormGroup",
    changedItemsArray: [],
    changedItems: {},
    allItems: {},
    enabled: false
  }),
  props: {
    title: String,
    description: String,
    toggle: Boolean /** This option  **/,
    toggleLabel: String /** allows you to enable/disable form   **/,
    toggleChecked: Boolean /** by checkbox button **/,
    editableMode: Boolean,
    loading: Boolean
  },
  computed: {
    parentLoading() {
      return this.$parent && this.$parent.loading;
    },
    childrenChanged() {
      return this.changedItemsArray && this.changedItemsArray.length;
    },
    valid() {
      if (!this.childrenChanged) {
        return false;
      }
      return (
        this.changedItemsArray.length ===
        this.changedItemsArray.filter(item => item.valid).length
      );
    },
    itemsCount() {
      return this.allItems && Object.keys(this.allItems).length;
    }
  },
  methods: {
    handleChildrenChanged() {
      console.log("form children changed");
      const object = {};
      const self = this;
      this.changedItemsArray = this.$children
        .filter(children => {
          if (!children.$children) {
            return false;
          }
          const target =
            (children.$children.length && children.$children[0]) || children;
          return (self.editableMode && target.changed) || true;
        })
        .map(item => {
          const target = (item.$children.length && item.$children[0]) || item;
          object[target.name] = target.inputValue;
          return {
            name: target.name,
            value: target.inputValue,
            valid: target.valid
          };
        });
      this.changedItems = object;

      this.$children.forEach(item => {
        const target = (item.$children.length && item.$children[0]) || item;
        this.allItems[target.name] =
          target.inputValue !== "" ? target.inputValue : target.value;
      });
      this.$emit("change");
    },
    getFormChangedFields() {
      this.handleChildrenChanged();
      return this.changedItems;
    },
    getFormFields() {
      this.handleChildrenChanged();
      return this.allItems;
    },
    resetFormGroup() {
      this.$children.forEach(child => {
        child.$children[0].resetValue();
      });
      this.changedItemsArray = [];
      this.changedItems = {};
    },
    clearFormGroup() {
      this.$children.forEach(child => {
        child.$children[0].clearValue();
      });
      this.changedItemsArray = [];
      this.changedItems = {};
      this.allItems = {};
    },
    showValidation() {
      this.$children.forEach(child => {
        child.$children[0].focused = true;
      });
    },
    toggleForm(value) {
      this.enabled = value;
    }
  }
};
</script>
<style lang="scss">
.form-group {
  &:not(:last-child) {
    padding-bottom: 15px;
    border-bottom: 1px solid $color-b41;
  }
  &:not(:first-child) {
    margin-top: 15px;
  }
  &.loading {
    input {
      opacity: 0.7;
      pointer-events: none;
    }
  }
  &__toggle {
    margin-bottom: 20px;
  }
  &__title {
    margin-bottom: 15px;
    font-size: 18px;
    color: $color-b3;
  }
  &__description {
    margin: 10px 0;
    color: $color-b3;
    font-size: 14px;
  }
  form[disabled="disabled"] {
    opacity: 0.7;
  }
  .form-items {
    & > *:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
