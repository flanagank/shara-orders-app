import Vue from 'nativescript-vue'
import App from './components/App'
import Login from './components/Login'
import VueDevtools from 'nativescript-vue-devtools'
import AuthService from "./services/auth-service"
import ProductsService from "./services/products-service";
import OrdersCart from './model/cart'
import OrdersService from "./services/orders-service";
const appSettings = require("tns-core-modules/application-settings");
// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

// Vue.registerElement(
//     'CardView',
//     () => require('@nstudio/nativescript-cardview').CardView
// );
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';
var toasty = require('nativescript-toasty').Toasty;

TNSFontIcon.debug = false;
TNSFontIcon.paths = {
    'fa': './fonts/font-awesome.css',
    'ion': './fonts/ionicons.css',
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

const authService = new AuthService();
Vue.prototype.$authService = authService;

const productsService = new ProductsService();
Vue.prototype.$productsService = productsService;

const ordersService = new OrdersService();
Vue.prototype.$ordersService = ordersService;

const ordersCart = new OrdersCart();
Vue.prototype.$ordersCart = ordersCart;

Vue.prototype.$toasty = toasty;


if (TNS_ENV !== 'production') {
    Vue.use(VueDevtools)
}


// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

appSettings.setString("appBaseURI", "http://192.168.43.254:3333"); //TODO:load from firebase config

Vue.registerElement(
    'RadSideDrawer',
    () => require('nativescript-ui-sidedrawer').RadSideDrawer
)

new Vue({
    render: h => h("frame", [h(authService.isLoggedIn() ? App : Login)])
}).$start();


// new Vue({

//   render: h => h('frame', [h(App)])
// }).$start()