<template>
  <div class="reservation-date">
    <h5 class="mb-0">
      Reservation date
    </h5>
    <small class="pic-reserve">
      Choose the date where you want to make the reservation
    </small>
    <div class="range range-start">
      <b-card-text>
        Starts at
      </b-card-text>
      <div class="date">
        <v-select
          v-model="startYear"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="years"
          :clearable="false"
        />
        <v-select
          v-model="startMonth"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="months"
          :clearable="false"
        />
        <v-select
          v-model="startDay"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="days"
          :clearable="false"
        />
        <div class="minus" />
        <v-select
          v-model="startHour"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="hours"
          :clearable="false"
        />
        <v-select
          v-model="startMinute"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="minutes"
          :clearable="false"
        />
      </div>
    </div>

    <div :class="`range range-end ${(ongoing ? 'disabled' : '')}`">
      <b-card-text>
        Ends
      </b-card-text>
      <label>
        <b-form-checkbox v-model="ongoing" />
        Ongoing
      </label>
      <div class="date">
        <v-select
          v-model="endYear"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="years"
          :clearable="false"
          :disabled="ongoing"
        />
        <v-select
          v-model="endMonth"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="months"
          :clearable="false"
          :disabled="ongoing"
        />
        <v-select
          v-model="endDay"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="days"
          :clearable="false"
          :disabled="ongoing"
        />
        <div class="minus" />
        <v-select
          v-model="endHour"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="hours"
          :clearable="false"
          :disabled="ongoing"
        />
        <v-select
          v-model="endMinute"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="minutes"
          :clearable="false"
          :disabled="ongoing"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  BCardText, BFormCheckbox,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BCardText,
    BFormCheckbox,

    vSelect,
  },
  data() {
    const date = new Date()

    const year = date.getFullYear()
    const years = []
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 50; i++) {
      years.push(year + i)
    }

    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(mon => new Date(2000, mon).toLocaleString('en-IN', { month: 'long' }))
    const month = months[date.getMonth()]

    const day = date.getDate()
    const days = []
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 31; i++) {
      days.push(i)
    }

    const hour = date.getHours()
    const hours = []
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= 23; i++) {
      hours.push(i)
    }

    const minute = date.getMinutes()
    const minutes = []
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 59; i++) {
      minutes.push(i)
    }

    return {
      startYear: year,
      endYear: year,
      years,
      startMonth: month,
      endMonth: month,
      months,
      startDay: day,
      endDay: day,
      days,
      startHour: hour,
      endHour: hour,
      hours,
      startMinute: minute,
      endMinute: minute,
      minutes,
      ongoing: true,
    }
  },
}
</script>

<style lang="scss">
@import 'src/@core/scss/base/bootstrap-extended/variables';
@import '@core/scss/vue/libs/vue-select.scss';
.range-start{
    margin-top:20px;
    .card-text{
      margin-bottom: 6px;
    }
  }
  .range-end{
    margin-top:15px;
    .card-text{
      margin-bottom: 0;
    }
    label{
      margin-bottom: 5px;
    }
  }
.range {

  label {
    display: flex;
    line-height: 30px;
    align-items: center;
  }

  .date {
    display: grid;
    grid-template-columns: 150px 150px 150px 40px 150px 150px;

    &.disabled {
      pointer-events: none;
    }

    .v-select {
      margin-right: 20px;
    }

    .minus {
      margin: 20px 20px 20px 0;
      border-bottom: 1px solid $secondary;
    }
  }
}
</style>
