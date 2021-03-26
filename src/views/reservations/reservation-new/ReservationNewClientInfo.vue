<template>
  <div class="client-info">
    <div class="info">
      <div class="block-info">
        <h5 class="mb-0">
          Client info
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

    <div class="client">
      <div class="new">
        <b-form-radio
          v-model="clientRadio"
          name="some-radios"
          value="new"
        >
          New client
        </b-form-radio>
      </div>
      <div class="select">
        <b-form-radio
          v-model="clientRadio"
          name="some-radios"
          value="select"
        />
        <v-select
          v-model="client"
          title="Pick an existing client"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="clients"
          :clearable="false"
          :disabled="clientRadio !== 'select'"
          placeholder="Search existing client"
        />
      </div>
    </div>

    <div class="client-data">
      <div class="selects">
        <b-form-input
          v-model="clientData.name"
          placeholder="Name"
          :disabled="clientRadio === 'select'"
        />
        <b-form-input
          v-model="clientData.surname"
          placeholder="Surname"
          :disabled="clientRadio === 'select'"
        />
        <b-form-input
          v-model="clientData.phone"
          placeholder="Phone number"
          :disabled="clientRadio === 'select'"
        />

      </div>
      <div class="selects">
        <b-form-input
          v-model="clientData.email"
          placeholder="e-mail"
          :disabled="clientRadio === 'select'"
        />
        <v-select
          v-model="country"
          title="Pick an existing client"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="countries"
          :clearable="false"
          :disabled="clientRadio === 'select'"
          placeholder="Country"
        />
        <v-select
          v-model="city"
          title="Pick an existing client"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="isCity"
          :clearable="false"
          :disabled="clientRadio === 'select'"
          placeholder="City"
        />

      </div>
      <div class="selects select-last">
        <v-select
          v-model="zipcode"
          title="Pick an existing client"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="zipcodes"
          :clearable="false"
          :disabled="clientRadio === 'select'"
          placeholder="Zip Code"
        />
        <v-select
          v-model="lead_origin"
          title="Pick an existing client"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="lead_origins"
          :clearable="false"
          :disabled="clientRadio === 'select'"
          placeholder="Lead origin"
        />
        <v-select
          v-model="rental_purpose"
          title="Pick an existing client"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="rental_purposes"
          :clearable="false"
          :disabled="clientRadio === 'select'"
          placeholder="Rental purpose"
        />

      </div>
    </div>
  </div>
</template>

<script>
import { BFormRadio, BFormInput } from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BFormRadio,
    BFormInput,

    vSelect,
  },
  data() {
    return {
      clientRadio: 'new',
      client: null,
      clients: [
        'Arlington Dereck',
        'Jhon',
        'Brighton-Smith',
        'Serene',
        'Colt',
        'Jeremy',
        'Dariel',
        'Helen',
      ],
      reservation: {
        type: 'Large Locker',
        price: '350 SGD',
        from: '04/03/2021',
        to: 'Ongoing',
      },
      clientData: {
        name: null,
        surname: null,
        phone: null,
        email: null,
        country: null,
        city: null,
        district: null,
        rental_purpose: null,
        lead_origin: null,
      },
      country: null,
      countries: [
        'Singapore',
        'Thailand',
      ],
      city: null,
      cities: [
        'Arlington Dereck', 'Jhon',
        'Brighton-Smith', 'Serene',
        'Colt', 'Jeremy',
        'Dariel', 'Helen',
      ],
      zipcode: null,
      zipcodes: [
        '54321',
        '23341',
      ],
      rental_purpose: null,
      rental_purposes: [
        'Collections',
        'Excess Stuff / Additional Space',
        'Inventory / Stocks',
        'Moving',
        'Office Documents',
        'Re-locate abroad',
        'Renovating',
      ],
      lead_origin: null,
      lead_origins: [
        'Bus Advertisement',
        'Flyers / Brochures',
        'Internet (Google/Baidu)',
        'Media Coverage',
        'Newspaper / Magazines',
        'Referral',
        'Referral (Storer/Ex-storer)',
        'Social MEdia',
        'Signs and banners',
        'Tv',
        'Tv-Ch5',
        'Tv-Ch8',
        'Tv-ChU',
        'Tv-History Channel',
        'Tv-LifeTime Channel',
        'Others',
      ],
    }
  },
  computed: {
    isCity() {
      const { country } = this
      if (country === 'Thailand') {
        return ['Bangkok', 'Chiang Mai']
      } if (country === 'Singapore') {
        return ['Singapore', 'Woodlands']
      }
      return ['Bangkok', 'Chiang Mai', 'Singapore', 'Woodlands']
    },
  },
}
</script>

<style lang="scss">
@import 'src/@core/scss/base/bootstrap-extended/variables';

.info {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;

  .grey {
    color: $text-muted;
  }
}

.client {
  display: grid;
  grid-template-columns: 150px 230px;
  margin-bottom: 20px;
  align-items: center;

  .new>* {
    display: flex;
    align-items: center;

    label:before {
      top: 5px;
    }
  }

  .select {
    display: flex;
    align-items: center;

    label:before {
      margin-top: 5px;
      top: -5px;
    }

    .v-select {
      min-width: 250px;
    }
  }
  .select-last{
    margin-bottom: 30px !important;
  }
  .select, .new {
    label:after {
      content: none;
    }
  }
}

.inputs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  grid-gap: 20px;
  margin-bottom: 20px;
}

.selects {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-bottom: 20px;
}
</style>
