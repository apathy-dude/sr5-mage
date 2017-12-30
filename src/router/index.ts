import Vue, { ComponentOptions } from 'vue'
import Router, { RouterOptions } from 'vue-router'

import Alchemy from '../components/Alchemy.vue'
import Conjuring from '../components/Conjuring.vue'
import Magician from '../components/Magician.vue'
import Ritual from '../components/Ritual.vue'
import Spellcasting from '../components/Spellcasting.vue'

import Preparation from '../components/alchemy/Preparation.vue'

import Settings from '../components/Settings.vue'

Vue.use(Router)

const opts: RouterOptions = {
    fallback: true,
    mode: "history",
    routes: [
        { path: '/', redirect: '/magician' },
        { path: '/magician', name: 'magician', component: Magician as ComponentOptions<Vue> },
        { path: '/settings', name: 'settings', component: Settings as ComponentOptions<Vue> },
        { path: '/alchemy', name: 'alchemy', component: Alchemy as ComponentOptions<Vue> },
        { path: '/alchemy/:id', name: 'alchemy-preparation', component: Preparation as ComponentOptions<Vue> },
        { path: '/conjuring', name: 'conjuring', component: Conjuring as ComponentOptions<Vue> },
        { path: '/ritual', name: 'ritual', component: Ritual as ComponentOptions<Vue> },
        { path: '/spellcasting', name: 'spellcasting', component: Spellcasting as ComponentOptions<Vue> }
    ]
}

export default new Router(opts)
