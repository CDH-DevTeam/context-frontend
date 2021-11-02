<template>
  <v-app id="inspire">

    <v-app-bar 
    app 
    dark
    permanent
    src="./assets/riksdagstryck.jpg" 
    prominent
    >
    <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(70, 20, 10, .5), rgba(70, 20, 10, .8)"
        ></v-img>
    </template>
    <v-app-bar-title>
      Marknadsundersökning
    </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols=3>
            <v-sheet flat outlined class="pb-10" height="250px">
              <search/>
            </v-sheet>
          </v-col>
          <v-col cols=9>
            <count-chart/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <sentence-table/>
          </v-col>
        </v-row>
        <v-row>
        </v-row>
      </v-container>
    </v-main>

    <v-footer inset>
      <v-row justify="right">
        <v-col>
          <logo/>
        </v-col>
      </v-row>
    </v-footer>

  </v-app>
</template>

<script>
import SentenceTable from './components/SentenceTable.vue'
import CountChart from './components/charts/CountChart.vue'
import Search from './components/search/Search.vue'

import Logo from './components/Logo.vue'
import "@/assets/dc.css";

export default {
  name: 'App',

  components: {
    SentenceTable,
    CountChart,
    Search,
    Logo,
  },

  computed: {
  query: {
    get () {
      return this.$store.state.query
    },
    set (value) {
      this.$store.commit({
        type: 'query', 
        value: value
        })
    }
  }
  // 0 75 137
}

};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Barlow+Condensed:100,200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Antic+Didone&display=swap');

#chart {
  text-align: center;
}

.v-app-bar-title__content, .v-app-bar-title__placeholder{
  width: 700px !important;
  font-family: 'Antic Didone';
  font-size: 2rem;
}

.v-input {
  margin-top: 1.5rem;
  /* margin-bottom: 3rem; */
}

.v-application .text-start {
    padding: 15px 20px !important;
}

.input-label {
  font-size: 0.75rem;
  color: lightslategray;
  padding: 0.75rem;
  margin-top: 10px;
}

.x.axis text, .y.axis text {
    font-size: 0.875rem;
}

.bold {
    font-weight: bold;
}

.dc-chart circle {
  /* fill: rgb(0, 75, 137) !important; */
  fill: darkred;
}

.dc-chart path.area {
  /* fill: rgb(0, 75, 137) !important; */
  fill: darkred;
  fill-opacity: 0.3;
  stroke-width: 0;
}

.dc-chart path.line {
  /* stroke: rgb(0, 75, 137) !important; */
  stroke: darkred;
  stroke-width: 1.5px;
  fill: none
}

.v-application {
  color: green !important;
}
</style>
