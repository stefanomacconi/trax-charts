<template>
    <div class="col-md-12 col-xs-12">
      <b-card :title="this.getTitle()" class="mb-3">
        <template v-slot:header>
          <h6 class="mb-0">{{ timbr.oraInizio }} - {{ timbr.cognomeNomeDipendente }} ({{ timbr.matricolaDipendente }})</h6>
          <h4 class="mb-0" v-if="timbr.attrezzaggio">Attrezzaggio</h4>
        </template>
        <b-card-text>
          {{ this.getCommessa() }}
          <br>
          {{ this.getAssieme() }}
        </b-card-text>
        <template v-if="!timbr.indiretta" v-slot:footer>
          <h6 class="mb-0"> 
            {{ getTempi() }}
          </h6>
        </template>
      </b-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: ['timbr'],
  methods: {
    getCommessa() {
      return "COMMESSA: " + this.timbr.codiceCommessa
    },
    getAssieme() {
      return "ASSIEME: " + this.timbr.descrizioneArticoloAssieme
    },
    getTitle() {
      return this.timbr.codiceArticoloAssieme + " - " + this.timbr.descrizioneCiclo 
    },
    getTempi() {
      if (this.timbr.attrezzaggio) {

        return "Tempo Unitario: " + this.getTime(this.timbr.consuntivoLavorazione.tempoUnitario.minuti) + 
          " - Tempo Preventivo: " + this.getTime(this.timbr.consuntivoLavorazione.orePreventiveAttrezzaggio.minuti)
      } else {
        
        return "Tempo Unitario: " + this.getTime(this.timbr.consuntivoLavorazione.tempoUnitario.minuti) + 
          " - Tempo Preventivo: " + this.getTime(this.timbr.consuntivoLavorazione.orePreventive.minuti)
      }
    },
    getTime(totalTimeInMin) {
      return Math.floor(totalTimeInMin / 60) + 'h' + totalTimeInMin % 60 + 'm'
    }
  }
}
</script>