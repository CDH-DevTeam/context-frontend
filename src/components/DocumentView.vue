<template>
    <v-card>
        <v-card-title>Dokument</v-card-title>
        <v-card-text class="two-column-text">
            <p v-for="sentence in this.sentences" v-bind:key="sentence.id">
                {{ sentence.text }}
            </p>
            </v-card-text>
        <!-- <span>{{ this.text }}</span> -->
    </v-card>
</template>

<script>
import sentenceAPI from "./api/sentence.api";

export default {

    name: 'DocumentView',

    data() {
        return {
            text: "",
            sentences: ""
        }
    },

    created() {
        this.fetch({
            query: null,
            page: null,
            limit: null,
            year: null,
            document: this.$store.state.document
        })

    },

    computed: {

        document() {
            return this.$store.state.document;
        },

    },

    methods: {

        fetch(params) {
            // Check if number or zero
            console.log(params)
            sentenceAPI
                .get(
                    params.query,
                    null,
                    params.limit,
                    params.year,
                    params.document
                )
                .then((response) => {

                    console.log(response)

                    // Mutate the sentences
                    this.sentences = response.map((sentence, idx) => {
                        
                        return {text: sentence.text, id: idx}

                    });

                })
                .catch((error) => {
                    console.log(error);
                });
            },

    }




}
</script>

<style>
.two-column-text {
  -webkit-columns: 2;
  -moz-columns: 2;
  columns: 2;
}
.two-column-text p {
  margin: 0;
}
.two-column-text p + p {
  text-indent: 1em;
}
</style>