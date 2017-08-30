/*This is a micro-service for user details in microjs node js framework*/
'use strict'
const {send,json} = require('micro');
const user = require('./services/user.service');
const db = require('./models/db');
const User = require('./models/user');
const cors = require('micro-cors')()
const visualize = require('micro-visualize')
const jwtAuth = require('micro-jwt-auth')
const rateLimit = require('micro-ratelimit')
const microApi = require('micro-api')
const user_info = require('./services/user.service.personaldetails');
const user_address = require('./services/user.service.address');

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

const handleErrors = fn => async (req, res) => {
  try {
    return await fn(req, res)
  } catch (err) {
      throw(err)
   }
}

const api = microApi([
  {
    method: 'get',
    path: '/alluserdetails',
    handler: user.alluserdetails,
  },
  {
    method: 'get',
    path: '/getuserdetails/:uid',
    handler: user.getuserdetails,
  },
  {
    method: 'put',
    path: '/updateuserdetails/:uid',
    handler: user.updateuserdetails,
  },
  {
    method: 'delete',
    path: '/deleteuserdetails/:uid',
    handler: user.deleteuserdetails,
  },
  {
    method: 'get',
    path: '/userdetails/:uid',
    handler: user_info.userdetails,
  },
  {
    method: 'put',
    path: '/updatedetails/:uid',
    handler: user_info.updatedetails,
  },
  {
    method: 'get',
    path: '/useraddress/:uid',
    handler: user_address.useraddress,
  },
  {
    method: 'put',
    path: '/updateaddress/:uid',
    handler: user_address.updateaddress,
  },
  {
    method: 'post',
    path: '/getspecificuserdetails',
    handler: user.getspecificuserdetails,
  },
])



const handler = async(req, res) => {
  const input = await json(req)
  send(res, 200, "output")
}

module.exports = compose(
  handleErrors,
  cors,
  //rateLimit,
  jwtAuth("abcdefgabcdefg"),
  visualize
)(api)
