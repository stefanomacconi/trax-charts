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
        <div class="row">
          <div class="col-xl-2">
            <img src="../assets/logo_emerson.png" class="d-none d-xl-block topleft">
          </div>  
          <div class="col-xl-10">
            <h1 class="cdl-title display-3 text-center">{{ this.titoloGruppo | toUpperCase }}</h1>
            <hr>  
          </div>
        </div>
        <div>
          <!-- loop in CdL Group -->
          <template v-for="(cdlGroupRow, index) in this.groupRows">
            <div class="row" :key="index + Math.floor(Math.random() * 1000) + 1">
              <!-- loop charts in row -->
              <template v-for="cdl in cdlGroupRow">
                <div :class="getRowClasses()" :key="cdl.codice">
                  <chart :cdl="cdl"/>
                </div>
              </template>
            </div>
            <br :key="index + Math.floor(Math.random() * 1000) + 1">
          </template>
        </div>
        <div class="row">
          <div class="col-xl-6">
            <img style="max-height: 220px; width: auto; height: auto;" src="../assets/stato_macchina.png" class="d-none d-xl-block">
          </div>  
          <div class="col-xl-6">
            <img style="max-height: 220px; width: auto; height: auto;" src="../assets/tempi_macchina.png" class="d-none d-xl-block">
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import config from '../public/config/config.json'
import axios from 'axios'

import Chart from '../components/Chart.vue'
import WaitingDialog from '../components/Waiting.vue'

// import JQuery from 'jquery'
// let $ = JQuery

