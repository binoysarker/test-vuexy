<template>
  <form-wizard
    ref="formWizard"
    color="#3DA2D4"
    :title="null"
    :subtitle="null"
    layout="vertical"
    finish-button-text="Submit"
    back-button-text="Previous"
    class="wizard-vertical mb-3"
    @on-complete="formSubmitted"
  >
    <template slot="prev">
      <b-button
        class="mb-2"
        variant="outline-primary"
      >
        <span class="align-middle">Previous</span>
      </b-button>
    </template>

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
            <b-col md="3">
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
            <b-col md="3">
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
              class="mt-2 ml-lg-3 col-lg-6"
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
              <span class="card-subtitle text-muted py-3 py-sm-1">
                Min. Rental:
              </span>
              <strong>3 Months</strong>
            </b-col>

          </b-row>
          <hr>
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
                  <b-row>
                    <span class="ml-sm-1 mr-sm-3">Percent</span>
                    <b-input-group class="col-sm-5">

                      <b-input-group-prepend>
                        <b-button
                          size="sm"
                          style="border: 1px solid #D8D6DE !important"
                          variant="outline-secondary"
                        >
                          <feather-icon
                            icon="ChevronDownIcon"
                          />

                        </b-button>
                      </b-input-group-prepend>

                      <b-form-input
                        v-model="screen3.percentValue"
                        placeholder="50"
                        type="number"
                      />
                      <b-input-group-append>
                        <b-button
                          size="sm"
                          style="border: 1px solid #D8D6DE !important"
                          variant="outline-secondary"
                        >

                          <feather-icon
                            icon="ChevronUpIcon"
                          />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                    <span class="ml-1">%</span>
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
                    <span class="c-maring ml-sm-1">Fixed quantity</span>

                    <b-form-input
                      id="v-fixed"
                      v-model="screen3.fixedValue"
                      class="col-5 col-sm-5"
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
            <transition-group name="fade">
              <b-row
                v-for="(item, ind) in showFormUpTo"
                :key="ind"
                :aria-describedby="ariaDescribedby3"
                class="c-border"
                align-v="end"
              >
                <b-col sm="4">
                  <b-form-group
                    label="Payment"
                    label-for="v-payment"
                  >

                    <b-form-select
                      id="v-payment"
                      v-model="screen4.monthSelected"
                      class=""
                      :options="screen4.monthOptions"
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-row class="c-maring2">
                    <span class="">apply</span>
                    <b-input-group class="col-sm-8">

                      <b-input-group-prepend>
                        <b-button
                          size="sm"
                          style="border: 1px solid #D8D6DE !important"
                          variant="outline-secondary"
                        >
                          <feather-icon
                            icon="ChevronDownIcon"
                          />

                        </b-button>
                      </b-input-group-prepend>

                      <b-form-input
                        type="number"
                        placeholder="50"
                      />
                      <b-input-group-append>
                        <b-button
                          size="sm"
                          style="border: 1px solid #D8D6DE !important"
                          variant="outline-secondary"
                        >

                          <feather-icon
                            icon="ChevronUpIcon"
                          />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                    <span class="ml-1">%</span>
                  </b-row>
                </b-col>
                <b-col sm="4">
                  <b-button
                    class="c-maring2"
                    variant="outline-danger"
                  >
                    <feather-icon
                      icon="XIcon"
                    />
                    <span class="align-middle">Delete</span>
                  </b-button>
                </b-col>
              </b-row>

            </transition-group>
          </b-form-group>
        </b-col>
      </b-row>
      <hr>
      <b-button
        variant="primary"
        size="md"
        @click="showFormUpTo++"
      >
        <feather-icon
          icon="PlusIcon"
          class="mr-1"
        />
        <span class="align-middle">Add payment with discount</span>
      </b-button>
    </tab-content>
    <!--  Final Section  -->
    <tab-content>

      <b-card>
        <b-card-text>
          <p class="text-center">
            <feather-icon
              icon="CheckCircleIcon"
              class="font-large-1"
            />
          </p>
          <h5 class="text-body-heading text-center">
            Promotion created successfully
          </h5>
        </b-card-text>
        <b-card-text class="border-dotted">
          <b-list-group>
            <b-list-group-item>
              <b-row class="p-1">
                <b-col md="3">
                  <h6 class="card-subtitle text-muted py-3 py-sm-1">
                    Picture:
                  </h6>
                </b-col>
                <b-col>
                  <b-img
                    :src="require('../../../assets/images/portrait/img1.png')"
                    thumbnail
                  />
                </b-col>
              </b-row>
              <b-row class="p-1">
                <b-col md="3">
                  <h6 class="card-subtitle text-muted py-3 py-sm-1">
                    Title:
                  </h6>
                </b-col>
                <b-col>
                  <p class="card-subtitle">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio elit in egestas morbi viverra turpis urna, a. Tortor, et dui molestie id id pellentesque vulputate faucibus. Quis viverra vitae faucibus a. Urna, tristique sagittis nibh mattis tincidunt neque.
                  </p>
                </b-col>
              </b-row>
              <b-row class="p-1">
                <b-col md="3">
                  <h6 class="card-subtitle text-muted py-3 py-sm-1">
                    Min. Rental:
                  </h6>
                </b-col>
                <b-col>
                  <strong class="card-subtitle">3 Months</strong>
                </b-col>
              </b-row>
              <b-row class="p-1">
                <b-col md="3">
                  <h6 class="card-subtitle text-muted py-3 py-sm-1">
                    Discount Type:
                  </h6>
                </b-col>
                <b-col>
                  <strong class="card-subtitle">50% Discount</strong>
                </b-col>
              </b-row>
              <b-row class="p-1">
                <b-col md="3">
                  <h6 class="card-subtitle text-muted py-3 py-sm-1">
                    Application Timing:
                  </h6>
                </b-col>
                <b-col>
                  <strong class="card-subtitle">1st Month, 5th Payment, 6th payment</strong>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-card-text>
        <b-row class="justify-content-sm-end">
          <b-button
            variant="outline-primary"
          >
            <span class="align-middle">See List of promotions</span>
          </b-button>
          <b-button
            class="ml-lg-3 mr-lg-2"
            variant="primary"
          >
            <span class="align-middle">Create New Promotion</span>
          </b-button>
        </b-row>
      </b-card>
    </tab-content>
  </form-wizard>
