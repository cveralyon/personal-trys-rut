import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC0NYtnKRxE-1OQTvC66U_muHfufNtPfdI', // TODO: to env var
    libraries: 'places',
  },
})
