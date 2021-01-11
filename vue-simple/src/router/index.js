import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
    history: false,
    hashbang: true,
    routes: [{
        path: '/',
        redirect: '/login',

    }, {
        path: '/',
        component: resolve => require(['../components/index/index.vue'], resolve),
        children: [{
            path: '/program',
            name: '项目管理',
            component: resolve => require(['../components/index/program.vue'], resolve),
        }, {
            path: '/project',
            name: '项目设计',
            component: resolve => require(['../components/index/xiangmusheji.vue'], resolve),
            children: [{
                path: "tuopu",
                name: '拓扑对象',
                component: resolve => require(['../components/xiangmusheji/tuopu.vue'], resolve),
                children: [{
                    name: '水库特征曲线1',
                    path: 'shuikuquxian',
                    component: resolve => require(['../components/jichuziliao/shuikuquxian.vue'], resolve),
                }, {
                    name: '长序列径流1',
                    path: 'jingliu',
                    meta: { keepAlive: true },
                    component: resolve => require(['../components/jichuziliao/jingliu.vue'], resolve),
                }, {
                    name: '洪水资料1',
                    path: 'hongshuitezheng',
                    component: resolve => require(['../components/jichuziliao/hongshuitezheng.vue'], resolve),
                }, {
                    name: '水库特征参数1',
                    path: 'shuikutezheng',
                    component: resolve => require(['../components/jichuziliao/shuikutezheng.vue'], resolve),
                }, {
                    name: '调度图1',
                    path: 'diaodutu',
                    component: resolve => require(['../components/jichuziliao/diaodutu.vue'], resolve),
                }, {
                    name: '发电特性曲线1',
                    path: 'fadianquxian',
                    component: resolve => require(['../components/jichuziliao/fadianquxian.vue'], resolve),
                }, {
                    name: '河流断面1',
                    path: 'heliuduanmian',
                    component: resolve => require(['../components/jichuziliao/heliuduanmian.vue'], resolve),
                }],
            }, {
                path: "jichuziliao",
                name: '基础资料',
                component: resolve => require(['../components/xiangmusheji/jichuziliao.vue'], resolve),
                children: [{
                    path: ":id",
                    name: 'page',
                    component: resolve => require(['../components/jichuziliao/page.vue'], resolve),
                    children: [{
                        name: '水库特征曲线',
                        path: 'shuikuquxian',
                        component: resolve => require(['../components/jichuziliao/shuikuquxian.vue'], resolve),
                    }, {
                        name: '长序列径流',
                        path: 'jingliu',
                         meta: { keepAlive: true },
                        component: resolve => require(['../components/jichuziliao/jingliu.vue'], resolve),
                    }, {
                        name: '洪水资料',
                        path: 'hongshuitezheng',
                        component: resolve => require(['../components/jichuziliao/hongshuitezheng.vue'], resolve),
                    }, {
                        name: '水库特征参数',
                        path: 'shuikutezheng',
                        component: resolve => require(['../components/jichuziliao/shuikutezheng.vue'], resolve),
                    }, {
                        name: '调度图',
                        path: 'diaodutu',
                        component: resolve => require(['../components/jichuziliao/diaodutu.vue'], resolve),
                    }, {
                        name: '发电特性曲线',
                        path: 'fadianquxian',
                        component: resolve => require(['../components/jichuziliao/fadianquxian.vue'], resolve),
                    }, {
                        name: '河流断面',
                        path: 'heliuduanmian',
                        component: resolve => require(['../components/jichuziliao/heliuduanmian.vue'], resolve),
                    }]
                }],

            }, {
                path: "fanganjiaohu",
                name: '方案交互',
                component: resolve => require(['../components/xiangmusheji/fanganjiaohu.vue'], resolve),
                children: [{
                    path: "p1",
                    name: "p1",
                    component: resolve => require(['../components/fanganjiaohu/p1.vue'], resolve),
                }, {
                    path: "p2",
                    name: "p2",
                    component: resolve => require(['../components/fanganjiaohu/p2.vue'], resolve),
                }, {
                    path: "p3",
                    name: "p3",
                    component: resolve => require(['../components/fanganjiaohu/p3.vue'], resolve),
                }, ]
            }]
        }]
    }, {
        path: '/login',
        component: resolve => require(['../components/index/login.vue'], resolve)
    }, ]
})
