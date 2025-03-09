// import Root from '../views/Root.vue'
const Root = () => import('../views/Root.vue');
// platforms
const Clients = () => import('../views/payments/Clients.vue');
const RegisterPayment = () => import('../views/payments/RegisterPayment.vue');
const NewPayment = () => import('../views/payments/NewPayment.vue');
// import AboutView from './AboutView.vue'
// courses
const Test1 = () => import('../views/course/Test1.vue');
const Test2 = () => import('../views/course/Test2.vue');
// todo
const ToDoList = () => import('../views/to-do/ToDoList.vue');


const routes = [
  {
    path: '/',
    component: Root,
    name: 'root',
  },
  {
    path: '/services',
    component: Clients,
    name: 'services',
  },
  {
    path: '/register-payments',
    component: RegisterPayment,
    name: 'register-payments',
  },
  {
    path: '/new-payment',
    component: NewPayment,
    name: 'new-payment',
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
  {
    path: '/todo-list',
    component: ToDoList,
    name: 'todo-list',
  },
]

export {
  routes,
};