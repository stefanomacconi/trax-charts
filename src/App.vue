<template>
  <div id="app">
    <div class="container">
      {{ this.chiaveCorrente }}
      <div v-for="cdl in this.gruppiCdL[this.chiaveCorrente]" :key="cdl.codice">
        <chart :cdl="cdl"/>
      </div>
    </div>
  </div>
</template>

<script>
import chart from './components/Chart.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    chart
  },
  created() {
    this.fetchData();
    this.timer = setInterval(this.fetchData, 60000); // 60s
  },
  data() {
    return {
      timer: '',
      path: 'metrics',
      cdlPerGruppo: [],
      index: 0,
      chiaveCorrente: null
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
    }
  },
  methods: {
    fetchData() {
      axios.get(this.path)
      .then(res => {
          // eslint-disable-next-line
          console.log(res)
          this.cdlPerGruppo = res.data.cdlPerGruppo
          if (this.chiaviGruppiCdL.length === 0)
            alert("Groups not found.")
          this.setCurrentCdLGroup()
      }).catch(error => {
          // eslint-disable-next-line
          console.log(error)
          alert("Error during the REST call")
      })
    },
    setCurrentCdLGroup() {
      this.chiaveCorrente = this.chiaviGruppiCdL[this.index]
      this.increaseIndex()
    },
    increaseIndex() {
      if (this.index === this.maxIndex)
        this.index = 0
      else 
        this.index = this.index + 1
    },
    cancelAutoUpdate() { 
      clearInterval(this.timer) 
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>