import { webSocketConnect } from './connections/server.js'
import { dbConnect } from './connections/db.js'

/* connect to mongo */
dbConnect()

/* connect to http/ws server */
webSocketConnect()

/* TODO: delete express route files, refactor/clear controller, service fns */