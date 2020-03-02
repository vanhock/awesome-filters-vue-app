<template>
  <div class="v-slider" :class="`v-slider--${mode}`">
    <slider ref="slider" v-bind="sliderOptions"><slot></slot></slider>
  </div>
</template>

<script>
import VueTinySlider from "vue-tiny-slider";
export default {
  name: "VSlider",
  components: { slider: VueTinySlider },
  mounted() {
    this.$refs.slider.$on("transitionEnd", this.updSliderHeight);
    this.$refs.slider.$on("newBreakpointEnd", this.resetSliderHeight);
  },
  beforeDestroy() {
    this.$refs.slider.$off("transitionEnd", this.updSliderHeight);
    this.$refs.slider.$off("newBreakpointEnd", this.resetSliderHeight);
  },
  props: {
    mode: {
      type: String,
      default: "gallery" // or "carousel"
    }
  },
  data: () => ({
    generalOptions: {
      lazyload: true,
      controlsText: ["", ""]
    },
    galleryOptions: {
      items: 1,
      autoHeight: true,
      autoplay: true,
      autoplayButtonOutput: false,
      lazyloadSelector: "tns-lazyload",
      responsive: {
        300: {
          controls: false
        },
        839: {
          controls: true
        }
      }
    },
    carouselOptions: {
      items: 2,
      responsive: {
        300: {
          controls: false
        },
        1400: {
          items: 5,
          controls: true,
          edgePadding: 10,
          gutter: 14
        },
        1200: {
          items: 4,
          edgePadding: 0,
          gutter: 0
        },
        1000: {
          items: 3
        }
      }
    }
  }),
  computed: {
    sliderOptions() {
      return {
        mode: this.mode,
        ...this.generalOptions,
        ...this[`${this.mode}Options`]
      };
    }
  },
  methods: {
    updSliderHeight() {
      this.$el.style.height = `${this.$el.clientHeight}px`;
    },
    resetSliderHeight() {
      this.$el.style.height = "auto"
    }
  }
};
</script>

<style lang="scss">
@import "~tiny-slider/src/tiny-slider";
.v-slider {
  position: relative;
  img {
    width: 100%;
  }
  .tns-controls {
    & > [data-controls] {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      height: 50px;
      width: 50px;
      @include valign();
      @include box-shadow(medium);
      background-color: #fff;
      cursor: pointer;
      border-radius: 50%;
      z-index: 10;

      &:before {
        content: "";
        display: block;
        width: 35px;
        height: 35px;
        background-position: center;
      }
    }
    [data-controls="prev"] {
      left: 35px;
      &:before {
        margin-left: -4px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%23333' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='feather feather-chevron-left' viewBox='0 0 24 24'%3E%3Cdefs/%3E%3Cpath d='M15 18l-6-6 6-6'/%3E%3C/svg%3E");
      }
    }
    [data-controls="next"] {
      right: 35px;
      &:before {
        margin-right: -4px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%23333' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='feather feather-chevron-right' viewBox='0 0 24 24'%3E%3Cdefs/%3E%3Cpath d='M9 18l6-6-6-6'/%3E%3C/svg%3E");
      }
    }
  }
  [lazyloadselector] {
    img:not(.loaded) {
      visibility: hidden;
    }
  }
}
.v-slider.v-slider--gallery {
  @media (min-width: $mobile_width) {
    .tns-controls > [data-controls] {
      transform: scale(0);
      transition: transform 70ms linear;
    }
  }
  .tns-outer {
    @media (min-width: $mobile_width) {
      &:hover {
        .tns-controls > [data-controls] {
          transform: scale(1);
          transition: transform 50ms linear;
        }
      }
    }
  }
}
.v-slider.v-slider--carousel {
  .tns-controls {
    [data-controls="prev"] {
      left: -35px;
    }
    [data-controls="next"] {
      right: -35px;
    }
  }
}
</style>
