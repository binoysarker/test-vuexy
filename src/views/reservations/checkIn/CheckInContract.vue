<template>
  <div>
    <div class="choose-reservation">
      <h5 class="mb-0">
        Choose the reservation you want to check in
      </h5>
      <small class="pic-reserve">
        Pick a Reservation and assign the unit you want to check in
      </small>
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
      <div class="checkboxes">
        <BFormRadio
          v-model="clientRadio"
          name="some-radios"
          value="new"
        >
          Personal
        </BFormRadio>
        <b-form-radio
          v-model="clientRadio"
          name="some-radios"
          value="company"
        >
          Company
        </b-form-radio>

      </div>
      <div class="inputs">
        <b-form-input placeholder="Name" />
        <b-form-input placeholder="Surname" />
        <b-form-input placeholder="Id" />
        <b-form-input placeholder="Phone Number" />
        <b-form-input placeholder="e-mail" />
      </div>
      <div class="selects">
        <div>
          <label>Country</label>
          <v-select
            v-model="country"
            label="countryName"
            :options="countries"
            :clearable="false"
            placeholder="County"
          />
        </div>
        <div>
          <label>City</label>
          <v-select
            v-model="city"
            title="City"
            :options="isCity"
            :clearable="false"
            placeholder="City"
          />
        </div>
        <div>
          <label>Zip Codes</label>
          <v-select
            v-model="district"
            title="District"
            :options="districts"
            :clearable="false"
            placeholder="All Zip Codes"
          />
        </div>
      </div>
    </div>
    <div class="load-contract">
      <label>Load Contract template</label>
      <v-select
        v-model="contract"
        label="countryName"
        :options="contractCountry"
        :clearable="false"
        placeholder="All Contract templates"
      />
    </div>
    <div class="qull-editor">
      <quill-editor
        class="quill-custom"
        :content="content"
        :options="editorOption"
        @change="onEditorChange($event)"
      />
      <div class="pdf">
        <a
          href="lkjlk"
          target="_blank"
        >Download PDF</a>
      </div>
      <div class="signatures">
        <div class="sign-signature">
          <b-form-input
            placeholder="signatory's e-mail"
            type="email"
          />
          <b-button
            class="btn-signature"
          >
            Send
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  BButton,
  BFormRadio,
  BFormInput,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    BButton,
    BFormRadio,
    BFormInput,
    vSelect,
    quillEditor,
  },
  data() {
    return {
      content: 'Singapore, 15 March 2021 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla pu, commodo sagittis odio. Donec pharetra tortor cursus diam scelerisque, eget tincidunt nibh eleifend. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum eu diam mi. Proin id massa diam. Aliquam blandit dignissim dignissim. Vivamus purus est, tristique eu nisl vitae, varius tempus risus. Mauris vulputate lacus sit amet mi fringilla, non ornare eros tincidunt. Duis mollis ex posuere, semper urna sed, interdum turpis',
      clientRadio: 'personal',
      clientContractData: {
        name: null,
        surName: null,
        id: null,
        phoneNo: null,
        email: null,

      },
      country: null,
      countries: [
        'Thailand',
        'Singapore',
      ],
      city: null,
      cities: [
        'Bankok',
        'Singapore',
      ],
      district: null,
      districts: [
        '0001',
        '0002',
      ],
      rental_purpose: null,
      rental_purposes: [
        'Rental purpose 1',
        'Rental purpose 2',
        'Rental purpose 3',
        'Rental purpose 4',
      ],
      lead_origin: null,
      lead_origins: [
        'Lead Origin 1',
        'Lead Origin 2',
        'Lead Origin 3',
        'Lead Origin 4',
      ],
      contractCountry: [
        'Singapore Ongoing Contract 2021',
        'Thailand Ongoing Contract 2021',
      ],
      contract: null,
      reservation: {
        type: 'Large Locker',
        price: '350 SGD',
        from: '04/03/2021',
        to: 'Ongoing',
        content: '<h2>I am Example</h2>',
      },
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
@import '@core/scss/vue/libs/quill.scss';
@import 'src/@core/scss/base/bootstrap-extended/variables';

  .check-boxes{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-bottom: 20px;
  }
  .checkboxes{
    display:flex;
    margin: 20px 0;
    grid-gap: 40px;
  }
  .inputs{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    margin-bottom: 20px;
  }
  .selects{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    margin-bottom: 20px;
  }
  label{
    margin-bottom: 0;
  }
  .load-contract{
    width: 350px;
    margin-bottom: 15px;
  }
  .qull-editor{
    margin-bottom: 20px;
     .quill-custom{
        height: 500px;
        margin-bottom: 45px;
        @media (max-width: 1518px){

        margin-bottom: 70px;
        }
      }
    .pdf{
      display: flex;
      justify-content: flex-end;
      margin-bottom: 5px;
      a{
        font-weight: 500;
        font-size: 13px;
      }
    }
    .signatures{
      display: flex;
      justify-content: flex-end;
      margin-top:20px;

      .sign-signature{
        display: flex;
        justify-content: space-evenly;
        .btn-signature{
          margin-left: 13px;
        }
      }
    }
  }
</style>
