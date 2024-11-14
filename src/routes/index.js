import Root from '../views/Root.vue'
// platforms
import Clients from '../views/payments/Clients.vue'
import RegisterPayment from '../views/payments/RegisterPayment.vue';
// import AboutView from './AboutView.vue'
// courses
import Test1 from '../views/course/Test1.vue';
import Test2 from '../views/course/Test2.vue';
// payments - details


const routes = [
  {
    path: '/',
    component: Root,
    name: 'root',
  },
  {
    path: '/clients',
    component: Clients,
    name: 'clients',
  },
  {
    path: '/payments',
    component: RegisterPayment,
    name: 'payments',
  },
  // { path: '/about', component: AboutView },
  // courses
  {
    path: '/test1',
    component: Test1,
    name: 'test1',
  },
  {
    path: '/test2',
    component: Test2,
    name: 'test2',
  },
]

export {
  routes,
};