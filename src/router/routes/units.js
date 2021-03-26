export default [
  {
    path: '/units',
    name: 'all-units',
    component: () => import('@/views/units/units-list/UnitsList'),
    meta: {
      pageTitle: 'Units',
      contentClass: 'ecommerce-application',
      breadcrumb: [
        {
          text: 'All units',
          active: true,
        },
      ],
    },
  },
  {
    path: '/units/add-units',
    name: 'add-units',
    component: () => import('@/views/units/units-list/UnitListAddNewUnit'),
    meta: {
      pageTitle: 'Add Units',
      contentClass: 'ecommerce-application',
      breadcrumb: [
        {
          text: 'All units',
          to: { name: 'all-units' },
        },
        {
          text: 'Add units',
          active: true,
        },
      ],
    },
  },
  // {
  //   path: '/units/view/:id',
  //   name: 'unit-details',
  //   component: () => import('@/views/units/units-view/UnitsView'),
  //   meta: {
  //     pageTitle: 'Units',
  //     contentClass: 'ecommerce-application',
  //     breadcrumb: [
  //       {
  //         text: 'All units',
  //         to: { name: 'all-units' },
  //       },
  //       {
  //         text: 'Unit details',
  //         active: true,
  //       },
  //     ],
  //   },
  // },
]
