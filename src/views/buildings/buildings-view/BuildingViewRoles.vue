<template>

  <div class="roles">
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="d-flex flex-wrap card-header">
        <h5>
          Roles
        </h5>
        <b-button
          :to="{ name: 'apps-buildings-edit', params: { id: id } }"
          variant="primary"
        >
          Edit
        </b-button>
      </div>

      <b-table
        ref="refBuildingListTable"
        class="position-relative"
        :items="rolesData"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      />

      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="currentPage"
              :total-rows="totalBuildings"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BTable, BPagination, BButton,
} from 'bootstrap-vue'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import buildingStoreModule from '../buildingStoreModule'
import useBuildingRolesList from './useBuildingRolesList'

// eslint-disable-next-line no-unused-vars

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BPagination,
    BButton,
  },
  props: {
    rolesData: {
      type: Array,
      default: () => [],
    },
    id: {
      type: Number,
      default: null,
    },
  },
  setup() {
    const BUILDING_APP_STORE_MODULE_NAME = 'building-details'

    // Register module
    if (!store.hasModule(BUILDING_APP_STORE_MODULE_NAME)) {
      store.registerModule(BUILDING_APP_STORE_MODULE_NAME, buildingStoreModule)
    }

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(BUILDING_APP_STORE_MODULE_NAME)) {
        store.unregisterModule(BUILDING_APP_STORE_MODULE_NAME)
      }
    })

    const isAddNewBuildingSidebarActive = ref(false)

    const {
      fetchBuildings,
      tableColumns,
      perPage,
      currentPage,
      totalBuildings,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refBuildingListTable,
      refetchData,
    } = useBuildingRolesList()

    return {

      // Sidebar
      isAddNewBuildingSidebarActive,

      fetchBuildings,
      tableColumns,
      perPage,
      currentPage,
      totalBuildings,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refBuildingListTable,
      refetchData,

      // Filter
      avatarText,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.roles {
  margin-bottom: 30px;

  .card-header {
    justify-content: flex-start;

    h5 {
      margin: 0;
    }

    .btn {
      margin-left: 10px;
    }
  }
}
</style>
