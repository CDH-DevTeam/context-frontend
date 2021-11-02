<template>
<v-container>
    <query-search/>
    <year-search/>
    <document-search/>
</v-container>
</template>

<script>
import QuerySearch from './QuerySearch.vue'
import DocumentSearch from './DocumentSearch.vue'
import YearSearch from './YearSearch.vue'

export default {
    name: 'Search',
    components: {
        QuerySearch,
        DocumentSearch,
        YearSearch
    }
}
</script>