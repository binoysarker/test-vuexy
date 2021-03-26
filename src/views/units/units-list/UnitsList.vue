<template>

  <div class="units">
    <units-list-filters />
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0 units-card"
    >

      <div class="m-2">
        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <!-- <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Show</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
          </b-col> -->

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-left">
              <!-- <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
              /> -->
              <b-button
                variant="primary"
                @click="isAddNewUnitSidebarActive = true"
              >
                <span
                  class="text-nowrap"
                  @click="handleClickUnitList"
                >Add Unit</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>
      <b-table
        ref="refUnitListTable"
        class="position-relative custom-table-unit"
        :items="units"
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
          <b-card class="my-custom-card">
            <b-row>
              <b-col
                cols="12"
                sm="2"
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
              class="custom-btn"
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
            :variant="(data.item.available === 'AVAILABLE' ? 'success' : 'danger')"
          >
            {{ data.item.available }}
          </b-badge>
        </template>
        <template #cell(id)="data">
          {{ '0000'.slice(0, 4 - data.item.id.toString().length).concat(data.item.id) }}
        </template>
        <template #cell(price)="data">
          <div style="width:80px">
            {{ data.item.price }} {{ data.item.currency }}
          </div>

        </template>
        <template #cell(maintener)="data">
          <div style="width:120px">
            {{ data.item.maintener }}
          </div>

        </template>
        <template #cell(type)="data">
          <div style="width:100px">
            {{ data.item.type }}
          </div>

        </template>
        <template #cell(name)="data">
          <!-- {{ data.item.name || '-' }} -->
          <div style="width:180px">
            {{ data.item.name || '-' }}
          </div>
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
              :total-rows="totalUnits"
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
  BCard, BRow, BCol, BTable, BPagination, BButton, BFormCheckbox, BDropdown, BDropdownItem, BBadge,
} from 'bootstrap-vue'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
// import vSelect from 'vue-select'
import router from '@/router'
import unitStoreModule from '../unitStoreModule'
import useUnitUnitsList from './useUnitsList'
import UnitsListFilters from './UnitsListFilters.vue'

// eslint-disable-next-line no-unused-vars

export default {
  components: {
    UnitsListFilters,
    BCard,
    BRow,
    BCol,
    BTable,
    BPagination,
    BButton,
    BFormCheckbox,
    BDropdown,
    BDropdownItem,
    BBadge,

    // vSelect,
  },
  data() {
    return {
      units: [
        {
          isShow: false,
          id: 1,
          area: 122,
          type: 'Small climate',
          floor: 1,
          name: 'CCTV Big blue unit',
          price: 230,
          currency: 'SGD',
          available: 'RESERVED',
          reserve: 'Outgoing',
          depart: '14/03/22',
          maintener: 'Davor Suker',
          length: 3,
          width: 4,
          height: 3,
          guest: 'Pablo Roberto',
          email: 'paulo.roberto.1982@gmail.com',
          arrival_date: '22/02/2021',
          departure_date: null,
          maintenance: 'Tue 10:30',
          facilities: {
            cctv: true,
            parking: true,
            smart_lock: false,
            ac: false,
          },
        },
        {
          isShow: false,
          id: 2,
          area: 44,
          type: 'Large CCTV',
          floor: '-2 Parking',
          name: null,
          price: 145,
          currency: 'SGD',
          available: 'AVAILABLE',
          reserve: null,
          depart: null,
          maintener: 'Miguel Gonzalez',
          length: 3,
          width: 4,
          height: 3,
          guest: 'Pablo Roberto',
          email: 'paulo.roberto.1982@gmail.com',
          arrival_date: '22/02/2021',
          departure_date: null,
          maintenance: 'Tue 10:30',
          facilities: {
            cctv: true,
            parking: true,
            smart_lock: false,
            ac: false,
          },
        },
        {
          isShow: true,
          id: 3,
          area: 12,
          type: 'Large Locker',
          floor: 'Basement',
          name: 'Super secure room',
          price: 350,
          currency: 'SGD',
          available: 'RESERVED',
          reserve: 'Upcoming',
          depart: null,
          maintener: 'Miguel Gonzalez',
          length: 3,
          width: 4,
          height: 3,
          guest: 'Pablo Roberto',
          email: 'paulo.roberto.1982@gmail.com',
          arrival_date: '22/02/2021',
          departure_date: null,
          maintenance: 'Tue 10:30',
          facilities: {
            cctv: true,
            parking: true,
            smart_lock: false,
            ac: false,
          },
        },
      ],
    }
  },
  methods: {
    handleClickUnitList() {
      router.push({ path: '/units/add-units' })
    },
  },
  setup() {
    const UNIT_APP_STORE_MODULE_NAME = 'unit-details'

    // Register module
    if (!store.hasModule(UNIT_APP_STORE_MODULE_NAME)) {
      store.registerModule(UNIT_APP_STORE_MODULE_NAME, unitStoreModule)
    }

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(UNIT_APP_STORE_MODULE_NAME)) {
        store.unregisterModule(UNIT_APP_STORE_MODULE_NAME)
      }
    })

    const isAddNewUnitSidebarActive = ref(false)

    const {
      fetchUnits,
      tableColumns,
      perPage,
      currentPage,
      totalUnits,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUnitListTable,
      typeFilter,
      typesOptions,
      availabilityFilter,
      availabilityOptions,
      reservationStatusFilter,
      reservationStatusOptions,
      refetchData,
    } = useUnitUnitsList()

    return {

      // Sidebar
      isAddNewUnitSidebarActive,

      fetchUnits,
      tableColumns,
      perPage,
      currentPage,
      totalUnits,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUnitListTable,
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
.my-custom-card{
  .card-body{
  padding:10px 0 0 0;

  }
  .custom-btn{
    margin-top:10px;
    // margin-left: 24px;
  }
}
.per-page-selector {
  width: 90px;
}

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
.custom-table-unit{
  td{
    width: 300px;
  }
}
</style>
