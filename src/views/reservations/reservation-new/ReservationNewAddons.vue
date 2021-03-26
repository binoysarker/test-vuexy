<template>
  <div class="add-ons">
    <div class="info-addons">
      <div class="block-info">
        <h5 class="mb-0">
          Add-ons
        </h5>
        <small class="pic-reserve">
          Choose the extra services the client needs for the Unit
        </small>
      </div>

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
    </div>

    <div class="facilities block">
      <b-row>
        <b-col mb="4">
          <b-row>
            <b-col mb="6">
              <label>
                <b-form-checkbox
                  disabled
                  :checked="facilities.cctv"
                />
                CCTV
              </label>
              <label>
                <b-form-checkbox
                  disabled
                  :checked="facilities.parking"
                />
                Parking
              </label>
            </b-col>
            <b-col mb="6">
              <label>
                <b-form-checkbox
                  disabled
                  :checked="facilities.ac"
                />
                A/C
              </label>
              <label>
                <b-form-checkbox v-model="facilities.access_24h" />
                24 h access
              </label>
            </b-col>
          </b-row>
        </b-col>
        <b-col mb="4">
          <b-row>
            <b-col mb="6">
              <v-select
                v-model="smart_lock"
                title="Smart Look"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="smart_locks"
                :clearable="false"
              />
            </b-col>
            <b-col mb="6">
              <v-select
                v-model="insurance"
                title="Insurance"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="insurances"
                :clearable="false"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>

    <div class="boxes block">
      <b-card-text class="card-custom-text">
        Boxes
      </b-card-text>
      <b-row>
        <b-col mb="6">
          <div>
            <label class="mr-1">
              <b-form-spinbutton
                v-model="boxes.s"
                inline
              />
              Small size (20 cm x 20 cm x 5 cm)
            </label>
          </div>
          <div>
            <label class="mr-1">
              <b-form-spinbutton
                v-model="boxes.m"
                inline
              />
              Medium size (20 cm x 20 cm x 5 cm)
            </label>
          </div>
        </b-col>
        <b-col mb="6">
          <div>
            <label class="mr-1">
              <b-form-spinbutton
                v-model="boxes.l"
                inline
              />
              Big size (20 cm x 20 cm x 5 cm)
            </label>
          </div>
          <div>
            <label class="mr-1">
              <b-form-spinbutton
                v-model="boxes.xl"
                inline
              />
              Extra big size (20 cm x 20 cm x 5 cm)
            </label>
          </div>
        </b-col>
      </b-row>
    </div>

    <div class="promotions block">
      <b-card-text class="card-custom-text">
        Promotions
      </b-card-text>

      <b-row class="bold">
        <b-col mb="6">
          <label>
            <b-form-checkbox v-model="promotions.discount_50_percents" />
            50% Discount 1st and last month
          </label>
          <label>
            <b-form-checkbox v-model="promotions.discount_500" />
            Chinese New Year - 500 SGD Discount.
          </label>
        </b-col>
        <b-col mb="6">
          <label>
            <b-form-checkbox v-model="promotions.free_one_year_contract" />
            Free “Home to Unit moving” in 1 year contract
          </label>
          <label>
            <b-form-checkbox v-model="promotions.try_storage_for_free" />
            Try the storage for free 7 days
          </label>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {
  BRow, BCol, BFormCheckbox, BCardText, BFormSpinbutton,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    // BCardTitle,
    // BCardSubTitle,
    BRow,
    BCol,
    BFormCheckbox,
    BCardText,
    BFormSpinbutton,

    vSelect,
  },
  data() {
    return {
      facilities: {
        cctv: true,
        parking: true,
        ac: false,
        access_24h: true,
      },
      smart_lock: 'No Smartlock',
      smart_locks: [
        'No Smartlock',
        'smart look 1',
        'smart look 2',
        'smart look 3',
      ],
      insurance: 'Basic Insurance',
      insurances: [
        'Basic Insurance',
        'insurance 1',
        'insurance 2',
        'insurance 3',
      ],
      boxes: {
        s: 0,
        m: 4,
        l: 0,
        xl: 0,
      },
      promotions: {
        discount_50_percents: true,
        discount_500: false,
        free_one_year_contract: true,
        try_storage_for_free: false,
      },
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

.info-addons {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .grey {
    color: $text-muted;
  }
}

.block {
  margin-top:20px;
  padding-bottom:15px;
  // padding-bottom: 10px;
  // margin-bottom: 20px;
.card-custom-text{
  margin-bottom: 0;
}
  &:not(.promotions) {
    border-bottom: 1px solid $secondary;
  }

  & > * {
    max-width: 1080px;
  }

  label {
    display: flex;
    align-items: center;

    .b-form-spinbutton {
      margin-right: 10px;
    }
  }
}
</style>
