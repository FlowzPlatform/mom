'use strict';
const globalHooks = require('../../../hooks');

exports.before = {
    all: [
        // call global hook
        globalHooks.myHook()
    ],
    find(hook) {

        const query = this.createQuery(hook.params.query);
        const r = this.options.r;
        console.log('query', query)
        hook.params.rethinkdb = r.table('settings').merge(function (settings) {
            return {
                user_setting: query.filter({
                    'settings_id': settings('id'),
                }).coerceTo('array')
            }
        })
    },
    get: [],
    create:[],
    update: [],
    patch:[],
    remove: []
};

exports.after = {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
};