import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'login',
        component: () =>
            import ('./views/Login')
    }, {
        path: "/companion",
        name: "companion",
        component: () =>
            import ('./components/Companion'),
        redirect: "/companion/index",
        children: [{
            path: "/companion/index",
            component: () =>
                import ('./views/Index'),
        }, {
            path: "/companion/index2",
            component: () =>
                import ('./views/Index2'),
        }, {
            path: "/companion/list",
            component: () =>
                import ('./views/List'),
        }, {
            path: "/companion/message",
            component: () =>
                import ('./views/Message'),
        }, {
            path: "/companion/maintain",
            component: () =>
                import ('./views/Maintain'),
        }, {
            path: "/companion/logistics",
            component: () =>
                import ('./views/Logistics'),
        }, {
            path: "/companion/yiyuan",
            component: () =>
                import ('./views/Yiyuan'),
        }, {
            path: "/companion/department",
            component: () =>
                import ('./views/Department'),
        }, {
            path: "/companion/good",
            component: () =>
                import ('./views/Good'),
        }, {
            path: "/companion/switch",
            component: () =>
                import ('./views/Switch'),
        }, {
            path: "/companion/replenish",
            component: () =>
                import ('./views/Replenish'),
        }, {
            path: "/companion/bed",
            component: () =>
                import ('./views/Bed'),
        }, {
            path: "/companion/commodity",
            component: () =>
                import ('./views/Commodity'),
        }, {
            path: "/companion/caiwu",
            component: () =>
                import ('./views/Caiwu'),
        }, {
            path: "/companion/deviceList",
            component: () =>
                import ('./views/DeviceList'),
        }]

    }]
})