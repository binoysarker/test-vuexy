import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useBuildingsList() {
  // Use toast
  const toast = useToast()

  const refBuildingListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'show_details', sortable: false },
    { key: 'id', sortable: true },
    { key: 'name', sortable: true },
    { key: 'buildingType', sortable: true },
    { key: 'country', sortable: true },
    { key: 'city', sortable: true },
    { key: 'zip_code', sortable: true },
    { key: 'occupancy', sortable: true, class: 'without-padding' },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalBuildings = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const countryFilter = ref(null)
  const cityFilter = ref(null)
  const districtFilter = ref(null)
  const zipCodeFilter = ref(null)
  const buildingTypeFilter = ref(null)
  const availableUnitsFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refBuildingListTable.value ? refBuildingListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalBuildings.value,
    }
  })

  const refetchData = () => {
    refBuildingListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, countryFilter, cityFilter, districtFilter, availableUnitsFilter], () => {
    refetchData()
  })

  const fetchBuildings = (ctx, callback) => {
    store
      .dispatch('app-building/fetchBuildings', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        country: countryFilter.value,
        city: cityFilter.value,
        district: districtFilter.value,
      })
      .then(response => {
        const { buildings, total } = response.data

        callback(buildings)
        totalBuildings.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching buildings list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveBuildingTypeVariant = type => (type === 'Pro' ? 'HomeIcon primary' : 'ArchiveIcon orange')

  const resolveBuildingTypeIcon = type => (type === 'Pro' ? 'HomeIcon' : 'ArchiveIcon')

  const resolveBuildingDistrictVariant = district => {
    if (district === 'pending') return 'warning'
    if (district === 'active') return 'success'
    if (district === 'inactive') return 'secondary'
    return 'primary'
  }

  return {
    fetchBuildings,
    tableColumns,
    perPage,
    currentPage,
    totalBuildings,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refBuildingListTable,

    resolveBuildingTypeVariant,
    resolveBuildingTypeIcon,
    resolveBuildingDistrictVariant,
    refetchData,

    // Extra Filters
    countryFilter,
    cityFilter,
    districtFilter,
    zipCodeFilter,
    buildingTypeFilter,
    availableUnitsFilter,
  }
}
