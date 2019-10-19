const routes = [
  {
    path: '/',
    name: 'AppHome',
    component: {
      AppHome: () =>
        import(/* webpackChunkName: "AppHome" */ '@/components/App/Home')
    }
  },
  {
    path: '/pricing',
    name: 'PricingHome',
    component: {
      PricingHome: () =>
        import(/* webpackChunkName: "PricingHome" */ '@/components/Pricing/Home')
    }
  }
];

export default routes;