</template>

<script>
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { FormWizard, TabContent } from 'vue-form-wizard'
// import vSelect from 'vue-select'
import { useToast } from 'vue-toastification/composition'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import commonBootstrapComponentMixin from '../../../mixins/commonBootstrapComponents'

export default {
  components: {
    FormWizard,
    TabContent,

    // vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  mixins: [commonBootstrapComponentMixin],
  setup() {
    const formWizard = ref(null)
    const toast = useToast()
    let showFinalSection = false
    const showFormUpTo = 1
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

    // methods
    const formSubmitted = () => {
      showFinalSection = true
      toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
      formWizard.value.reset()
    }

    return {
      formWizard,
      screen1,
      screen2,
      screen3,
      screen4,
      showFormUpTo,
      showFinalSection,
      formSubmitted,
    }
  },

}
</script>
<style lang="scss" >
    @import '@core/scss/vue/libs/vue-wizard.scss';
    @import '@core/scss/vue/libs/vue-select.scss';

  @media screen and (min-width: 576px) {
    .c-maring {
      margin-top: -1rem;
    }
    .c-maring1 {
      margin-top: -3rem;
    }
    .c-maring2 {
      margin-top: -4rem;
    }

  }
  @media screen and (max-width: 576px) {
    .c-border {
      border: 1px solid lightgray;
      padding: 10px;
      border-radius: 2px;
    }
  }
    .vue-form-wizard ul.wizard-nav > li:last-child {
      display: none !important;
    }

  .border-dotted {
    border: 1px dot-dash #BAB8C0;
    border-radius: 5px;
  }
    [dir] .vue-form-wizard .wizard-navigation .wizard-nav li .wizard-icon-circle.checked {
      background-color: #3DA2D4;
    }
    [dir] .vue-form-wizard .wizard-navigation .wizard-nav li .wizard-icon-circle.checked i {
      color: white;
    }
    /*to show all the previus item with active item as active*/
    [dir] .vue-form-wizard .wizard-navigation .wizard-nav li a:not(.disabled) span.stepTitle {
      color: #3DA2D4;
    }
</style>
