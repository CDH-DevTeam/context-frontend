<template>
  <v-sheet
    outlined
    id="count-chart-sheet"
    height="250px"
    >
    <v-container
    
    >
    <v-row justify="center" no-gutters>
      <v-col align-self="center" cols="4">
        <v-radio-group
              v-model="mode"
              column
              mandatory
              id="hit-group"
              @change="setMode"
              class="mx-5"
              label="Visa träffar i antal eller relativt totala textmängden:"
            >
        <v-radio
            label="Absoluta träffar"
            color="orange"
            value="absolute"
          ></v-radio>
          <v-radio
            label="Relativa träffar"
            color="orange"
            value="relative"
          ></v-radio>
        </v-radio-group>
      </v-col>
    <!-- </v-row> -->
    <!-- <v-row no-gutters>  -->
      <v-col cols="8">
        <div id="chart" />
      </v-col>
    </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import * as d3 from "d3";
import * as dc from "dc";
import crossfilter from "crossfilter";
import countAPI from "../api/count.api";

export default {
  name: "CountChart",

  data() {
    return {
      loading: true,
      margin: {
        left: 40,
        right: 40,
        top: 20,
        bottom: 20,
      },
      items: [],
    };
  },

  watch: {
    query: {
      handler() {
        this.update();
      },
      deep: true,
    },
    mode: {
      handler() {
        this.update();
      },
      deep: true,
    },
  },

  // created() {
  //   window.addEventListener("resize", this.resizeHandler);
  // },

  // destroyed() {
  //   window.removeEventListener("resize", this.resizeHandler);
  // },

  mounted() {
    this.plot();
    this.update();
  },

  computed: {
    height() {
      const { height: height } = d3
        .select("#chart")
        .node()
        .getBoundingClientRect();

      return height;
    },

    width() {
      const { width: width } = d3
        .select("#chart")
        .node()
        .getBoundingClientRect();

      return width;
    },

    query() {
      return this.$store.state.query;
    },

    mode() {
      return this.$store.state.countMode;
    }
  },

  methods: {
    parse(d) {
      return {
        date: d3.timeParse("%Y-%m-%d")(d.year.toString() + "-01-01"),
        value: d.count,
      };
    },

    plot() {
      // Draws the chart outline and axis bounds
      this.chart = new dc.LineChart("#chart", "count");
    },

    draw() {
      const data = this.items.map(this.parse);
      const dx = crossfilter(data);
      const years = dx.dimension((d) => d.date);
      const values = years.group().reduceSum(function (d) {
        return d.value;
      });
      const filter = dc.filters.RangedFilter(d3.extent(data, (d) => d.date));

      this.chart
        .renderArea(true)
        // .useViewBoxResizing(true)
        .width(this.width)
        .height(this.height)
        .transitionDuration(1000)
        .x(d3.scaleTime().domain(d3.extent(data, (d) => d.date)))
        .brushOn(false)
        // .xAxisLabel("Årtal")
        .margins(this.margin)
        // .yAxisLabel("Absoluta träffar")
        .elasticY(true)
        .dimension(years)
        .filter(filter)
        .group(values, "Absolute count")
        .title((d) => {
          return `År: ${d.key.getFullYear()}\nVärde: ${d.value}`;
        })
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .renderDataPoints(true);

      this.chart.yAxis().ticks(5)

      this.chart.on("renderlet", (chart) => {
        chart.selectAll("circle.dot").on("click", (event, d) => {
          // Set the year to the point year
          this.setYear(d.x.getFullYear());
        });
      });

      dc.renderAll("count");

      this.loading = false;
    },

    setYear(year) {
      if (this.$store.state.year != year) {
        this.$store.commit({
          type: "year",
          value: year,
        });
      }
    },

    setMode(value) {
      this.$store.commit({
        type: "countMode",
        value: value,
      });
    },

    resizeHandler(e) {
      e;
      this.draw();
    },

    fetch(params) {
      return countAPI
        .get(params.query, params.mode)
        .then((response) => {

          // Add to items
          this.items = response;

          // Add available years
          this.$store.commit({
            type: 'years',
            value: response.map((d) => d.year.toString())
          });

        })
        .catch((error) => {
          console.log(error);
        });
    },

    update() {
      this.fetch({
        query: this.$store.state.query,
        mode: this.$store.state.countMode
      }).then(() => {
        this.draw();
      });
    },
  },
};
</script>

<style>
#hit-group {
  /* margin-top: 30px; */
  /* margin-+left: 30px; */
}
</style>