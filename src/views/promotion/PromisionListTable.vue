<template>

  <b-card class="custom-card">
    <b-row>

      <!-- Per Page -->
      <b-col
        cols="12"
        md="6"
        class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
      >
        <span class="card-title mr-2 mt-1 p-0 ml-2">{{ props.tableTitle }}</span>
        <b-button
          v-if="props.showAddNewButton"
          variant="primary"
          :to="{ name: 'apps-invoice-add'}"
        >
          New Promotions
        </b-button>
      </b-col>
    </b-row>
    <b-row v-if="props.showFilter">
      <b-col>
        <PromotionListFilters />
      </b-col>
    </b-row>
    <b-table
      ref="refPromotionListTable"
      responsive
      :fields="props.givenTableColumns"
      show-empty
      empty-text="No matching records found"
      :items="props.givenItems"
    >
      <template #cell(active)="data">
        <b-form-checkbox
          v-model="data.item.active"
          name="check-button"
          :checked="data.item.active"
          switch
        >
          <b :class="data.item.active ? 'text-success' : 'text-danger'">{{ data.item.active ? 'Enabled' : 'Disabled' }}</b>
        </b-form-checkbox>
      </template>
      <template #cell(clients)="data">
        {{ data.item.clients.title }}
        <!--        <b-avatar-->
        <!--          class="mr-1"-->
        <!--          :src="require('../../' + data.item.clients.image)"-->
        <!--        />-->
        <!--        <span class="text-nowrap">{{ data.item.clients.title }}</span>-->

      </template>
      <!-- Column: Actions -->
      <template #cell(actions)="data">
        <b-dropdown
          variant="link"
          no-caret
          :right="$store.state.appConfig.isRTL"
        >

          <template #button-content>
            <feather-icon
              icon="MoreVerticalIcon"
              size="16"
              class="align-middle text-body"
            />
          </template>
          <b-dropdown-item :to="{ name: 'building-details', params: { id: data.item.id } }">
            <feather-icon icon="FileTextIcon" />
            <span class="align-middle ml-50">Details</span>
          </b-dropdown-item>

          <b-dropdown-item :to="{ name: 'apps-buildings-edit', params: { id: data.item.id } }">
            <feather-icon icon="EditIcon" />
            <span class="align-middle ml-50">Edit</span>
          </b-dropdown-item>

          <b-dropdown-item>
            <feather-icon icon="TrashIcon" />
            <span class="align-middle ml-50">Delete</span>
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>

  </b-card>

</template>

<script>

import { avatarText } from '@core/utils/filter'
import { onUnmounted } from '@vue/composition-api'
import store from '@/store'
import { FormWizard } from 'vue-form-wizard'
import usePromitionList from './usePromotionList'
import PromotionListFilters from './PromotionListFilters.vue'
import promotionStoreModule from './promotionStoreModule'
import commonBootstrapComponentMixin from '../../mixins/commonBootstrapComponents'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    FormWizard,
    PromotionListFilters,
  },
  mixins: [commonBootstrapComponentMixin],
  props: {
    tableTitle: {
      type: String,
      default: '',
    },
    givenItems: {
      type: Array,
      default: () => [],
    },
    givenTableColumns: {
      type: Array,
      default: () => [],
    },
    showFilter: {
      type: Boolean,
      default: false,
    },
    showAddNewButton: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const INVOICE_APP_STORE_MODULE_NAME = 'app-promotion'

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, promotionStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    })

    const statusOptions = [
      'Downloaded',
      'Draft',
      'Paid',
      'Partial Payment',
      'Past Due',
    ]

    const {
      fetchPromition,
      tableColumns,
      perPage,
      currentPage,
      totalPromition,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refPromotionListTable,

      statusFilter,

      refetchData,

      resolvePromotionStatusVariantAndIcon,
      resolveClientAvatarVariant,
    } = usePromitionList()

    return {
      props,
      fetchPromition,
      tableColumns,
      perPage,
      currentPage,
      totalPromition,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refPromotionListTable,

      statusFilter,

      refetchData,

      statusOptions,

      avatarText,
      resolvePromotionStatusVariantAndIcon,
      resolveClientAvatarVariant,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.promotion-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>
