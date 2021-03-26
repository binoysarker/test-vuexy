<template>

  <div class="units">
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="d-flex flex-wrap card-header">
        <h5>
          Units
        </h5>
        <b-button
          :to="{ name: 'apps-buildings-edit', params: { id: id } }"
          variant="primary"
        >
          Add
        </b-button>
      </div>

      <b-row class="filters">
        <b-col
          cols="12"
          md="2"
          class="mb-md-0 mb-2"
        >
          <label>Filter by Type</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="typeFilter"
            :options="typesOptions"
            class="w-100"
            @input="(val) => $emit('update:typeFilter', val)"
          />
        </b-col>
        <b-col
          cols="12"
          md="2"
          class="mb-md-0 mb-2"
        >
          <label>Filter by Availability</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="availabilityFilter"
            :options="availabilityOptions"
            class="w-100"
            :reduce="val => val.value"
            @input="(val) => $emit('update:availabilityFilter', val)"
          />
        </b-col>
        <b-col
          cols="12"
          md="3"
          class="mb-md-0 mb-2 "
        >
          <label>Filter by Reservation Status</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl ' : 'ltr'"
            :value="reservationStatusFilter"
            :options="reservationStatusOptions"
            class="w-100"
            :reduce="val => val.value"
            @input="(val) => $emit('update:typeFilter', val)"
          />
        </b-col>
        <b-col
          cols="12"
          md="5"
          class="mb-md-0 mb-2"
        >
          <label>Search any text</label>
          <b-form-input
            v-model="searchQuery"
            class="d-inline-block mr-1"
            placeholder="Search..."
          />
        </b-col>
      </b-row>

      <b-table
        ref="refBuildingListTable"
        class="position-relative"
        :items="unitsData"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >

        <template #cell(show_details)="row">

          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-form-checkbox
            v-model="row.detailsShowing"
            @change="row.toggleDetails"
          >
            {{ row.detailsShowing ? 'Hide' : 'Show' }}
          </b-form-checkbox>
        </template>

        <!-- full detail on click -->
        <template #row-details="row">
          <b-card>
            <b-row>
              <b-col
                cols="12"
                sm="1"
                class="column"
              >
                <div class="size">
                  <div class="bold">
                    Length:
                  </div>
                  <div>{{ row.item.length }} Sq.ft</div>
                </div>
                <div class="size">
                  <div class="bold">
                    Width:
                  </div>
                  <div>{{ row.item.width }} Sq.ft</div>
                </div>
                <div class="size">
                  <div class="bold">
                    Height:
                  </div>
                  <div>{{ row.item.height }} Sq.ft</div>
                </div>
              </b-col>
              <b-col
                cols="12"
                sm="3"
                class="column"
              >
                <div class="guest">
                  <div class="bold">
                    Guest
                  </div>
                  <div>{{ row.item.guest }}</div>
                </div>
                <div class="email">
                  <div class="bold">
                    e-mail
                  </div>
                  <div>{{ row.item.email }}</div>
                </div>
              </b-col>
              <b-col
                cols="12"
                sm="3"
                class="column"
              >
                <b-row>
                  <b-col
                    cols="12"
                    sm="6"
                  >
                    <div class="bold">
                      Arrival date:
                    </div>
                    <div class="bold">
                      Departure date:
                    </div>
                    <div class="bold">
                      Maintenance:
                    </div>
                  </b-col>
                  <b-col
                    cols="12"
                    sm="6"
                  >
                    <div>
                      {{ row.item.arrival_date || '-' }}
                    </div>
                    <div>
                      {{ row.item.departure_date || '-' }}
                    </div>
                    <div>
                      {{ row.item.maintenance || '-' }}
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col
                cols="12"
                sm="4"
                class="column"
              >
                <b-row class="facilities">
                  <b-col
                    cols="12"
                    sm="3"
                  >
                    <div class="bold">
                      Facilities:
                    </div>
                  </b-col>
                  <b-col
                    cols="12"
                    sm="4"
                  >
                    <div>
                      <label>
                        <b-form-checkbox
                          disabled
                          :checked="row.item.facilities.cctv"
                        />
                        CCTV
                      </label>
                    </div>
                    <div>
                      <label>
                        <b-form-checkbox
                          disabled
                          :checked="row.item.facilities.parking"
                        />
                        Parking
                      </label>
                    </div>
                  </b-col>
                  <b-col
                    cols="12"
                    sm="4"
                  >
                    <div>
                      <label>
                        <b-form-checkbox
                          disabled
                          :checked="row.item.facilities.smart_lock"
                        />
                        Smart Lock
                      </label>
                    </div>
                    <div>
                      <label>
                        <b-form-checkbox
                          disabled
                          :checked="row.item.facilities.ac"
                        />
                        A/C
                      </label>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-button
              size="sm"
              variant="outline-secondary"
              @click="row.toggleDetails"
            >
              Hide Details
            </b-button>
          </b-card>
        </template>

        <template #cell(available)="data">
          <b-badge
            pill
            :variant="(data.item.available === 'AVAILABLE' ? 'light-success' : 'light-danger')"
          >
            {{ data.item.available }}
          </b-badge>
        </template>
        <template #cell(id)="data">
          {{ '0000'.slice(0, 4 - data.item.id.toString().length).concat(data.item.id) }}
        </template>
        <template #cell(price)="data">
          {{ data.item.price }} {{ data.item.currency }}
        </template>
        <template #cell(name)="data">
          {{ data.item.name || '-' }}
        </template>
        <template #cell(reserve)="data">
          {{ data.item.reserve || '-' }}
        </template>
        <template #cell(depart)="data">
          {{ data.item.depart || '-' }}
        </template>
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
            <b-dropdown-item @click="activeUnitDetailData = data.item">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>

      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{
              dataMeta.of
            }} entries</span>
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
  BCard, BRow, BCol, BTable, BPagination, BButton, BFormCheckbox, BFormInput, BDropdown, BDropdownItem, BBadge,
} from 'bootstrap-vue'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import buildingStoreModule from '../buildingStoreModule'
import useBuildingUnitsList from './useBuildingUnitsList'

// eslint-disable-next-line no-unused-vars

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BPagination,
    BButton,
    BFormCheckbox,
    BFormInput,
    BDropdown,
    BDropdownItem,
    BBadge,

    vSelect,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    unitsData: Array,
    // eslint-disable-next-line vue/require-default-prop
    id: Number,
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
      typeFilter,
      typesOptions,
      availabilityFilter,
      availabilityOptions,
      reservationStatusFilter,
      reservationStatusOptions,
      refetchData,
    } = useBuildingUnitsList()

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
      typeFilter,
      typesOptions,
      availabilityFilter,
      availabilityOptions,
      reservationStatusFilter,
      reservationStatusOptions,
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

.units {
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

  .filters {
    padding: 0 20px 20px;
  }

  .column {
    line-height: 20px;
    font-size: 12px;
    align-items: flex-start;

    &>div {
      display: flex;
      align-items: center;
    }

    .size {
      justify-content: space-around;
    }

    .bold {
      font-weight: 600;
      margin-right: 10px;
    }

    .facilities {
      align-items: flex-start;
    }

    label {
      display: flex;
      line-height: 30px;
      align-items: center;
    }
  }
}
</style>
