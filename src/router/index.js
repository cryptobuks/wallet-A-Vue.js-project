import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import {Tabbar, TabItem} from 'mint-ui';
import {TabContainer, TabContainerItem} from 'mint-ui';
import {Button} from 'mint-ui';
import {Cell} from 'mint-ui';
import {Header} from 'mint-ui';
import {Field} from 'mint-ui';

Vue.use(Router);

Vue.component(Field.name, Field);
Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home',
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        unNeedAuth: true
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: {
        unNeedAuth: true
      }
    },
  ]
});

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (!to.matched.some(res => res.meta.unNeedAuth)) {// 判断是否需要登录权限
    if (localStorage.getItem('token') && localStorage.getItem('uid')) {// 判断是否登录
      next()
    } else {// 没登录则跳转到登录界面
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
});

export default router
