<template>
  <form-wizard
    ref="reservation"
    color="#3DA2D4"
    :title="null"
    :subtitle="null"
    shape="square"
    finish-button-text="Submit"
    back-button-text="Previous"
    class="mb-3"
    @on-complete="formSubmitted"
  >
    <tab-content title="Reservation date">
      <reservation-new-reservation-date />
    </tab-content>
    <tab-content title="Unit type">
      <reservation-new-unit-type @clicked="onClickChild" />
    </tab-content>
    <tab-content title="Add-ons">
      <reservation-new-addons />
    </tab-content>
    <tab-content title="Client info">
      <reservation-new-client-info />
    </tab-content>
    <template
      slot="footer"
      scope="props"
    >
      <div class="wizard-footer-left">
        <wizard-button
          v-if="props.activeTabIndex > 0"
          :style="props.fillButtonStyle"
          @click="handlePrev"
        >
          Previous
        </wizard-button>
      </div>
      <div class="wizard-footer-right">
        <wizard-button
          :class="[props.activeTabIndex === 1 && selectedItems.length < 1 ?'disabled-footer-button': 'wizard-footer-right' ]"
          :style="props.fillButtonStyle"
          @click.stop="props.activeTabIndex === 1 && selectedItems.length < 1 ? null:handleNext()"
        >
          {{ props.isLastStep ? "Submit":"Next" }}
        </wizard-button>
      </div>

    </template>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import ReservationNewReservationDate from './ReservationNewReservationDate.vue'
import ReservationNewUnitType from './ReservationNewUnitType.vue'
import ReservationNewAddons from './ReservationNewAddons.vue'
import ReservationNewClientInfo from './ReservationNewClientInfo.vue'

export default {
  components: {
    ReservationNewClientInfo,
    ReservationNewAddons,
    ReservationNewUnitType,
    ReservationNewReservationDate,

    FormWizard,
    TabContent,
  },
  data() {
    return {
      currentStep: 'Reservation date',
      selectedItems: [],
      steps: [
        { stepNumber: 1, stepTitle: 'Reservation date' },
        { stepNumber: 2, stepTitle: 'Unit type' },
        { stepNumber: 3, stepTitle: 'Add-ons' },
        { stepNumber: 4, stepTitle: 'Client info' },
      ],
    }
  },
  methods: {
    handlePrev() {
      this.$refs.reservation.prevTab()
    },
    handleNext() {
      this.$refs.reservation.nextTab()
    },
    onClickChild(item) {
      this.selectedItems = item
    },
  },
}
</script>

<style lang="scss">
@import "src/@core/scss/base/bootstrap-extended/variables";
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';

.steps {
  display: flex;
  align-items: center;
  border-bottom: 2px solid $secondary;
  padding-bottom: 10px;
  margin-bottom: 20px;

  .step {
    display: flex;
    align-items: center;

    &.active {
      color: $primary;

      .step-number {
        border-color: $primary;
      }
    }

    &:not(:last-of-type) {
      margin-right: 20px;

      .next-icon {
        display: block;
        margin-left: 10px;
      }
    }

    .next-icon {
      display: none;
    }

    .step-number {
      width: 30px;
      height: 30px;
      border: 1px solid $secondary;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
  }
}

.vue-form-wizard {
  .wizard-nav {
    display: flex;
    align-items: center;

    li {
      list-style: none;

      a {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        color: rgba(0,0,0,.2);
        top: 3px;

        &.disabled {
          cursor: default;
          pointer-events: none;
        }

        &:hover {
          text-decoration: none;
        }

        &:not(:first-of-type):before {
          content: "";
          font-family: feather !important;
          speak: none;
          font-style: normal;
          font-weight: 400;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          font-size: 1.14rem;
          position: absolute;
        }

        .wizard-icon-container, .wizard-icon-circle {
          display: flex;
          flex: 1;
          height: 100%;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
      }
    }
  }

  .wizard-tab-content {
    padding: 30px 20px 10px;
  }

  .wizard-card-footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px 1rem;
    .wizard-footer-left {
      float: left;
       wizard-button{
        background-color: rgba(130, 134, 139, 0.04) !important;
        padding: 0.786rem 1.5rem;
        border-radius: 0.4285rem;
        border: 1px solid #82868b !important;
        color:#82868b !important;
        cursor: pointer;
          &:hover{
                background-color: rgba(130, 134, 139, 0.04) !important;

          }
      }
    }

    .wizard-footer-right {
      float: right;
      .wizard-footer-right{
        background-color: rgb(61, 162, 212);
        color: white;
        padding: 0.786rem 1.5rem;
        border-radius: 0.4285rem;
        cursor: pointer;
          &:hover{
            -webkit-box-shadow: 0 8px 25px -8px #3DA2D4;
            box-shadow: 0 8px 25px -8px #3DA2D4;

          }
      }
      .disabled-footer-button{
          background-color: rgb(229, 229, 229) !important;
          padding: 0.786rem 1.5rem;
          border-radius: 0.4285rem;
          cursor: not-allowed;

      }

    }

    &:after {
      content: none;
    }
  }
}
</style>
