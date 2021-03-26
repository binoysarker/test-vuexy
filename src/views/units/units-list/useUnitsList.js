import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { useToast } from 'vue-toastification/composition'

export default function useUnitsList() {
  // Use toast
  const toast = useToast()

  const refUnitListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'show_details', sortable: false },
    { key: 'id', sortable: true },
    { key: 'area', sortable: true },
    { key: 'type', sortable: true },
    { key: 'floor', sortable: true },
    { key: 'name', sortable: true },
    { key: 'price', sortable: true },
    { key: 'available', sortable: true },
    { key: 'reserve', sortable: true },
    { key: 'depart', sortable: true },
    { key: 'maintener', sortable: true },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalUnits = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(false)
  const typeFilter = ref(null)
  const availabilityFilter = ref(null)
  const reservationStatusFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refUnitListTable.value ? refUnitListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalUnits.value,
    }
  })

  const typesOptions = [
    { label: 'Small climate', value: 'small_climate' },
    { label: 'Large CCTV', value: 'large_cctv' },
    { label: 'Large Locker', value: 'large_locker' },
  ]

  const availabilityOptions = [
    { label: 'RESERVED', value: 'RESERVED' },
    { label: 'AVAILABLE', value: 'AVAILABLE' },
  ]

  const reservationStatusOptions = [
    { label: 'Outgoing', value: 'Outgoing' },
    { label: 'Upcoming', value: 'Upcoming' },
  ]

  const refetchData = () => {
    refUnitListTable.value.refresh()
  }

  const fetchUnits = (ctx, callback) => {
    store
      .dispatch('app-unit/fetchUnits', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
      })
      .then(response => {
        const { units, total } = response.data

        callback(units)
        totalUnits.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching units list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  watch([currentPage, perPage, searchQuery, typeFilter, availabilityFilter, reservationStatusFilter], () => {
    refetchData()
  })

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  return {
    tableColumns,
    perPage,
    currentPage,
    totalUnits,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refUnitListTable,
    typeFilter,
    typesOptions,
    availabilityFilter,
    availabilityOptions,
    reservationStatusFilter,
    reservationStatusOptions,
    fetchUnits,
    refetchData,
  }
}
