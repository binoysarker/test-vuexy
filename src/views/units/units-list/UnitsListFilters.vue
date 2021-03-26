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
            v-model="countryFilter"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="countryFilter"
            multiple
            :options="countryOptions"
            class="w-100"
            :selectable="option => ! option.value.includes('select_value')"
            :reduce="val => val.value"
            placeholder="All Countries"
          />
        </b-col>
        <b-col
          cols="10"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>City</label>
          <v-select
            v-model="cityFilter"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="cityFilter"
            :options="cityOptiones"
            class="w-100"
            multiple
            :reduce="val => val.value"
            placeholder="All Cities"
            @input="(val) => $emit('update:cityFilter', val)"
          />
        </b-col>
        <b-col
          cols="10"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Zip Code</label>
          <v-select
            v-model="zipCodeFilter"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="zipCodeFilter"
            :options="zipCodeOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="All Zip Codes"
            @input="(val) => $emit('update:districtFilter', val)"
          />
        </b-col>
        <b-col
          cols="10"
          md="4"
          class="mb-md-0 mb-2 custom-row-top"
        >
          <label>Building type</label>
          <v-select
            v-model="typeFilter"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="typeFilter"
            :options="buildingTypeOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="All Types"
            @input="(val) => $emit('update:districtFilter', val)"
          />
        </b-col>
        <b-col
          cols="10"
          md="4"
          class="mb-md-0 mb-2 custom-row-top"
        >
          <label>Available Units</label>
          <v-select
            v-model="availableUnitFilter"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="availableUnitFilter"
            :options="availableUnitOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="All Available Units"
            @input="(val) => $emit('update:districtFilter', val)"
          />
        </b-col>
        <b-col
          cols="10"
          md="4"
          class="mb-md-0 mb-2 custom-row-top"
        >
          <label>Unit type</label>
          <v-select
            v-model="unitTypeFilter"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="unitTypeFilter"
            :options="unitTypeOptions"
            class="w-100"
            placeholder="All Unit Types"
            @input="(val) => $emit('update:districtFilter', val)"
          />
        </b-col>
      </b-row>
      <b-row class="custom-unitSection">
        <b-col
          cols="10"
          md="4"
          class="mb-md-0 mb-2 custom-row-top"
        >
          <label>Unit size</label>
          <v-select
            v-model="unitSizeFilter"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="unitSizeFilter"
            :options="unitSizeOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="All Unit Sizes"
            @input="(val) => $emit('update:countryFilter', val)"
          />
        </b-col>
        <b-col
          cols="10"
          md="4"
          class="mb-md-0 mb-2 custom-row-top"
        >
          <label>Reservation status</label>
          <v-select
            v-model="reservationFilter"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="reservationFilter"
            :options="reservationStatusOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="All Statuses"
            @input="(val) => $emit('update:cityFilter', val)"
          />
        </b-col>
        <b-col
          cols="10"
          md="4"
          class="mb-md-0 mb-2 custom-row-top"
        >
          <label>Date range</label>
          <flat-pickr
            v-model="rangeDate"
            class="form-control"
            :config="{mode: 'range'}"
            :disable="false"
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
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    vSelect,
    flatPickr,
  },
  data() {
    return {
      rangeDate: '2019-05-15',

      countryFilter: null,
      cityFilter: null,
      zipCodeFilter: null,
      reservationFilter: null,
      unitSizeFilter: null,
      unitTypeFilter: null,
      availableUnitFilter: null,
      typeFilter: null,
      availableUnits: [
        { label: 'All Available Units', value: 'All Available Units' },
      ],
      countryOptions: [
        { label: 'Thailand', value: 'Thailand' },
        { label: 'Singapore', value: 'Singapore' },
      ],
      cityOptiones: ['Bangkok', 'Chiang Mai', 'Singapore', 'Woodlands'],
      citiesFilter: null,
      zipCodeOptions: [
        { label: '234534', value: '234534' },
        { label: '43524', value: '43524' },
      ],
      buildingTypeOptions: [
        { label: 'Community', value: 'Community' },
        { label: 'Pro', value: 'Pro' },
      ],
      availableUnitOptions: [
        { label: 'All Available Units', value: 'All Available Units' },
      ],
      unitTypeOptions: [
        { label: 'Small climate', value: 'Small climate' },
        { label: 'Large CCTV', value: 'Large CCTV' },
        { label: 'Large Locker', value: 'Large Locker' },
      ],
      reservationStatusOptions: [
        { label: 'Upcoming', value: 'Upcoming' },
        { label: 'Ongoing', value: 'Ongoing' },
        { label: 'Outgoing', value: 'Outgoing' },
      ],
      unitSizeOptions: [
        { label: 'S', value: 'S' },
        { label: 'M', value: 'M' },
        { label: 'L', value: 'L' },
        { label: 'XL', value: 'XL' },
      ],
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
@import '@core/scss/vue/libs/vue-flatpicker.scss';
.custom-row-top{
  margin-top:10px;
}
</style>
