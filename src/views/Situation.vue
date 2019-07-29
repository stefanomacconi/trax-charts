<template>
  <div id="app">
    <div class="container-fluid">
      <!-- Loading dialog -->
      <div v-if="this.attendereDialog">
          <waiting-dialog></waiting-dialog>
      </div>
      <!-- div with graphs -->
      <div v-if="!this.attendereDialog">
        TODO
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created() {
    // fetch data
    this.fetchData()
    // automatically refresh data in time
    this.timer = setInterval(this.fetchData, this.intervalTime)
  },
  data() {
    return {
      attendereDialog: true,
       // timer for automatically refresh data
      timer: '',
      // movs to cicle
      openedMovs: []
    }
  },
  props: ['cdl'],
  computed: {
     // REST path
    path() {
      return this.$store.getters.getPath
    },
    // interval time for data refresh and CdL Group refresh
    intervalTime() {
      return this.$store.getters.getIntervalTime
    } 
  },
  methods: {
    fetchData() {
      axios.get(this.path + "/situazione?cdl=" + this.cdl)
      .then(res => {
        // eslint-disable-next-line
        console.log("*** DATA ***", res)
        this.attendereDialog = false
        this.openedMovs = res.data
      }).catch(error => {
        // eslint-disable-next-line
        console.log(error)
        if(!alert("Error during the REST call"))
          window.location.reload()
      })
    },
    cancelAutoUpdate() { 
      clearInterval(this.timer) 
    },
    beforeDestroy() { 
      this.cancelAutoUpdate()
    }
  }
}
</script>