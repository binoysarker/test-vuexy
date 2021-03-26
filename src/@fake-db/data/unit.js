import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'

/* eslint-disable global-require */
const data = {
  units: [
    {
      isShow: false,
      id: 1,
      area: 122,
      type: 'Small climate',
      floor: 1,
      name: 'CCTV Big blue unit',
      price: 230,
      currency: 'SGD',
      available: 'RESERVED',
      reserve: 'Outgoing',
      depart: '14/03/22',
      maintener: 'Davor Suker',
      length: 3,
      width: 4,
      height: 3,
      guest: 'Pablo Roberto',
      email: 'paulo.roberto.1982@gmail.com',
      arrival_date: '22/02/2021',
      departure_date: null,
      maintenance: 'Tue 10:30',
      facilities: {
        cctv: true,
        parking: true,
        smart_lock: false,
        ac: false,
      },
    },
    {
      isShow: false,
      id: 2,
      area: 44,
      type: 'Large CCTV',
      floor: '-2 Parking',
      name: null,
      price: 145,
      currency: 'SGD',
      available: 'AVAILABLE',
      reserve: null,
      depart: null,
      maintener: 'Miguel Gonzalez',
      length: 3,
      width: 4,
      height: 3,
      guest: 'Pablo Roberto',
      email: 'paulo.roberto.1982@gmail.com',
      arrival_date: '22/02/2021',
      departure_date: null,
      maintenance: 'Tue 10:30',
      facilities: {
        cctv: true,
        parking: true,
        smart_lock: false,
        ac: false,
      },
    },
    {
      isShow: true,
      id: 3,
      area: 12,
      type: 'Large Locker',
      floor: 'Basement',
      name: 'Super secure room',
      price: 350,
      currency: 'SGD',
      available: 'RESERVED',
      reserve: 'Upcoming',
      depart: null,
      maintener: 'Miguel Gonzalez',
      length: 3,
      width: 4,
      height: 3,
      guest: 'Pablo Roberto',
      email: 'paulo.roberto.1982@gmail.com',
      arrival_date: '22/02/2021',
      departure_date: null,
      maintenance: 'Tue 10:30',
      facilities: {
        cctv: true,
        parking: true,
        smart_lock: false,
        ac: false,
      },
    },
  ],
}
/* eslint-enable */

// ------------------------------------------------
// GET: Return Units
// ------------------------------------------------
mock.onGet('/apps/unit/units').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const {
    q = '',
    perPage = 10,
    page = 1,
    sortBy = 'id',
    sortDesc = false,
    role = null,
    plan = null,
    status = null,
  } = config.params
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = data.units.filter(
    unit =>
    /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      (unit.name.toLowerCase().includes(queryLowered) || unit.fullName.toLowerCase().includes(queryLowered)) &&
            unit.role === (role || unit.role) &&
            unit.currentPlan === (plan || unit.currentPlan) &&
            unit.status === (status || unit.status),
  )
  /* eslint-enable  */

  const sortedData = filteredData.sort(sortCompare(sortBy))
  if (sortDesc) sortedData.reverse()

  return [
    200,
    {
      units: paginateArray(sortedData, perPage, page),
      total: filteredData.length,
    },
  ]
})

// ------------------------------------------------
// POST: Add new unit
// ------------------------------------------------
mock.onPost('/apps/unit/units').reply(config => {
  // Get event from post data
  const { unit } = JSON.parse(config.data)

  // Assign Status
  unit.status = 'active'

  const { length } = data.units
  let lastIndex = 0
  if (length) {
    lastIndex = data.units[length - 1].id
  }
  unit.id = lastIndex + 1

  data.units.push(unit)

  return [201, { unit }]
})

// ------------------------------------------------
// GET: Return Single Unit
// ------------------------------------------------
mock.onGet(/\/apps\/unit\/units\/\d+/).reply(config => {
  // Get event id from URL
  let unitId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  unitId = Number(unitId)

  const unitIndex = data.units.findIndex(e => e.id === unitId)
  const unit = data.units[unitIndex]

  if (unit) return [200, unit]
  return [404]
})
