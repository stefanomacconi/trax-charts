<template>
  <div id="app">
    <div class="container-fluid">
      <div v-if="this.attendereDialog">
        <h1>Loading...</h1>
        <b-progress :value="100" animated height="30px" variant="dark"></b-progress>
      </div>
      <h1 class="display-2 text-center">{{ this.titoloGruppo | capitalize }}</h1>
      <hr>
      <div>
        <template v-for="(cdlGroup3, index) in this.groupRows">
          <div class="row" :key="index">
            <template v-for="cdl in cdlGroup3">
              <div class="col-md-4" :key="cdl.codice">
                <chart :cdl="cdl"/>
              </div>
            </template>
          </div>
        </template>
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
    this.timer = setInterval(this.fetchData, 30000) // 30s
  },
  data() {
    return {
      attendereDialog: true,
      timer: '',
      path: 'metrics',
      cdlPerGruppo: [],
      index: 0,
      chiaveCorrente: null,
      titoloGruppo: ""
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
      return this.calcRows(this.gruppiCdL[this.chiaveCorrente])
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
        this.chiaveCorrente = this.$route.params.gruppoCdL
       else {
        this.chiaveCorrente = this.chiaviGruppiCdL[this.index]
        this.increaseIndex()
      }
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
    calcRows(arr) {
      if (!arr)
        return []
      const groupSize = 3
      var groups = arr.map(function(e,i) { 
        return i % groupSize === 0 ? arr.slice(i, i + groupSize) : null})
          .filter(function(e){ return e })
      return groups
    },
  }
}
</script>