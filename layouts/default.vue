<template>
  <div>
    <AppHeader v-if="powerheader"/> 
    <PoweredHeader v-else/>
    <div class="powerheader"><Nuxt /></div>
    <AppFooter/>
  </div>
</template>

<script>
import PoweredHeader from '../components/Landing/PoweredHeader.vue'
import AppFooter from '../components/Landing/AppFooter.vue'
import AppHeader from '../components/Landing/AppHeader.vue'


export default {
  components: {
    PoweredHeader,
    AppFooter,
    AppHeader
  },
  data() {
    return {
      powerheader: true,
    }
  }, 
  // created() {
  //   window.location.href.includes("austerra") ? this.$store.dispatch('SET_REF', 'austerra') : this.$store.dispatch('SET_REF', null)    
  // },
  mounted() {
    // this.$route.query.ref === 'austerra' ? this.powerheader=false : console.log('no ref')
    var noref = ''
    const utm_source = this.$route.query.utm_source
    const utm_medium = this.$route.query.utm_medium
    const utm_content = this.$route.query.utm_content
    this.$route.query.utm_medium ? localStorage.setItem('ref', utm_source + '_' + utm_medium) : noref='no ref 1'
    this.$route.query.ref === 'austerra' ? localStorage.setItem('ref', 'austerra') : noref='no ref 2'
    this.$route.query.ref === 'suda' ? localStorage.setItem('ref', 'suda') : noref='no ref 3'
    this.powerheader = localStorage.getItem('ref') === 'austerra' ? false : true
    // console.log("powerheader: " + this.powerheader)
    console.log('noref: ' + noref)
    console.log('ref: ' + localStorage.getItem("ref"))
  },

}


</script>

<style scoped>
.powerheader {
  padding-top: 60px;
}
</style>
