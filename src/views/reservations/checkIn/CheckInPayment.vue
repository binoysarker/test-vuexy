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
      <div class="check-boxes">
        <b-form-radio
          v-model="Selected"
          name="some-radio9"
          value="e"
          class="custom-control-info"
        >
          By Cash
        </b-form-radio>
        <b-form-radio
          v-model="Selected"
          name="some-radio9"
          value="f"
          class="custom-control-info"
        >
          Credit Card
        </b-form-radio>
        <b-form-radio
          v-model="Selected"
          name="some-radio9"
          value="g"
          class="custom-control-info"
        >
          Prepaid online
        </b-form-radio>
        <b-form-radio
          v-model="Selected"
          name="some-radio9"
          value="h"
          class="custom-control-info"
        >
          Paynow
        </b-form-radio>
        <b-form-radio
          v-model="Selected"
          name="some-radio9"
          value="i"
          class="custom-control-info"
        >
          By Check
        </b-form-radio>
        <b-form-radio
          v-model="Selected"
          name="some-radio9"
          value="k"
          class="custom-control-info"
        >
          By Bank Transfer
        </b-form-radio>
        <b-form-radio
          v-model="Selected"
          name="some-radio9"
          value="l"
          class="custom-control-info"
        >
          Paylah
        </b-form-radio>

      </div>
      <div class="choose-filter">
        <!-- <b-card-text>Filters</b-card-text> -->
      </div>
    </div>
  </div>
</template>
<script>
import {
  BFormRadio,
} from 'bootstrap-vue'

export default {
  components: {
    BFormRadio,
  },
  data() {
    return {
      Selected: 'e',
      reservation: {
        type: 'Large Locker',
        price: '350 SGD',
        from: '04/03/2021',
        to: 'Ongoing',
      },
    }
  },
}
</script>
<style lang="scss">
@import 'src/@core/scss/base/bootstrap-extended/variables';
.grey {
    color: $text-muted;
  }
.check-boxes{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    margin-bottom: 40px;
    margin-top:40px;
  }
  .reservation-info{
    margin: 20px 0;
  }
</style>
