node-koajs-rest-skeleton
===================

A simple [Koajs Application REST Skeleton](https://github.com/ria-com/node-koajs-rest-skeleton)

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


simple test
===========

**Make your own spec-file for testing and start test:**

```sh
$ cd my_new_project
$ npm install
$ npm test
```
