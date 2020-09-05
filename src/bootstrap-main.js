import SideBar from './components/UIComponents/SidebarPlugin'

// asset imports
import 'vue-notifyjs/themes/default.scss'
import './assets/sass/dashboard.scss'

export default {
    install(Vue) {
        Vue.use(SideBar)
    }
}