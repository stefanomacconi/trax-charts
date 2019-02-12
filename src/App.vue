<template>
  <div id="app">
    <div class="container">
      <div v-for="cdl in this.gruppiCdL['Asse 1 Assemblaggio 1']" :key="cdl.codice">
        {{cdl.codice}}
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
    this.timer = setInterval(this.fetchData, 30000);
  },
  data() {
    return {
      timer: '',
      path: 'metrics',
      cdlPerGruppo: []
    }
  },
  computed: {
    gruppiCdL() {
      return this.cdlPerGruppo
    }
  },
  methods: {
    fetchData() {
      axios.get(this.path)
      .then(res => {
          // eslint-disable-next-line
          console.log(res)
          this.cdlPerGruppo = res.data.cdlPerGruppo
      }).catch(error => {
          // eslint-disable-next-line
          console.log(error)
          alert("Error during the REST call")
      })
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