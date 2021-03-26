<template>
  <div class="reservation-date">
    <h5 class="mb-0">
      Select unit type
    </h5>
    <small class="pic-reserve">
      Choose the proper size according to client’s needing
    </small>
    <div class="filters">
      <div>
        <b-card-text>
          Building
        </b-card-text>
        <v-select
          v-model="building"
          title="Building"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="buildings"
          :clearable="false"
        />
      </div>

      <div>
        <b-card-text>
          Unit Type
        </b-card-text>
        <v-select
          v-model="type"
          title="Type"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="types"
          :clearable="false"
        />
      </div>
      <div class="range">
        <b-card-text>
          Price
        </b-card-text>
        <veeno
          pipsy
          :handles="rangeHandles"
          :range="range"
          :tooltips="[{ to: (n) => `${n.toFixed(2)} SGD` }, { to: (n) => `${n.toFixed(2)} SGD` }]"
        />
      </div>
    </div>

    <div class="units">
      <h5 class="mb-0">
        Units
      </h5>
      <label>
        <b-form-checkbox :checked="onlyAvailable" />
        Show only Available Units
      </label>
      <b-table
        ref="refUnitsListTable"
        :select-mode="selectMode"
        :items="unitsData"
        selectable
        responsive
        :fields="[
          { key: 'show_details', sortable: false },
          { key: 'type', sortable: true },
          { key: 'price', sortable: true },
          { key: 'building', sortable: true },
          { key: 'available_units', sortable: true },
        ]"
        primary-key="id"
        show-empty
        empty-text="No matching records found"
        @row-selected="onRowSelected"
      >
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
        <!-- full detail on click -->
        <template #row-details="row">
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
        </template>
        <template #cell(available_units)="row">
          <div :class="(!!row.item.available_units ? 'green' : 'red')">
            {{ row.item.available_units }}
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import {
  BCardText, BFormCheckbox, BButton, BTable, BRow,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import veeno from 'veeno'

export default {
  components: {
    BCardText,
    BFormCheckbox,
    BButton,
    BTable,
    BRow,
    // BCol,

    veeno,
    vSelect,
  },
  data() {
    return {
      selectMode: 'single',
      building: 'Ruffles Mall',
      buildings: ['Ruffles Mall', 'High Tower Res..'],
      type: 'Unit Type',
      selected: [],
      types: ['All types', 'Small Climate', 'Large CCTV', 'Large Locker'],
      rangeHandles: [110, 255],
      range: {
        min: 100,
        max: 350,
      },
      onlyAvailable: true,
      unitsData: [
        {
          isShow: false,
          type: 'Small climate',
          price: '230 SGD',
          building: 'Raffles Mail',
          available_units: 53,
          email: 'email@gmail.com',
          phone: '+66 345 23255',
          maintenance: 'Tue 10:30',
          facilities: {
            cctv: true,
            parking: true,
            smart_lock: false,
            ac: false,
          },
        },
        {
          isShow: false,
          type: 'Large CCTV',
          price: '145 SGD',
          building: 'Raffles Mail',
          available_units: 27,
          email: 'email+1@gmail.com',
          phone: '+66 345 23255',
          maintenance: 'Tue 10:30',
          facilities: {
            cctv: true,
            parking: true,
            smart_lock: false,
            ac: false,
          },
        },
        {
          isShow: true,
          type: 'Large Locker',
          price: '350 SGD',
          building: 'Raffles Mail',
          available_units: 29,
          email: 'email+2@gmail.com',
          phone: '+66 345 23255',
          maintenance: 'Tue 10:30',
          facilities: {
            cctv: true,
            parking: true,
            smart_lock: false,
            ac: false,
          },
        },
      ],
      activeDetailsData: null,
    }
  },
  methods: {
    onRowSelected(items) {
      this.selected = items
      this.$emit('clicked', items)
    },
  },
}
</script>

<style lang="scss">
@import 'src/@core/scss/base/bootstrap-extended/variables';
@import "~shards-ui/dist/css/shards.min.css";
.facility-details{
  // background-color: yellow;
  width: 100%;
  display: flex;
  padding:5px;
  .text-bold{
    font-weight: 500;
    margin-right: 12px;
  }
  .facility{
    margin:0 20px;
  }
  .facilities{
    display: flex;
    .facllaties-sub{
      margin:0 5px;
    }
    .facility-checkboxes{
      margin-top:-5px;
      margin-right: 10px;
    }
  }
}
.filters {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  grid-gap: 20px;

}
  .table-custom-checkbox {
    .custom-control-label::before{
      margin-top:4px
    }
    .custom-control-input:checked~.custom-control-label::after{
      top:8px;
    }

  }

label {
  display: flex;
  line-height: 30px;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 5px;
}

.green {
  color: $green;
}

.choose button {
  background-color: $blue !important;
}

.bold {
  font-weight: 600;
}

.details {
  margin-bottom: 20px;
}
.card-text{
  margin-bottom: 0.75rem;
}

</style>
