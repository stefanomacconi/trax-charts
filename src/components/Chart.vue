<template>
  <div class="container">
    <div class="row">
      <div class="col-md">
        <b-progress height="50px" class="mt-1" :max="max" show-value>
          <b-progress-bar :value="counter*(6/10)" variant="success"></b-progress-bar>
          <b-progress-bar :value="counter*(2.5/10)" variant="warning"></b-progress-bar>
          <b-progress-bar :value="counter*(1.5/10)" variant="danger"></b-progress-bar>
        </b-progress>
        <b-btn class="mt-4" @click="clicked">Click me</b-btn>
      </div>
      <div class="col-md">
        <b-progress height="50px" class="mt-1" :max="max" show-value>
          <b-progress-bar :value="counter*(6/10)" variant="success"></b-progress-bar>
          <b-progress-bar :value="counter*(2.5/10)" variant="warning"></b-progress-bar>
          <b-progress-bar :value="counter*(1.5/10)" variant="danger"></b-progress-bar>
        </b-progress>
        <b-btn class="mt-4" @click="clicked">Click me</b-btn>
      </div>
    </div>
    <div class="row">
      <div class="col-md">
        <b-progress height="50px" class="mt-1" :max="max" show-value>
          <b-progress-bar :value="counter*(6/10)" variant="success"></b-progress-bar>
          <b-progress-bar :value="counter*(2.5/10)" variant="warning"></b-progress-bar>
          <b-progress-bar :value="counter*(1.5/10)" variant="danger"></b-progress-bar>
        </b-progress>
        <b-btn class="mt-4" @click="clicked">Click me</b-btn>
      </div>
      <div class="col-md">
        <b-progress height="50px" class="mt-1" :max="max" show-value>
          <b-progress-bar :value="counter*(6/10)" variant="success"></b-progress-bar>
          <b-progress-bar :value="counter*(2.5/10)" variant="warning"></b-progress-bar>
          <b-progress-bar :value="counter*(1.5/10)" variant="danger"></b-progress-bar>
        </b-progress>
        <b-btn class="mt-4" @click="clicked">Click me</b-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      counter: 45,
      max: 100
    }
  },
  methods: {
    clicked () {
      this.counter = Math.random() * this.max
      // eslint-disable-next-line
      console.log('Change progress to ' + Math.round(this.counter * 100) / 100)
    }
  }
}
</script>