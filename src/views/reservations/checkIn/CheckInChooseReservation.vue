<template>
  <div>
    <div class="choose-reservation">
      <h5 class="mb-0">
        Choose the reservation you want to check in
      </h5>
      <small class="pic-reserve">
        Pick a Reservation and assign the unit you want to check in
      </small>
      <div class="choose-filter">
        <h5>
          Filters
        </h5>
        <div class="filter-input">
          <div>
            <b-form-group
              label="Search"
              label-for="search"
            >
              <b-form-input
                id="search"
                v-model="search"
                placeholder="Type here"
              />
            </b-form-group></div>
          <div>
            <b-form-group
              label="Reservation"
              label-for="reservation"
            >

              <date-range-picker
                v-model="dateRange"
                :start-date="startDate"
                :end-date="endDate"
              >
                <div
                  slot="input"
                  slot-scope="picker"
                  class="custom-date-range"
                >{{ picker.startDate | date }} - {{
                  picker.endDate | date }}</div>
              </date-range-picker>
            </b-form-group>

          </div>

          <div class="range">
            <label>
              Price
            </label>
            <Veeno
              :pipsy="{mode: 'range', density: 5}"
              :handles="rangeHandles"
              :range="range"
              :tooltips="[{ to: (n) => `${n.toFixed(2)} SGD` }, { to: (n) => `${n.toFixed(2)} SGD` }]"
            />
          </div>
        </div>
        <div class="filter-select">
          <b-form-group
            label="Country"
            label-for="i-country"
          >
            <v-select
              id="i-country"
              v-model="selectedContry"
              :options="countryName"
              :selectable="option => ! option.value.includes('select_value')"
              label="text"
              multiple
              placeholder="All Countries"
            />

          </b-form-group>
          <b-form-group
            label="City"
            label-for="i-city"
          >
            <v-select
              id="i-city"
              v-model="selectedCity"
              :options="cityName"
              multiple
              label="text"
              placeholder="All Cities"
            />

          </b-form-group>
          <b-form-group
            label="Zip Codes"
            label-for="i-district"
          >
            <v-select
              id="i-district"
              v-model="zipCode"
              :selectable="option => ! option.value.includes('select_value')"
              :options="zipCodes"
              label="text"
              placeholder="All Zip Codes"
            />

          </b-form-group>

        </div>
        <div class="filter-buildingtypes">
          <b-form-group
            label="Building Type"
            label-for="i-building_type"
          >
            <v-select
              id="i-building_type"
              v-model="selectBuildingType"
              :selectable="option => ! option.value.includes('select_value')"
              :options="buildingTypeName"
              label="text"
              placeholder="All Types"
            />

          </b-form-group>
          <b-form-group
            label="Building"
            label-for="i-building"
          >
            <v-select
              id="i-building"
              v-model="selectBuilding"
              :selectable="option => ! option.value.includes('select_value')"
              :options="buildingName"
              label="text"
              placeholder="All buildings"
            />

          </b-form-group>
        </div>
        <div class="reservations">
          <b-card
            title="Reservations"
          >
            <b-table
              responsive
              :items="unitsData"
              :select-mode="selectMode"
              selectable
              :fields="fields"
              :tbody-tr-class="rowClass"
              @row-selected="onRowSelected"
            >
              <template #cell(client)="data">
                <span>
                  <b-avatar
                    class="mr-1"
                    :src="data.value.avatar"
                  />
                  <span class="text-nowrap">{{ data.value.name }}</span>
                </span>
              </template>
            </b-table>

            <template #code>
              {{ codeBasic }}
            </template>

          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  // BButton,
  BFormInput,
  BTable,
  BCard,
  BAvatar,
  BFormGroup,
} from 'bootstrap-vue'
import Veeno from 'veeno'
import vSelect from 'vue-select'
import DateRangePicker from 'vue2-daterange-picker'
import moment from 'moment'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  components: {
    // BButton,
    BFormInput,
    BTable,
    Veeno,
    vSelect,
    BFormGroup,
    DateRangePicker,
    BCard,
    BAvatar,
    // moment
  },
  filters: {
    date(val) {
      return val ? moment(val).format('YYYY-MM-DD') : ''
    },
  },
  data() {
    /* eslint-disable global-require */
    return {
      selectMode: 'single',
      dateRange: {
        startDate: '2019-05-01',
        endDate: '2019-05-15',
      },
      selectedContry: null,
      selectedCity: null,
      selectDistrict: null,
      selectBuildingType: null,
      selectBuilding: null,
      countryName: [
        { value: 'Thailand', text: 'Thailand' },
        { value: 'Singarope', text: 'Singarope' },
      ],

      zipCode: null,
      cityName: [
        { value: 'Bankok', text: 'Bankok' },
        { value: 'Singarope', text: 'Singarope' },
      ],
      zipCodes: [
        { value: '1223', text: '1223' },
        { value: '32132', text: '32132' },
      ],
      buildingTypeName: [
        { value: 'Community', text: 'Community' },
        { value: 'Pro', text: 'Pro' },
      ],
      buildingName: [
        { value: 'Raffles Mail', text: 'Raffles Mail' },
        { value: 'Blue Diamond', text: 'Blue Diamond' },
        { value: 'Blue Heights', text: 'Blue Heights' },
        { value: 'Elite', text: 'Blue Heights' },
      ],
      rangeHandles: ['110', '255'],
      range: {
        min: 100,
        max: 399,
      },
      fields: [
        {
          key: 'type', label: 'type',
        },
        {
          key: 'price', label: 'price',
        },
        {
          key: 'building', label: 'building',
        },
        {
          key: 'reservation_date', label: 'reservation date',
        },
        {
          key: 'date_arrival', label: 'date arrival',
        },
        {
          key: 'client', label: 'client',
        },
      ],
      unitsData: [
        {
          type: 'Pro',
          price: '230 SGD',
          building: 'Raffles Mail',
          reservation_date: 'Tue 10:30',
          date_arrival: 'Tue 10:30',
          client: {
            name: 'John',
            avatar: require('@/assets/images/avatars/10-small.png'),

          },
        },
        {
          type: 'Community',
          price: '190 SGD',
          building: 'Blue Diamond',
          reservation_date: 'Tue 10:30',
          date_arrival: 'Tue 10:30',
          client: {
            name: 'Colt',
            avatar: require('@/assets/images/avatars/5-small.png'),

          },
        },
        {
          type: 'Pro',
          price: '459 SGD',
          building: 'Blue Heights',
          reservation_date: 'Tue 10:30',
          date_arrival: 'Tue 10:30',
          client: {
            name: 'Halen',
            avatar: require('@/assets/images/avatars/9-small.png'),

          },
        },
        {
          type: 'Pro',
          price: '390 SGD',
          building: 'Elite',
          reservation_date: 'Tue 10:30',
          date_arrival: 'Tue 10:30',
          client: {
            name: 'Serene',
            avatar: require('@/assets/images/avatars/1-small.png'),

          },
        },
      ],
    }
  },
  methods: {
    onRowSelected(items) {
      this.$emit('clicked', items)
    },
  },
}
</script>
<style lang="scss">
@import 'src/@core/scss/base/bootstrap-extended/variables';
@import "~shards-ui/dist/css/shards.min.css";
@import '@core/scss/vue/libs/vue-select.scss';

.choose-reservation{
  .card{
    box-shadow: none;
    border:1px solid rgba(34, 41, 47, 0.08);
    .card-title{
      font-size: 16px;
      font-weight: 400;
    }
  }
  .veeno{
    margin-top:10px;
  }
  label{
    margin-bottom: 0;
    line-height: 24px;
  }
  .vue-daterange-picker{
    width: 100%;
    .reportrange-text{
      height: 35px;
      line-height: 22px;

    }
  }
  .choose-filter{
    margin-top:20px;
  }
  .pic-reserve{
    margin-bottom: 12px;
  }

  .filter-input{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    }
  .filter-select{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  .filter-buildingtypes{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-bottom: 10px;
  }
}
</style>
