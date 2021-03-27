<template>
  <div>
    <!--    first table-->
    <PromisionListTable
      table-title="List of Promotions"
      :given-items="items"
      :given-table-columns="tableColumns"
    />
    <!--    second table-->
    <PromisionListTable
      table-title="Applied Promotions"
      :given-items="promotionItemsList"
      :given-table-columns="promotionListTableColumns"
      :show-filter="true"
      :show-add-new-button="false"
    />
  </div>
</template>
<script>
import { FormWizard } from 'vue-form-wizard'
// import {
//   BCard, BTable, BFormCheckbox, BButton, BDropdown, BRow, BCol, BDropdownItem,
// } from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import PromisionListTable from './PromisionListTable.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  components: {

    // eslint-disable-next-line vue/no-unused-components
    FormWizard,
    PromisionListTable,
  },
  data() {
    return {

    }
  },
  setup() {
    const items = ref([
      {
        promotion_name: 'Happy women\'s day1', discount: '15%', min_rental_required: '6 Months', active: true, actions: 'wow',
      }, {
        promotion_name: 'Happy women\'s day2', discount: '15%', min_rental_required: '6 Months', active: true, actions: 'wow',
      }, {
        promotion_name: 'Happy women\'s day3', discount: '15%', min_rental_required: '6 Months', active: false, actions: 'wow',
      }, {
        promotion_name: 'Happy women\'s day4', discount: '15%', min_rental_required: '6 Months', active: true, actions: 'wow',
      }, {
        promotion_name: 'Happy women\'s day5', discount: '15%', min_rental_required: '6 Months', active: false, actions: 'wow',
      }, {
        promotion_name: 'Happy women\'s day6', discount: '15%', min_rental_required: '6 Months', active: true, actions: 'wow',
      }, {
        promotion_name: 'Happy women\'s day7', discount: '15%', min_rental_required: '6 Months', active: true, actions: 'wow',
      }, {
        promotion_name: 'Happy women\'s day8', discount: '15%', min_rental_required: '6 Months', active: true, actions: 'wow',
      },
    ])
    const promotionItemsList = ref([
      {
        name_of_promotion: 'Happy women\'s day1', clients: { image: 'assets/images/avatars/1.png', name: 'user name', email: 'test@gmail.com' }, unit_id: '4325', regular_price: '250 SGD', discounted_price: '200 SGD', promo_begins: '08/03/2021', actions: 'test', promo_ends: '09/09/2022',
      }, {
        name_of_promotion: 'Happy women\'s day2', clients: { image: 'assets/images/avatars/1.png', name: 'user name', email: 'test@gmail.com' }, unit_id: '4325', regular_price: '250 SGD', discounted_price: '200 SGD', promo_begins: '08/03/2021', actions: 'test', promo_ends: '-',
      }, {
        name_of_promotion: 'Happy women\'s day3', clients: { image: 'assets/images/avatars/1.png', name: 'user name', email: 'test@gmail.com' }, unit_id: '4325', regular_price: '250 SGD', discounted_price: '200 SGD', promo_begins: '08/03/2021', actions: 'test', promo_ends: '09/09/2022',
      }, {
        name_of_promotion: 'Happy women\'s day4', clients: { image: 'assets/images/avatars/1.png', name: 'user name', email: 'test@gmail.com' }, unit_id: '4325', regular_price: '250 SGD', discounted_price: '200 SGD', promo_begins: '08/03/2021', actions: 'test', promo_ends: '09/09/2022',
      }, {
        name_of_promotion: 'Happy women\'s day5', clients: { image: 'assets/images/avatars/1.png', name: 'user name', email: 'test@gmail.com' }, unit_id: '4325', regular_price: '250 SGD', discounted_price: '200 SGD', promo_begins: '08/03/2021', actions: 'test', promo_ends: '-',
      }, {
        name_of_promotion: 'Happy women\'s day6', clients: { image: 'assets/images/avatars/1.png', name: 'user name', email: 'test@gmail.com' }, unit_id: '4325', regular_price: '250 SGD', discounted_price: '200 SGD', promo_begins: '08/03/2021', actions: 'test', promo_ends: '09/09/2022',
      }, {
        name_of_promotion: 'Happy women\'s day7', clients: { image: 'assets/images/avatars/1.png', name: 'user name', email: 'test@gmail.com' }, unit_id: '4325', regular_price: '250 SGD', discounted_price: '200 SGD', promo_begins: '08/03/2021', actions: 'test', promo_ends: '09/09/2022',
      }, {
        name_of_promotion: 'Happy women\'s day8', clients: { image: 'assets/images/avatars/1.png', name: 'user name', email: 'test@gmail.com' }, unit_id: '4325', regular_price: '250 SGD', discounted_price: '200 SGD', promo_begins: '08/03/2021', actions: 'test', promo_ends: '-',
      },
    ])
    const tableColumns = ref([
      { key: 'promotion_name', label: 'PROMOTION NAME', sortable: true },
      { key: 'discount', label: 'DISCOUNT' },
      { key: 'min_rental_required', label: 'MIN RENTAL REQUIRED' },
      { key: 'active', label: 'ACTIVE' },
      { key: 'actions', label: 'ACTIONS' },
    ])
    const promotionListTableColumns = ref([
      { key: 'name_of_promotion', label: 'NAME OF PROMOTION', sortable: true },
      { key: 'unit_id', label: 'UNIT ID' },
      { key: 'regular_price', label: 'REGULAR price' },
      { key: 'discounted_price', label: 'DISCOUNTED PRICE' },
      { key: 'promo_begins', label: 'PROMO BEGINS' },
      { key: 'promo_ends', label: 'PROMO ENDS' },
      { key: 'clients', label: 'CLIENTS' },
      { key: 'actions', label: 'ACTIONS' },
    ])
    return {
      items,
      tableColumns,
      promotionItemsList,
      promotionListTableColumns,
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "src/@core/scss/base/bootstrap-extended/variables";
  .promotions-heading-container {
    display: flex;
  }
  .custom-card {
    .card-body {
      margin: 5px 0;
      padding: 0;
    }
    .custom-hide {
      margin-top: 10px;
    }
  }
  .addresses {
    display: flex;
    .sub-address {
      margin: 0 20px 0 16px;
      .text-bold {
        font-weight: 600;
        padding-right: 15px;
      }
    }
  }
  .per-page-selector {
    width: 90px;
  }

  svg {
    &.orange {
      color: $orange;
    }

    &.primary {
      color: $primary;
    }
  }

  td {
    .occupancy {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>

<style lang="scss">
  @import "@core/scss/vue/libs/vue-select.scss";
</style>
