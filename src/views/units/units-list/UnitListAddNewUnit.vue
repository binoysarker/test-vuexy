<template>
  <b-card class="custom-temp-card">

    <div class="building-section">
      <div>
        <label class="cus-label">Building</label>
        <v-select
          :v-model="buildingFilter"
          :options="buildingOptions"
          class="w-100"
          placeholder="All buildings"
          @input="setValue"
        />
      </div>
      <div>
        <label class="cus-label">ID</label>
        <b-form-input
          id="search"
          v-model="isId"
          placeholder="ID"
          disabled
        />
      </div>
      <div>
        <label class="cus-label">Unit Name</label>
        <b-form-input
          id="search"
          v-model="search"
          placeholder="Unit Name"
        />
      </div>
    </div>
    <div class="building-section">
      <div>
        <label class="cus-label">Floor</label>
        <v-select
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :value="floorFilter"
          :options="floorOptions"
          class="w-100"
          :reduce="val => val.value"
          placeholder="All Floors"
          @input="(val) => $emit('update:buildingTypeFilter', val)"
        />
      </div>
      <div>
        <label class="cus-label">Building Type</label>
        <v-select
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :value="buildingTypeFilter"
          :options="buildingTypeOptions"
          class="w-100"
          :reduce="val => val.value"
          placeholder="All Types"
          @input="(val) => $emit('update:buildingTypeFilter', val)"
        />
      </div>
      <div>
        <label class="cus-label">Size</label>
        <v-select
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :value="sizeFilter"
          :options="sizeOptions"
          class="w-100"
          :reduce="val => val.value"
          placeholder="All sizes"
          @input="(val) => $emit('update:buildingTypeFilter', val)"
        />
      </div>
    </div>
    <div class="facilities">
      <div>
        <label class="cus-label">Availability</label>
        <v-select
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :value="buildingTypeFilter"
          :options="availabalityOptions"
          class="w-100"
          :reduce="val => val.value"
          placeholder="Availability"
          @input="(val) => $emit('update:buildingTypeFilter', val)"
        />
      </div>

      <div>
        <label class="cus-label">Smart Lock</label>
        <v-select
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :value="buildingTypeFilter"
          :options="smartLockOptions"
          class="w-100"
          :reduce="val => val.value"
          placeholder="All Locks"
          @input="(val) => $emit('update:buildingTypeFilter', val)"
        />
      </div>
      <div>
        <label class="cus-label">Insurance</label>
        <v-select
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :value="buildingTypeFilter"
          :options="insuranceOptions"
          class="w-100"
          :reduce="val => val.value"
          placeholder="Insurance packages"
          @input="(val) => $emit('update:buildingTypeFilter', val)"
        />
      </div>
    </div>
    <div class="dimentions">
      <div class="facility">
        <div>
          Facility
        </div>
        <div class="checkboxess">
          <div class="labels">
            <label class="cus-label">
              <b-form-checkbox
                v-model="cctv"
              />
              CCTV
            </label>
            <label class="cus-label access-label">
              <b-form-checkbox
                v-model="access"
              />
              24th Access
            </label>
          </div>
          <div class="labels">
            <label class="cus-label">
              <b-form-checkbox
                v-model="parking"
              />
              Parking
            </label>
            <label class="cus-label access-label">
              <b-form-checkbox
                v-model="ac"
              />
              A/C
            </label>
          </div>

        </div>
      </div>
      <div>
        <label class="cus-label">Price</label>
        <div class="number-input">
          <b-form-input
            id="type-number"
            type="number"
            trim
          />
          <span class="price-number">SGD</span>

        </div>
      </div>
      <div>
        <label class="cus-label">Listing Options</label>
        <v-select
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :value="buildingTypeFilter"
          :options="listingOptions"
          class="w-100"
          :reduce="val => val.value"
          placeholder="All options"
          @input="(val) => $emit('update:buildingTypeFilter', val)"
        />
      </div>
    </div>
    <div class="dimension">
      <label class="cus-label">Dimensions</label>
      <div class="dimension-sub">
        <div>
          <b-form-input
            id="search"
            v-model="length"
            placeholder="Length"
          />
        </div>
        <div class="area">
          <span>
            X
          </span>
          <b-form-input
            id="search"
            v-model="width"
            placeholder="Width"
          />

        </div>
        <div class="area">
          <span>
            X
          </span>
          <b-form-input
            id="search"
            v-model="height"
            placeholder="Height"
          />

        </div>
        <div class="area">
          <span>
            =
          </span>
          <b-form-input
            id="search"
            v-model="calculateArea"
            placeholder="Area"
          />

        </div>
      </div>

    </div>

    <div class="maintainance">
      <div class="maintein">
        <span class="c-block">
          Maintenance
        </span>
        <label class="lbl cus-label">
          <b-form-checkbox
            v-model="isMaintainance"
          />
          Same as building
        </label>
      </div>
      <div class="date">
        <div class="day custom-box">
          <label class="custom-label-new cus-label">Day</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="dayFilter"
            :options="dayOptions"
            :reduce="val => val.value"
            placeholder="Days"
            :disabled="isMaintainance"
            @input="(val) => $emit('update:buildingTypeFilter', val)"
          />
        </div>
        <div class="time custom-box">
          <div class="minus" />
          <div class="custom-times">
            <label class="cus-label">Time</label>
            <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :value="timeFilter"
              :options="timeOptions"
              :reduce="val => val.value"
              placeholder="Hours"
              :disabled="isMaintainance"
              @input="(val) => $emit('update:buildingTypeFilter', val)"
            />
          </div>
        </div>
        <div class="minutes custom-box">
          <div class="dots">
            :
          </div>
          <div class="custom-minutes">

            <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :value="minuteFilter"
              :options="minuteOptions"
              :reduce="val => val.value"
              placeholder="Minutes"
              :disabled="isMaintainance"
              @input="(val) => $emit('update:buildingTypeFilter', val)"
            />
          </div>
        </div>
      </div>

    </div>
    <div class="add-more">
      <b-button
        type="button"
        class="btn-outline-primary"
      >
        Add one more
      </b-button>
    </div>
    <div class="button-right">
      <b-button variant="primary">
        Add unit to building
      </b-button>
    </div>
  </b-card>
