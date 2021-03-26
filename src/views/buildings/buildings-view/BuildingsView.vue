<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="buildingData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching building data
      </h4>
      <div class="alert-body">
        No building found with this building id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-buildings-list'}"
        >
          Building List
        </b-link>
        for other buildings.
      </div>
    </b-alert>

    <template v-if="buildingData">
      <!-- First Row -->
      <b-row>
        <b-col
          cols="12"
          xl="12"
          lg="12"
          md="12"
        >
          <building-view-building-info-card :building-data="buildingData" />
        </b-col>
      </b-row>

      <b-row>
        <b-col
          cols="12"
          xl="12"
          lg="12"
          md="12"
        >
          <building-view-roles
            :id="buildingData.id"
            :roles-data="buildingData.roles"
          />
        </b-col>
      </b-row>

      <b-row>
        <b-col
          cols="12"
          xl="12"
          lg="12"
          md="12"
        >
          <building-view-units
            :id="buildingData.id"
            :units-data="buildingData.units"
          />
        </b-col>
      </b-row>

    </template>

  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref, onUnmounted } from '@vue/composition-api'
import {
  BRow, BCol, BAlert, BLink,
} from 'bootstrap-vue'
import buildingStoreModule from '../buildingStoreModule'
import BuildingViewBuildingInfoCard from './BuildingViewBuildingInfoCard.vue'
import BuildingViewRoles from './BuildingViewRoles.vue'
import BuildingViewUnits from './BuildingViewUnits.vue'

export default {
  components: {
    BuildingViewUnits,
    BuildingViewRoles,
    BRow,
    BCol,
    BAlert,
    BLink,

    // Local Components
    BuildingViewBuildingInfoCard,
  },
  setup() {
    const buildingData = ref(null)

    const USER_APP_STORE_MODULE_NAME = 'app-building'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, buildingStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-building/fetchBuilding', { id: router.currentRoute.params.id })
      .then(response => {
        buildingData.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          buildingData.value = undefined
        }
      })

    return {
      buildingData,
    }
  },
}
</script>

<style>

</style>
