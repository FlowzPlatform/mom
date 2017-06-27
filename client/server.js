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

// var sockio = require("socket.io");
// console.log("App is listening on 3000");
// try{
//   var io = sockio.listen(app.listen(3000));
//   io.sockets.on('connection', function(socket) {
//     console.log('connected to socket');
//       io.emit('feed-change', "----value");  
//   });
//     io.on('feed-change', function(data){
//             console.log("data=>",data);
//         });
// }catch(error){
//     console.log("error");
// }

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
// app.get('/tasks', (req, res) => {
//   r.db("vue_todo").table("tasks").run().then(result => {
//     res.send(result)
//   }).catch(err => {
//     console.log("Error:", err)
//   })
// })

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

// app.post('/tasks_parentId', (req, res) => {
//   r.db('vue_todo').table('tasks')
//         .changes().run().then(function (feed) {
//         console.log('Listening for changes...');
//         feed.each((err, change) => {
//             console.log('Change detected', change);
//             io.emit('feed-change', change);
//         });
//     });
// console.log('Req-body:parent-Id',req.body);
//   r.db('vue_todo').table('tasks').filter({'parentId':req.body.parentId}).merge(function (todo) {
//   // r.db('vue_todo').table('tasks').merge(function (todo) {
//       return { subtask_count: r.db('vue_todo').table('tasks').filter({'parentId':todo('id')}).count()}
// 	}).merge(function (todo) {
//       return { completed_subtask_count: r.db('vue_todo').table('tasks').filter({'parentId':todo('id'), 'completed':true}).count()}
//   }).merge({'progress': 0 }).merge({'progress_count': '' }).orderBy('index').run().then(result => {
//       // console.log('child list of selected parent', result)
//       res.send(result)
//   }).catch(err => {
//       console.log("Error:", err)
//   })
// })

// Insert todo task in the db
// app.post('/tasks', jsonParser, (req, res) => {
//   console.log('req.body',req.body);
//   const task = {
//     'parentId':req.body.parentId,
//     'taskName': req.body.taskName,
//     'taskDesc': req.body.taskDesc,
//     'level': req.body.level,
//     'completed': req.body.completed,
//     'createdAt': new Date().toJSON(),
//     'updatedAt': new Date().toJSON(),
//     'index': req.body.index,
//     'image_name': req.body.image_name,
//     'dueDate': ''
//   }
//   r.db("vue_todo").table('tasks').insert(task).run().then(result => {
//     res.send(result)
//   }).catch(err => {
//     console.log('Error:', err)
//   })
// })

// update task
// app.post('/updatetasks', jsonParser, (req, res) => {
//   console.log('req.body',req.body);
//   const task = {
//     'taskName': req.body.taskName,
//     'taskDesc': req.body.taskDesc,
//     'completed': req.body.completed,
//     'index': req.body.index,
//     'updatedAt': new Date().toJSON(),
//     'dueDate': req.body.dueDate,
//     'estimatedTime':req.body.estimatedTime,
//     'priority':req.body.priority
//   }
//   r.db('vue_todo').table('tasks').filter({'id': req.body.id}).update(task).run().then(result => {
//     res.send(result)
//   }).catch(err => {
//     console.log('Error:', err)
//   })
// })

//update using object
// app.post('/updateTodo', jsonParser, (req, res) => {
//   console.log('req.body',req.body);
//   const task = {
//     // 'taskName': req.body.taskName,
//     // 'taskDesc': req.body.taskDesc,
//     // 'completed': req.body.completed,
//     // 'createdAt': new Date().toJSON(),
//     //'updatedAt': new Date().toJSON(),
//     'subTasks' : req.body.subTasks
//   }
//   r.db('vue_todo').table('tasks').filter({'id': req.body.id}).update(task).run().then(result => {
//     res.send(result)
//   }).catch(err => {
//     console.log('Error:', err)
//   })
// })

