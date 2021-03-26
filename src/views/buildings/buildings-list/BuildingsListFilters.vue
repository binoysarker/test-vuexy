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
          cols="10"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Country</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="countryFilter"
            multiple
            :options="countryOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="All Countries"
            @input="(val) => $emit('update:countryFilter', val)"
          />
        </b-col>
        <b-col
          cols="10"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>City</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :v-model="citiesFilter"
            :options="cityOptiones"
            class="w-100"
            multiple
            :reduce="val => val.value"
            placeholder="All Cities"
          />
        </b-col>
        <b-col
          cols="10"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Zip Codes</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="zipCodeFilter"
            :options="zipCodeOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="All Zip Codes"
            @input="(val) => $emit('update:zipCodeFilter', val)"
          />
        </b-col>
        <b-col
          cols="10"
          md="4"
          class="mb-md-0 mb-2 custom-row-top"
        >
          <label>Building type</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="buildingTypeFilter"
            :options="buildingTypesOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="All types"
            @input="(val) => $emit('update:buildingTypeFilter', val)"
          />
        </b-col>
        <b-col
          cols="10"
          md="4"
          class="mb-md-0 mb-2 custom-row-top"
        >
          <label>Available Units</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="availableUnitsFilter"
            :options="availableUnitOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="All Available Units"
            @input="(val) => $emit('update:availableUnitsFilter', val)"
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

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    vSelect,
  },
  props: {
    countryFilter: {
      type: [Array, null],
      default: null,
    },
    cityFilter: {
      type: [Array, null],
      default: null,
    },
    districtFilter: {
      type: [String, null],
      default: null,
    },
    countryOptions: {
      type: Array,
      required: true,
    },
    cityOptions: {
      type: Array,
      required: true,
    },
    districtOptions: {
      type: Array,
      required: true,
    },
    zipCodeOptions: {
      type: Array,
      required: true,
    },
    availableUnitOptions: {
      type: Array,
      required: true,
    },
    buildingTypesOptions: {
      type: Array,
      required: true,
    },
    zipCodeFilter: {
      type: [String, null],
      default: null,
    },
    buildingTypeFilter: {
      type: [String, null],
      default: null,
    },
    availableUnitsFilter: {
      type: [String, null],
      default: null,
    },
  },
  data() {
    return {
      cityOptiones: ['Bangkok', 'Chiang Mai', 'Singapore', 'Woodlands'],
      citiesFilter: null,
    }
  },
  watch: {
    countryFilter(val) {
      if (val.length < 0) {
        this.cityOptiones = ['Bangkok', 'Chiang Mai', 'Singapore', 'Woodlands']
      } else if (val.includes('Singapore') && val.includes('Singapore')) {
        this.cityOptiones = ['Bangkok', 'Chiang Mai', 'Singapore', 'Woodlands']
      } else if (val.includes('Thailand')) {
        this.cityOptiones = ['Bangkok', 'Chiang Mai']
      } else if (val.includes('Singapore')) {
        this.cityOptiones = ['Singapore', 'Woodlands']
      } else this.cityOptiones = ['Bangkok', 'Chiang Mai', 'Singapore', 'Woodlands']
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.custom-row-top{
  margin-top:10px;
}
</style>