</template>
<script>
import {
  BCard,
  BFormInput,
  BFormCheckbox,
  BButton,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BCard,
    vSelect,
    BFormInput,
    BFormCheckbox,
    BButton,
  },
  data() {
    return {
      length: null,
      width: null,
      height: null,
      isMaintainance: false,
      id: null,
      buildingFilter: null,
      perPage: 'fdasfdasfd',
      buildingOptions: [
        'High Towers Residence',
        'Ruffles Mall',
      ],
      floorOptions: [
        'Parking',
        'Ground Floor',
        'Roof Floor',
      ],
      buildingTypeOptions: [
        'community',
        'Pro',
      ],
      sizeOptions: [
        'S',
        'M',
        'L',
        'XL',
      ],
      smartLockOptions: [
        'Sentinel Lock',
        'Smartlock Industries',
      ],
      insuranceOptions: [
        'Basic Plan',
        'Extended Plan',
      ],
      availabalityOptions: [
        'Available',
        'Not Available',
      ],
      listingOptions: [
        'Not ready - Keep in Draft',
        'List in Building',
        "Don't list in Building",
      ],
      dayOptions: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      timeOptions: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
      ],
      minuteOptions: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 41, 52, 53, 54, 55, 56, 57, 58, 59, 60,
      ],
    }
  },
  computed: {
    calculateArea() {
      if (this.length && this.width && this.height) {
        return this.length * this.width * this.height
      }
      return null
    },
    isId() {
      const { buildingFilter } = this
      if (buildingFilter === 'High Towers Residence') {
        return '0002'
      } if (buildingFilter === 'Ruffles Mall') {
        return '0001'
      }

      return null
    },
  },
  methods: {
    setValue(val) {
      this.buildingFilter = val
    },
    setLength(val) {
      this.length = val
    },
    setWidth(val) {
      this.width = val
    },
    setHeight(val) {
      this.height = val
    },
  },
}
</script>
<style lang="scss">
.custom-temp-card{
.cus-label{
  margin-top:0px;
  margin-bottom: 0px;
}
.access-label{
  margin-top:6px;
}
.maintainance{
  .maintein{
    display: flex;
    align-items: center;
    .c-block{
      font-size: 14px;
      font-weight: 500;
    }
    .lbl{
      display: flex;
      align-items: center;
      margin-left: 20px;
      margin-top: 3px;
    }
  }
  .date{
    display: flex;
    max-width: 550px;
    .custom-box{
      flex: 1;
    }
    .day{
      .custom-label-new{
        margin:0;
      }
    }
    .minutes{
      display: flex;
      margin-top: 21px;
      align-items: center;
      .dots{
        margin-left: 10px;
        margin-right: 10px;
      }
      .custom-minutes{
        width: 100%;
      }
    }
    .time{
      display: flex;
      .minus{
            margin: 20px 10px 20px 10px;
            border-bottom: 1px solid #82868b !important;
            width: 15px;
      }
      .custom-times{
        width:100%;
      }
    }
  }
}
.dimentions{
   display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;
   .facility{
    display: flex;
    margin-top: 15px;
    flex: 1;

    // justify-content: space-between;
    .checkboxess{
      display:flex;
      margin-left:20px;
    .labels{
      margin: 0 14px 0 0;
      label{
        display: flex;
      }
      // display: flex;
      // justify-content: space-between;
    }
    }
  }

}
.dimension{
    // display: flex;
    max-width: 500px;
    margin-bottom: 20px;
    .dimension-sub{
      display: flex;
      .area{
              display: flex;
              align-items: center;
              margin-left: 10px;

              span{
                margin-right:10px;
              }
            }
          }

  }
.building-section{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;
}
.availability{
   display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;

}
.facilities{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;

}
.button-right{
  text-align: right;
}
.add-more{
  margin-top: 20px;
}
  .number-input{
    display: flex;
    align-items: center;
    .price-number{
      margin-left: 10px;
    }
  }
}
</style>