// Delete task
// app.delete('/deteletask/:id', (req, res) => {
//   console.log('req.body',req.params);
//   r.db('vue_todo').table('tasks').get(req.params.id).delete().run().then(result => {
//     res.send(result)
//   }).catch(err => {
//     console.log('Error:', err)
//   })
// })

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
    'image_url': req.body.image_url,
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

//Update image url
app.post('/updateImageURL', jsonParser, (req, res) => {
    const taskToUpdate = {
      'image_url': req.body.image_url,
      'image_name': req.body.image_name
    }
  
  r.db("vue_todo").table("users").filter({'email': req.body.email, 'signup_type': req.body.signup_type}).update(taskToUpdate).run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log("Error:", err)
  })
})


// Insert new attachment in the db
// app.post('/addAttachment', jsonParser, (req, res) => {
//   const attachfile = {
//     'task_id': req.body.task_id,
//     'file_name': req.body.file_name,
//     'file_url': req.body.file_url,
//     'uploadedBy': req.body.uploadedBy,
//     'level': req.body.level,
//     'file_name_timestamp': req.body.file_name_timestamp,
//     'createdAt': new Date().toJSON()
//   }
//   r.db("vue_todo").table('attachment').insert(attachfile).run().then(result => {
//     res.send(result)
//   }).catch(err => {
//     console.log('Error:', err)
//   })
// })

//Delete Attachment
// app.post('/deleteAttachment', jsonParser, (req, res) => {
//   const deleteFile = {
//     'isDeleted': req.body.isDeleted,
//     'deletedBy': req.body.deletedBy,
//     'file_url': req.body.file_url,
//     'deletedDate': new Date().toJSON()
//   }
//   r.db('vue_todo').table('attachment').filter({'id': req.body.id}).update(deleteFile).run().then(result => {
//     res.send(result)
//   }).catch(err => {
//     console.log('Error:', err)
//   })
// })

//Fetch Attachments
// app.post('/getAttachments', jsonParser, (req, res) => {
//   r.db('vue_todo').table('attachment').filter({'task_id': req.body.task_id, 'isDeleted': req.body.isDeleted}).run().then(result => {
//     res.send(result)
//   }).catch(err => {
//     console.log("Error:", err)
//   })
// })

// app.post('/getSttings',  (req,res) => {
//   console.log(req.body)
//   r.db('vue_todo').table('settings').merge(function (settings) {
//       return { user_setting: r.db('vue_todo').table('user_settings').filter({'settings_id':settings('id')}).coerceTo('array')}
// 	}).run().then(result => {
//     res.send(result)
//   }).catch(err => {
//     console.log("Error:", err)
//   })
// })

//update user setting 
// app.post('/updateUserSetting', (req, res) => {
//   console.log("update user setting:---",req.body)
//   // r.db('vue_todo').table('user_settings').filter({'settings_id':req.body.settings_id, 'user_id': req.body.user_id}).update({'setting_value':req.body.setting_value}).run().then(result => {
//   //   console.log("update result:", result)
//   //   if(result.replaced==0)
//   //   {
//   //       var userSettings =  {
//   //           user_id: req.body.user_id,
//   //           settings_id: req.body.settings_id,
//   //           setting_value: req.body.setting_value
//   //       }
//   //       r.db('vue_todo').table('user_settings').insert(userSettings)
//   //       .run().then(result => {
//   //         res.send(result)
//   //       })
//   //  }else{
//   r.db('vue_todo').table("user_settings").insert(
//     {
//       "id": req.body.id,
//       "setting_value": false
//     },
//     { conflict: "update" }).run().then(result => {
//       res.send(result)
//       console.log("result:", result)

//     }).catch(err => {
//       console.log("Error:", err)
//     })
// })

//get User Settings
// app.get('/getUserSetting', (req, res) => {
//   r.db('vue_todo').table('user_settings').run().then(result => {
//     res.send(result)
//     console.log("result:", result)
//   }).catch(err => {
//     console.log("Error:", err)
//   })
// })

