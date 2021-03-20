<template>
  <div>
    <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперёд'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
    />

    <div class="input-field col s12">
      <select v-model="pageSize">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  </div>
</template>


<script>

import paginationMixin from '@/mixins/pagination.mixin';

export default {
  name: "HistoryPaginate",
  mixins: [paginationMixin],
  props: {
    categories: {
      type: Array,
      required: true
    },
    records: {
      type: Array,
      required: true
    }
  },
}
</script>
