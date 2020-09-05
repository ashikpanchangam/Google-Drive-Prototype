import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'

const routes = [{
        path: '/',
        component: DashboardLayout,
        redirect: '/admin/overview'
    },
    {
        path: '/admin',
        component: DashboardLayout,
        redirect: '/admin/overview',
        children: [{
                path: 'overview',
                name: 'Overview',
                component: Overview
            },

        ]
    }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes