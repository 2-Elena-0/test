<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">Записей пока нет
      <router-link to="/record">Добавить новую запись</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items"/>
    </section>


    <HistoryPaginate :records="this.records" :categories="this.categories"/>

  </div>
</template>


<script>
import HistoryPaginate from "@/components/HistoryPaginate";
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from '@/mixins/pagination.mixin';

export default {
  name: 'history',
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    dropdown: null,
    categories: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'доход' : 'расход'
      }
    }))
    const elems = document.querySelectorAll('select');
    const instances = M.FormSelect.init(elems);
    this.loading = false


  },
  components: {
    HistoryTable, HistoryPaginate
  },
}
</script>