//get comment in task_comments
// app.get('/getComment', jsonParser, (req, res) => {
//   r.db('vue_todo').table('task_comments').run().then(result => {
//         res.send(result)
//         console.log(result)
//   }).catch(err => {
//       console.log('Error:', err)
//   })
// })

// //Insert Comment in task_comment
// app.post('/insertComment', jsonParser, (req, res) => {
//   console.log('request: ', req.body)
//   const comment = {
//     'task_id': req.body.task_id,
//     'commentBy': req.body.commentBy,
//     'comment': req.body.comment,
//     'createdAt': req.body.createdAt
//   }
//   r.db("vue_todo").table('task_comments').insert(comment).run().then(result => {
//     res.send(result)
//   }).catch(err => {
//     console.log('Error:', err)
//   })
// })

// app.post('/insert_tag', jsonParser, (req, res) => {
//   console.log('req.body', req.body);
//   const tag = {
//     'name': req.body.name,
//   }
//   var task_id = req.body.task_id;
//   var created_by_user_id = req.body.created_by_user_id;

//   // Get new inserted tag id
//   insertTag(tag, function (tagId) {
//     var task_tags = {
//       'task_id': task_id,
//       'tag_id': tagId,
//       'created_by_user_id': created_by_user_id,
//       'deleted_by_user_id': '',
//       'is_deleted': false
//     };
//     r.db("vue_todo").table('task_tags').insert(task_tags).run().then(result => {
//       result.tag_id=tagId;
//       res.send(result);
//     }).catch(err => {
//       console.log('Error:', err)
//     })
//   });
// })

// // Insert task tags
// app.post('/insert_taskTag', jsonParser, (req, res) => {
//   // var tagId = req.body.tag_id;
//   // var task_id = req.body.task_id;
//   // var created_by_user_id = req.body.created_by_user_id;

//   // Get new inserted tag id
//     var task_tags = {
//       'task_id': req.body.task_id,
//       'tag_id': req.body.tag_id,
//       'created_by_user_id': req.body.created_by_user_id,
//       'deleted_by_user_id': '',
//       'is_deleted': false
//     };
//     r.db("vue_todo").table('task_tags').insert(task_tags).run().then(result => {
//       result.tag_id=tagId;
//       res.send(result);
//     }).catch(err => {
//       console.log('Error:', err)
//     })
// })

// function insertTag(tag, cb) {
//   r.db("vue_todo").table('tags').insert(tag).run().then(result => {
//     var tagId = result.generated_keys[0];
//     cb(tagId);
//   }).catch(err => {
//     console.log('Error:', err)
//   })
// }

// app.get('/getTags', (req, res) => {
//   r.db("vue_todo").table('tags').run().then(result => {
//     res.send(result);
//   }).catch(err => {
//     console.log('Error:', err)
//   })
// });

// app.post('/getTaskTags', (req, res) => {
//   var task_id = req.body.task_id;
//   r.db('vue_todo')
//     .table('task_tags')
//     .filter({ 'task_id': task_id, 'is_deleted': false })
//     .pluck('tag_id', 'task_id').innerJoin(
//     r.db('vue_todo').table("tags"),
//     function (post, user) {
//       return post("tag_id").eq(user("id"));
//     }).zip().pluck('id', 'name','task_id').run().then(result => {
//       res.send(result)
//     }).catch(err => {
//       console.log("Error:", err)
//     })
// })

// app.post('/deleteTaskTags', (req, res) => {
//   var task_id = req.body.task_id;
//   var tag_id = req.body.tag_id;
  
//   r.db("vue_todo").table("task_tags").filter({
//     "task_id": task_id, "tag_id": tag_id
//   }).update({
//     is_deleted: true, deleted_by_user_id: "1936b77f-d90e-48a0-9cb9-91d4e6a26b84"
//   }).run().then(result => {
//     res.send(result)
//   }).catch(err => {
//     console.log("Error:", err)
//   })
// })

app.use('/api', router)

app.listen(3000, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://172.16.105.110:3000')
})
