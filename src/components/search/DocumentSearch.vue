<template>
    <v-autocomplete
        v-model="document"
        :items="this.$store.state.documents"
        :value="document"
        class="mx-4"
        clearable
        hide-no-data
        hide-details
        color='orange'
        disabled
        prepend-inner-icon="mdi-text-box-search-outline"
        label="Välj ett dokument"
    ></v-autocomplete>
    
</template>

<script>
export default {
  name: 'DocumentSearch',

  computed: {

      document: {
          get() {
            //   return this.$store.state.year ? this.$store.state.year.toString() : ""
            return this.$store.state.document;
          },

          set(value) {
                this.$store.commit({
                    type: 'document',
                    value: +value
                });
          },
      }
  },




}
</script>
