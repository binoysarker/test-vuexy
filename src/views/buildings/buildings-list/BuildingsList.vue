<template>

  <div>

    <building-list-add-new
      :is-add-new-building-sidebar-active.sync="isAddNewBuildingSidebarActive"
      :country-options="countryOptions"
      :city-options="cityOptions"
      @refetch-data="refetchData"
    />

    <!-- Filters -->
    <buildings-list-filters
      :country-filter.sync="countryFilter"
      :city-filter.sync="cityFilter"
      :district-filter.sync="districtFilter"
      :country-options="countryOptions"
      :city-options="cityOptions"
      :district-options="districtOptions"
      :zip-code-options="zipCodeOptions"
      :zip-code-filter.sync="zipCodeFilter"
      :building-type-filter.sync="buildingTypeFilter"
      :available-units-filter.sync="availableUnitsFilter"
      :available-unit-options="availableUnitOptions"
      :building-types-options="buildingTypesOptions"
    />

    <!-- Table Container Card -->
    <b-card class="custom-card">

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
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
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
              />
              <b-button
                variant="primary"
                @click="isAddNewBuildingSidebarActive = true"
              >
                <span class="text-nowrap">Add Building</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refBuildingListTable"
        class="position-relative"
        :items="fetchBuildings"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
        :tbody-tr-class="rowClass"
      >

        <!-- Column: Show Details -->
        <template #cell(show_details)="row">

          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-form-checkbox
            v-model="row.detailsShowing"
            class="table-custom-checkbox"
            @change="row.toggleDetails"
          >
            {{ row.detailsShowing ? 'Hide' : 'Show' }}
          </b-form-checkbox>
        </template>
        <!-- Full details on click -->
        <template #row-details="row">
          <b-card class="custom-card">
            <b-row>
              <div class="addresses">
                <div class="sub-address">
                  <div>
                    <span class="text-bold"> Address: </span> {{ row.item.address }}
                  </div>
                  <div>
                    <span class="text-bold"> Phone Number: </span> {{ row.item.contact }}
                  </div>

                </div>
                <div class="sub-address">
                  <div>
                    <span class="text-bold"> Property: </span> {{ row.item.type }}
                  </div>
                  <div>
                    <span class="text-bold"> e-mail: </span> {{ row.item.email }}
                  </div>
                </div>
                <div class="sub-address">
                  <div>
                    <span class="text-bold"> Maintener: </span> {{ row.item.roles[0].name }}
                  </div>
                  <div>
                    <span class="text-bold"> Phone Number: </span> {{ row.item.roles[0].phone }}
                  </div>
                </div>
              </div>
            </b-row>
            <b-button
              class="custom-hide"
              size="sm"
              variant="outline-secondary"
              @click="row.toggleDetails"
            >
              Hide Details
            </b-button>
          </b-card>
        </template>
        <!-- <template #row-details="row">
          <b-card>
            <b-row>
              <div class="facility-details">
                <div class="facility buildings-details">
                  <div>
                    <span class="text-bold"> Building: </span> {{ row.item.building }}
                  </div>
                  <div>
                    <span class="text-bold">e-mail:</span> {{ row.item.email }}
                  </div>
                  <div>
                    <span class="text-bold">Phone:</span> {{ row.item.phone }}
                  </div>
                </div>
                <div class="facility maintainance">
                  <div>
                    <span class="text-bold">Maintenance date:</span> {{ row.item.maintenance || '-' }}
                  </div>
                </div>
                <div class="facility facilities">
                  <div class="facllaties-sub">
                    <span class="text-bold">Facilities:</span>
                  </div>
                  <div class="facllaties-sub facility-checkboxes ">
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
                  </div>
                  <div class="facility-checkboxes">
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
                  </div>
                </div></div></b-row>
            <b-button
              size="sm"
              variant="outline-secondary"
              @click="row.toggleDetails"
            >
              Hide Details
            </b-button>
          </b-card>
        </template> -->
        <!-- Column: Building -->
        <template #cell(building)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="data.item.avatar"
                :text="avatarText(data.item.fullName)"
                :variant="`light-${resolveBuildingCountryVariant(data.item.country)}`"
                :to="{ name: 'apps-buildings-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'apps-buildings-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.fullName }}
            </b-link>
            <small class="text-muted">@{{ data.item.name }}</small>
          </b-media>
        </template>

        <!-- Column: Type -->
        <template #cell(type)="data">
          <div class="text-nowrap">
            <feather-icon
              :icon="resolveBuildingTypeIcon(data.item.type)"
              size="18"
              class="mr-50"
              :class="`text-${resolveBuildingTypeVariant(data.item.type)}`"
            />
            <span class="align-text-top text-capitalize">{{ data.item.type }}</span>
          </div>
        </template>

        <!-- Column: ID -->
        <template #cell(id)="data">
          #{{ '0000'.slice(0, 4 - data.item.id.toString().length).concat(data.item.id) }}
        </template>

        <template #cell(name)="data">
          <div style="width:130px">
            {{ data.item.name }}
          </div>
        </template>

        <!-- Column: Occupancy -->
        <template #cell(occupancy)="data">
          <b-td
            :variant="(data.item.occupancy < 15 ? 'danger' : (data.item.occupancy < 20 ? 'warning' : (data.item.occupancy >= 70 ? 'success' : '')))"
            class="occupancy"
          >
            {{ data.item.occupancy }}%
          </b-td>
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
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BDropdown, BDropdownItem, BPagination, BFormCheckbox, BTd,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import buildingStoreModule from '../buildingStoreModule'
import BuildingsListFilters from './BuildingsListFilters.vue'

