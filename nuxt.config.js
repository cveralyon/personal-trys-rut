const axios = require('axios')

export default {
  router: {
    base: '/'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Rutero | Encuentra tu Servicio Ideal en todo Chile',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      // scripts globales
      { name: "facebook-domain-verification", content: "j8yphr4qujpk2kxm0sw9gymtmn37mm" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // SEO
      { hid: 'description', name: 'description', content: 'Busca entre cientos de servicios a lo largo de todo Chile y reserva en línea. En Rutero queremos que vivas la experiencia outdoor como siempre quisiste.'},
      // Open Graph
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: 'Rutero | Encuentra tu Servicio Ideal en todo Chile' },
      { hid: 'og:description', property: 'og:description', content: 'Busca entre cientos de servicios a lo largo de todo Chile y reserva en línea. En Rutero queremos que vivas la experiencia outdoor como siempre quisiste.' },
      { hid: 'og:image', property: 'og:image', content: 'https://www.rutero.cl/favicon.png' },
      { hid: 'og:url', property: 'og:url', content: 'https://rutero.cl' },

      ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ],
    script: [
      
      
    ]
  },
  props:  {
    default: true,
    title: 'Rutero | Encuentra tu Servicio Ideal en todo Chile',
    description: 'Busca entre cientos de servicios a lo largo de todo Chile y reserva en línea. En Rutero queremos que vivas la experiencia outdoor como siempre quisiste.',
    image: 'https://rutero.cl/favicon.png',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    '@/assets/css/fonts.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/star-rating.js', mode: 'client'},
    { src: '~/plugins/mercadopago.js', mode: 'client' },
    { src: '~/plugins/mercadopago-bricks.js', mode: 'client' },
    { src: '~/plugins/vue-google-maps.js' },
    { src: '~plugins/v-calendar.js', mode: 'client' },
    { src: '~/plugins/vue-iframes.js', mode: 'client' },
    { src: '~/plugins/bootstrap-vue.js', mode: 'client' },
    { src: '~/node_modules/vue-flux', mode: 'client' },
    { src: '~/plugins/vue-clazy-load.js', mode: 'client' },
    { src: '~/plugins/vue-carousel.js', mode: 'client' },
    { src: '~/plugins/vue-paginate.js', mode: 'client' },
    { src: '~/plugins/wysiwyg.js', mode: 'client' },
    { src: '~/plugins/debug.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome',
    '@nuxt/postcss8',

  ],
  pwa: {
    meta: {
      /* meta options */
    }
  },

  fontawesome: {
    component: 'fa',
    icons:{
    solid:true,
    brands:true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/gtm',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-ssr-cache',
    '@nuxt/image',
  ],
  robots: {
    UserAgent: '*',
    Allow: '/',
    Disallow: ['/image_uploader', '/Admin', '/MercadoPago', '/successreservation', '/Register'],
    Sitemap: 'https://rutero.cl/sitemap.xml'
  },

  // Auth strategy
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: false,
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: false,
          user: { url: '/auth/current_user', method: 'get' }
        }
      }
    },
    watchLoggedIn: false,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Definir produccion, staging, o local:
    
    baseURL: 'https://rutero-backend.herokuapp.com',
    // baseURL: 'https://rutero-backend-staging.herokuapp.com/',
    // baseURL: "http://localhost:8080",
  },
  sitemap: {
    hostname: 'https://rutero.cl',
    gzip: true,
    exclude: [
      '/image_uploader',
      '/Admin',
      '/Admin/*',
      '/Admin/*/*',
      '/MercadoPago/success',
      '/MercadoPago/failed',
      '/successreservation',
      '/Register/successfullyRegistered',
    ],
    path: '/sitemap.xml',
    routes: async () => {
      let services = []
      let { data } = await axios.get(`https://rutero-backend.herokuapp.com/api/v1/services`)
      services = data.map((service) => `/services/${service.id}`)

      // let blogs = []
      // let { data: blogsData } = await axios.get(`https://rutero-backend.herokuapp.com/api/v1/blogs`)
      // blogs = blogsData.map((blog) => `/blogs/${blog.slug}`)

      return services //.concat(blogs)
    },
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'tailwindcss/nesting': {},
        tailwindcss: './tailwind.config.js',
        autoprefixer: {},
      },
    },
    transpile: [/^vue2-google-maps($|\/)/],
    disabled: ['/blogs'],
    disabled: ['/blogs/:slug'],


  },

  cache: {
    useHostPrefix: true,
    pages: [
      /.*/
    ],// /^\/$/
    store: {
      type: 'memory',
      max: 50,
      ttl: 1 * 24 * 60 * 60,
    },
  },
  image: {
    domains: ['rutero-prod.s3.sa-east-1.amazonaws.com'],
  },

  publicRuntimeConfig: {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    publicKey: process.env.publicKey,
    AccessToken: process.env.AccessToken,
    publicKeyDev: process.env.publicKeyDev,
    AccessTokenDev: process.env.AccessTokenDev,
  }
}
