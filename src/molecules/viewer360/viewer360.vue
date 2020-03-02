<template>
  <div class="viewer-360">
    <a class="Magic360"
       :href="folder+name+'_01.jpg'"
       :data-options="'filename:'+name+'_{col}.jpg;' +
       'large-filename:'+name+'_{col}.jpg; rows:1; columns:71; speed:60; autospin-speed: 2500;'+
       'magnify:true; smoothing:false;hint:false; mousewheel-step: 4'">
      <img :src="folder+name+'_01.jpg'" alt=""/>
    </a>
  </div>
</template>
<script>
  import "./magic360.css";
  import Magic360 from "./magic360.js";
  export default {
    name: "Viewer360",
    props: {
      folder : {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    computed: {
      viewer() {
        return Magic360.magic360
      }
    },
    mounted: function () {
      this.start();
    },
    methods: {
      start: function () {
        this.viewer.start()
      },
      stop: function () {
        this.viewer.stop()
      }
    }
  }
</script>
