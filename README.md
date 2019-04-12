node-koajs-rest-skeleton v3.5.3
===============================

A simple [Koajs 2.7.0 Application REST Skeleton](https://github.com/ria-com/node-koajs-rest-skeleton)
This version based on [koa 2.7.0](https://github.com/koajs/koa). 
    

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

**Install modules**
```sh
$ npm install
```

**Start app:**
```sh
$ node ./index.js
```

testing
=======


**Make your own Spec-files for testing and start test**

In this skeleton for automatic testing was used [jasmine-nodie](https://jasmine.github.io/2.1/node.html) & [Frisby (REST API testing framework)](http://frisbyjs.com).
I wrote several tests that you can use as examples.

All tests should be placed in the ./spec folder. The name of each test file must end with *Spec.js

To run the tests, use 
```sh
$ cd my_new_project
$ npm test
```

**Manual testing your REST service:**

You can also manual check the serviceability of your service with bash and [curl](https://curl.haxx.se/)

###### get user id 1
```sh
$ curl -XGET "http://localhost:8081/users/1"
```
###### get all users
```sh
$ curl -XGET "http://localhost:8081/users"
```

###### add new user
```sh
$ curl -XPOST "http://localhost:8081/users" -d '{"name":"New record 1"}' -H 'Content-Type: application/json'
```

###### edit user id 3
```sh
$ curl -XPUT "http://localhost:8081/users/3" -d '{"name":"New record 3"}' -H 'Content-Type: application/json'
```

###### delete user id 3
```sh
$ curl -XDELETE "http://localhost:8081/users/3"
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

kubernetes api
==============

Several new features have been added that can be used in conjunction with kubernetes
  * **Auto shutdown**. Set the environment variable **NODE_LIFE_TIME** to specify 
    the time at which the service will suspend its work, for exsmple:
    NODE_LIFE_TIME=24h или NODE_LIFE_TIME=30m
    
    If the variable is not set, then "Auto shutdown" is disabled
  * **Redy state**. Your app can tell the kubernetes system that it 
    is temporarily not ready to accept new requests. How to do this is 
    described in the example below
    ```javascript
       const {setReady} = require('../controllers/kubernetesController');
       // ...
       // setReady(false) // to temporary disable new requests
       // ...
       // setReady(true) // to restore accept new requests
   
    ```
    This should be configured in the config of kubernetes pod, 
    the address on which poll is created: **/redyz**
  * **Health state**. Your app can tell the kubernetes system that it 
    is temporarry broken. How to do this is described in the example below
    ```javascript
       const {setHealth} = require('../controllers/kubernetesController');
       // ...
       // setHealth(false) // to tell kubernetes: "app is broken" 
       // ...
       // setHealth(true) // to tell kubernetes: "app is live"
   
    ```
    This should be configured in the config of kubernetes pod, 
    the address on which poll is created: **/healthz**


In order to avoid cluttering the minimal code of our REST-service, additional 
functionality will be available when running the app via **index.kubernetes.js**: 
```sh
$ node ./index.kubernetes.js
```


history
=======

  * v3.5 - Joi validator was added to check PUT & POST input data (thanks to [Roman Yakovenko](https://github.com/b17))
  * v3.4 - Fix Dockerfile add /version route to kubernetes version
  * v3.3 - Some kubernetes features added
  * v3.2 - Updated dependencies for Koa 2.5, fix api tests, remove .babelrc