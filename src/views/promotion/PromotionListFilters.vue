<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>
        Filters
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col
          class="mb-md-0 mb-2"
        >
          <label>Building</label>
          <v-select
            v-model="buildingFilter"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="buildingFilter"
            multiple
            :options="buildingOptions"
            class="w-100"
            :selectable="option => ! option.value.includes('select_value')"
            :reduce="val => val.value"
            placeholder="All Countries"
          />
        </b-col>
        <b-col
          class="mb-md-0 mb-2"
        >
          <label>Type of Unit</label>
          <v-select
            v-model="unitTypeFilter"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="unitTypeFilter"
            :options="unitTypeOptiones"
            class="w-100"
            multiple
            :reduce="val => val.value"
            placeholder="All Cities"
            @input="(val) => $emit('update:unitTypeFilter', val)"
          />
        </b-col>
        <b-col
          class="mb-md-0 mb-2"
        >
          <label>Unit</label>
          <v-select
            v-model="unitFilter"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="unitFilter"
            :options="unitOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="All Zip Codes"
            @input="(val) => $emit('update:districtFilter', val)"
          />
        </b-col>
        <b-col
          class="mb-md-0 mb-2 custom-row-top"
        >
          <label>Reservation Status</label>
          <v-select
            v-model="reservationStatusFilter"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="reservationStatusFilter"
            :options="buildingTypeOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="All Types"
            @input="(val) => $emit('update:districtFilter', val)"
          />
        </b-col>
        <b-col
          class="mb-md-0 mb-2 custom-row-top"
        >
          <label>Promotion</label>
          <v-select
            v-model="promotionFilter"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="promotionFilter"
            :options="promotionOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="All Available Units"
            @input="(val) => $emit('update:districtFilter', val)"
          />
        </b-col>

      </b-row>

    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BRow, BCol,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    vSelect,
  },
  setup() {
    const buildingFilter = ref(null)
    const unitFilter = ref(null)
    const unitTypeFilter = ref(null)
    const promotionFilter = ref(null)
    const reservationStatusFilter = ref(null)

    const buildingOptions = ref([
      { label: 'Thailand', value: 'Thailand' },
      { label: 'Singapore', value: 'Singapore' },
    ])
    const unitTypeOptiones = ref(['Bangkok', 'Chiang Mai', 'Singapore', 'Woodlands'])
    const unitOptions = ref([
      { label: '234534', value: '234534' },
      { label: '43524', value: '43524' },
    ])
    const buildingTypeOptions = ref([
      { label: 'Community', value: 'Community' },
      { label: 'Pro', value: 'Pro' },
    ])
    const promotionOptions = ref([
      { label: 'All Available Units', value: 'All Available Units' },
    ])

    return {
      buildingFilter,
      unitFilter,
      unitTypeFilter,
      promotionFilter,
      reservationStatusFilter,
      buildingOptions,
      unitTypeOptiones,
      unitOptions,
      buildingTypeOptions,
      promotionOptions,
    }
  },

}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.custom-row-top{
  margin-top:10px;
}
</style>