import useBuildingsList from './useBuildingsList'
import BuildingListAddNew from './BuildingListAddNew.vue'

// eslint-disable-next-line no-unused-vars

export default {
  components: {
    BuildingsListFilters,
    BuildingListAddNew,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BDropdown,
    BDropdownItem,
    BPagination,
    BFormCheckbox,
    BTd,

    vSelect,
  },
  setup() {
    const BUILDING_APP_STORE_MODULE_NAME = 'app-building'

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

    const countryOptions = [
      { label: 'Thailand', value: 'Thailand' },
      { label: 'Singapore', value: 'Singapore' },
    ]

    const cityOptions = [
      { label: 'Bangkok', value: 'Bangkok' },
      { label: 'Singapore', value: 'Singapore' },
    ]

    const districtOptions = [
      { label: 'All Zip Codes', value: 'All Zip Codes' },
    ]

    const zipCodeOptions = [
      { label: '234534', value: '234534' },
      { label: '43524', value: '43524' },
    ]

    const availableUnitOptions = [
      { label: 'All Available Units', value: 'All Available Units' },
    ]

    const buildingTypesOptions = [
      { label: 'Pro', value: 'Pro' },
      { label: 'Community', value: 'Community' },
    ]

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

      // UI
      resolveBuildingTypeVariant,
      resolveBuildingTypeIcon,
      resolveBuildingDistrictVariant,

      // Extra Filters
      countryFilter,
      cityFilter,
      districtFilter,
      zipCodeFilter,
      buildingTypeFilter,
      availableUnitsFilter,
    } = useBuildingsList()

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

      // UI
      resolveBuildingTypeVariant,
      resolveBuildingTypeIcon,
      resolveBuildingDistrictVariant,

      countryOptions,
      cityOptions,
      districtOptions,
      zipCodeOptions,
      availableUnitOptions,
      buildingTypesOptions,
      // Extra Filters
      countryFilter,
      cityFilter,
      districtFilter,
      zipCodeFilter,
      buildingTypeFilter,
      availableUnitsFilter,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "src/@core/scss/base/bootstrap-extended/variables";

.custom-card{
  .card-body{
  margin: 5px 0;
  padding:0;
  }
  .custom-hide{
    margin-top:10px;
  }

}
.addresses{
  display:flex;
  .sub-address{
    margin: 0 20px 0 16px;
    .text-bold{
      font-weight: 600;
      padding-right: 15px;
    }
  }
}
.per-page-selector {
  width: 90px;
}

svg {
  &.orange {
    color: $orange;
  }

  &.primary {
    color: $primary;
  }
}

td {
  .occupancy {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
