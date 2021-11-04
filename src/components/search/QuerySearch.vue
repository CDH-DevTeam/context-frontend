<template>

  <v-text-field
    v-model="query"
    color="orange"
    clearable
    hide-details
    prepend-inner-icon="mdi-magnify"
    label="Sök"
    class="mx-4"
    @keydown.enter.prevent="submit"
    ></v-text-field>
    
</template>

<script>
export default {
  name: 'QuerySearch',

  beforeCreate () {
      // console.log(this.query)
      // Update the store state

      if (this.$route.query.word) {
        this.$store.commit({
          type: 'query',
          value: this.$route.query.word
        });
      }       
  },

  data () {
    return {
      query: this.$store.state.query
    }
  },

  methods: {
    submit () {

      // When updating the search
      // Change the route
      // this.$router.push({ path: '/', query: { word: this.query.toLowerCase() }});

      // Update the store state
      this.$store.commit({
        type: 'query',
        value: this.query.toLowerCase()
      });
    }
  },


}
</script>
