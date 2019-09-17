<template>
  <div>
    <router-view :key="Math.floor(Math.random() * 1000) + 1"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
}
</script>