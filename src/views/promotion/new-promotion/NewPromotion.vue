<template>
  <form-wizard
    color="#7367F0"
    :title="null"
    :subtitle="null"
    layout="vertical"
    finish-button-text="Submit"
    back-button-text="Previous"
    class="wizard-vertical mb-3"
    @on-complete="formSubmitted"
  >

    <!-- account datails tab -->
    <tab-content title="Title and description">
      <b-row>
        <b-col
          cols="12"
          class="mb-2"
        >
          <h5 class="mb-0">
            Add a picture of the add-on
          </h5>
        </b-col>
        <b-col
          cols="12"
          class="mb-2"
        >
          <b-row>
            <b-col cols="3">
              <b-card
                :img-src="require('@/assets/images/slider/06.jpg')"
                img-top
                overlay
                img-alt="card img"
                style="width: 151px; height: 90px"
              >
                <b-card-text class="text-center">
                  <feather-icon
                    icon="upload"
                  />
                  <p class="card-subtitle text-muted mt-2">
                    .png, .jpg
                  </p>
                </b-card-text>

              </b-card>
            </b-col>
            <b-col cols="3">
              <b-button
                class="mb-2"
                variant="primary"
              >
                <span class="align-middle">Upload</span>
              </b-button>
              <br>
              <b-button
                variant="outline-danger"
              >
                <span class="align-middle">Reset</span>
              </b-button>
            </b-col>
          </b-row>
        </b-col>

        <b-col md="6">
          <b-form-group
            label="Promotion Title"
            label-for="v-title"
          >
            <b-form-input
              id="v-title"
              v-model="screen1.name"
              placeholder="Type a name"
            />
          </b-form-group>
          <b-form-group
            label="Promotion Description"
            label-for="v-description"
          >
            <b-form-textarea
              id="v-description"
              v-model="screen1.description"
              placeholder="Explain the details"
              rows="3"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </tab-content>

    <!-- Minimumn rental period -->
    <tab-content title="Minimumn rental period">
      <b-row>
        <b-col
          cols="12"
          class="mb-2"
        >
          <h5 class="mb-0">
            Your promotion:
          </h5>
        </b-col>
        <b-col cols="12">
          <b-row>
            <b-col>
              <span class="card-subtitle text-muted">
                Title:
              </span>
              <strong>3 Months of half price</strong>
            </b-col>
            <b-col>
              <span class="card-subtitle text-muted">
                Discount Type:
              </span>
              <strong>15% Discount</strong>
            </b-col>

          </b-row>
          <hr>
        </b-col>
        <b-col md="6">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="Plain inline radios"
          >
            <b-form-radio-group
              v-model="screen2.selected"
              :options="screen2.options"
              :aria-describedby="ariaDescribedby"
              name="plain-inline"
              stacked
            />
            <b-form-select
              v-model="screen2.monthSelected"
              class="mt-2 ml-3 col-lg-6"
              :options="screen2.monthOptions"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </tab-content>

    <!-- address -->
    <tab-content title="Discount Type">
      <b-row>
        <b-col
          cols="12"
          class="mb-2"
        >
          <h5 class="mb-0">
            Your promotion:
          </h5>
        </b-col>
        <b-col cols="12">
          <b-row>
            <b-col>
              <span class="card-subtitle text-muted">
                Title:
              </span>
              <strong>3 Months of half price</strong>
            </b-col>
            <b-col>
              <span class="card-subtitle text-muted">
                Discount Type:
              </span>
              <strong>15% Discount</strong>
            </b-col>
            <b-col>
              <h6 class="card-subtitle text-muted">
                Min. Rental:
              </h6>
              <strong>3 Months</strong>
            </b-col>

          </b-row>
          <b-row class="justify-content-around">
            <b-col>
              <b-form-group
                v-slot="{ ariaDescribedby1 }"
                class="mt-3 "
              >
                <b-form-radio
                  v-model="screen3.radioOptionSelected"
                  class="mb-2"
                  :aria-describedby="ariaDescribedby1"
                  name="some-radios"
                  value="A"
                >
                  <b-row
                    align-v="center"
                    class="justify-content-around"
                  >
                    <span class="c-maring">Percent</span>

                    <b-form-input
                      id="v-percent"
                      v-model="screen3.percentValue"
                      class="col-lg-6 ml-lg-3"

                      type="number"
                      placeholder="50"
                    />

                    <span class="">%</span>

                  </b-row>

                </b-form-radio>
                <b-form-radio
                  v-model="screen3.radioOptionSelected"
                  :aria-describedby="ariaDescribedby1"
                  name="some-radios"
                  value="A"
                >
                  <b-row
                    align-v="center"
                    class="justify-content-around"
                  >
                    <span class="c-maring">Fixed quantity</span>

                    <b-form-input
                      id="v-fixed"
                      v-model="screen3.fixedValue"
                      class="col-lg-6"
                      type="number"
                      placeholder="50"
                    />

                    <span class="">SGD</span>

                  </b-row>

                </b-form-radio>
              </b-form-group>
            </b-col>
          </b-row>
          <hr>
        </b-col>

      </b-row>
    </tab-content>

    <!-- Timing -->
    <tab-content title="Timing">
      <b-row>
        <b-col
          cols="12"
          class="mb-2"
        >
          <h5 class="mb-0">
            Your promotion:
          </h5>
        </b-col>
        <b-col cols="12">
          <b-row>
            <b-col>
              <span class="card-subtitle text-muted">
                Title:
              </span>
              <strong>3 Months of half price</strong>
            </b-col>
            <b-col>
              <span class="card-subtitle text-muted">
                Discount Type:
              </span>
              <strong>15% Discount</strong>
            </b-col>

          </b-row>
          <hr>
        </b-col>
        <b-col md="6">
          <b-form-group
            v-slot="{ ariaDescribedby2 }"
          >
            <b-form-radio-group
              v-model="screen4.selected"
              :options="screen4.options"
              :aria-describedby="ariaDescribedby2"
              name="plain-inline"
              stacked
            />

          </b-form-group>
        </b-col>

      </b-row>
      <b-row>
        <b-col>
          <b-form-group v-slot="{ ariaDescribedby3 }">
            <b-row
              :aria-describedby="ariaDescribedby3"
              align-v="end"
              v-for="(item, ind) in 6" :key="ind"
            >
              <b-col>
                <b-form-group
                  label="Payment"
                  label-for="v-payment"
                >

                  <b-form-select
                    id="v-payment"
                    v-model="screen4.monthSelected"
                    size="sm"
                    class=""
                    :options="screen4.monthOptions"
                  />
                </b-form-group>
              </b-col>
              <b-col class="d-flex justify-content-around">
                <b-form-group
                  label-cols="4"
                  label-cols-lg="2"
                  label-size="sm"
                  label="apply"
                  label-for="input-lg"
                >
                  <b-form-input
                    id="input-lg"
                    class="col-lg-8 ml-1 d-inline-flex"
                    size="sm"
                    placeholder="50"
                  />
                  <span class="ml-1">%</span>
                </b-form-group>
              </b-col>
              <b-col>
                <b-button
                  class="c-maring1"
                  variant="outline-danger"
                  size="sm"
                >
                  <feather-icon
                    icon="XIcon"
                  />
                  <span class="align-middle">Delete</span>
                </b-button>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>
      </b-row>
    </tab-content>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
