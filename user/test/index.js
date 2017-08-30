// Packages
const micro = require('micro')
const test = require('ava')
const listen = require('test-listen')
const request = require('request-promise')

// Service
const service = require('../src')

test('my endpoint', async t => {
  const microInstance = micro(service)
  const url = await listen(microInstance)
  const body = await request(url)

  t.deepEqual(body, 'Hello, world')
})