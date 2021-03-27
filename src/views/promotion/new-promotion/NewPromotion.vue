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
                  class="mb-2 col-6"
                variant="primary"
              >
                Upload
              </b-button>
              <br>
              <b-button
                  class="col-6"
                variant="outline-danger"
              >
                Reset
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

    <!-- personal info tab -->
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
              <h6 class="card-subtitle text-muted">
                Title:
              </h6>
              <strong>3 Months of half price</strong>
            </b-col>
            <b-col>
              <h6 class="card-subtitle text-muted">
                Discount Type:
              </h6>
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
              plain
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Country"
            label-for="v-country1"
          >
            <v-select
              id="v-country1"
              v-model="screen2.monthSelected"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="screen2.monthOptions"
              label="text"
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
              <h6 class="card-subtitle text-muted">
                Title:
              </h6>
              <strong>3 Months of half price</strong>
            </b-col>
            <b-col>
              <h6 class="card-subtitle text-muted">
                Discount Type:
              </h6>
              <strong>15% Discount</strong>
            </b-col>
            <b-col>
              <h6 class="card-subtitle text-muted">
                Min. Rental:
              </h6>
              <strong>3 Months</strong>
            </b-col>

          </b-row>
          <hr>
        </b-col>

      </b-row>
    </tab-content>

    <!-- social link -->
    <tab-content title="Social Links">
      <b-row>
        <b-col
          cols="12"
          class="mb-2"
        >
          <h5 class="mb-0">
            Social Links
          </h5>
          <small class="text-muted">Enter Your Social Links</small>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Twitter"
            label-for="v-twitter"
          >
            <b-form-input
              id="v-twitter"
              placeholder="https://twitter.com/abc"
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Facebook"
            label-for="v-facebook"
          >
            <b-form-input
              id="v-facebook"
              placeholder="https://facebook.com/abc"
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Google+"
            label-for="v-google-plus"
          >
            <b-form-input
              id="v-google-plus"
              placeholder="https://plus.google.com/abc"
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="LinkedIn"
            label-for="v-linked-in"
          >
            <b-form-input
              id="v-linked-in"
              placeholder="https://linkedin.com/abc"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </tab-content>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow,
  BCol,
  BCard,
  BButton,
  BCardText,
  BFormTextarea,
  BFormRadioGroup,
  BFormGroup,
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
    BCard,
    BCardText,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
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
      monthSelected: '',
      options: [
        { text: 'First radio', value: '' },
        { text: 'Second radio', value: 'second' },
        { text: 'Third radio', value: 'third' },
      ],
      monthOptions: [
        { text: 'First radio', value: '' },
        { text: 'Second radio', value: 'second' },
        { text: 'Third radio', value: 'third' },
      ],
    }

    return {
      screen1,
      screen2,
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
</style>
