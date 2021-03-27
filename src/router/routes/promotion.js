export default [
  {
    path: '/promotion/list',
    name: 'promotion-list',
    component: () => import('@/views/promotion/PromotionList.vue'),
  },
  {
    path: '/promotion/new',
    name: 'promotion-new',
    component: () => import('@/views/promotion/new-promotion/NewPromotion.vue'),
  },
]
