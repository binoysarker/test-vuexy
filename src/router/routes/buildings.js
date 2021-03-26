export default [
  {
    path: '/buildings',
    name: 'all-buildings',
    component: () => import('@/views/buildings/buildings-list/BuildingsList'),
    meta: {
      pageTitle: 'Buildings',
      contentClass: 'ecommerce-application',
      breadcrumb: [
        {
          text: 'All buildings',
          active: true,
        },
      ],
    },
  },
  {
    path: '/buildings/view/:id',
    name: 'building-details',
    component: () => import('@/views/buildings/buildings-view/BuildingsView'),
    meta: {
      pageTitle: 'Buildings',
      contentClass: 'ecommerce-application',
      breadcrumb: [
        {
          text: 'All buildings',
          to: { name: 'all-buildings' },
        },
        {
          text: 'Building details',
          active: true,
        },
      ],
    },
  },
]
