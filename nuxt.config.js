module.exports = {
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.splice(0)

      routes.push({
        name: 'layout',
        path: '/',
        component: resolve(__dirname, 'pages/layout'),
        children: [
          {
            name: 'home',
            path: '',
            component: resolve(__dirname, 'pages/home'),
          },
          {
            name: 'article',
            path: '/article',
            component: resolve(__dirname, 'pages/article'),
          },
          {
            name: 'createArticle',
            path: '/createArticle',
            component: resolve(__dirname, 'pages/createArticle'),
          },
          {
            name: 'login',
            path: '/login',
            component: resolve(__dirname, 'pages/login'),
          },
          {
            name: 'register',
            path: '/register',
            component: resolve(__dirname, 'pages/login'),
          },
          {
            name: 'profile',
            path: '/profile',
            component: resolve(__dirname, 'pages/profile'),
          },
          {
            name: 'profileOther',
            path: '/profileOther',
            component: resolve(__dirname, 'pages/profile'),
          },
          {
            name: 'settings',
            path: '/settings',
            component: resolve(__dirname, 'pages/settings'),
          },
        ]
      })
    }
  },
  plugins: ['~/plugins/dayjs.js', '~/plugins/request.js'],
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost,
  }
}