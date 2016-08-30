node-koajs-rest-skeleton
===================

A simple [Koajs 2.0 Application REST Skeleton](https://github.com/ria-com/node-koajs-rest-skeleton)
This version based on [koa 2.0](https://github.com/koajs/koa/tree/v2.x). 

  * You can also require assembly for [koa v2.x](https://github.com/ria-com/node-koajs-rest-skeleton/tree/v2.x) without [babel](https://babeljs.io)
  * You can also require assembly for [koa v1.x](https://github.com/ria-com/node-koajs-rest-skeleton/tree/v1.x)
    

quick start
===========

**Checkout node-koajs-rest-skeleton:**

```sh
$ git clone https://github.com/ria-com/node-koajs-rest-skeleton
```

**Make your own new project:**

```sh
$ mv node-koajs-rest-skeleton my_new_project
$ cd my_new_project
$ rm -rf .git
```

**Edit package.json:**

```sh
$ vi package.json
```

**Edit config/* files:**

```sh
$ vi config/default.js
```

console api
===========

```sh
Usage: /usr/bin/node ./console.js --section [string] [--action [string]] [--opt [object]]

Options:
  --opt, --options  example --opt.app=mobile --opt.s=1  [default: {}]
  --section                                             [required]
  --action                                              [default: "index"]
```

For example 
```sh
$ ./console.js --section=default --opt.hello=world
Hello world defaultController & index action with options: {"hello":"world"}
```

rabbitmq api
============

```sh
Usage: NODE_WORKER_NAME=[worker_name] NODE_QUEUE_NAME=[queue_name] /usr/bin/node --harmony ./worker.js
```

For example 
```sh
$ NODE_WORKER_NAME=example NODE_QUEUE_NAME=example /usr/bin/node --harmony ./worker.js
```


simple test
===========

**Make your own spec-file for testing and start test:**

```sh
$ cd my_new_project
$ npm install
$ npm test
```
