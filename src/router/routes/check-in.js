export default [{
  path: '/reservations/check-in',
  name: 'check-in',
  component: () => import('@/views/reservations/checkIn/CheckIn.vue'),
  meta: {
    pageTitle: 'Check In',
    contentClass: 'ecommerce-application',
    icon: 'EditIcon',
    breadcrumb: [
      {
        text: 'Checkin',
        active: true,
      },
    ],
  },
},
]
