<template>
  <div class="row align-items-center">
    <div class="col-md-4 col-xs-4 pr-md-0">
      <div :class="getStatusClasses()" align="center" @click="goToCdLSituation()"> 
        {{ this.cdl.descrizioneCdL | toUpperCase }} ({{ this.cdl.nrOperatori }})
      </div>
    </div>
    <div class="col-md-8 col-xs-8 pl-md-1">
      <b-progress height="80px" class="mt-1" :max="this.max" show-value>
        <b-progress-bar :value="this.cdl.tempiMacchina.percentualeOreDirette" variant="success"></b-progress-bar>
        <b-progress-bar :value="this.cdl.tempiMacchina.percentualeOreIndirette" variant="warning"></b-progress-bar>
        <b-progress-bar :value="this.cdl.tempiMacchina.percentualeNC" variant="danger"></b-progress-bar>
      </b-progress>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      max: 100
    }
  },
  props: ['cdl'],
  methods: {
    getStatusClasses() {
      return this.cdl.stato + " mt-1 m-status"
    },
    goToCdLSituation() {
      this.$router.push({
        name: 'situazioneLav', 
        params: {
          cdl: this.cdl.codiceCdL,
          descrizioneCdL: this.cdl.descrizioneCdL 
        }
      })
    }
  }
}
</script>

<style>
.progress {
  border-style: solid;
  border-width: 2px;
  font-size: large;
  font-weight: bold;
}
.progress-bar {
  color: #e9ecef;
  /* font-size: 120%; */
}
.m-status {
  border-style: solid;
  border-width: 2px;
  border-radius: 0.25rem;
  border-color: black;
  height: 80px;
  /* font-size: 120%; */
  font-weight: bold;
  color: white;
  /* text-shadow: 1px 0 0 black, -1px 0 0 black, 0 1px 0 black, 0 -1px 0 black,
   1px 1px black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black; */
}
.LAVORAZIONE {
  background-color:#40c4ff;
}
.CAUSALE_IMPRODUTTIVA {
  background-color:#DC3545;
}
.INDIRETTA {
  background-color:#FFC107;
}
.INATTIVO {
  background-color:#99aab5;
}
.LAVORAZIONE_IN_RITARDO {
  background-color:#ff8f00;
}
</style>