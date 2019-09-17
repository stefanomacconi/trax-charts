<template>
  <div id="app">
    <div class="container-fluid">
      <!-- Loading dialog -->
      <div v-if="this.attendereDialog">
          <waiting-dialog></waiting-dialog>
      </div>
      <!-- div with graphs -->
      <div v-if="!this.attendereDialog">
        <!-- title navbar -->
        <!-- <navbar title="TODO" isbackbutton></navbar> -->
        <div class="row">
          <div class="col-xl-2">
            <img src="../assets/logo_emerson.png" class="d-none d-xl-block topleft">
          </div>  
          <div class="col-xl-8">
            <h1 style="margin-top: 25px; font-size:3.5rem;" class="cdl-title text-center">{{ this.descrizioneCdL }}</h1>
          </div>
          <div class="col-xl-2">
            <b-button pill size="lg" @click="this.goBack">GO BACK</b-button>
          </div>
        </div>
        <br><br>
        <div>
          <!-- loop in Timbrs -->
          <div class="row">
            <template v-for="(timbr, index) in this.openedTimbrs">
                <div class="col-lg-6 pl-lg-2 pr-lg-2" :key="index + Math.floor(Math.random() * 1000) + 1">
                  <timbr-detail :timbr=timbr></timbr-detail>
                </div>
            </template>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

// import Navbar from '../components/Navbar'
import WaitingDialog from '../components/Waiting.vue'
import TimbrDetail from '../components/Timbr.vue'

// Navbar,
export default {
  components: {
    WaitingDialog,
    TimbrDetail
  },
  created() {
    // fetch data
    this.fetchData()
    // sleep 1sec
    //await this._sleep(1000)
    // automatically refresh data in time
    this.situationTimer = setInterval(this.fetchData, this.intervalTime)
  },
  data() {
    return {
      attendereDialog: true,
       // timer for automatically refresh data
      situationTimer: '',
      // movs to cicle
      openedTimbrs: []
    }
  },
  props: ['cdl', 'descrizioneCdL'],
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
  beforeDestroy() {
    this.cancelAutoUpdate()
  },
  methods: {
    _sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    fetchData() {
      axios.get(this.path + "/situazione?cdl=" + this.cdl)
      .then(res => {
        // eslint-disable-next-line
        console.log("*** SITUATION ***", res)
        this.attendereDialog = false
        this.openedTimbrs = res.data
      }).catch(error => {
        // eslint-disable-next-line
        console.log(error)
        if(!alert("Error during the REST call"))
          window.location.reload()
      })
    },
    cancelAutoUpdate() { 
      clearInterval(this.situationTimer) 
    },
    goBack() {
      window.history.back()
    }
  }
}
</script>

<style>
.btn-lg {
  margin-top: 25px;
}
</style>