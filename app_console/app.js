"use strict";

const argv = require('optimist')
        .usage('Usage: $0 --section [string] [--action [string]] [--opt [object]]')
        .demand(['section'])
        .options('action', {
            'default' : 'index'
        })
        .options('opt', {
            alias : 'options',
            'default' : {},
            description : 'example --opt.app=mobile --opt.s=1'
        })
        .argv,
      co = require('co');

const onerror = function onerror(err) { console.error(err.stack); };

co(function *(){
    yield require('./controllers/'+argv.section+'Controller')[argv.action](argv.opt);
    process.exit(0);
}).catch(onerror);
