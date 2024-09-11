//
import {createESSlot, Router} from '@extscreen/es3-router'
import routes from './routes'

const routerOptions = {
  routes: routes
}
const router: Router = createESSlot(routerOptions)

//
import {createESApp} from '@extscreen/es3-core'
import {ESApp} from '@extscreen/es3-vue'
import application from './App.vue'

const app: ESApp = createESApp(application, router)

//
import {ESComponent} from '@extscreen/es3-component'

app.use(ESComponent)

//
import '@quicktvui/quicktvui3/dist/index.css'
import {QuickTVUI} from '@quicktvui/quicktvui3'

app.use(QuickTVUI)
