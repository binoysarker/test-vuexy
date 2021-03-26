import { ref, watch, computed } from '@vue/composition-api'

export default function useBuildingsList() {
  const refBuildingListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'name', sortable: true },
    { key: 'surname', sortable: true },
    { key: 'role', sortable: true },
    { key: 'email', sortable: true },
    { key: 'phone', sortable: true },
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

  watch([currentPage, perPage, searchQuery, countryFilter, cityFilter, districtFilter], () => {
    refetchData()
  })

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  return {
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
    refetchData,
  }
}
