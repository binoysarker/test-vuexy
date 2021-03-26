<template>
  <b-card>

    <b-row>

      <!-- Building Info: Left col -->
      <b-col
        cols="21"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
        <!-- Building Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            :src="buildingData.avatar"
            :text="avatarText(buildingData.name)"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ buildingData.name }}
              </h4>
              <span class="card-text">{{ buildingData.email }}</span>
            </div>
            <div class="d-flex flex-wrap">
              <b-button
                :to="{ name: 'apps-buildings-edit', params: { id: buildingData.id } }"
                variant="primary"
              >
                Edit
              </b-button>
              <b-button
                variant="outline-danger"
                class="ml-1"
              >
                Delete
              </b-button>
            </div>
          </div>
        </div>

        <!-- Building Stats -->
        <div class="d-flex align-items-center mt-2">
          <div class="d-flex align-items-center mr-2">
            <b-avatar
              variant="light-primary"
              rounded
            >
              <feather-icon
                icon="DollarSignIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                23.3k
              </h5>
              <small>Monthly Sales</small>
            </div>
          </div>

          <div class="d-flex align-items-center">
            <b-avatar
              variant="light-success"
              rounded
            >
              <feather-icon
                icon="TrendingUpIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                $99.87k
              </h5>
              <small>Annual Profit</small>
            </div>
          </div>
        </div>
      </b-col>

      <!-- Right Col: Table -->
      <b-col
        cols="12"
        xl="6"
      >
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="GlobeIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Country</span>
            </th>
            <td class="pb-50">
              {{ buildingData.country }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="MailIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Zip Code</span>
            </th>
            <td class="pb-50">
              {{ buildingData.zip_code }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="MapPinIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Address</span>
            </th>
            <td class="pb-50">
              {{ buildingData.address }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="PhoneIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Contact</span>
            </th>
            <td class="pb-50">
              {{ buildingData.contact }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="BookmarkIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">ID</span>
            </th>
            <td class="pb-50">
              {{ ('000'+ buildingData.id).substring( buildingData.id.length) }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="HomeIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Type</span>
            </th>
            <td class="pb-50">
              {{ buildingData.type === 'Pro' ? 'Professional storage' : buildingData.type }}
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BButton, BAvatar, BRow, BCol,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    BCard, BButton, BRow, BCol, BAvatar,
  },
  props: {
    buildingData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      avatarText,
    }
  },
}
</script>

<style>

</style>
