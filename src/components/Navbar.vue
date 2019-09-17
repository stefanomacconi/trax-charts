<template>
  <div class="row">
    <div class="col-xl-2">
      <img src="../assets/logo_emerson.png" class="d-none d-xl-block topleft">
    </div>  
    <div class="col-xl-10">
      <h1 class="cdl-title display-3 text-center">{{ this.title | toUpperCase }}</h1>
      <hr>  
    </div>
    <template v-if="this.isbackbutton">
      TODO BOTTONE BACK
    </template>
  </div>  
</template>

<script>
export default {
   props: {
    title: {
      type: String,
      required: true
    },
    isbackbutton: {
      type: Boolean,
      required: false,
      default: false
    },
  }
}
</script>

<style>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.topleft {
  position: absolute;
  top: 8px;
  left: 16px;
  font-size: 18px;
  width: auto;
  height: 80px;
}
.cdl-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
  font-weight: 500 !important;
}
</style>
