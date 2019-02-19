<template>
  <div id="app">
    <div class="container-fluid">
      <div v-if="this.attendereDialog">
        <br>
        <img src="./assets/logo_emerson.png" class="img-fluid">
        <br><br>
        <b-progress :value="100" animated height="50px" variant="dark"></b-progress>
      </div>
      <div v-if="!this.attendereDialog">
        <div class="row">
          <div class="col-xl-2">
            <img src="./assets/logo_emerson.png" class="d-none d-xl-block topleft">
          </div>  
          <div class="col-xl-10">
            <h1 class="display-3 text-center">{{ this.titoloGruppo | toUpperCase }}</h1>
            <hr>  
          </div>  
        </div>
        <div>
          <template v-for="(cdlGroup, index) in this.groupRows">
            <div class="row" :key="index">
              <template v-for="cdl in cdlGroup">
                <div class="col-lg-4 pl-lg-2 pr-lg-2" :key="cdl.codice">
                  <chart :cdl="cdl"/>
                </div>
              </template>
            </div>
            <!-- <br :key="index"> -->
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chart from './components/Chart.vue'
import axios from 'axios'

// import JQuery from 'jquery'
// let $ = JQuery

export default {
  name: 'app',
  components: {
    chart
  },
  created() {
    this.fetchData();
    this.timer = setInterval(this.fetchData, this.intervalTime)
  },
  data() {
    return {
      attendereDialog: true,
      timer: '',
      timer4Page: '',
      path: 'metrics',
      cdlPerGruppo: [],
      arrayCdL: [],
      index: 0,
      pageIndex: 0,
      chiaveCorrente: null,
      titoloGruppo: "",
      intervalTime: 10000, // 120s
      charts4Rows: 3,
      maxRows2Display: 6,
      pages: []
    }
  },
  computed: {
    gruppiCdL() {
      return this.cdlPerGruppo
    },
    chiaviGruppiCdL() {
      return Object.keys(this.gruppiCdL)
    },
    maxIndex() {
      return this.chiaviGruppiCdL.length
    },
    groupRows() {
      return this.splitArr(this.arrayCdL, this.charts4Rows)
    }
  },
  methods: {
    fetchData() {
      axios.get(this.path)
      .then(res => {
          // eslint-disable-next-line
          console.log(res)
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
      if (this.$route.params.gruppoCdL)
        this.chiaveCorrente = this.$route.params.gruppoCdL.toString().toLowerCase()
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
        this.titoloGruppo = this.gruppiCdL[this.chiaveCorrente][0].descrizioneGruppo +
          " - " + this.gruppiCdL[this.chiaveCorrente][0].codiceGruppo
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
    cancelAutoUpdate4Page() { 
      clearInterval(this.timer4Page) 
    },
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
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
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
</style>