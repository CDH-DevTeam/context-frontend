<template>
  <div id="table-wrapper">
    <v-data-table
      ref="dataTable"
      @update:page="$vuetify.goTo($refs.dataTable)"
      fixed-header
      height="500px"
      :headers="headers"
      :items="items"
      :server-items-length="totalItems"
      :items-per-page="limit"
      :footer-props="{
        'items-per-page-text': 'Träffar per sida',
        'items-per-page-options': [5, 10, 20],
      }"
      :no-data-text="'Inga resultat'"
      :options.sync="options"
      :loading="loading"
      loading-text="Laddar nya data..."
      class="elevation-0"
    >
    <v-progress-linear slot="progress" color="orange" indeterminate></v-progress-linear>
    <template v-slot:[`item.year`]="{ item }">
        <span class="bold">
          {{ item.year }}
        </span>
    </template>
    <template v-slot:[`item.content`]="{ item }">
        <div v-html="item.content"></div>
    </template>
    <template v-slot:[`item.link`]="{ item }">
      <v-btn
        icon
        v-bind:href="item.link"
        >
        <v-icon>mdi-download</v-icon>
      </v-btn>
    </template>
    </v-data-table>
  </div>
</template>





<script>
import fragmentAPI from "./api/fragment.api";

export default {
  name: "FragmentTable",

  props: {
    height: Number,
    width: Number,
  },

  data() {
    return {
      expanded: [],
      singleExpand: false,
      headers: [
        {
          text: "Årtal",
          value: "year",
          sortable: false,
          align: "center",
          class: "bold",
        },
        {
          text: "Förekomst",
          value: "content",
          sortable: false,
          align: "start",
        },
        {
          text: "Dokument",
          value: "document",
          sortable: false,
          align: "center",
        },
        { 
          text: 'Sökbar PDF', 
          value: 'link',
          sortable: false,
          align: "center"
        },

      ],
      items: [],
      totalItems: 0,
      limit: 10,
      loading: true,
      options: {},
    };
  },

  watch: {
    options: {
      handler() {
        this.update();
      },
      deep: true,
    },

    query: {
      handler() {
        this.reset();
        this.update();
      },
      deep: true,
    },

    year: {
      handler() {
        this.reset();
        this.update();
      },
      deep: true,
    },

    document: {
      handler() {
        this.reset();
        this.update();
      },
      deep: true,
    },
  },

  computed: {
    query() {
      return this.$store.state.query;
    },

    year() {
      return this.$store.state.year;
    },

    document() {
      return this.$store.state.document;
    }

    
  },

  methods: {
    
    strip(name) {
      const splits = name.split("-")
      const longName = splits[2]
      return longName
    },

    unique(value, index, self) {
      return self.indexOf(value) === index;
    },

    update() {
      this.loading = true;
      this.fetch({
        query: this.$store.state.query,
        year: this.$store.state.year,
        page: this.options.page,
        limit: this.options.itemsPerPage,
        document: this.$store.state.document
      });
    },

    fetch(params) {

      // Check if number or zero
      params.year = params.year > 0 ? params.year : null;

      fragmentAPI
        .get(
          params.query,
          params.document,
          params.year,
          params.chamber,
          params.limit,
          (params.page - 1) * params.limit,
        )
        .then((response) => {

          // Mutate the fragments
          this.items = response.results.map((fragment) => {
            
            const stripped = this.strip(fragment.name);
            return {
                id: fragment.id,
                year: fragment.year, 
                content: '...' + fragment.headline + '...',
                document: stripped, 
                link: `https://weburn.kb.se/riks/tv%C3%A5kammarriksdagen/pdf/web/${ fragment.year }/web_${ stripped }/${ stripped }.pdf`
            };

          });

          // const years = this.items.map(fragment => fragment.year).filter(this.unique);
          // const documents = this.items.map(fragment => fragment.name).filter(this.unique);

          // this.setAvailableYears(years);
          // this.setAvailableDocuments(documents);

          this.totalItems = response.count;
          this.loading = false;
        })
        .then(() => {





        })
        .catch((error) => {
          console.log(error);
        });
    },

    reset() {
      this.options.page = 1;
    },
  },
};
</script>

