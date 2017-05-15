const express = require('express')
const r = require('rethinkdbdash')()
const bodyParser = require('body-parser')
const webpack = require('webpack')
const config = require('./build/webpack.dev.conf')
const _ = require('lodash')

const app = express()
const router = express.Router()
const compiler = webpack(config)
const jsonParser = bodyParser.json()
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())


// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}))

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler))

// Get all task from the db
app.get('/tasks', (req, res) => {
  r.db("vue_todo").table("tasks").orderBy('createdAt').run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log("Error:", err)
  })
})

// Get all task from the db where parentId =  ?
app.post('/tasks_parentId', (req, res) => {
console.log('Req-body:parent-Id',req.body);
  r.db("vue_todo").table("tasks").orderBy('createdAt').filter({'parentId': req.body.parentId}).run().then(result => {
    console.log('child list of selected parent', result)
    res.send(result)
  }).catch(err => {
    console.log("Error:", err)
  })
})


//Fetch login credentials
app.post('/getUser', jsonParser, (req, res) => {
  r.db("vue_todo").table("Users").filter({'username': req.body.username, 'password': req.body.password}).run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log("Error:", err)
  })
})

//Check whether Email address exists or not
app.post('/getUserEmail', jsonParser, (req, res) => {
  r.db("vue_todo").table("Users").filter({'username': req.body.username}).run().then(result => {
    console.log(result)
  }).catch(err => {
    console.log("Error:", err)
  })
})

// Insert todo task in the db
app.post('/tasks', jsonParser, (req, res) => {
  console.log('req.body',req.body);
  const task = {
    'parentId':req.body.parentId,
    'taskName': req.body.taskName,
    'taskDesc': req.body.taskDesc,
    'level': req.body.level,
    'completed': req.body.completed,
    'createdAt': new Date().toJSON(),
    'updatedAt': new Date().toJSON(),
  }
  r.db("vue_todo").table('tasks').insert(task).run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log('Error:', err)
  })
})

//Insert new user in the db
app.post('/insertUsers', jsonParser, (req, res) => {
  const user = {
    'username': req.body.username,
    'password': req.body.password
  }
  r.db("vue_todo").table('Users').insert(user).run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log('Error:', err)
  })
})

// update task
app.post('/updatetasks', jsonParser, (req, res) => {
  console.log('req.body',req.body);
  const task = {
    'taskName': req.body.taskName,
    'taskDesc': req.body.taskDesc,
    'completed': req.body.completed,
    'taskComment': req.body.taskComment,
    'updatedAt': new Date().toJSON()
  }
  r.db('vue_todo').table('tasks').filter({'id': req.body.id}).update(task).run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log('Error:', err)
  })
})

//update using object
app.post('/updateTodo', jsonParser, (req, res) => {
  console.log('req.body',req.body);
  const task = {
    // 'taskName': req.body.taskName,
    // 'taskDesc': req.body.taskDesc,
    // 'completed': req.body.completed,
    // 'createdAt': new Date().toJSON(),
    //'updatedAt': new Date().toJSON(),
    'subTasks' : req.body.subTasks
  }
  r.db('vue_todo').table('tasks').filter({'id': req.body.id}).update(task).run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log('Error:', err)
  })
})

// Delete task
app.delete('/deteletask/:id', (req, res) => {
  console.log('req.body',req.params);
  r.db('vue_todo').table('tasks').get(req.params.id).delete().run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log('Error:', err)
  })
})


// Get subtask
app.get('/subtasks', (req, res) => {
  r.db("vue_todo").table("subtasks").filter({task_id: "b29f893f-50b0-4e39-9c1a-49bf3b016512"}).orderBy('createdAt').run().then(result => {
    console.log("s.task result[]", result)
    res.send(result)
  }).catch(err => { 
    console.log("Error:", err)
  })
})

// insert subtasks
app.post('/subtasks', jsonParser, (req, res) => {
  console.log('req.body',req.body);
  const project = {
    'task_id': req.body.task_id,
    'taskName': req.body.taskName,
    'completed': req.body.completed,
    'createdAt': new Date().toJSON(),
    'updatedAt': new Date().toJSON()
  }
  r.db("vue_todo").table('subtasks').insert(project).run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log('Error:', err)
  })
})

router.get('/projects/:id', (req, res) => {
  r.table('projects').get(req.params.id).run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log('Error:', err)
  })
})

router.get('/projects/:id/feeds', (req, res) => {
  r.table('feeds').filter({projectId: req.params.id}).orderBy('createdAt').run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log('Error:', err)
  })
})

router.get('/feeds', (req, res) => {
  r.table("feeds").orderBy('createdAt').run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log("Error:", err)
    res.send(result)
  })
})

router.post('/feeds', jsonParser, (req, res) => {
  const feed = {
    'content': req.body.content,
    'createdAt': new Date().toJSON(),
    'projectId': req.body.projectId
  }
  r.table('feeds').insert(feed).run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log('Error:', err)
  })
})

app.use('/api', router)

app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:3000')
})
