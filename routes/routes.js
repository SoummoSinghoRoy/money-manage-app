const authRoute = require('./authRoute');
const transactionRoute = require('./transactionRoute');
const searchRoute = require('./searchRoute');

const routes = [
  {
    path: '/api/search',
    handler: searchRoute
  },
  {
    path:'/api/transaction',
    handler: transactionRoute
  },
  {
    path: '/api/user',
    handler: authRoute
  },
  {
    path: '/',
    handler: (req, res) => {
      res.send('Server also running')
    }
  },
]

module.exports = (app) => {
  routes.forEach(route => {
    if(route.path == '/') {
      app.get(route.path, route.handler)
    } else{
      app.use(route.path, route.handler)
    }
  })
}