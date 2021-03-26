<template>
  <form-wizard
    ref="checkin"
    color="#3DA2D4"
    :title="null"
    :subtitle="null"
    shape="square"
    finish-button-text="Submit"
    back-button-text="Previous"
    class="mb-3"
    @on-complete="formSubmitted"
  >
    <tab-content title="Choose Reservation">
      <check-in-choose-reservation @clicked="onClickChild" />
    </tab-content>
    <tab-content title="Assign Unit">
      <check-in-assign-unit @clicked="onClickUnit" />
    </tab-content>
    <tab-content title="Payment">
      <checkin-payment />
    </tab-content>
    <tab-content title="Contract">
      <check-in-contract />
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
          :class="[props.activeTabIndex === 0 && selectedItems.length < 1 || props.activeTabIndex==1&& selectedUnit.length<1 ?'disabled-footer-button': 'wizard-footer-right' ]"
          :style="props.fillButtonStyle"
          @click="props.activeTabIndex === 0 && selectedItems.length < 1 || props.activeTabIndex==1&& selectedUnit.length<1 ?null: handleNext() "
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
import CheckInAssignUnit from './CheckInAssignUnit.vue'
import CheckInChooseReservation from './CheckInChooseReservation.vue'
import CheckInContract from './CheckInContract.vue'
import CheckinPayment from './CheckInPayment.vue'

export default {
  components: {
    CheckInAssignUnit,
    CheckInChooseReservation,
    CheckInContract,
    CheckinPayment,
    TabContent,
    FormWizard,
  },
  data() {
    return {
      selectedItems: [],
      selectedUnit: [],
    }
  },
  methods: {
    handleNext() {
      this.$refs.checkin.nextTab()
    },
    handlePrev() {
      this.$refs.checkin.prevTab()
    },
    onClickChild(item) {
      this.selectedItems = item
    },
    onClickUnit(item) {
      this.selectedUnit = item
    },
  },
}
</script>
<style lang="scss">
@import "src/@core/scss/base/bootstrap-extended/variables";
@import '@core/scss/vue/libs/vue-wizard.scss';

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
