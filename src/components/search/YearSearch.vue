<template>
    <v-autocomplete
        v-model="year"
        :items="this.$store.state.years"
        :value="year"
        color="orange"
        class="mx-4"
        clearable
        hide-no-data
        hide-details
        prepend-inner-icon="mdi-calendar-search"
        label="Välj årtal"
    ></v-autocomplete>
    
</template>

<script>
export default {
  name: 'YearSearch',

  computed: {

      year: {
          get() {
            //   return this.$store.state.year ? this.$store.state.year.toString() : ""
            return this.$store.state.year.toString();
          },

          set(value) {
                this.$store.commit({
                    type: 'year',
                    value: +value
                });
          },
      }
  },




}
</script>