// import vSelect from 'vue-select'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow,
  BCol,
  BCard,
  BButton,
  BCardText,
  BFormRadio,
  BFormTextarea,
  BFormRadioGroup,
  BFormGroup,
  BFormSelect,
  BFormInput,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    FormWizard,
    TabContent,
    BRow,
    BFormTextarea,
    BFormRadioGroup,
    BButton,
    BFormRadio,
    BCard,
    BFormSelect,
    BCardText,
    BCol,
    BFormGroup,
    BFormInput,
    // vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  setup() {
    const screen1 = {
      name: '',
      description: '',

    }
    const screen2 = {
      selected: '',
      monthSelected: null,
      options: [
        { text: 'No minimun rental period required', value: 'no-minimum' },
        { text: 'Minimum rental required', value: 'minimum' },
      ],
      monthOptions: [
        { text: 'select a month', value: null },
        { text: '1 month', value: 1 },
        { text: '2 months', value: 2 },
        { text: '3 months', value: 3 },
      ],
    }
    const screen4 = {
      selected: '',
      monthSelected: null,
      options: [
        { text: 'No minimun rental period required', value: 'no-minimum' },
        { text: 'Minimum rental required', value: 'minimum' },
      ],
      monthOptions: [
        { text: 'select a month', value: null },
        { text: '1 month', value: 1 },
        { text: '2 months', value: 2 },
        { text: '3 months', value: 3 },
      ],
    }
    const screen3 = {
      radioOptionSelected: '',
      percentValue: '',
      fixedValue: '',
    }

    return {
      screen1,
      screen2,
      screen3,
      screen4,
    }
  },
  methods: {
    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
    },
  },
}
</script>
<style lang="scss">
    @import '@core/scss/vue/libs/vue-wizard.scss';
    @import '@core/scss/vue/libs/vue-select.scss';
.c-maring {
  margin-top: -1rem;
}
    .c-maring1 {
  margin-top: -3rem;
}
</style>
