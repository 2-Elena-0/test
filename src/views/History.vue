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

    <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="PageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперёд'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
    />


    <ul class="hide-on-small-and-down">
      <li>
        <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown1"
            ref="dropdown">
          name
          <i class="material-icons">arrow_drop_down</i>
        </a>

        <ul id='dropdown1' class='dropdown-content'>
          <li>
            <a class="black-text" @click.prevent="this.changePageSize(5)">5</a>
          </li>
          <li>
            <a class="black-text" @click.prevent="this.changePageSize(10)">10</a>
          </li>
          <li>
            <a class="black-text" @click.prevent="this.changePageSize(15)">15</a>
          </li>
          <li>
            <a class="black-text" @click.prevent="this.changePageSize(20)">20</a>
          </li>
        </ul>
      </li>
    </ul>

  </div>
</template>


<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from "@/components/HistoryTable";

export default {
  name: 'history',
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    dropdown: null,
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'доход' : 'расход'
      }
    }))
    this.loading = false
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {constrainWidth: false})
  },
  components: {
    HistoryTable
  }
}
</script>