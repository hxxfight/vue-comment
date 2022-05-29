import Vue from 'vue'
import Router from 'vue-router'
import addComment from '@/components/addComment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Comment',
      component: addComment
    }
  ]
})
