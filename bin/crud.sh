curl -XPOST   "127.0.0.1:8081/users" -d '{"id":3,"name":"Test"}' -H 'Content-Type: application/json'
curl -XGET    "127.0.0.1:8081/users"
curl -XPUT    "127.0.0.1:8081/users/3" -d '{"name":"Test1"}' -H 'Content-Type: application/json'
curl -XGET    "127.0.0.1:8081/users/3"
curl -XDELETE "127.0.0.1:8081/users/3"
