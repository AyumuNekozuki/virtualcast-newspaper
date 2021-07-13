export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: 'ja'
    },
    titleTemplate: '%s - Vキャス新聞',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '１週間のVキャスでの出来事を新聞としてお届け！' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Vキャス新聞' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://vcnp.nekozuki.me' },
      { hid: 'og:title', property: 'og:title', content: 'Vキャス新聞' },
      { hid: 'og:description', property: 'og:description', content: '１週間のVキャスでの出来事を新聞としてお届け！' },
      //{ hid: 'og:image', property: 'og:image', content: 'https://example.com/img/ogp/common.jpg' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@nekozuki_dev' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/nuxt_favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.10.0/viewer.min.css' }
    ],
    script:[
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.10.0/viewer.min.js'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'destyle.css',
    '~/assets/css/watchapp.css',
    '~/assets/css/console.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/jquery_init.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-fontawesome',
  ],
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  loading: {
    color: 'mediumaquamarine',
    failedColor: 'red',
    height: '3px'
  }
}
