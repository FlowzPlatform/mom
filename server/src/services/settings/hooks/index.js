'use strict';
const globalHooks = require('../../../hooks');
const config = require('config');

exports.before = {
    all: [
        // call global hook
        globalHooks.myHook()
    ],
    find(hook) {

        const query = this.createQuery(hook.params.query);
        const r = this.options.r;
        console.log('query', query)
        
        //start create settings table if not exist
        const db = config.get('dbName')
        const table = "settings"
        r.db(db).tableList().contains(table) // create table if not exists
        .do(tableExists => r.branch(tableExists, { created: 0 }, r.db(db).tableCreate(table)))
        .run().then(result => {
            console.log('settings table created----->', result)
            if(result.tables_created)
            {
                console.log('Settings value---->', result.tables_created)
                r.db(db).table(table).insert([
                    {'settings_name': 'Track task by progress', 'type':'progress'},
                    {'settings_name': 'Track task by duedate', 'type':'duedate'}
                ]).run()
            }
            
            // r.db(db).table(table).insert([
            //     {'settings_name': 'Track task by progress', 'type':'progress'},
            //     {'settings_name': 'Track task by duedate', 'type':'duedate'}
            // ]).run()
        });
        // end table create

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