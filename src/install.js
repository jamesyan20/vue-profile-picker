import VueProfilePicker from "./VueProfilePicker.vue";

const VPP = {
 install(Vue, options) {
  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
  Vue.component("vue-profile-picker", VueProfilePicker);
 }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VPP);
}

export default VPP;
