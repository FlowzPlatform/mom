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
  r.db("vue_todo").table("tasks").orderBy('index').run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log("Error:", err)
  })
})

// Get all task from the db where parentId =  ?
// app.post('/tasks_parentId', (req, res) => {
// console.log('Req-body:parent-Id',req.body);
//   r.db("vue_todo").table("tasks").orderBy('index').filter({'parentId': req.body.parentId}).run().then(result => {
//     console.log('child list of selected parent', result)
//     res.send(result)
//   }).catch(err => {
//     console.log("Error:", err)
//   })
// })

app.post('/tasks_parentId', (req, res) => {
console.log('Req-body:parent-Id',req.body);
  r.db('vue_todo').table('tasks').filter({'parentId':req.body.parentId}).merge(function (todo) {
      return { subtask_count: r.db('vue_todo').table('tasks').filter({'parentId':todo('id')}).count()}
	}).merge(function (todo) {
      return { completed_subtask_count: r.db('vue_todo').table('tasks').filter({'parentId':todo('id'), 'completed':true}).count()}
  }).orderBy('index').run().then(result => {
      console.log('child list of selected parent', result)
      res.send(result)
  }).catch(err => {
      console.log("Error:", err)
  })
})


// //Fetch login credentials
// app.post('/getUser', jsonParser, (req, res) => {
//   r.db("vue_todo").table("users").filter({'username': req.body.username, 'password': req.body.password}).run().then(result => {
//     res.send(result)
//   }).catch(err => {
//     console.log("Error:", err)
//   })
// })

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
    'index': req.body.index,
    'dueDate': req.body.DueDate
  }
  r.db("vue_todo").table('tasks').insert(task).run().then(result => {
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
    'index': req.body.index,
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

// Insert new user in the db
app.post('/insertUsers', jsonParser, (req, res) => {
  console.log('request: ', req.body)
  const user = {
    'email': req.body.email,
    'password': req.body.password,
    'username': req.body.username,
    'role': req.body.role,
    'aboutme': req.body.aboutme,
    'signup_type': req.body.signup_type,
    // 'profile_pic': req.body.profile_pic,
    // 'dob': req.body.dob,
    'createdAt': new Date().toJSON(),
    'updatedAt': new Date().toJSON()
  }
  r.db("vue_todo").table('users').insert(user).run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log('Error:', err)
  })
})

// Fetch login credentials
app.post('/getUser', jsonParser, (req, res) => {
  r.db("vue_todo").table("users").filter({'email': req.body.email, 'password': req.body.password, 'signup_type': req.body.signup_type}).run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log("Error:", err)
  })
})

//Check whether Email address exists or not
app.post('/getUserEmail',(req, res) => {
  console.log('Req', req.body)
    r.db('vue_todo').table('users').filter({'email': req.body.email, 'signup_type':  req.body.signup_type}).count().run().then(result => {
    res.send((result).toString())
  }).catch(err => {
    console.log("Error:", err)
  })
})

app.post('/getUserDetail', jsonParser, (req, res) => {
  r.db("vue_todo").table("users").filter({'email': req.body.email, 'signup_type': req.body.signup_type}).run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log("Error:", err)
  })
})

// Update user profile
app.post('/updateUserProfile', jsonParser, (req, res) => {
  //var taskToUpdate = []
   var taskToUpdate = {
      'username': req.body.username,
      'role': req.body.role,
      'aboutme': req.body.aboutme,
      'dob': req.body.dob,
      'updatedAt': new Date().toJSON()
    }
  r.db("vue_todo").table("users").filter({'email': req.body.email, 'signup_type': req.body.signup_type}).update(taskToUpdate).run().then(result => {
    res.send(result)
  }).catch(err => {
    // console.log("Error:", err)
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
