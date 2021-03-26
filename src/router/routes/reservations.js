export default [
  {
    path: '/reservations/new',
    name: 'reservations-new',
    component: () => import('@/views/reservations/reservation-new/ReservationNew'),
    meta: {
      pageTitle: 'Reservations',
      contentClass: 'ecommerce-application',
      breadcrumb: [
        {
          text: 'New reservation',
          active: true,
        },
      ],
    },
  },
]
