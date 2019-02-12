<template>
  <div id="app">
    <div class="container">
      <div v-for="cdl in cdlPerGruppo.gruppo1" :key="cdl.codice">
        <Chart :cdl="cdl" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from './components/Chart.vue'

export default {
  name: 'app',
  components: {
    Chart
  },
  data () {
    return {
      cdlPerGruppo: {
        gruppo1: [
          {
            stato: 'LAVORAZIONE',
            descrizione: 'TORNIO BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA',
            codice: 25,
            tempoLavorazione: 50,
            tempoIndirette: 20,
            tempoNC: 30
          },
          {
            stato: 'CAUSALE_IMPRODUTTIVA',
            descrizione: 'FRESA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA',
            codice: 22,
            tempoLavorazione: 70,
            tempoIndirette: 0,
            tempoNC: 30
          },
          {
            stato: 'INDIRETTA',
            descrizione: 'TRAPANO BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA',
            codice: 23,
            tempoLavorazione: 30,
            tempoIndirette: 60,
            tempoNC: 10
          },
          {
            stato: 'LAVORAZIONE_IN_RITARDO',
            descrizione: 'SALDATRICE BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA',
            codice: 24,
            tempoLavorazione: 5,
            tempoIndirette: 2,
            tempoNC: 93
          },
          {
            stato: 'INATTIVO',
            descrizione: 'PRESSA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA',
            codice: 29,
            tempoLavorazione: 50,
            tempoIndirette: 12,
            tempoNC: 38
          },
        ],
        gruppo2: [
          {
            stato: 'LAVORAZIONE',
            descrizione: 'TORNIO2 BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA',
            codice: 35,
            tempoLavorazione: 50,
            tempoIndirette: 20,
            tempoNC: 30
          },
          {
            stato: 'CAUSALE_IMPRODUTTIVA',
            descrizione: 'FRESA2 BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA',
            codice: 32,
            tempoLavorazione: 70,
            tempoIndirette: 0,
            tempoNC: 30
          },
          {
            stato: 'INDIRETTA',
            descrizione: 'TRAPANO2 BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA',
            codice: 33,
            tempoLavorazione: 30,
            tempoIndirette: 60,
            tempoNC: 10
          },
          {
            stato: 'LAVORAZIONE_IN_RITARDO',
            descrizione: 'SALDATRICE2 BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA',
            codice: 34,
            tempoLavorazione: 5,
            tempoIndirette: 2,
            tempoNC: 93
          },
          {
            stato: 'INATTIVO',
            descrizione: 'PRESSA2 BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA',
            codice: 39,
            tempoLavorazione: 50,
            tempoIndirette: 12,
            tempoNC: 38
          },
        ],
      }
    }
  },
}
</script>