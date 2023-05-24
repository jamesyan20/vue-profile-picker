import { App, Plugin } from 'vue'

import VueProfilePicker from './VueProfilePicker.vue'

export default {
    install(Vue: App) {
        Vue.component(VueProfilePicker.name, VueProfilePicker)
    }
} as Plugin

export {
    VueProfilePicker as DSVueProfilePicker
}
