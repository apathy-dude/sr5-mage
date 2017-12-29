import Vue, { ComponentOptions } from 'vue'
import Router, { RouterOptions } from 'vue-router'

import Alchemy from '../components/Alchemy.vue'
import Conjuring from '../components/Conjuring.vue'
import Magician from '../components/Magician.vue'
import Ritual from '../components/Ritual.vue'
import SpellCasting from '../components/SpellCasting.vue'

Vue.use(Router)

const opts: RouterOptions = {
    fallback: true,
    mode: "history",
    routes: [
        { path: '/', name: 'Magician', component: Magician as ComponentOptions<Vue> },
        { path: '/alchemy', name: 'Alchemy', component: Alchemy as ComponentOptions<Vue> },
        { path: '/conjuring', name: 'Conjuring', component: Conjuring as ComponentOptions<Vue> },
        { path: '/ritual', name: 'Ritual', component: Ritual as ComponentOptions<Vue> },
        { path: '/spellcasting', name: 'Spellcasting', component: SpellCasting as ComponentOptions<Vue> }
    ]
}

export default new Router(opts)
