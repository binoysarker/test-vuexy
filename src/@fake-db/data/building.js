import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'

/* eslint-disable global-require */
const data = {
  buildings: [
    {
      id: 1,
      isShow: false,
      avatar: require('@/assets/images/photo-building.jpg'),
      name: 'Ruffles Mall',
      type: 'Pro',
      country: 'Singapore',
      city: 'Singapore',
      zip_code: '43524',
      address: 'Boulevard Street, 124',
      contact: '6582 242 5422',
      email: 'hightower@residence.com',
      occupancy: 80.2,
      buildingType: 'Pro',
      roles: [
        {
          id: 1,
          name: 'Ronald',
          surname: 'Koeman',
          role: 'SuperAdmin',
          email: 'ronald@gmail.com',
          phone: '2334252234',
        },
        {
          id: 2,
          name: 'Michael',
          surname: 'Laudrup',
          role: 'SuperAdmin',
          email: 'ronald@gmail.com',
          phone: '2334252234',
        },
        {
          id: 3,
          name: 'Frank',
          surname: 'deBoer',
          role: 'Admin',
          email: 'ronald@gmail.com',
          phone: '2334252234',
        },
        {
          id: 4,
          name: 'Miguel',
          surname: 'Gonzalez del Campo',
          role: 'Operator',
          email: 'ronald@gmail.com',
          phone: '2334252234',
        },
        {
          id: 5,
          name: 'Davor',
          surname: 'Sukez',
          role: 'Operator',
          email: 'ronald@gmail.com',
          phone: '2334252234',
        },
      ],
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
    },
    {
      id: 2,
      isShow: true,
      avatar: require('@/assets/images/photo-building.jpg'),
      name: 'High Tower Res..',
      type: 'Community',
      country: 'Thailand',
      city: 'Bangkok',
      zip_code: '234534',
      address: 'Boulevard Street, 124',
      contact: '6582 242 5422',
      email: 'hightower@residence.com',
      occupancy: 14.5,
      buildingType: 'Community',
      roles: [
        {
          id: 1,
          name: 'Ronald',
          surname: 'Koeman',
          role: 'SuperAdmin',
          email: 'ronald@gmail.com',
          phone: '2334252234',
        },
        {
          id: 2,
          name: 'Michael',
          surname: 'Laudrup',
          role: 'SuperAdmin',
          email: 'ronald@gmail.com',
          phone: '2334252234',
        },
        {
          id: 3,
          name: 'Frank',
          surname: 'deBoer',
          role: 'Admin',
          email: 'ronald@gmail.com',
          phone: '2334252234',
        },
        {
          id: 4,
          name: 'Miguel',
          surname: 'Gonzalez del Campo',
          role: 'Operator',
          email: 'ronald@gmail.com',
          phone: '2334252234',
        },
        {
          id: 5,
          name: 'Davor',
          surname: 'Sukez',
          role: 'Operator',
          email: 'ronald@gmail.com',
          phone: '2334252234',
        },
      ],
    },
  ],
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
// GET: Return Buildings
// ------------------------------------------------
mock.onGet('/apps/building/buildings').reply(config => {
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
  const filteredData = data.buildings.filter(
    building =>
    /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      (building.name.toLowerCase().includes(queryLowered) || building.fullName.toLowerCase().includes(queryLowered)) &&
            building.role === (role || building.role) &&
            building.currentPlan === (plan || building.currentPlan) &&
            building.status === (status || building.status),
  )
  /* eslint-enable  */

  const sortedData = filteredData.sort(sortCompare(sortBy))
  if (sortDesc) sortedData.reverse()

  return [
    200,
    {
      buildings: paginateArray(sortedData, perPage, page),
      total: filteredData.length,
    },
  ]
})

// ------------------------------------------------
// POST: Add new building
// ------------------------------------------------
mock.onPost('/apps/building/buildings').reply(config => {
  // Get event from post data
  const { building } = JSON.parse(config.data)

  // Assign Status
  building.status = 'active'

  const { length } = data.buildings
  let lastIndex = 0
  if (length) {
    lastIndex = data.buildings[length - 1].id
  }
  building.id = lastIndex + 1

  data.buildings.push(building)

  return [201, { building }]
})

// ------------------------------------------------
// GET: Return Single Building
// ------------------------------------------------
mock.onGet(/\/apps\/building\/buildings\/\d+/).reply(config => {
  // Get event id from URL
  let buildingId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  buildingId = Number(buildingId)

  const buildingIndex = data.buildings.findIndex(e => e.id === buildingId)
  const building = data.buildings[buildingIndex]

  if (building) return [200, building]
  return [404]
})
