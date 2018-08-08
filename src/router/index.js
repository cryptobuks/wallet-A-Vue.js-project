import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import WalletAdd from '@/components/WalletAdd'
import WalletKeyStroe from '@/components/WalletKeyStore'
import WalletConfig from '@/components/WalletConfig'
import TokenAdd from '@/components/TokenAdd'
import TokenInfo from '@/components/TokenInfo'
import Receive from '@/components/Receive'
import Send from '@/components/Send'


import {Popup} from 'mint-ui';
import {Actionsheet} from 'mint-ui';
import {Tabbar} from 'mint-ui';
import {TabItem} from 'mint-ui';
import {TabContainer, TabContainerItem} from 'mint-ui';
import {Button} from 'mint-ui';
import {Cell} from 'mint-ui';
import {Header} from 'mint-ui';
import {Field} from 'mint-ui';
import {Checklist} from 'mint-ui';
import {Radio} from 'mint-ui';
import {Range} from 'mint-ui';
import {Navbar} from 'mint-ui';


import VueClipboard from 'vue-clipboard2'

Vue.use(Router);
Vue.use(VueClipboard);

Vue.component(Range.name, Range);
Vue.component(Field.name, Field);
Vue.component(Popup.name, Popup);
Vue.component(Navbar.name, Navbar);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);
Vue.component(Checklist.name, Checklist);
Vue.component(Radio.name, Radio);

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
    {
      path: '/WalletAdd',
      name: 'WalletAdd',
      component: WalletAdd,
    },
    {
      path: '/WalletKeyStroe',
      name: 'WalletKeyStroe',
      component: WalletKeyStroe,
    },
    {
      path: '/TokenAdd',
      name: 'TokenAdd',
      component: TokenAdd,
    },
    {
      path: '/TokenInfo',
      name: 'TokenInfo',
      component: TokenInfo,
    },
    {
      path: '/Receive',
      name: 'Receive',
      component: Receive,
    },
    {
      path: '/Send',
      name: 'Send',
      component: Send,
    },
    {
      path: '/WalletConfig',
      name: 'WalletConfig',
      component: WalletConfig,
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
