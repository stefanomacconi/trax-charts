import Visual from './views/Visual.vue'
import Situation from './views/Situation.vue'

export const routes = [
    { path: '/', component: Visual},
    { name: "gruppoCdL", path: '/group/:gruppoCdL', component: Visual},
    { name: "situazioneLav", path: '/situation/:cdl', component: Situation, props: true}
]