import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: () =>
            import ('@/views/Login')
    }, {
        path: '/wisdom',
        component: () =>
            import ('@/components/Wisdom'),
        redirect: "/wisdom/shuse",
        children: [{
            path: "/wisdom/shuse",
            component: () =>
                import ("@/views/ShuSe"),
        }, {
            path: '/wisdom/bclass',
            component: () =>
                import ('@/views/Bclass')
        }, {
            path: '/wisdom/bdormitory',
            component: () =>
                import ('@/views/Bdormitory')
        }, {
            path: '/wisdom/bstudent',
            component: () =>
                import ('@/views/Bstudent')
        }, {
            path: '/wisdom/sdhygiene',
            component: () =>
                import ('@/views/Sdhygiene')
        }, {
            path: '/wisdom/sddevice',
            component: () =>
                import ('@/views/Sddevice')
        }, {
            path: '/wisdom/sdleave',
            component: () =>
                import ('@/views/Sdleave')
        }, {
            path: '/wisdom/sdattence',
            component: () =>
                import ('@/views/Sdattence')
        }, {
            path: '/wisdom/hygienestatistics',
            component: () =>
                import ('@/views/Hygienestatistics')
        }, {
            path: '/wisdom/attencestatistics',
            component: () =>
                import ('@/views/Attencestatistics')
        }, {
            path: '/wisdom/excellentdorsta',
            component: () =>
                import ('@/views/Excellentdorsta')
        }, {
            path: '/wisdom/originalrecord',
            component: () =>
                import ('@/views/Originalrecord')
        }]

    }, {
        path: '/login',
        component: () =>
            import ('@/views/Login')
    }]
})