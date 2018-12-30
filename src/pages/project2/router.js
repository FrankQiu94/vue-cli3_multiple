import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './component/home'
import Project2 from './component/project2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/project2_',
    component: Project2
  }
]

const route = new VueRouter({
  routes: routes
})

export default route
