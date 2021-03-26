<template>
  <div>
    <div class="choose-reservation">
      <h5 class="mb-0">
        Choose the reservation you want to check in
      </h5>
      <small class="pic-reserve">
        Pick a Reservation and assign the unit you want to check in
      </small>
      <div class="reservation-info">
        <span>
          Your Reservation
        </span>
        <span class="grey">
          {{ reservation.type }} - {{ reservation.price }}
        </span>
        <span class="grey">
          From {{ reservation.from }} - {{ reservation.to }}
        </span>
      </div>
      <b-form-checkbox
        v-model="selected"
        value="A"
      >
        Show Only Available Units
      </b-form-checkbox>
      <div class="choose-filter">
        <!-- <b-card-text>Filters</b-card-text> -->
        <div class="reservations">
          <b-card
            title="Units"
          >
            <b-table
              responsive="sm"
              :items="unitsData"
              :select-mode="selectMode"
              selectable
              @row-selected="onRowSelected"
            />

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
  BCard,
  BTable,
  BFormCheckbox,
} from 'bootstrap-vue'

export default {
  components: {
    // BButton,
    BTable,
    BFormCheckbox,
    BCard,
  },
  data() {
    return {
      selectMode: 'single',
      rangeHandles: [110, 255],
      range: {
        min: 100,
        max: 350,
      },
      reservation: {
        type: 'Large Locker',
        price: '350 SGD',
        from: '04/03/2021',
        to: 'Ongoing',
      },
      unitsData: [
        {
          id: '001',
          area: '122 Sq. ft',
          size: 'L',
          floor: -1,
          mainten: 'Mon 3:30',
          free_since: 'Mon 3:30',
        },
        {
          id: '002',
          area: '232 Sq. ft',
          size: 'L',
          floor: -1,
          mainten: 'Tue 5:30',
          free_since: 'Tue 5:30',
        },
        {
          id: '003',
          area: '422 Sq. ft',
          size: 'L',
          floor: -1,
          mainten: 'Fri 11:30',
          free_since: 'Fri 11:30',
        },
        {
          id: '004',
          area: '172 Sq. ft',
          size: 'L',
          floor: -1,
          mainten: 'Tue 12:30',
          free_since: 'Tue 12:30',
        },
      ],
    }
  },
  methods: {
    onRowSelected(item) {
      this.$emit('clicked', item)
    },
  },
}
</script>
<style lang="scss" scoped>
@import 'src/@core/scss/base/bootstrap-extended/variables';
@import "~shards-ui/dist/css/shards.min.css";

.grey {
    color: $text-muted;
  }
.choose-reservation{
  .card{
    box-shadow: none;
    border:1px solid rgba(34, 41, 47, 0.08);
    .card-title{
      font-size: 16px;
      font-weight: 400;
    }
  }
  .reservation-info{
    margin: 20px 0;
  }
  .custom-checkbox{
    label{
        font-size: 14px;
        font-weight: 400;
      }
  }
  .filter-input{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-bottom: 20px;
    }
    .filter-select{
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 20px;
      margin-bottom: 20px;
    }
}
    .actions{
      display: flex;
      justify-content: space-between;
    }
    label {
  display: flex;
  line-height: 30px;
  align-items: center;
  margin-bottom: 10px;
}
</style>
