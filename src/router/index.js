import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import NotFound from '@/components/404.vue'
import Catalog from '@/components/Catalog.vue'
import CatalogTopics from '@/components/CatalogTopics.vue'
import CatalogDetail from '@/components/CatalogDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
    /*beforeEnter: () => {
         window.location.href = 'https://ementa.info';
      },*/
  },
  {
    path: '*',
    name: 'not_found',
    component: NotFound
  },
  {
    path: '/catalog/:id(\\d+)/:slug',
    component: Catalog,
    children: [
      // Catalog
      {
        path: '/',
        name: 'catalog',
        component: CatalogTopics
      },
      // Catalog Categories
      {
        path: ':a_slug',
        name: 'catalog_a',
        component: CatalogTopics
      },
      {
        path: ':a_slug/:b_slug',
        name: 'catalog_b',
        component: CatalogTopics
      },
      {
        path: ':a_slug/:b_slug/:c_slug',
        name: 'catalog_c',
        component: CatalogTopics
      },
      // Catalog Details
      {
        path: ':a_slug/detail',
        name: 'catalog_a_detail',
        component: CatalogDetail
      },
      {
        path: ':a_slug/:b_slug/detail',
        name: 'catalog_b_detail',
        component: CatalogDetail
      },
      {
        path: ':a_slug/:b_slug/:c_slug/detail',
        name: 'catalog_c_detail',
        component: CatalogDetail
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

export default router