export default {
  components: {
    Chart,
    WaitingDialog
  },
  created() {
    // fetch configuration
    this.fetchConfig().then(() => {
      // when created I call the rest resource to fetch data for the first time
      this.fetchData()
      // automatically refresh data in time
      // note that also the CdL Group will be updated in fetchData
      this.timer = setInterval(this.fetchData, this.intervalTime)
    })
    // automatically refresh config in time
    this.configTimer = setInterval(this.fetchConfig, this.intervalConfigTime)
  },
  data() {
    return {
      // config path
      configPath: 'http://localhost:8080/prodweb/configuration',
      // public json config file - REPLACED WITH REST CALL CONFIGURATION
      // config,
      attendereDialog: true,
      // timer for automatically refresh data and CdL Group
      timer: '',
      // timer for automatically refresh config data
      configTimer: '',
      // timer to automatically refresh graphs with the same group
      // if the number of CdL exceed the max number of graphs to show in a single page
      timer4Page: '',
      // what returns the REST call
      cdlPerGruppo: [],
      // CdL Group
      arrayCdL: [],
      // cycle in Group
      index: 0,
      // cycle in Page
      pageIndex: 0,
      // current CdL Group
      chiaveCorrente: null,
      titoloGruppo: "",
      // interval time for config data refresh
      intervalConfigTime: 30000, // default 30s
      // used to cycle single group
      pages: []
    }
  },
  computed: {
    // max number of graphs for row
    charts4Rows() {
      return this.$store.getters.getCharts4Rows
    },
    // max number of rows to show in a page
    maxRows2Display() {
      return this.$store.getters.getMaxRows2Display
    },
    // REST path
    path() {
      return this.$store.getters.getPath
    },
    // interval time for data refresh and CdL Group refresh
    intervalTime() {
      return this.$store.getters.getIntervalTime
    },
    gruppiCdL() {
      return this.cdlPerGruppo
    },
    chiaviGruppiCdL() {
      return Object.keys(this.gruppiCdL)
    },
    maxIndex() {
      return this.chiaviGruppiCdL.length - 1
    },
    groupRows() {
      // main property. CdL in group splitted for row
      // will be cycled in template
      return this.splitArr(this.arrayCdL, this.charts4Rows)
    }
  },
  methods: {
    fetchConfig() {
      // *** ATTENTION ***
      // because of the setInterval in created, the intervalTime, can be updated only with a refresh (F5) page
      const component = this;
      return new Promise(function(resolve, reject) {
        axios.get(component.configPath)
        .then(res => {
            // eslint-disable-next-line
            console.log("*** CONFIG ***", res)
            // I call commit because I want the synchronous mutation
            if (res.data) {
              if (res.data.dataPath)
                component.$store.commit('setPath', res.data.dataPath) 
              if (res.data.chartsForRow)
                component.$store.commit('setCharts4Rows', res.data.chartsForRow) 
              if (res.data.rowsForPage)
                component.$store.commit('setMaxRows2Display', res.data.rowsForPage) 
              if (res.data.intervalTime)
                component.$store.commit('setIntervalTime', res.data.intervalTime) 
              resolve()
            } else {
              alert("Data configuration is empty")
              reject()
            }
        }).catch(error => {
            // eslint-disable-next-line
            console.log(error)
            alert("Unable to fetch the configuration")
            reject()
        })
      });
    },
    fetchData() {
      axios.get(this.path + "/metrics")
      .then(res => {
          // eslint-disable-next-line
          console.log("*** DATA ***", res)
          this.attendereDialog = false
          this.cdlPerGruppo = res.data.cdlPerGruppo
          if (this.chiaviGruppiCdL.length === 0) {
            if(!alert("Groups not found."))
            window.location.reload()
          }
          this.setCurrentCdLGroup()
      }).catch(error => {
          // eslint-disable-next-line
          console.log(error)
          if(!alert("Error during the REST call"))
            window.location.reload()
      })
    },
    setCurrentCdLGroup() {
      // set current CdL Group by using index
      if (this.$route.path !== '/') {
        // visual/#/group/[cdlGroup]
        let splittedPath = this.$route.path.split("/")
        this.chiaveCorrente = splittedPath[splittedPath.length - 1]
      }
      else {
        this.chiaveCorrente = this.chiaviGruppiCdL[this.index]
        this.increaseIndex()
      }
      // check if the CdLGroup has more graphs than we can show
      var arrayCdL = this.gruppiCdL[this.chiaveCorrente]
      var numMaxChars4Page = this.maxRows2Display * this.charts4Rows
      if (this.gruppiCdL[this.chiaveCorrente].length > numMaxChars4Page) {
        this.pages = this.splitArr(arrayCdL, numMaxChars4Page)
        var numPages = this.pages.length
        var time2Interval = Math.floor(this.intervalTime / numPages)
        // here computed property is going to update because we set new value to arrayCdL
        this.refreshPageInGroup()
        this.timer4Page = setInterval(this.refreshPageInGroup, time2Interval)
      } else {
        // here computed property is going to update and app shows the new content
        this.arrayCdL = arrayCdL
      }
      // calc title
      if (this.gruppiCdL[this.chiaveCorrente].length > 0 && 
        this.gruppiCdL[this.chiaveCorrente][0].descrizioneGruppo)
        this.titoloGruppo = this.gruppiCdL[this.chiaveCorrente][0].descrizioneGruppo
      else
        this.titoloGruppo = this.chiaveCorrente
    },
    increaseIndex() {
      if (this.index === this.maxIndex)
        this.index = 0
      else 
        this.index = this.index + 1
    },
    cancelAutoUpdate() { 
      clearInterval(this.timer) 
    },
    cancelAutoUpdateConfig() { 
      clearInterval(this.configTimer) 
    },
    cancelAutoUpdate4Page() { 
      clearInterval(this.timer4Page) 
    },
    // split array in groups
    splitArr(arr, groupSize) {
      if (!arr || arr.length === 0)
        return []
      var groups = arr.map(function(e,i) { 
        return i % groupSize === 0 ? arr.slice(i, i + groupSize) : null})
          .filter(function(e){ return e })
      return groups
    },
    refreshPageInGroup() {
      var completePages = this.pages
      this.arrayCdL = completePages[this.pageIndex]
      if (this.pageIndex == completePages.length - 1) {
        // last time
        // we need to reset the pageIndex
        this.pageIndex = 0
        // and remove the auto update
        this.cancelAutoUpdate4Page()
      }
      else 
        this.pageIndex = this.pageIndex + 1
    },
    getRowClasses() {
      const maxGridValue = 12
      var colSize = Math.floor(maxGridValue / this.charts4Rows)
      return "col-lg-" + colSize + " pl-lg-2 pr-lg-2"
    }
  },
  beforeDestroy() {
    this.cancelAutoUpdate()
    this.cancelAutoUpdateConfig()
    // clearInterval(this.timer)
    // clearInterval(this.configTimer)
    clearInterval(this.timer4Page)
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